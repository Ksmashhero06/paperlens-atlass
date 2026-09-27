import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid,
  Library,
  UploadCloud,
  Clock,
  Settings,
  LifeBuoy,
  ShieldCheck,
  HardDrive,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { AdminModal } from "./AdminModal";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/lib/auth-context";

interface Item {
  label: string;
  to: string;
  icon: LucideIcon;
}

const primary: Item[] = [
  { label: "Overview", to: "/dashboard", icon: LayoutGrid },
  { label: "My Papers", to: "/papers", icon: Library },
  { label: "Upload Paper", to: "/upload", icon: UploadCloud },
  { label: "Analysis History", to: "/activity", icon: Clock },
];

const secondary: Item[] = [
  { label: "Settings & Vault", to: "/settings", icon: Settings },
  { label: "Help & Docs", to: "/help", icon: LifeBuoy },
];

function NavRow({ item, active }: { item: Item; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        active
          ? "bg-accent text-primary"
          : "text-foreground/80 hover:bg-muted hover:text-foreground",
      )}
    >
      {active && (
        <span aria-hidden className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-sm bg-primary" />
      )}
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
        )}
        aria-hidden
      />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [adminOpen, setAdminOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user: currentUser, updateProfile } = useAuth();

  const isActive = (to: string) =>
    to === "/dashboard" ? pathname === "/dashboard" || pathname === "/" : pathname.startsWith(to);

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "RA";

  const googleIcon = (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
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
    <>
      <aside
        className="flex h-full w-full flex-col border-r border-border bg-surface"
        onClick={onNavigate}
      >
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-2 px-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Workspace
          </div>
          <nav className="space-y-0.5">
            {primary.map((item) => (
              <NavRow key={item.to} item={item} active={isActive(item.to)} />
            ))}
          </nav>
        </div>

        <div className="border-t border-border px-3 py-4 space-y-2">
          {/* Sign in with Google Sidebar Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAuthOpen(true);
            }}
            className="flex w-full items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:border-primary/40 transition-colors cursor-pointer"
          >
            {googleIcon}
            <span>Sign in with Google</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setAdminOpen(true);
            }}
            className="flex w-full items-center gap-2.5 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Workspace Metrics</span>
          </button>

          <nav className="space-y-0.5">
            {secondary.map((item) => (
              <NavRow key={item.to} item={item} active={isActive(item.to)} />
            ))}
          </nav>

          <Link
            to="/settings"
            className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2 text-left hover:border-primary/40 transition-colors"
          >
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
              {initials}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1.5 truncate">
                <span className="truncate text-xs font-semibold text-foreground">
                  {currentUser.name}
                </span>
              </div>
              <div className="flex items-center gap-1 truncate text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <HardDrive className="h-2.5 w-2.5" />
                <span>Local Storage Vault</span>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={(u) => {
          if (u) {
            updateProfile({
              name: u.name || u.email?.split("@")[0] || "Researcher",
              email: u.email,
              role: u.role || "user",
            });
          }
        }}
      />
    </>
  );
}
