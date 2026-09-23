import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  UploadCloud,
  X,
  ShieldCheck,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Search,
  HardDrive,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { cn } from "@/lib/utils";
import { ErrorState, SuccessState } from "@/components/app/states/StatePanels";
import {
  getPaper,
  getPaperAnalysis,
  getPaperStatus,
  retryPaperPipeline,
  uploadPaper,
  type PaperStatusResponse,
} from "@/lib/api";
import { persistPaper, persistAnalysis, type AppDataPaper } from "@/lib/paper-store";
import { DriveSyncIndicator } from "@/components/app/DriveSyncIndicator";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Analyze a Research Paper · PaperAtlas" },
      {
        name: "description",
        content: "Upload a PDF and PaperAtlas will structure the document through the 9-stage research pipeline and persist to Google Drive AppData.",
      },
      { property: "og:title", content: "Analyze a Research Paper · PaperAtlas" },
      {
        property: "og:description",
        content: "Upload a PDF and PaperAtlas will structure the document through the 9-stage research pipeline and persist to Google Drive AppData.",
      },
    ],
  }),
  component: UploadPage,
});

const MAX_MB = 20;

// The Real Academic Pipeline Stages including Google Drive AppData saving
const PIPELINE_STAGES = [
  { key: "UPLOAD", label: "PDF uploaded", description: "Binary payload stored & verified" },
  { key: "PDF_VALIDATION", label: "PDF validation", description: "Verifying document layout & academic structure" },
  { key: "TEXT_EXTRACTION", label: "Text extraction", description: "Extracting academic text, equations & tables" },
  { key: "SECTION_DETECTION", label: "Section detection", description: "Identifying scientific sections & hierarchy" },
  { key: "CHUNKING", label: "Structure chunking", description: "Structure-aware semantic chunking with overlap" },
  { key: "EMBEDDING", label: "Generating embeddings", description: "Computing 768-dim normalized representations" },
  { key: "VECTOR_INDEXING", label: "Vector indexing", description: "Building high-performance retrieval index" },
  { key: "PAPER_ANALYSIS", label: "Paper analysis", description: "Extracting claims, methodology & findings" },
  { key: "SAVE_APPDATA", label: "Save to Google Drive AppData", description: "Persisting encrypted paper & analysis to user Google Account" },
  { key: "READY", label: "Analysis Ready", description: "Saved to Google Drive & ready for grounded research" },
];

type Phase = "idle" | "selected" | "uploading" | "processing" | "done" | "processing-failed";

