import type { ComponentProps, ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { errorId } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<ComponentProps<"input">, "id" | "type"> {
  id: string;
  label: ReactNode;
  error?: string;
}

export function Checkbox({ id, label, error, required, ...props }: CheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId(id) : undefined}
          className={cn(
            "mt-0.5 size-5 shrink-0 cursor-pointer rounded-[4px] accent-brand-navy",
            error && "outline-2 outline-brand-red",
          )}
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-ink">
          {label}
          {required ? <span className="sr-only"> (required)</span> : null}
        </label>
      </div>
      {error ? (
        <p id={errorId(id)} className="mt-1.5 ml-8 flex items-start gap-1.5 text-sm font-medium text-brand-red">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
