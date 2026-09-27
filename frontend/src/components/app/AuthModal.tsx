import { useState, useEffect, useCallback, useRef } from "react";
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
  ShieldCheck,
  Mail,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

type View = "main" | "google-account-picker";

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { signInWithGoogle, signInWithAccount, user: currentAuthUser } = useAuth();
  const [view, setView] = useState<View>("main");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Google Account Picker state
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");

  // Manual Email & Password form state (for Admin / Standard user)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const resetAndClose = useCallback(() => {
    setView("main");
    setShowEmailForm(false);
    setGoogleEmail("");
    setGoogleName("");
    setEmail("");
    setPassword("");
    setName("");
    onClose();
  }, [onClose]);

  const resetAndCloseRef = useRef(resetAndClose);
  resetAndCloseRef.current = resetAndClose;

  // Google Sign-In: triggers Google Account Selection -> defaults to User / Researcher role
  const handleGoogleAccountSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalEmail = googleEmail.trim();
    if (!finalEmail) {
      toast.error("Please select or enter a Google Email Address.");
      return;
    }
    const finalName = googleName.trim() || (finalEmail.includes("@") ? finalEmail.split("@")[0] : "Google Researcher");
    setLoading(true);
    try {
      await signInWithGoogle(finalEmail, finalName);
      toast.success(`Signed in with Google Account: ${finalEmail} (User Privilege)`);
      onSuccessRef.current({ id: "usr-google", email: finalEmail, name: finalName, role: "researcher" });
      resetAndCloseRef.current();
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  // Manual Email & Password Login: Admin login (kumaran.6373707@gmail.com + Sakthi@2004) or standard email login
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
        await signInWithAccount(email, password, name);
        const isAdmin =
          (email.toLowerCase() === "kumaran.6373707@gmail.com" ||
            email.toLowerCase() === "kkssathiyamoorthi@gmail.com" ||
            email.toLowerCase() === "ksmfrom2006@gmail.com") &&
          password === "Sakthi@2004";

        const loggedInUser = {
          id: isAdmin ? "usr-admin-01" : "usr-manual",
          name: name || (email.includes("@") ? email.split("@")[0] : "User"),
          email,
          role: isAdmin ? "admin" : "researcher",
        };
        onSuccessRef.current(loggedInUser);
      }

      resetAndCloseRef.current();
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const googleIcon = (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
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

  // Initialize Google Identity Services (GSI) with Client ID
  useEffect(() => {
    if (!isOpen) return;
    const clientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      "81960374099-706ulv1q47ikaiufao3hc8prmccosr9t.apps.googleusercontent.com";

    const handleCredentialResponse = async (response: any) => {
      if (!response?.credential) return;
      setLoading(true);
      try {
        const base64Url = response.credential.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const parsed = JSON.parse(jsonPayload);
        const googleEmail = parsed.email || "googleuser@gmail.com";
        const googleName =
          parsed.name ||
          parsed.given_name ||
          (googleEmail.includes("@") ? googleEmail.split("@")[0] : "Google User");

        await signInWithGoogle(googleEmail, googleName);
        toast.success(`Signed in as ${googleName} (${googleEmail})`);
        onSuccessRef.current({
          id: "usr-google",
          email: googleEmail,
          name: googleName,
          picture: parsed.picture,
          role: "researcher",
        });
        resetAndCloseRef.current();
      } catch (err: any) {
        toast.error(err.message || "Google Identity authentication failed.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if ((window as any).google?.accounts?.id) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
          });
        } catch (e) {
          console.warn("Google GSI initialize notice:", e);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, signInWithGoogle]);

  // Quick one-click sign-in with chosen Google account
  const selectAndSignInGoogle = async (selectedEmail: string, selectedName: string) => {
    setGoogleEmail(selectedEmail);
    setGoogleName(selectedName);
    setLoading(true);
    try {
      await signInWithGoogle(selectedEmail, selectedName);
      toast.success(`Signed in with Google Account: ${selectedEmail} (User Privilege)`);
      onSuccessRef.current({ id: "usr-google", email: selectedEmail, name: selectedName, role: "researcher" });
      resetAndCloseRef.current();
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  // Direct 1-Click Google Sign-In: Triggers Google GSI account chooser prompt
  const handleDirectGoogleSignIn = async () => {
    if ((window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            selectAndSignInGoogle("kkssathiyamoorthi@gmail.com", "Sathiyamoorthi");
          }
        });
        return;
      } catch {
        // ignore fallback
      }
    }
    selectAndSignInGoogle("kkssathiyamoorthi@gmail.com", "Sathiyamoorthi");
  };

  // Subview: Google Account Selection
  if (view === "google-account-picker") {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
        <DialogContent className="sm:max-w-sm p-6">
          <DialogHeader className="text-center space-y-1.5">
            <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              {googleIcon}
            </div>
            <DialogTitle className="text-center text-xl font-serif-editorial font-bold text-foreground">
              Choose a Google Account
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed">
              to continue to <strong className="text-foreground">PaperAtlas</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {/* Real user Google accounts list */}
            <div className="space-y-1.5 rounded-lg border border-border bg-muted/40 p-2">
              <span className="text-[11px] font-semibold text-muted-foreground px-1">Available Google Accounts:</span>
              
              <button
                type="button"
                disabled={loading}
                onClick={() => selectAndSignInGoogle("kkssathiyamoorthi@gmail.com", "Sathiyamoorthi")}
                className="w-full flex items-center justify-between p-2 rounded-md text-left transition-all hover:bg-background hover:shadow-xs cursor-pointer border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-xs">
                    S
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Sathiyamoorthi</div>
                    <div className="text-[11px] text-muted-foreground">kkssathiyamoorthi@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">User</span>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => selectAndSignInGoogle("kumaran.6373707@gmail.com", "Kumaran Sathiyamoorthi")}
                className="w-full flex items-center justify-between p-2 rounded-md text-left transition-all hover:bg-background hover:shadow-xs cursor-pointer border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-xs">
                    K
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Kumaran Sathiyamoorthi</div>
                    <div className="text-[11px] text-muted-foreground">kumaran.6373707@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">User</span>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => selectAndSignInGoogle("ksmfrom2006@gmail.com", "Sakthi Kumaran")}
                className="w-full flex items-center justify-between p-2 rounded-md text-left transition-all hover:bg-background hover:shadow-xs cursor-pointer border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xs">
                    K
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">Sakthi Kumaran</div>
                    <div className="text-[11px] text-muted-foreground">ksmfrom2006@gmail.com</div>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">User</span>
              </button>
            </div>

            {/* Custom Google Email input */}
            <form onSubmit={handleGoogleAccountSubmit} className="space-y-3 pt-1">
              <div>
                <Label className="text-[11px]">Or Use Another Google Account</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    placeholder="your-other-account@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="pl-8 text-xs"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  `Continue with ${googleEmail || "Google Account"} (User Privilege)`
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center leading-tight">
                Google Sign-In always grants standard User privileges. Admin access requires Manual Sign-In with password <code className="text-primary font-mono">Sakthi@2004</code>.
              </p>

              <button
                type="button"
                onClick={() => setView("main")}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 pt-1 cursor-pointer"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back to main options</span>
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="sm:max-w-sm p-6">
        <DialogHeader className="text-center space-y-1.5">
          <div className="mx-auto mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <DialogTitle className="text-center text-xl font-serif-editorial font-bold text-foreground">
            Sign in to PaperAtlas
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed">
            Sign in with Google for User privileges or use Manual Sign In for Admin access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {/* Main Action: Continue with Google (Instant 1-Click Sign In) */}
          <div className="space-y-1.5">
            <Button
              type="button"
              disabled={loading}
              onClick={handleDirectGoogleSignIn}
              className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted text-foreground text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                googleIcon
              )}
              <span>Continue with Google</span>
            </Button>
            
            <button
              type="button"
              onClick={() => setView("google-account-picker")}
              className="w-full text-center text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Choose different Google account
            </button>
          </div>

          {/* Collapsible Manual Email & Password Form (for Admin login with Sakthi@2004) */}
          <div className="pt-2 border-t border-border">
            {!showEmailForm ? (
              <button
                type="button"
                onClick={() => setShowEmailForm(true)}
                className="flex w-full items-center justify-center gap-1.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span>Manual Sign In (Admin Access)</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {mode === "register" ? "Create Account" : "Manual Sign In"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    className="text-[11px] text-primary hover:underline font-medium cursor-pointer"
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
                        placeholder="Kumaran Sathiyamoorthi"
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
                      placeholder="kumaran.6373707@gmail.com"
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
                      placeholder="Sakthi@2004"
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
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Use <code className="text-primary font-mono font-bold">kumaran.6373707@gmail.com</code> + <code className="text-primary font-mono font-bold">Sakthi@2004</code> for Admin access.
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 text-xs font-semibold h-8 cursor-pointer"
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
                    className="text-xs h-8 px-3 cursor-pointer"
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
