import { Menu, ShieldCheck, User as UserIcon, Settings, Sparkles } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth-context";
import { DriveSyncIndicator } from "./DriveSyncIndicator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";

interface Props {
  title: string;
  eyebrow?: string;
  onToggleSidebar?: () => void;
}

export function TopBar({ title, eyebrow, onToggleSidebar }: Props) {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "RA";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-8">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Open navigation"
        className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground md:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">
        {eyebrow && (
          <div className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </div>
        )}
        <h1 className="truncate font-serif-editorial text-xl text-foreground md:text-2xl">
          {title}
        </h1>
      </div>

      <div className="hidden w-64 lg:block">
        <SearchInput placeholder="Search papers, authors, notes…" />
      </div>

      {/* Local Vault Indicator */}
      <DriveSyncIndicator />

      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt={user.name}
                className="h-8 w-8 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {initials}
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-foreground">{user?.name || "Lead Researcher"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.institution || "Local Research Vault"}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-1.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              Local Private Storage
            </span>
            <p className="mt-0.5 text-[10px]">Zero cloud costs &bull; 100% On-Device</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Workspace & Storage Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/activity" className="cursor-pointer">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Analysis History</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
