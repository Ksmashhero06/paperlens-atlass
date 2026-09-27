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
import { syncSupabaseSessionWithBackend } from "@/lib/supabase";
import {
  ShieldCheck,
  Mail,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api/v1";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { signInWithGoogle, user: currentAuthUser } = useAuth();
  const [mode, setMode] = useState<"register" | "login">("login");
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Email form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const resetAndClose = useCallback(() => {
    setShowEmailForm(false);
    setEmail("");
    setPassword("");
    setName("");
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
    } catch {
      // Error handled in auth-context with toast
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
            Authenticate with your Google Account to access your private research workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {/* Main Action: Continue with Google */}
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

          {/* Collapsible Email Auth Option */}
          <div className="pt-2 border-t border-border">
            {!showEmailForm ? (
              <button
                type="button"
                onClick={() => setShowEmailForm(true)}
                className="flex w-full items-center justify-center gap-1.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span>Or continue with Email & Password</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {mode === "register" ? "Create Account" : "Sign In with Email"}
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
