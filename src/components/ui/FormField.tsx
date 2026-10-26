import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const controlClasses = (invalid: boolean) =>
  cn(
    "block w-full rounded-sm border bg-white px-4 py-3 text-base text-ink placeholder:text-subtle/70 transition-colors",
    "focus:border-brand-navy focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-brand-navy/40",
    invalid ? "border-brand-red" : "border-line hover:border-brand-navy/40",
  );

export interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export const hintId = (id: string) => `${id}-hint`;
export const errorId = (id: string) => `${id}-error`;

/** Builds aria-describedby for a control from its hint and error. */
export function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? hintId(id) : null, error ? errorId(id) : null].filter(Boolean).join(" ") || undefined;
}

/** Label, hint and error wrapper shared by Input, Textarea and Select. */
export function FieldShell({ id, label, required, hint, error, className, children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-brand-red">
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </span>
        ) : (
          <span className="font-normal text-subtle"> (optional)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId(id)} className="mb-2 text-sm text-subtle">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId(id)} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-brand-red">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
