import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionCardProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SectionCard({
  eyebrow,
  title,
  children,
  action,
  className,
}: SectionCardProps) {
  return (
    <section className={cn("rounded-xl border border-border bg-card p-5 shadow-xs md:p-6", className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          {eyebrow && (
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </div>
          )}
          <h3 className="font-serif text-lg font-bold text-foreground">
            {title}
          </h3>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </section>
  );
}

export default SectionCard;
