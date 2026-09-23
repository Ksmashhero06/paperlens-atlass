import { AlertCircle, ArrowLeft, CheckCircle2, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps {
  title: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function ErrorState({
  title,
  description,
  retryLabel = "Try Again",
  onRetry,
  secondaryLabel,
  onSecondary,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center sm:p-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="mt-6 flex items-center gap-3">
        {onRetry && (
          <Button onClick={onRetry} size="sm" variant="default" className="gap-1.5">
            <RotateCw className="h-3.5 w-3.5" />
            {retryLabel}
          </Button>
        )}
        {secondaryLabel && onSecondary && (
          <Button onClick={onSecondary} size="sm" variant="outline" className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export interface SuccessStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SuccessState({
  title,
  description,
  actionLabel,
  onAction,
}: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center sm:p-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} size="sm" variant="default">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
