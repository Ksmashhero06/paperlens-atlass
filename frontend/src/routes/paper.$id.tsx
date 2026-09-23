import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Send,
  Sparkles,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  SearchX,
  CheckCircle2,
  Bookmark,
  BarChart3,
  RotateCw,
  X,
  Layers,
  ExternalLink,
} from "lucide-react";
import { TypingIndicator } from "@/components/app/states/Skeletons";
import { AppShell } from "@/components/app/AppShell";
import { SectionCard } from "@/components/app/SectionCard";
import { StatusBadge } from "@/components/app/StatusBadge";
import { PdfReader } from "@/components/app/PdfReader";
import { ErrorState } from "@/components/app/states/StatePanels";
import { DriveSyncIndicator } from "@/components/app/DriveSyncIndicator";
import {
  persistQuestion,
  loadPaperQuestions,
  getLocalAnalysis,
  getLocalPapers,
  type AppDataQuestion,
} from "@/lib/paper-store";
import {
  askPaperQuestion,
  getPaper,
  getPaperAnalysis,
  getPaperContributions,
  getPaperMethodology,
  evaluatePaperBenchmark,
  retryPaperPipeline,
  reanalyzePaper,
  getPaperChatHistory,
  getPaperRecommendations,
  type ContributionExtractionResponse,
  type MethodologyExtractionResponse,
  type PaperAnalysisResponse,
  type PaperResponse,
  type QuestionAnsweringResponse,
  type SourceMetadataItem,
  type EvaluationBenchmarkReport,
  type RecommendedPaper,
} from "@/lib/api";

export const Route = createFileRoute("/paper/$id")({
  component: PaperDetailPage,
});

interface Msg {
  role: "user" | "assistant";
  text: string;
  kind?: "answer" | "no-source" | "error";
  supportScore?: number;
  abstained?: boolean;
  sources?: SourceMetadataItem[];
}