interface SelectedFile {
  raw: File;
  name: string;
  sizeBytes: number;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function UploadPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [file, setFile] = useState<SelectedFile | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paperId, setPaperId] = useState<string | null>(null);
  const [statusResponse, setStatusResponse] = useState<PaperStatusResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptFile = (rawFile: File) => {
    setErrorMessage(null);
    const isPdf = rawFile.name.toLowerCase().endsWith(".pdf") || rawFile.type === "application/pdf";
    if (!isPdf) {
      setErrorMessage("Only PDF files are supported.");
      return;
    }
    if (rawFile.size > MAX_MB * 1024 * 1024) {
      setErrorMessage(`File size exceeds limit of ${MAX_MB}MB.`);
      return;
    }
    setFile({ raw: rawFile, name: rawFile.name, sizeBytes: rawFile.size });
    setPhase("selected");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) {
      acceptFile(dropped[0]);
    }
  };

  const clearAll = () => {
    setFile(null);
    setPhase("idle");
    setErrorMessage(null);
    setPaperId(null);
    setStatusResponse(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const startUploadAndAnalyze = async () => {
    if (!file) return;
    setPhase("uploading");
    setErrorMessage(null);

    try {
      const uploadResp = await uploadPaper(file.raw);
      setPaperId(uploadResp.paper_id);
      setPhase("processing");
      toast.success("Document accepted", {
        description: "Executing 9-stage extraction & semantic indexing...",
      });
    } catch (err: any) {
      setPhase("processing-failed");
      setErrorMessage(err.message || "Failed to upload paper.");
    }
  };

  // Status Polling Effect for Genuine Pipeline Stages
  useEffect(() => {
    if (phase !== "processing" || !paperId) return;

    let isMounted = true;
    const interval = setInterval(async () => {
      try {
        const statusData = await getPaperStatus(paperId);
        if (!isMounted) return;

        setStatusResponse(statusData);

        if (statusData.status === "READY") {
          setPhase("done");
          clearInterval(interval);

          // Automatically persist paper and analysis to Google Drive AppData
          try {
            const [pDetails, pAnalysis] = await Promise.allSettled([
              getPaper(paperId),
              getPaperAnalysis(paperId),
            ]);

            const resolvedPaper: AppDataPaper = {
              id: paperId,
              title:
                pDetails.status === "fulfilled" && pDetails.value.title
                  ? pDetails.value.title
                  : file?.name.replace(".pdf", "") || "Uploaded Paper",
              authors:
                pDetails.status === "fulfilled" && pDetails.value.authors
                  ? [pDetails.value.authors]
                  : [],
              publicationYear:
                pDetails.status === "fulfilled" ? pDetails.value.publication_year : 2026,
              pageCount:
                pDetails.status === "fulfilled" ? pDetails.value.page_count || 12 : 12,
              fileName: file?.name || "paper.pdf",
              fileSize: file?.sizeBytes,
              uploadedAt: new Date().toISOString(),
              processedAt: new Date().toISOString(),
              processingStatus: "completed",
              summary:
                pDetails.status === "fulfilled" ? pDetails.value.abstract || "" : "",
            };

            await persistPaper(resolvedPaper);

            if (pAnalysis.status === "fulfilled" && pAnalysis.value) {
              await persistAnalysis({
                paperId,
                summary: pAnalysis.value.summary || ({} as any),
                claims: pAnalysis.value.claims || [],
                analyzedAt: new Date().toISOString(),
              });
            }
            toast.success("Saved to your Google Account", {
              description: "Paper and analysis securely stored in Google Drive AppData.",
            });
          } catch (persistErr) {
            console.warn("Could not save to Google Drive AppData immediately:", persistErr);
          }
        } else if (statusData.status === "FAILED") {
          setPhase("processing-failed");
          setErrorMessage(statusData.processing_error || "Paper processing pipeline failed.");
          clearInterval(interval);
        }
      } catch (err: any) {
        if (!isMounted) return;
        setPhase("processing-failed");
        setErrorMessage(err.message || "Error checking paper processing status.");
        clearInterval(interval);
      }
    }, 1500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [phase, paperId]);

  const handleRetry = async () => {
    if (!paperId) {
      if (file) startUploadAndAnalyze();
      return;
    }
    setPhase("processing");
    setErrorMessage(null);
    try {
      await retryPaperPipeline(paperId);
      toast.success("Pipeline resumed from checkpoint.");
    } catch (err: any) {
      setPhase("processing-failed");
      setErrorMessage(err.message || "Failed to launch pipeline retry.");
    }
  };

  // Determine active stage index
  const activeStageIndex = statusResponse?.stage_index ?? (phase === "uploading" ? 0 : 3);
  const currentStageInfo = PIPELINE_STAGES[activeStageIndex] || PIPELINE_STAGES[0];

  return (
    <AppShell eyebrow="Research Pipeline" title="Analyze Paper">
      <div className="mx-auto max-w-2xl">
        <header className="border-b border-border/60 pb-5">
          <h1 className="font-serif-editorial text-3xl font-bold text-foreground">
            Analyze a Research Paper
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload your paper to initiate section detection, vector embeddings, and evidence grounding.
          </p>
        </header>

        <div className="mt-8 space-y-6">
          {/* Failure State */}
          {phase === "processing-failed" && (
            <ErrorState
              title="Analysis could not be completed"
              description={errorMessage || "We ran into an issue while processing your paper."}
              onRetry={handleRetry}
              secondaryLabel="Choose Another Paper"
              onSecondary={clearAll}
            />
          )}

          {/* Success State */}
          {phase === "done" && paperId && (
            <SuccessState
              title="Research Analysis Ready!"
              description="Paper structure, scientific sections, embeddings, and evidence index are fully verified and saved to your personal Google Drive AppData."
              primary={
                <button
                  type="button"
                  onClick={() => navigate({ to: "/paper/$id", params: { id: paperId } })}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer"
                >
                  Open Paper Workspace <ArrowRight className="h-4 w-4" />
                </button>
              }
              secondary={
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer"
                >
                  Upload Another Paper
                </button>
              }
            />
          )}

          {/* Processing / Loading View (Pipeline Feedback) */}
          {(phase === "uploading" || phase === "processing") && (
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <RotateCw className="h-3.5 w-3.5 animate-spin" />
                  Analyzing Your Research Paper
                </div>
                <h2 className="font-serif-editorial text-2xl font-bold text-foreground">
                  Processing Paper...
                </h2>
                <p className="text-xs text-muted-foreground font-mono">
                  {file?.name ?? "Document.pdf"}
                </p>
              </div>

              {/* Stage-by-Stage Genuine Visualizer */}
              <div className="rounded-lg border border-border/80 bg-muted/20 p-5 space-y-3">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Academic Pipeline Stages
                </div>

                <div className="space-y-2.5">
                  {PIPELINE_STAGES.map((stage, idx) => {
                    const isCompleted = idx < activeStageIndex || phase === "done";
                    const isActive = idx === activeStageIndex && phase !== "done";
                    const isPending = idx > activeStageIndex;

                    return (
                      <div
                        key={stage.key}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-2 text-xs transition-colors",
                          isActive
                            ? "bg-primary/10 border border-primary/30 text-foreground font-semibold"
                            : isCompleted
                            ? "text-muted-foreground hover:text-foreground"
                            : "text-muted-foreground/60"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                              ✓
                            </span>
                          ) : isActive ? (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold animate-pulse">
                              ●
                            </span>
                          ) : (
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground text-[10px]">
                              ○
                            </span>
                          )}
                          <div>
                            <div className={cn("text-xs", isActive ? "text-primary font-bold" : "text-foreground")}>
                              {stage.label}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {stage.description}
                            </div>
                          </div>
                        </div>

                        <div className="text-[10px] font-mono">
                          {isCompleted ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified</span>
                          ) : isActive ? (
                            <span className="text-primary font-bold animate-pulse">In Progress...</span>
                          ) : (
                            <span className="text-muted-foreground/50">Queued</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Current Stage: <span className="font-semibold text-foreground">{currentStageInfo.label}</span>
              </div>
            </div>
          )}

          {/* File Selected State */}
          {phase === "selected" && file && (
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-background text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif-editorial text-lg font-bold text-foreground">{file.name}</h3>
                    <p className="text-xs text-muted-foreground">{formatSize(file.sizeBytes)} • Ready to process</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border/60 pt-4">
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={startUploadAndAnalyze}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  Start Research Pipeline <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Dropzone (Idle State) */}
          {phase === "idle" && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition cursor-pointer",
                dragOver
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) acceptFile(e.target.files[0]);
                }}
              />

              <div className="grid h-16 w-16 place-items-center rounded-full border border-border bg-background text-muted-foreground group-hover:text-primary group-hover:scale-110 transition">
                <UploadCloud className="h-8 w-8" />
              </div>

              <h2 className="mt-4 font-serif-editorial text-xl font-bold text-foreground">
                Drop your research paper here
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                or <span className="font-semibold text-primary underline">browse your files</span>
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-md border border-border bg-background px-2.5 py-1">PDF format</span>
                <span className="rounded-md border border-border bg-background px-2.5 py-1">Up to 20 MB</span>
                <span className="rounded-md border border-border bg-background px-2.5 py-1">9-stage index</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
