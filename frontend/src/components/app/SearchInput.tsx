import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value = "",
  onChange,
  placeholder = "Search papers, sections, authors…",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-input bg-background/50 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
      />
      {value && onChange && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
