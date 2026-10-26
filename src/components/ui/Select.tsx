import { Fragment, type ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { FieldShell, controlClasses, describedBy } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps extends Omit<ComponentProps<"select">, "id"> {
  id: string;
  label: string;
  placeholder: string;
  groups: SelectGroup[];
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export function Select({ id, label, placeholder, groups, hint, error, required, wrapperClassName, ...props }: SelectProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={wrapperClassName}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(controlClasses(Boolean(error)), "appearance-none pr-11")}
          {...props}
        >
          <option value="">{placeholder}</option>
          {groups.map((group) =>
            group.label ? (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <Fragment key="ungrouped">
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Fragment>
            ),
          )}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle"
        />
      </div>
    </FieldShell>
  );
}
