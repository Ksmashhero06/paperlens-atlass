import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status?: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const norm = (status || "").toLowerCase();
  if (norm === "ready" || norm === "completed") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
          className
        )}
      >
        <CheckCircle2 className="h-3 w-3" />
        Ready
      </span>
    );
  }
  if (norm === "processing" || norm === "analyzing" || norm === "uploading") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20 animate-pulse",
          className
        )}
      >
        <Clock className="h-3 w-3 animate-spin" />
        Processing
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive border border-destructive/20",
        className
      )}
    >
      <AlertTriangle className="h-3 w-3" />
      Failed
    </span>
  );
}

export default StatusBadge;
