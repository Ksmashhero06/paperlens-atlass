import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionCard } from "@/components/app/SectionCard";
import { EmptyState } from "@/components/app/EmptyState";
import { getUserAnalyses, type UserAnalysisItem } from "@/lib/api";
import { loadAllPapersWithSync, getLocalQuestions } from "@/lib/paper-store";
import { DriveSyncIndicator } from "@/components/app/DriveSyncIndicator";
import {
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Loader2,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Paper & Analysis History · PaperAtlas" },
      {
        name: "description",
        content: "View your previous research analyses, questions, and grounded citations in PaperAtlas.",
      },
      { property: "og:title", content: "Paper & Analysis History · PaperAtlas" },
      {
        property: "og:description",
        content: "View your previous research analyses and questions in PaperAtlas.",
      },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  const [analyses, setAnalyses] = useState<UserAnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [backendData, localSync] = await Promise.allSettled([
          getUserAnalyses(),
          loadAllPapersWithSync(),
        ]);

        const items: UserAnalysisItem[] = [];
        const seenIds = new Set<string>();

        if (backendData.status === "fulfilled" && Array.isArray(backendData.value)) {
          backendData.value.forEach((item) => {
            seenIds.add(item.paper_id);
            items.push(item);
          });
        }

        if (localSync.status === "fulfilled" && localSync.value.papers) {
          const questions = getLocalQuestions();
          localSync.value.papers.forEach((p) => {
            if (!seenIds.has(p.id)) {
              seenIds.add(p.id);
              const pQuestions = questions.filter((q) => q.paperId === p.id);
              items.push({
                id: `act_${p.id}`,
                paper_id: p.id,
                paper_title: p.title,
                authors: p.authors?.join(", ") || "",
                year: p.publicationYear || 2026,
                analyzed_at: p.processedAt || p.uploadedAt || new Date().toISOString(),
                questions_count: pQuestions.length,
                status: p.processingStatus === "completed" ? "READY" : "PROCESSING",
                stage: p.processingStatus === "completed" ? "READY" : "ANALYZING",
                summary: p.summary || "Structured paper analysis backed by Google Drive AppData.",
                recent_question: pQuestions[0]?.question,
              });
            }
          });
        }

        setAnalyses(items);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <AppShell eyebrow="Analysis History" title="My Analysis">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                Google Drive Preserved
              </span>
            </div>
            <h1 className="mt-2 font-serif-editorial text-3xl font-bold leading-tight text-foreground md:text-4xl">
              My Analysis
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Revisit your previously analyzed research papers. Questions, findings, and grounded citations are permanently preserved in your Google Drive AppData.
            </p>
          </div>
          <DriveSyncIndicator />
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
            <p className="text-sm font-medium">Loading your analysis history...</p>
          </div>
        ) : analyses.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No previous analyses found"
            description="Upload a research paper PDF in the dashboard or upload page to begin logging structure-aware analyses."
          />
        ) : (
          <div className="space-y-6">
            {/* Table Representation */}
            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-muted/40 uppercase tracking-wider text-[11px] text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Paper</th>
                    <th className="px-5 py-3.5 font-semibold">Analyzed</th>
                    <th className="px-5 py-3.5 font-semibold text-right">Questions</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                    <th className="px-5 py-3.5 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {analyses.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-foreground font-serif-editorial text-sm line-clamp-1 max-w-md">
                          {item.paper_title}
                        </div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground flex items-center gap-2">
                          <span>{item.authors || "Research Group"}</span>
                          <span>•</span>
                          <span>{item.year || 2026}</span>
                        </div>
                        {item.recent_question && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-primary/90 font-mono">
                            <MessageSquare className="h-3 w-3" />
                            <span>Recent Q: &quot;{item.recent_question}&quot;</span>
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{item.analyzed_at}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right font-mono font-medium whitespace-nowrap">
                        <span className="rounded-md bg-muted px-2 py-1 text-foreground">
                          {item.questions_count}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <Link
                          to="/paper/$id"
                          params={{ id: item.paper_id }}
                          className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                        >
                          Open Analysis
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Preserved Evidence Highlights */}
            <SectionCard eyebrow="Preserved Knowledge" title="Recent Analysis Insights">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {analyses.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-col justify-between rounded-lg border border-border bg-background p-4 shadow-2xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{a.analyzed_at}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                          {a.questions_count} queries
                        </span>
                      </div>
                      <h4 className="font-serif-editorial text-sm font-semibold text-foreground line-clamp-1">
                        {a.paper_title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {a.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/50">
                      <Link
                        to="/paper/$id"
                        params={{ id: a.paper_id }}
                        className="text-xs font-medium text-primary hover:underline flex items-center justify-between"
                      >
                        <span>Revisit Evidence Q&A</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </AppShell>
  );
}
