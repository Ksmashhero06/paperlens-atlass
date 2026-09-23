import { Link } from "@tanstack/react-router";
import { FileQuestion, ArrowLeft } from "lucide-react";

export function NotFoundView() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4">
        <FileQuestion className="h-8 w-8 text-primary" />
      </div>
      <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The research paper or workspace page you were looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <Link
          to="/papers"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          View Library
        </Link>
      </div>
    </div>
  );
}

export default NotFoundView;
