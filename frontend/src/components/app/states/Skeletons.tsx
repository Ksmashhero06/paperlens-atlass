export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1 px-2 rounded-md bg-muted/60 text-muted-foreground w-fit">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
    </div>
  );
}

export default TypingIndicator;
