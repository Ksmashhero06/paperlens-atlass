import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase, syncSupabaseSessionWithBackend } from "@/lib/supabase";
import { ShieldCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function handleAuthCallback() {
      try {
        // 1. Check if Supabase detected session from URL
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (session) {
          // Sync with backend
          await syncSupabaseSessionWithBackend(session);
        } else {
          // Check URL hash manually for implicit flow tokens
          if (typeof window !== "undefined" && window.location.hash) {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get("access_token");
            if (accessToken) {
              const { data: userData } = await supabase.auth.getUser(accessToken);
              if (userData?.user) {
                await syncSupabaseSessionWithBackend({
                  access_token: accessToken,
                  user: userData.user,
                } as any);
              }
            }
          }
        }

        setStatus("success");

        // If running inside a popup window, inform opener and close
        if (window.opener && window.opener !== window) {
          window.opener.postMessage(
            {
              type: "SUPABASE_AUTH_SUCCESS",
              status: "success",
            },
            "*"
          );
          setTimeout(() => {
            window.close();
          }, 600);
          return;
        }

        // If running in top-level window, redirect to dashboard
        toast.success("Successfully authenticated with Google via Supabase Auth!");
        setTimeout(() => {
          navigate({ to: "/dashboard" });
        }, 800);
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setStatus("error");
        setErrorMessage(err.message || "Failed to finalize authentication session.");
      }
    }

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="mx-auto w-full max-w-sm rounded-xl border border-border bg-card p-6 text-center shadow-lg">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
            <div>
              <h2 className="font-serif-editorial text-xl font-bold text-foreground">
                Authenticating Session
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Verifying Google identity and syncing research workspace...
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-serif-editorial text-xl font-bold text-foreground">
                Identity Verified
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Google OAuth completed. Loading your research workspace...
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-serif-editorial text-xl font-bold text-foreground">
                Authentication Error
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {errorMessage || "Unable to complete Google OAuth session."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard" })}
              className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
