import { ShieldCheck, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  compact?: boolean;
}

export function DriveSyncIndicator({ className, compact = false }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400",
        className
      )}
      title="All papers, analyses, and Q&A are stored securely in your local browser vault. No cloud dependencies or billing."
    >
      <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span>{compact ? "Local Vault" : "Local Vault (Private & Offline)"}</span>
    </div>
  );
}
