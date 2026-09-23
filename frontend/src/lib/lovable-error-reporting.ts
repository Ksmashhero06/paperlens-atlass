export function reportLovableError(error: unknown, context?: Record<string, any>) {
  if (typeof window !== "undefined") {
    console.error("[PaperAtlas ErrorBoundary]", error, context);
  }
}
