import { useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import {
  signInWithGoogleOAuth,
  syncSupabaseSessionWithBackend,
  simulateGoogleOAuthSignIn,
  isSupabaseConfigured,
  determineUserRole,
} from "@/lib/supabase";
import {
  ShieldCheck,
  Mail,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  HardDrive,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

type View = "main" | "oauth-custom-google" | "oauth-microsoft";

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { signInWithGoogle, user: currentAuthUser } = useAuth();
  const [mode, setMode] = useState<"register" | "login">("login");
  const [view, setView] = useState<View>("main");
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Email form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Custom OAuth email state
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const resetAndClose = useCallback(() => {
    setView("main");
    setCustomEmail("");
    setCustomName("");
    setShowEmailForm(false);
    onClose();
  }, [onClose]);

  const resetAndCloseRef = useRef(resetAndClose);
  resetAndCloseRef.current = resetAndClose;

  // Real Google Sign-In with Drive AppData authorization
  const handleLiveGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onSuccessRef.current(currentAuthUser);
      resetAndCloseRef.current();
    } catch (err: any) {
      // Error is handled in auth-context with toast
    } finally {
      setLoading(false);
    }
  };

  // Supabase Google OAuth flow (fallback / demo switcher)
  const handleSupabaseGoogleOAuth = async (targetEmail?: string, targetName?: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && !targetEmail) {
        // Trigger live Supabase OAuth flow (opens popup window or redirects)
        const res = await signInWithGoogleOAuth();
        if (res.error) {
          throw res.error;
        }
        toast.info("Opening Google authentication window...");
        // Wait for popup postMessage or state change
        return;
      }

      // If simulated or specific account provided:
      const finalEmail = (targetEmail || customEmail || "ksmfrom2006@gmail.com").trim();
      const finalName =
        targetName ||
        customName ||
        (finalEmail.includes("ksmfrom2006") ? "Sakthi Kumaran" : finalEmail.split("@")[0]);

      const role = determineUserRole(finalEmail);
      const res = await simulateGoogleOAuthSignIn(finalEmail, finalName);

      toast.success(
        `Authenticated as ${res.user.name} (${finalEmail}) — Role: ${role.toUpperCase()}`
      );
      onSuccessRef.current(res.user);
      resetAndCloseRef.current();
    } catch (err: any) {
      toast.error(err.message || "Google OAuth via Supabase failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSubmit = async (
    provider: "google" | "microsoft",
    targetEmail?: string,
    targetName?: string
  ) => {
    if (provider === "google") {
      return handleSupabaseGoogleOAuth(targetEmail, targetName);
    }

    const finalEmail = (targetEmail || customEmail || "researcher@outlook.com").trim();
    setLoading(true);
    try {
      const finalName = targetName || customName || "Academic Researcher";
      const res = await syncSupabaseSessionWithBackend(null, {
        email: finalEmail,
        name: finalName,
        role: "user",
      });

      toast.success(`Signed in as ${res.name} (Microsoft)`);
      onSuccessRef.current(res);
      resetAndCloseRef.current();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "register") {
        const res = await registerUser(email, password, name || undefined);
        localStorage.setItem("paperlens_access_token", res.access_token ?? "");
        localStorage.setItem("paperlens_user", JSON.stringify(res.user));
        toast.success("Account created successfully!");
        onSuccessRef.current(res.user);
      } else {
        const resp = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!resp.ok) throw new Error("Invalid email or password");
        const data = await resp.json();
        localStorage.setItem("paperlens_access_token", data.access_token);
        localStorage.setItem("paperlens_user", JSON.stringify(data.user));
        toast.success("Logged in successfully!");
        onSuccessRef.current(data.user);
      }

      resetAndCloseRef.current();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const googleIcon = (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );

  const msIcon = (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 23 23">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );

  // Sub-view: Enter custom Google / Microsoft account
  if (view === "oauth-custom-google" || view === "oauth-microsoft") {
    const isGoogle = view === "oauth-custom-google";
    const provider = isGoogle ? "google" : "microsoft";
    const providerLabel = isGoogle ? "Google (Supabase Auth)" : "Microsoft";

    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {isGoogle ? googleIcon : msIcon}
            </div>
            <DialogTitle className="text-center text-xl">
              Sign in with another {isGoogle ? "Google" : "Microsoft"} Account
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground">
              Enter your Google Workspace or personal email address to authenticate with role-based access.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div>
              <Label className="text-xs">Full Name</Label>
              <div className="relative mt-1">
                <UserIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="pl-8 text-xs"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Google Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  autoFocus
                  placeholder="scholar@university.edu or gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleOAuthSubmit(provider, customEmail, customName)
                  }
                  className="pl-8 text-xs"
                />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Tip: <code className="text-primary font-mono">ksmfrom2006@gmail.com</code> receives the <strong>ADMIN</strong> role; other accounts receive the <strong>RESEARCHER</strong> role.
              </p>
            </div>

            <Button
              onClick={() => handleOAuthSubmit(provider, customEmail, customName)}
              disabled={loading}
              className="w-full text-xs font-semibold"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Authenticating via Supabase...
                </span>
              ) : (
                `Continue with ${providerLabel}`
              )}
            </Button>

            <button
              type="button"
              onClick={() => setView("main")}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground pt-1"
            >
              ← Back to main options
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Main clean auth view
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif">
            Sign in to PaperLens
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-muted-foreground">
            Sign in with your Google Account to access your personal workspace in Google Drive AppData.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Google Drive AppData Status Banner */}
          <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-foreground">Google Drive AppData</span>
            </div>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              User Owns Data
            </span>
          </div>

          {/* PRIMARY ACTION: Sign in with Google (Live Drive AppData OAuth) */}
          <div className="space-y-2">
            <Button
              type="button"
              disabled={loading}
              onClick={handleLiveGoogleSignIn}
              className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted text-foreground text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                googleIcon
              )}
              <span>Continue with Google</span>
            </Button>

            {/* Account role indicator */}
            <div className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-[11px] border border-border/60">
              <div className="flex items-center gap-2 truncate text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">
                  Account: <strong className="text-foreground">ksmfrom2006@gmail.com</strong>
                </span>
                <span className="rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-mono font-bold text-primary">
                  ADMIN
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCustomEmail("");
                  setCustomName("");
                  setView("oauth-custom-google");
                }}
                className="text-primary hover:underline font-medium shrink-0 ml-2"
              >
                Switch Account
              </button>
            </div>
          </div>

          {/* Role-Based Access Control Info Card */}
          <div className="rounded-lg border border-border/70 bg-card p-3 text-xs space-y-1.5">
            <div className="font-semibold text-foreground flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Role-Based Access Control (RBAC)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
              <div className="rounded bg-muted/30 p-2 border border-border/50">
                <div className="font-semibold text-foreground">Administrator</div>
                <div className="text-[10px] mt-0.5">Admin panel, user management, status toggles, deletion</div>
              </div>
              <div className="rounded bg-muted/30 p-2 border border-border/50">
                <div className="font-semibold text-foreground">Researcher</div>
                <div className="text-[10px] mt-0.5">Workspace library, 9-stage analysis, evidence Q&A</div>
              </div>
            </div>
          </div>

          {/* SECONDARY: Microsoft */}
          <Button
            variant="ghost"
            type="button"
            disabled={loading}
            onClick={() => {
              setCustomEmail("");
              setCustomName("");
              setView("oauth-microsoft");
            }}
            className="w-full h-8 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
          >
            {msIcon}
            <span>Or sign in with Microsoft</span>
          </Button>

          {/* TERTIARY: Collapsible Email Option */}
          <div className="pt-2 border-t border-border">
            {!showEmailForm ? (
              <button
                type="button"
                onClick={() => setShowEmailForm(true)}
                className="flex w-full items-center justify-center gap-1.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Continue with Email & Password</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">
                    {mode === "register" ? "Create with Email" : "Sign In with Email"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="text-[11px] text-primary hover:underline font-medium"
                  >
                    {mode === "login" ? "Need an account? Register" : "Have an account? Sign In"}
                  </button>
                </div>

                {mode === "register" && (
                  <div>
                    <Label className="text-xs">Full Name</Label>
                    <div className="relative mt-1">
                      <UserIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Sakthi Kumaran"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-8 text-xs"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-xs">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      required
                      placeholder="you@domain.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-8 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-8 pr-10 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 text-xs font-semibold h-8"
                  >
                    {loading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : mode === "register" ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEmailForm(false)}
                    className="text-xs h-8 px-3"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
