import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/dashboard" className={`flex items-center gap-2.5 font-sans ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
        <BookOpen className="h-4.5 w-4.5" />
      </div>
      <div className="flex flex-col">
        <span className="font-serif text-lg font-bold leading-none tracking-tight text-foreground">
          PaperAtlas
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5">
          Research Vault
        </span>
      </div>
    </Link>
  );
}

export default Logo;
