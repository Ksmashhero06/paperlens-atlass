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
  const { user: currentUser } = useAuth();

  const isActive = (to: string) =>
    to === "/dashboard" ? pathname === "/dashboard" || pathname === "/" : pathname.startsWith(to);

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "RA";

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
    </>
  );
}
