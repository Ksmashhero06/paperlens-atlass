import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PdfReaderProps {
  paper: {
    title: string;
    authors: string[];
    year?: number;
    pages?: number;
    abstract?: string;
    keyContributions?: string[];
  };
  onClose: () => void;
}

export function PdfReader({ paper, onClose }: PdfReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = paper.pages || 12;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md">
      <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div className="truncate">
            <h2 className="text-sm font-semibold text-foreground truncate max-w-md">
              {paper.title}
            </h2>
            <p className="text-[11px] text-muted-foreground truncate">
              {paper.authors.join(", ")} {paper.year ? `(${paper.year})` : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="font-mono text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
            aria-label="Close reader"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-72 flex-col border-r border-border bg-card/50 p-4 overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Document Navigation
          </div>
          <nav className="space-y-1 text-xs">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 transition ${
                currentPage === 1
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              1. Title & Abstract
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(2)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 transition ${
                currentPage === 2
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              2. Introduction & Background
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(3)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 transition ${
                currentPage === 3
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              3. Proposed Methodology
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(4)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 transition ${
                currentPage === 4
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              4. Experimental Framework
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(5)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 transition ${
                currentPage === 5
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              5. Empirical Evaluation
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(6)}
              className={`w-full text-left rounded-md px-2.5 py-1.5 transition ${
                currentPage === 6
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              6. Discussion & Limitations
            </button>
          </nav>
        </aside>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-muted/20">
          <div className="w-full max-w-3xl rounded-xl border border-border bg-card p-6 md:p-10 shadow-lg space-y-6">
            <div className="border-b border-border/80 pb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <h1 className="mt-2 font-serif text-2xl font-bold text-foreground md:text-3xl leading-snug">
                {paper.title}
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                {paper.authors.join(", ")}
              </p>
            </div>
            {currentPage === 1 && (
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                    Abstract
                  </h3>
                  <p className="font-serif text-sm leading-relaxed text-foreground">
                    {paper.abstract ||
                      "Scientific paper abstract providing empirical and theoretical contributions."}
                  </p>
                </div>
              </div>
            )}
            {currentPage === 2 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Key Research Contributions
                </h3>
                <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground list-disc pl-5">
                  {(paper.keyContributions && paper.keyContributions.length > 0
                    ? paper.keyContributions
                    : [
                        "Formal mathematical definition of section embeddings with localized attention.",
                        "End-to-end citation provenance linking generation directly to indexed document pages.",
                      ]
                  ).map((c, i) => (
                    <li key={i} className="text-foreground">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {currentPage >= 3 && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Section {currentPage}: Empirical Analysis & Methodology
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In this section, the paper delineates the mathematical derivation and experimental protocol.
                  All claims are verified against the benchmark corpora with section-level reproducibility metrics.
                </p>
                <div className="rounded-md border border-border/60 bg-muted/40 p-4 text-xs font-mono text-muted-foreground">
                  Algorithm {currentPage - 2}: Multi-stage Attention Allocation
                  <br />
                  Input: Context vectors C, Query Q
                  <br />
                  Output: Grounded representation R with provenance indices
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfReader;
