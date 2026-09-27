import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sidebar } from "@/components/app/Sidebar";
import { AdminWorkspace } from "@/components/app/AdminWorkspace";
import { DriveSyncIndicator } from "@/components/app/DriveSyncIndicator";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { BookOpen, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administrative Control Panel · PaperAtlas" },
      {
        name: "description",
        content:
          "PaperAtlas Administrative Control Panel: user account management, platform metrics, and system telemetry.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user: authUser } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 hidden w-60 md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
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
                  Administrative Control Panel
                </span>
                <h1 className="font-serif-editorial text-xl font-bold leading-tight text-foreground md:text-2xl">
                  Platform Administration
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DriveSyncIndicator />
              <button
                onClick={() => navigate({ to: "/dashboard" })}
                className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-8 pb-16 md:px-8">
          <AdminWorkspace onSwitchToUserView={() => navigate({ to: "/dashboard" })} />
        </main>
      </div>
    </div>
  );
}
