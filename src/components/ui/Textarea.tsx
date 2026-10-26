import type { ComponentProps } from "react";
import { FieldShell, controlClasses, describedBy } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

interface TextareaProps extends Omit<ComponentProps<"textarea">, "id"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Textarea({ id, label, hint, error, required, wrapperClassName, rows = 5, ...props }: TextareaProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(controlClasses(Boolean(error)), "resize-y")}
        {...props}
      />
    </FieldShell>
  );
}