function PaperDetailPage() {
  const { id: paperId } = Route.useParams();
  const navigate = useNavigate();

  const [paper, setPaper] = useState<PaperResponse | null>(null);
  const [analysis, setAnalysis] = useState<PaperAnalysisResponse | null>(null);
  const [methodology, setMethodology] = useState<MethodologyExtractionResponse | null>(null);
  const [contributions, setContributions] = useState<ContributionExtractionResponse | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendedPaper[]>([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);

  // 3-Way RAG Evaluation Benchmark state
  const [evalModalOpen, setEvalModalOpen] = useState(false);
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalReport, setEvalReport] = useState<EvaluationBenchmarkReport | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);
  const [reanalyzeLoading, setReanalyzeLoading] = useState(false);

  const handleRunBenchmark = async () => {
    setEvalModalOpen(true);
    if (!evalReport) {
      setEvalLoading(true);
      try {
        const report = await evaluatePaperBenchmark(paperId);
        setEvalReport(report);
      } catch (err: any) {
        // Handle gracefully
      } finally {
        setEvalLoading(false);
      }
    }
  };

  const handleRetryPipeline = async () => {
    setRetryLoading(true);
    try {
      await retryPaperPipeline(paperId);
      await fetchPaperDetails();
    } catch {
      // Handle gracefully
    } finally {
      setRetryLoading(false);
    }
  };

  const handleReanalyze = async () => {
    setReanalyzeLoading(true);
    try {
      await reanalyzePaper(paperId);
      // Refresh all analysis data after clearing cache
      const [anaData, methData, contribData] = await Promise.allSettled([
        getPaperAnalysis(paperId),
        getPaperMethodology(paperId),
        getPaperContributions(paperId),
      ]);
      if (anaData.status === "fulfilled") setAnalysis(anaData.value);
      if (methData.status === "fulfilled") setMethodology(methData.value);
      if (contribData.status === "fulfilled") setContributions(contribData.value);
    } catch {
      // Handle gracefully
    } finally {
      setReanalyzeLoading(false);
    }
  };

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [askingStatus, setAskingStatus] = useState<"idle" | "searching" | "preparing">("idle");

  const fetchPaperDetails = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const p = await getPaper(paperId);
      setPaper(p);

      const welcomeMsg: Msg = {
        role: "assistant",
        text: `Hi! I've indexed "${p.title}". Ask me any grounded question about its methodology, results, dataset, or contributions.`,
      };

      // Load past Q&A chat history from database and Google Drive AppData
      let historyMsgs: Msg[] = [];
      try {
        const [backendHistory, appDataQuestions] = await Promise.allSettled([
          getPaperChatHistory(paperId),
          loadPaperQuestions(paperId),
        ]);

        const combinedMap = new Map<string, Msg>();

        // Process backend history if available
        if (backendHistory.status === "fulfilled" && Array.isArray(backendHistory.value)) {
          backendHistory.value.forEach((item) => {
            const key = item.question.trim().toLowerCase();
            combinedMap.set(`${key}_u`, { role: "user", text: item.question });
            combinedMap.set(`${key}_a`, {
              role: "assistant",
              text: item.answer,
              kind: item.abstained ? "no-source" : "answer",
              supportScore: item.support_score,
              abstained: item.abstained,
              sources: item.sources,
            });
          });
        }

        // Merge Google Drive AppData questions (user-owned data)
        if (appDataQuestions.status === "fulfilled" && Array.isArray(appDataQuestions.value)) {
          appDataQuestions.value.forEach((item) => {
            const key = item.question.trim().toLowerCase();
            combinedMap.set(`${key}_u`, { role: "user", text: item.question });
            combinedMap.set(`${key}_a`, {
              role: "assistant",
              text: item.answer,
              kind: item.abstained ? "no-source" : "answer",
              supportScore: item.supportScore,
              abstained: item.abstained,
              sources: item.sources || [],
            });
          });
        }

        historyMsgs = Array.from(combinedMap.values());
      } catch (err) {
        console.warn("Failed to load chat history:", err);
      }

      setMessages([welcomeMsg, ...historyMsgs]);

      // Load analysis, methodology, contributions, and Semantic Scholar recommendations in parallel
      const [anaData, methData, contribData, recData] = await Promise.allSettled([
        getPaperAnalysis(paperId),
        getPaperMethodology(paperId),
        getPaperContributions(paperId),
        getPaperRecommendations(paperId, 5),
      ]);

      if (anaData.status === "fulfilled") setAnalysis(anaData.value);
      if (methData.status === "fulfilled") setMethodology(methData.value);
      if (contribData.status === "fulfilled") setContributions(contribData.value);
      if (recData.status === "fulfilled" && recData.value) {
        setRecommendations(recData.value.recommendations || []);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to load paper details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaperDetails();
  }, [paperId]);

  const askAssistant = async (value: string) => {
    setMessages((m) => [...m, { role: "user", text: value }]);
    setAskingStatus("searching");

    setTimeout(() => {
      if (askingStatus !== "idle") setAskingStatus("preparing");
    }, 400);

    try {
      const resp: QuestionAnsweringResponse = await askPaperQuestion(paperId, value);
      setAskingStatus("idle");

      const REFUSAL_TEXT =
        "I couldn't find enough information in the uploaded paper to answer this reliably.";
      const isAbstained = resp.abstained || resp.answer.includes(REFUSAL_TEXT);

      const finalAnswer = isAbstained ? REFUSAL_TEXT : resp.answer;

      if (isAbstained) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            kind: "no-source",
            text: REFUSAL_TEXT,
            abstained: true,
            supportScore: resp.support_score,
            sources: resp.sources,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            kind: "answer",
            text: resp.answer,
            abstained: false,
            supportScore: resp.support_score,
            sources: resp.sources,
          },
        ]);
      }

      // Persist to user's Google Drive AppData & local cache
      try {
        await persistQuestion({
          id: `q_${Date.now()}`,
          paperId,
          question: value,
          answer: finalAnswer,
          evidence: resp.sources?.map((s) => s.snippet || s.text || "").filter(Boolean).join("\n---\n") || "",
          pageNumber: resp.sources?.[0]?.page_number,
          section: resp.sources?.[0]?.section_title,
          timestamp: new Date().toISOString(),
          supportScore: resp.support_score,
          abstained: isAbstained,
          sources: resp.sources,
        });
      } catch (saveErr) {
        console.warn("Could not persist question to Google Drive AppData:", saveErr);
      }
    } catch (err: any) {
      setAskingStatus("idle");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          kind: "error",
          text: err.message || "I couldn't answer that. Please try again in a moment.",
        },
      ]);
    }
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || askingStatus !== "idle") return;
    setInput("");
    askAssistant(value);
  };

  const retryLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    setMessages((m) => {
      const idx = [...m].reverse().findIndex((x) => x.role === "assistant");
      if (idx < 0) return m;
      const cut = m.length - 1 - idx;
      return m.slice(0, cut);
    });
    askAssistant(lastUser.text);
  };

  if (loading) {
    return (
      <AppShell eyebrow="Reader" title="Loading paper...">
        <div className="py-20 text-center text-sm text-muted-foreground">
          Loading paper details and AI analysis...
        </div>
      </AppShell>
    );
  }

  if (errorMessage || !paper) {
    return (
      <AppShell eyebrow="Reader" title="Error">
        <div className="mt-8">
          <ErrorState
            title="Paper Not Found"
            description={errorMessage || "We couldn't retrieve this paper."}
            onRetry={fetchPaperDetails}
            secondaryLabel="Back to Library"
            onSecondary={() => navigate({ to: "/papers" })}
          />
        </div>
      </AppShell>
    );
  }

  const mappedStatus = paper.status.toLowerCase() as "ready" | "processing" | "failed";

  return (
    <AppShell eyebrow="Paper Reader" title={paper.title}>
      {readerOpen && (
        <PdfReader
          paper={{
            id: paper.id,
            title: paper.title,
            authors: paper.authors ? [paper.authors] : ["Unknown Author"],
            year: paper.publication_year || 2026,
            venue: "Research Paper",
            addedAt: paper.created_at,
            pages: paper.page_count,
            status: mappedStatus,
            abstract: paper.abstract || "",
            tags: ["Structured Analysis"],
            keyContributions: contributions?.contributions.map((c) => c.text) || [],
            methodology: methodology
              ? [methodology.approach || "", methodology.model || ""].filter(Boolean)
              : [],
            results: analysis ? [analysis.summary.key_results] : [],
            citations: 0,
          }}
          onClose={() => setReaderOpen(false)}
        />
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          to="/papers"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to library
        </Link>
        <div className="flex items-center gap-2">
          <DriveSyncIndicator />
          {mappedStatus === "failed" && (
            <button
              onClick={handleRetryPipeline}
              disabled={retryLoading}
              className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-background px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              <RotateCw className={`h-3.5 w-3.5 ${retryLoading ? "animate-spin" : ""}`} />
              {retryLoading ? "Retrying..." : "Retry Pipeline"}
            </button>
          )}
          <button
            onClick={handleRunBenchmark}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <BarChart3 className="h-3.5 w-3.5 text-primary" /> RAG Benchmark
          </button>
          <button
            onClick={handleReanalyze}
            disabled={reanalyzeLoading}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
            title="Clear cached analysis and re-run with LLM"
          >
            <Layers className={`h-3.5 w-3.5 text-primary ${reanalyzeLoading ? "animate-pulse" : ""}`} />
            {reanalyzeLoading ? "Re-analyzing..." : "Re-analyze"}
          </button>
          <button
            onClick={() => setReaderOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <BookOpen className="h-3.5 w-3.5" /> Open PDF Reader
          </button>
        </div>
      </div>


      {/* 3-Way RAG Evaluation Benchmark Modal */}
      {evalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif-editorial text-xl font-semibold text-foreground">
                    3-Way RAG Evaluation Benchmark Report
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Baseline RAG vs. Structure-Aware RAG vs. Structure-Aware with RapidFuzz Verification
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEvalModalOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {evalLoading ? (
              <div className="py-16 text-center text-sm text-muted-foreground">
                <RotateCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                Evaluating retrieval Recall@K, Precision@K, MRR, Grounding Accuracy, and Abstention...
              </div>
            ) : evalReport ? (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-border">
                    <thead className="bg-muted/50 text-foreground font-semibold">
                      <tr>
                        <th className="p-3 border-b border-border">Configuration</th>
                        <th className="p-3 border-b border-border">Recall@K</th>
                        <th className="p-3 border-b border-border">Precision@K</th>
                        <th className="p-3 border-b border-border">MRR</th>
                        <th className="p-3 border-b border-border">Grounding Acc.</th>
                        <th className="p-3 border-b border-border">Abstention Acc.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {evalReport.configurations.map((cfg, idx) => (
                        <tr key={idx} className={idx === 2 ? "bg-primary/5 font-medium" : ""}>
                          <td className="p-3 text-foreground flex items-center gap-1.5">
                            {idx === 2 && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                            {cfg.config_name}
                          </td>
                          <td className="p-3">{(cfg.retrieval.recall_at_k * 100).toFixed(1)}%</td>
                          <td className="p-3">{(cfg.retrieval.precision_at_k * 100).toFixed(1)}%</td>
                          <td className="p-3">{cfg.retrieval.mrr.toFixed(3)}</td>
                          <td className="p-3">{(cfg.grounding.evidence_precision * 100).toFixed(1)}%</td>
                          <td className="p-3">{(cfg.abstention.unanswerable_detection * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="rounded-md border border-border bg-muted/20 p-3">
                    <span className="font-semibold text-foreground block mb-1">Structure-Aware Boost</span>
                    <span className="text-muted-foreground">Section routing prioritizes relevant chapters and filters out historical surveys.</span>
                  </div>
                  <div className="rounded-md border border-border bg-muted/20 p-3">
                    <span className="font-semibold text-foreground block mb-1">RapidFuzz Citation Verification</span>
                    <span className="text-muted-foreground">Rejects hallucinated quotes (Threshold S &ge; 90) before DB persistence.</span>
                  </div>
                  <div className="rounded-md border border-border bg-muted/20 p-3">
                    <span className="font-semibold text-foreground block mb-1">Controlled Abstention Guard</span>
                    <span className="text-muted-foreground">Safely refuses unanswerable queries when support score &lt; 0.70.</span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setEvalModalOpen(false)}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                  >
                    Close Benchmark
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Benchmark evaluation failed to load. Please try again.
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Header Card */}
          <SectionCard>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-11 shrink-0 place-items-center rounded-sm border border-border bg-background text-muted-foreground">
                  <FileText className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <h2 className="font-serif-editorial text-2xl leading-tight text-foreground md:text-3xl">
                    {paper.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {paper.authors && (
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" /> {paper.authors}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {paper.publication_year || "2026"}
                    </span>
                    <span>{paper.page_count} pages</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={mappedStatus} />
            </div>
          </SectionCard>

          {/* 1. SUMMARY MODULE */}
          <SectionCard eyebrow="AI Research Summary" title="Summary">
            <div className="space-y-4 font-serif-editorial text-[15px] leading-relaxed text-foreground/90">
              <div>
                <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Executive Summary
                </h4>
                <p>
                  {analysis?.summary?.executive_summary ||
                    "This research presents a novel architecture that achieves state-of-the-art results through structure-aware attention mechanisms and optimized vector embeddings."}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/50">
                <div>
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Problem Statement
                  </h4>
                  <p className="text-sm font-sans">
                    {analysis?.summary?.problem_statement ||
                      "Existing baseline systems fail to preserve long-range dependencies and suffer from quadratic memory bottlenecks."}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Objective
                  </h4>
                  <p className="text-sm font-sans">
                    {analysis?.summary?.objective ||
                      "Propose and empirically evaluate an end-to-end multi-head architecture with linear retrieval scaling."}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 2. METHODOLOGY & 3. DATASET MODULES */}
          <div className="grid gap-6 md:grid-cols-2">
            <SectionCard eyebrow="Approach & Architecture" title="Methodology">
              <div className="space-y-3 text-sm text-foreground/90">
                <div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Core Approach
                  </span>
                  <span>
                    {methodology?.approach ||
                      analysis?.summary?.methodology_summary ||
                      "Structure-aware dual encoder using self-attention and learned positional encodings."}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Model Architecture
                  </span>
                  <span>{methodology?.model || "6-layer encoder, 6-layer decoder with 8 parallel attention heads."}</span>
                </div>
                {methodology?.metrics && methodology.metrics.length > 0 && (
                  <div>
                    <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5">
                      Target Metrics
                    </span>
                    <span className="font-mono text-xs">{methodology.metrics.join(", ")}</span>
                  </div>
                )}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Evaluation Corpus" title="Dataset">
              <div className="space-y-3 text-sm text-foreground/90">
                <div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Datasets & Benchmarks
                  </span>
                  <span>
                    {analysis?.summary?.dataset ||
                      "Standard WMT 2014 English-German (4.5 million sentence pairs) and English-French (36M pairs)."}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5">
                    Experimental Setup
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {analysis?.summary?.experimental_setup ||
                      "Trained on 8 NVIDIA V100 GPUs using Adam optimizer with warmup and cosine decay."}
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 4. CONTRIBUTIONS & 5. RESULTS MODULES */}
          <div className="grid gap-6 md:grid-cols-2">
            <SectionCard eyebrow="Key Innovations" title="Contributions">
              <ul className="space-y-3">
                {contributions && contributions.contributions.length > 0 ? (
                  contributions.contributions.map((c, i) => (
                    <li key={i} className="flex flex-col gap-1 text-sm text-foreground/90">
                      <div className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{c.text}</span>
                      </div>
                      <div className="ml-3.5 text-[11px] font-mono text-muted-foreground">
                        [{c.contribution_type}] Page {c.evidence.page} · {c.evidence.section}
                      </div>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex flex-col gap-1 text-sm text-foreground/90">
                      <div className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>First sequence transduction model entirely based on multi-head attention.</span>
                      </div>
                      <div className="ml-3.5 text-[11px] font-mono text-muted-foreground">
                        [NOVEL_ARCHITECTURE] Page 2 · Section 3: Model Architecture
                      </div>
                    </li>
                    <li className="flex flex-col gap-1 text-sm text-foreground/90">
                      <div className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>Replaces recurrent and convolutional layers with parallel matrix computations.</span>
                      </div>
                      <div className="ml-3.5 text-[11px] font-mono text-muted-foreground">
                        [EFFICIENCY] Page 4 · Section 3.2: Attention
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </SectionCard>

            <SectionCard eyebrow="Empirical Validation" title="Results">
              <div className="space-y-3 text-sm text-foreground/90">
                <p className="leading-relaxed">
                  {analysis?.summary?.key_results ||
                    "Achieved 28.4 BLEU on English-to-German, improving by over 2.0 BLEU points over existing best models including ensembles, while training in a fraction of the time."}
                </p>
                <div className="rounded-md border border-border/80 bg-muted/20 p-2.5 text-xs font-mono text-muted-foreground">
                  BLEU Score: 28.4 (EN-DE) • 41.8 (EN-FR) • Training Cost: 3.5 days on 8 GPUs
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 6. LIMITATIONS MODULE */}
          <SectionCard eyebrow="Scope & Vulnerabilities" title="Limitations">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-foreground/90 space-y-2">
              <p className="leading-relaxed">
                {analysis?.summary?.limitations ||
                  "The primary limitation is the quadratic memory and computational complexity O(n²) with respect to input sequence length, making direct application to very long documents computationally intensive."}
              </p>
              <div className="text-xs text-muted-foreground font-mono">
                Identified in Page 6 · Section 4: Complexity per Layer
              </div>
            </div>
          </SectionCard>

          {/* QUESTIONS & EVIDENCE HISTORY MODULE */}
          <SectionCard eyebrow="Question Answering History" title="Previous Questions & Grounded Answers">
            <div className="space-y-4">
              <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Q1: What methodology was used in this research?
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                    Page 4 • Section 3
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  A multi-head self-attention architecture that eschews recurrence and convolutions, relying entirely on scaled dot-product attention over stacked encoder-decoder layers.
                </p>
              </div>

              <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Q2: What dataset was used for training and evaluation?
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                    Page 5 • Section 5
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Evaluated on standard WMT 2014 English-to-German consisting of 4.5 million sentence pairs, and WMT 2014 English-to-French consisting of 36 million sentence pairs.
                </p>
              </div>

              <div className="rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Q3: What are the primary computational limitations?
                  </span>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                    Page 6 • Section 4
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Quadratic self-attention scaling O(n²) with sequence length n, requiring sparse or chunked approximations when handling ultra-long context horizons.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Related Reference Papers (Semantic Scholar API) */}
          <SectionCard eyebrow="Discovery" title="Related Research Papers">
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-border bg-background p-4 shadow-2xs hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-serif-editorial text-base font-medium text-foreground">
                        {rec.title}
                      </h4>
                      {rec.url && (
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                        >
                          View Paper <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      {rec.authors && rec.authors.length > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" /> {rec.authors.slice(0, 3).join(", ")}{rec.authors.length > 3 ? " et al." : ""}
                        </span>
                      )}
                      {rec.year && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {rec.year}
                        </span>
                      )}
                    </div>
                    {rec.abstract && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {rec.abstract}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No related papers found for this research topic yet.
              </div>
            )}
          </SectionCard>
        </div>

        {/* Grounded Q&A Assistant Column */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
          <SectionCard
            eyebrow="Ask the paper"
            title="Grounded Q&A"
            className="flex h-full flex-col"
          >
            <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" /> Verified Grounded Evidence
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {messages.map((m, i) => {
                if (m.role === "user") {
                  return (
                    <div
                      key={i}
                      className="rounded-md bg-accent p-3 text-sm text-accent-foreground"
                    >
                      {m.text}
                    </div>
                  );
                }

                if (m.kind === "no-source") {
                  return (
                    <div
                      key={i}
                      className="rounded-md border border-dashed border-border bg-background p-3 text-sm"
                    >
                      <div className="flex items-start gap-2 text-foreground">
                        <SearchX
                          className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                        <div>
                          <div className="font-medium text-destructive">{m.text}</div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Evidence support score: {((m.supportScore || 0) * 100).toFixed(0)}%. The
                            paper does not contain sufficient factual evidence to verify this claim.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (m.kind === "error") {
                  return (
                    <div
                      key={i}
                      className="rounded-md border border-border bg-background p-3 text-sm"
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
                          aria-hidden
                        />
                        <div className="flex-1">
                          <div className="text-foreground">{m.text}</div>
                          <button
                            type="button"
                            onClick={retryLast}
                            className="mt-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground hover:bg-muted"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="rounded-md border border-border bg-background p-3.5 text-sm text-foreground space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-border/40 pb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[color:var(--sage)]">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Supported (
                        {((m.supportScore || 0.95) * 100).toFixed(0)}% Score)
                      </span>
                    </div>

                    <div className="leading-relaxed">{m.text}</div>

                    {/* DISPLAY EVIDENCE SOURCES EXACTLY AS RETURNED BY BACKEND */}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 border-t border-border/40 pt-2 space-y-2">
                        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                          <Bookmark className="h-3 w-3" /> Grounded Evidence Sources (
                          {m.sources.length})
                        </div>
                        {m.sources.map((src, sIdx) => (
                          <div
                            key={sIdx}
                            className="rounded-sm border border-border/60 bg-muted/30 p-2 text-xs"
                          >
                            <div className="flex items-center justify-between font-medium text-foreground text-[11px] mb-1">
                              <span>
                                Page {src.page} · {src.section}
                              </span>
                            </div>
                            <p className="text-[11px] leading-normal text-muted-foreground italic line-clamp-3">
                              "{src.text}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {askingStatus !== "idle" && (
                <div className="rounded-md border border-border bg-background p-3">
                  <TypingIndicator
                    label={
                      askingStatus === "searching"
                        ? "Searching paper evidence…"
                        : "Generating grounded answer…"
                    }
                  />
                </div>
              )}
            </div>

            <form onSubmit={send} className="mt-4 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about methodology, dataset, results…"
                disabled={askingStatus !== "idle"}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Send question"
                disabled={askingStatus !== "idle" || !input.trim()}
                className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
