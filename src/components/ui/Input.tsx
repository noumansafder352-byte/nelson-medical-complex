import type { ComponentProps } from "react";
import { FieldShell, controlClasses, describedBy } from "@/components/ui/FormField";

interface InputProps extends Omit<ComponentProps<"input">, "id"> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Input({ id, label, hint, error, required, wrapperClassName, ...props }: InputProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClasses(Boolean(error))}
        {...props}
      />
    </FieldShell>
  );
}
