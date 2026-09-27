import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  UploadCloud,
  Library,
  ArrowRight,
  FileText,
  Users,
  Calendar,
  Tag,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  HelpCircle,
  Search,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  HardDrive,
  CloudCheck,
  RefreshCw,
  LogIn,
} from "lucide-react";
import { Sidebar } from "@/components/app/Sidebar";
import { SearchInput } from "@/components/app/SearchInput";
import { StatusBadge } from "@/components/app/StatusBadge";
import { DriveSyncIndicator } from "@/components/app/DriveSyncIndicator";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { uploadPaper } from "@/lib/api";
import {
  loadAllPapersWithSync,
  deletePaperCompletely,
  type AppDataPaper,
} from "@/lib/paper-store";
import { AdminWorkspace } from "@/components/app/AdminWorkspace";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "User Workspace · PaperAtlas" },
      {
        name: "description",
        content:
          "Your personalized PaperAtlas research workspace: upload papers, review recent work, and interact with AI evidence backed by your Google Drive AppData.",
      },
      { property: "og:title", content: "User Workspace · PaperAtlas" },
      {
        property: "og:description",
        content: "Your personalized PaperAtlas research workspace.",
      },
    ],
  }),
  component: DashboardPage,
});

function formatDate(iso: string) {
  if (!iso) return "Recently analyzed";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function DashboardPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [papers, setPapers] = useState<AppDataPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    user: authUser,
    isAdmin: isAuthAdmin,
    isAuthenticated,
    signInWithGoogle,
    driveSyncStatus,
    reconnectDrive,
  } = useAuth();
  const [viewMode, setViewMode] = useState<"user" | "admin">("user");

  // Fast drag & drop upload state
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPapers = async () => {
    setLoading(true);
    try {
      const res = await loadAllPapersWithSync();
      setPapers(res.papers);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPapers();
  }, [authUser, driveSyncStatus]);

  const isAdmin =
    isAuthAdmin ||
    authUser?.role === "admin" ||
    authUser?.email?.toLowerCase().includes("ksmfrom2006") ||
    authUser?.email?.toLowerCase().includes("sakthikumaran");

  const displayName = authUser?.name || "Researcher";
  const userEmail = authUser?.email || "Signed in with Google";

  const handleDeletePaper = async (paperId: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}" from your workspace?`)) return;
    try {
      await deletePaperCompletely(paperId);
      toast.success("Paper removed from your workspace and Google Drive.");
      setPapers((prev) => prev.filter((p) => p.id !== paperId));
    } catch {
      toast.error("Failed to delete paper.");
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Please upload a PDF document.");
      return;
    }

    try {
      await uploadPaper(file);
      toast.success("Paper accepted! Launching 9-stage pipeline...");
      navigate({ to: "/upload" });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload paper.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar Desktop */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-60 md:block">
        <Sidebar />
      </div>

      {/* Sidebar Mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/40 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-64 transition-transform",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <div className="md:pl-60">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open navigation"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border text-foreground md:hidden"
              >
                <BookOpen className="h-4 w-4" />
              </button>
              <div>
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  PaperAtlas Research Platform
                </span>
                <h1 className="font-serif-editorial text-xl font-bold leading-tight text-foreground md:text-2xl">
                  {viewMode === "admin" ? "Platform Administration" : `Welcome back, ${displayName}`}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Drive Sync Indicator */}
              <DriveSyncIndicator />

              {/* Role-Based View Switcher for Admins */}
              {isAdmin && (
                <div className="flex items-center rounded-lg border border-border bg-muted/50 p-1 text-xs">
                  <button
                    onClick={() => setViewMode("user")}
                    className={cn(
                      "rounded-md px-3 py-1 font-medium transition-colors",
                      viewMode === "user"
                        ? "bg-background text-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    User View
                  </button>
                  <button
                    onClick={() => setViewMode("admin")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1 font-medium transition-colors",
                      viewMode === "admin"
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin View
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                {authUser?.profile_image ? (
                  <img
                    src={authUser.profile_image}
                    alt={displayName}
                    className="h-8 w-8 rounded-full border border-border object-cover"
                  />
                ) : (
                  <div
                    title={`Logged in as ${userEmail}`}
                    className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-xs"
                  >
                    {displayName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 pb-16 md:px-8">
          {/* IF ADMIN VIEW IS SELECTED */}
          {viewMode === "admin" && isAdmin ? (
            <AdminWorkspace onSwitchToUserView={() => setViewMode("user")} />
          ) : (
            /* USER WORKSPACE VIEW */
            <div className="space-y-10">
              {/* Top Google Account & Storage Status Banner */}
              <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 p-6 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    {authUser?.profile_image ? (
                      <img
                        src={authUser.profile_image}
                        alt={displayName}
                        className="h-12 w-12 rounded-full border-2 border-primary/20 object-cover shrink-0"
                      />
                    ) : (
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-lg border border-primary/20">
                        {displayName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-lg font-serif-editorial font-bold text-foreground">
                          {displayName}
                        </h2>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-primary">
                          {isAdmin ? "ADMIN" : "RESEARCHER"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{userEmail}</p>
                      <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                        <HardDrive className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>
                          Storage: <strong>Your PaperAtlas data is stored in your Google Account.</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6 text-center">
                    <div className="rounded-lg bg-surface/60 p-2.5 border border-border/40">
                      <div className="text-xl font-bold font-mono text-foreground">{papers.length}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Papers</div>
                    </div>
                    <div className="rounded-lg bg-surface/60 p-2.5 border border-border/40">
                      <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        {papers.filter((p) => p.processingStatus === "completed").length}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Ready</div>
                    </div>
                    <div className="rounded-lg bg-surface/60 p-2.5 border border-border/40">
                      <div className="text-xl font-bold font-mono text-primary">
                        {papers.reduce((acc, p) => acc + (p.keyContributions?.length || 2), 0)}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Claims</div>
                    </div>
                  </div>
                </div>

                {!isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between flex-wrap gap-3">
                    <span className="text-xs text-muted-foreground">
                      Connect your Google Account to persist your research papers in your private Google Drive AppData folder.
                    </span>
                    <button
                      type="button"
                      onClick={() => signInWithGoogle()}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                    >
                      <LogIn className="h-3.5 w-3.5" />
                      <span>Connect Google Account</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Section 1: Upload Research Paper Dropzone */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif-editorial text-xl font-bold text-foreground">
                      Upload Research Paper
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Drop a PDF to parse scientific structure, generate embeddings, and persist to Google Drive AppData.
                    </p>
                  </div>
                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    Advanced Pipeline View
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFileUpload(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "group relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all",
                    dragActive
                      ? "border-primary bg-primary/5 scale-[1.01]"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">
                    Drop PDF here or <span className="text-primary underline">Browse Files</span>
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Supports academic papers up to 20 MB • Automated 9-stage extraction & chunking
                  </p>
                </div>
              </section>

              {/* Section 2: My Papers */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Library className="h-4 w-4 text-primary" />
                    <h2 className="font-serif-editorial text-xl font-bold text-foreground">
                      My Papers
                    </h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {papers.length}
                    </span>
                  </div>
                  <Link
                    to="/papers"
                    className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-48 rounded-xl border border-border bg-card animate-pulse" />
                    ))}
                  </div>
                ) : papers.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground text-sm">
                    No research papers uploaded yet. Drag & drop a PDF above to begin.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {papers.map((p) => {
                      const isReady = p.processingStatus === "completed";
                      const isProcessing = p.processingStatus === "processing";
                      return (
                        <div
                          key={p.id}
                          className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition hover:border-primary/40 hover:shadow-md"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-start justify-between gap-2">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                                  isReady
                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    : isProcessing
                                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse"
                                    : "bg-destructive/10 text-destructive"
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    isReady
                                      ? "bg-emerald-500"
                                      : isProcessing
                                      ? "bg-amber-500"
                                      : "bg-destructive"
                                  )}
                                />
                                {p.processingStatus}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {p.pageCount || 12} pages
                              </span>
                            </div>

                            <h3 className="font-serif-editorial text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                              {p.title}
                            </h3>

                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {p.authors?.join(", ") || "Scientific Authors"} • {p.publicationYear || 2026}
                            </p>
                          </div>

                          <div className="mt-4 border-t border-border/60 pt-3">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>Grounded Q&A Ready</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Link
                                  to="/paper/$id"
                                  params={{ id: p.id }}
                                  className="inline-flex items-center gap-1 rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                                >
                                  Open Analysis
                                  <ChevronRight className="h-3 w-3" />
                                </Link>
                                <button
                                  onClick={() => handleDeletePaper(p.id, p.title)}
                                  title="Delete paper"
                                  className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Section 3: Analysis History & Evidence Highlights */}
              <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Analysis History Box */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h3 className="font-serif-editorial text-base font-bold text-foreground">
                        My Analysis History
                      </h3>
                    </div>
                    <Link to="/activity" className="text-xs font-medium text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Revisit previously processed papers with preserved Q&A evidence and claims in Google Drive AppData.
                  </p>

                  <div className="space-y-3">
                    {papers.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 p-3 text-xs"
                      >
                        <div className="space-y-0.5 max-w-[70%]">
                          <div className="font-semibold text-foreground truncate">{p.title}</div>
                          <div className="text-[11px] text-muted-foreground">
                            Analyzed: {p.processedAt ? p.processedAt.split("T")[0] : "Recently"} • Status: {p.processingStatus}
                          </div>
                        </div>
                        <Link
                          to="/paper/$id"
                          params={{ id: p.id }}
                          className="shrink-0 rounded border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                        >
                          Open
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence & Grounding Features Card */}
                <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-serif-editorial text-base font-bold text-foreground">
                      User-Owned Research Workspace
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All papers, embeddings, claims, and interactive chat interactions are backed up
                    directly into your Google Account’s application data.
                  </p>

                  <div className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Automated AppData Sync:</strong> Changes save to{" "}
                        <code>paperatlas_papers.json</code> and <code>paperatlas_analyses.json</code>.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Q&A Evidence Tracking:</strong> Every answer is paired with page & section citations.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>No Third-Party DB Required:</strong> Your personal research documents remain yours.
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
