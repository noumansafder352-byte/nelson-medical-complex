import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label: string;
  className?: string;
}

/** Inline spinner with a visible label (the label is what screen readers announce). */
export function LoadingState({ label, className }: LoadingStateProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
      {label}
    </span>
  );
}
