import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/brand/Logo";
import {
  ShieldCheck,
  HardDrive,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  FileText,
  Layers,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In · PaperAtlas" },
      {
        name: "description",
        content:
          "Sign in to PaperAtlas with your Google Account to access your research papers stored in your personal Google Drive AppData.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isAuthenticated, loading: authLoading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in, redirect immediately to dashboard
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setErrorMsg(err.message || "Sign-in could not be completed.");
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-border/60 bg-surface/50 backdrop-blur-xs px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>User-Owned Google Drive AppData Storage</span>
        </div>
      </header>

      {/* Main Hero & Auth Card */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Value Proposition & Architecture */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Grounded Academic Intelligence</span>
            </div>

            <h1 className="font-serif-editorial text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Read research papers with clarity.
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed">
              PaperAtlas is an AI research assistant that extracts scientific methodology,
              verifies claims with page-level citations, and persists your personal workspace
              directly inside your own Google Drive AppData folder.
            </p>

            {/* Architecture Explainer */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3.5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <HardDrive className="h-4 w-4 text-primary" />
                <span>The Core Principle: User Owns Their Data</span>
              </div>
              <p className="text-xs text-muted-foreground leading-normal">
                Your research papers, extracted sections, and Q&A history are stored exclusively
                in your Google Account’s Application Data folder (<code>drive.appdata</code>).
                PaperAtlas never stores your papers in a public database.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Google Sign-In</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Private AppData</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Evidence Grounding</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sign-In Box */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-sm space-y-6">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-xl font-serif-editorial font-bold text-foreground">
                  Sign in to PaperAtlas
                </h2>
                <p className="text-xs text-muted-foreground">
                  Authenticate with your Google Account to authorize your private research workspace.
                </p>
              </div>

              {errorMsg && (
                <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                  <p className="font-semibold">Sign-in error:</p>
                  <p>{errorMsg}</p>
                </div>
              )}

              {/* Modern Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted/70 px-4 py-3 text-sm font-semibold text-foreground shadow-xs transition-all active:scale-[0.99] cursor-pointer disabled:opacity-60"
              >
                {signingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Connecting Google Drive…</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              <div className="space-y-3 pt-2 text-[11px] text-muted-foreground border-t border-border/60">
                <div className="flex items-start gap-2">
                  <Lock className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Least-Privilege Drive Scope:</strong> PaperAtlas requests only{" "}
                    <code>drive.appdata</code> access. It cannot view or edit your general Drive files.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Automatic Sync:</strong> All analyzed papers and question histories
                    sync seamlessly to your Google Drive AppData folder.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-4 px-6 text-center text-xs text-muted-foreground">
        <span>PaperAtlas · Google Drive AppData Persistence · AI Studio Build</span>
      </footer>
    </div>
  );
}
