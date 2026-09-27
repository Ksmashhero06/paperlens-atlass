import { useState } from "react";
import { Menu, ShieldCheck, User as UserIcon, Settings, Sparkles, LogIn, LogOut } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/lib/auth-context";
import { DriveSyncIndicator } from "./DriveSyncIndicator";
import { AuthModal } from "./AuthModal";
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
  const { user, isAuthenticated, signOut, updateProfile } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "RA";

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

  return (
    <>
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

        {/* Local Vault / Google Drive Sync Indicator */}
        <DriveSyncIndicator />

        {/* PROMINENT SIGN IN WITH GOOGLE BUTTON */}
        {!isAuthenticated ? (
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-primary/40 shadow-xs transition-all cursor-pointer"
          >
            {googleIcon}
            <span>Sign in with Google</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted hover:border-primary/40 shadow-xs transition-all cursor-pointer"
          >
            {googleIcon}
            <span>Switch Google Account</span>
          </button>
        )}

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
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground">{user?.name || "Lead Researcher"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || "Signed out"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setAuthModalOpen(true)}
              className="cursor-pointer font-medium text-primary flex items-center gap-2"
            >
              {googleIcon}
              <span>Sign in with Google Account</span>
            </DropdownMenuItem>
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
            {isAuthenticated && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
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
