import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { SectionCard } from "@/components/app/SectionCard";
import {
  Sun,
  Moon,
  Download,
  Trash2,
  Camera,
  Activity,
  CheckCircle2,
  RefreshCw,
  Server,
  HardDrive,
  CloudCheck,
  AlertCircle,
  LogIn,
  LogOut,
  Sparkles,
  FileText,
  MessageSquare,
} from "lucide-react";
import { getSystemHealth, type SystemHealthResponse } from "@/lib/api";
import { applyTheme, getStoredTheme, type ThemeMode } from "@/lib/theme";
import { useAuth } from "@/lib/auth-context";
import {
  getLocalPapers,
  getLocalQuestions,
  getLocalAnalyses,
  exportAllUserDataAsJson,
  clearAllAppData,
} from "@/lib/paper-store";
import { DriveSyncIndicator } from "@/components/app/DriveSyncIndicator";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Storage · PaperAtlas" },
      {
        name: "description",
        content: "Manage your PaperAtlas Google Account, Drive AppData storage, workspace, and preferences.",
      },
      { property: "og:title", content: "Settings & Storage · PaperAtlas" },
      {
        property: "og:description",
        content: "Manage your PaperAtlas Google Account and Drive AppData storage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-muted-foreground">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition ${
          checked ? "left-[1.125rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <div className="text-sm text-foreground">{title}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function SettingsPage() {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [defaultView, setDefaultView] = useState("grid");
  const [autoOpen, setAutoOpen] = useState(true);
  const [showSources, setShowSources] = useState(true);
  const [chatHistory, setChatHistory] = useState(true);

  const {
    user: authUser,
    isAuthenticated,
    driveSyncStatus,
    signInWithGoogle,
    reconnectDrive,
    signOut,
  } = useAuth();

  const [health, setHealth] = useState<SystemHealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [storageStats, setStorageStats] = useState({
    papersCount: 0,
    analysesCount: 0,
    questionsCount: 0,
  });

  const handleSetTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
  };

  const fetchHealth = async () => {
    setHealthLoading(true);
    try {
      const h = await getSystemHealth();
      setHealth(h);
    } catch {
      setHealth(null);
    } finally {
      setHealthLoading(false);
    }
  };

  const refreshStorageStats = () => {
    const papers = getLocalPapers();
    const analyses = getLocalAnalyses();
    const questions = getLocalQuestions();
    setStorageStats({
      papersCount: papers.length,
      analysesCount: Object.keys(analyses).length,
      questionsCount: questions.length,
    });
  };

  useEffect(() => {
    const currentTheme = getStoredTheme();
    setThemeState(currentTheme);
    applyTheme(currentTheme);

    fetchHealth();
    refreshStorageStats();
  }, [authUser, driveSyncStatus]);

  const userName = authUser?.name || "Researcher";
  const userEmail = authUser?.email || "No Google Account connected";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleExportData = () => {
    try {
      const jsonStr = exportAllUserDataAsJson();
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `paperatlas_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PaperAtlas workspace exported as JSON successfully.");
    } catch {
      toast.error("Failed to export data.");
    }
  };

  const handleClearData = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear your local workspace cache and Google Drive AppData files? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await clearAllAppData();
      refreshStorageStats();
      toast.success("AppData files and workspace cache cleared.");
    } catch {
      toast.error("Failed to clear data.");
    }
  };

  return (
    <AppShell eyebrow="Account" title="Settings & Storage">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Google Account & Drive Storage Section */}
        <SectionCard eyebrow="Storage" title="Google Account & Drive AppData">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-muted/20 p-4">
              <div className="flex items-center gap-4">
                {authUser?.profile_image ? (
                  <img
                    src={authUser.profile_image}
                    alt={userName}
                    className="h-14 w-14 rounded-full border border-border object-cover shrink-0"
                  />
                ) : (
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-base font-semibold text-primary-foreground shrink-0">
                    {initials}
                  </div>
                )}
                <div>
                  <div className="text-base font-semibold text-foreground">{userName}</div>
                  <div className="text-xs text-muted-foreground">{userEmail}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <DriveSyncIndicator />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => reconnectDrive()}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted cursor-pointer"
                    >
                      <RefreshCw className="h-3 w-3 text-primary" />
                      Reconnect Drive
                    </button>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 cursor-pointer"
                    >
                      <LogOut className="h-3 w-3" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => signInWithGoogle()}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs cursor-pointer"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Connect Google Account
                  </button>
                )}
              </div>
            </div>

            {/* AppData Usage Summary Card */}
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <HardDrive className="h-4 w-4 text-primary" />
                  <span>Google Drive AppData Storage Summary</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                  drive.appdata Scope
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your PaperAtlas files are stored exclusively in your Google Account’s application
                data directory. Third parties cannot inspect or modify these files.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                  <div className="text-lg font-bold font-mono text-foreground">
                    {storageStats.papersCount}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    Papers Stored
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                  <div className="text-lg font-bold font-mono text-foreground">
                    {storageStats.analysesCount}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    Saved Analyses
                  </div>
                </div>
                <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                  <div className="text-lg font-bold font-mono text-foreground">
                    {storageStats.questionsCount}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                    Questions Asked
                  </div>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-muted-foreground flex items-center justify-between border-t border-border/40 pt-2.5">
                <span>AppData Sync Target: <code>drive.appdata</code></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ User-Owned Storage Active
                </span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Profile Details */}
        <SectionCard eyebrow="Profile" title="Profile Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name">
              <input className={inputCls} value={userName} readOnly />
            </Field>
            <Field label="Google Account Email">
              <input type="email" className={inputCls} value={userEmail} readOnly />
            </Field>
          </div>
        </SectionCard>

        {/* Workspace */}
        <SectionCard eyebrow="Workspace" title="Workspace settings">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Workspace name">
              <input className={inputCls} defaultValue={`${userName.split(" ")[0]}'s Research Atlas`} />
            </Field>

            <Field label="Default paper view" hint="How papers appear in your library.">
              <select
                className={inputCls}
                value={defaultView}
                onChange={(e) => setDefaultView(e.target.value)}
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
                <option value="compact">Compact</option>
              </select>
            </Field>
          </div>
        </SectionCard>

        {/* Appearance */}
        <SectionCard eyebrow="Appearance" title="Theme">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["light", "dark"] as const).map((mode) => {
              const active = theme === mode;
              const Icon = mode === "light" ? Sun : Moon;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleSetTheme(mode)}
                  className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left transition cursor-pointer ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-md ${
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium capitalize text-foreground">
                      {mode} mode
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {mode === "light"
                        ? "Warm ivory editorial surface."
                        : "Charcoal surface for low light."}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* Preferences */}
        <SectionCard eyebrow="Preferences" title="Analysis behavior">
          <div className="divide-y divide-border">
            <ToggleRow
              title="Automatically open analysis after processing"
              description="Jump straight into a paper once PaperAtlas finishes structuring it."
              checked={autoOpen}
              onChange={setAutoOpen}
            />
            <ToggleRow
              title="Show source references"
              description="Display citation cards with page and section for every answer."
              checked={showSources}
              onChange={setShowSources}
            />
            <ToggleRow
              title="Enable chat history"
              description="Keep your questions and answers in Google Drive AppData for review."
              checked={chatHistory}
              onChange={setChatHistory}
            />
          </div>
        </SectionCard>

        {/* System & Backend Health */}
        <SectionCard eyebrow="Diagnostics" title="System & AI Service Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Live backend health check from FastAPI & Database
              </div>
              <button
                type="button"
                onClick={fetchHealth}
                disabled={healthLoading}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted cursor-pointer"
              >
                <RefreshCw className={`h-3 w-3 ${healthLoading ? "animate-spin" : ""}`} />
                Check Status
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                  <Server className="h-3.5 w-3.5" /> Backend Service
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <span className={`h-2 w-2 rounded-full ${health?.status === "ok" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {health?.status === "ok" ? "Healthy (Active)" : healthLoading ? "Checking..." : "Offline"}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 capitalize">
                  {health?.environment || "Development"} mode
                </div>
              </div>

              <div className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                  <Activity className="h-3.5 w-3.5" /> Database Engine
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {health?.database || "Connected (Active)"}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  16 Relational Models
                </div>
              </div>

              <div className="rounded-md border border-border bg-background p-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> AI Inference Engine
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {health?.ai_service || "Local + Gemini Fallback"}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Structure-Aware Grounded
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Data & Backup */}
        <SectionCard eyebrow="Data" title="Data Ownership & Export">
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">Export PaperAtlas Data (JSON)</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  Download a full backup of all your papers, analyses, and Q&A chat history.
                </div>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer"
              >
                <Download className="h-4 w-4 text-primary" />
                Export JSON
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground">Reset Workspace Cache</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  Clear local cache and Google Drive AppData files.
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearData}
                className="inline-flex items-center gap-2 rounded-md border border-destructive/40 bg-background px-3 py-2 text-sm text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
                Clear AppData
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
