import type { Feature } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends Feature {
  variant?: "plain" | "card" | "dark";
  /** Optional step number shown instead of the icon badge style. */
  step?: number;
  headingLevel?: "h3" | "h4";
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  variant = "plain",
  step,
  headingLevel: Heading = "h3",
  className,
}: FeatureCardProps) {
  const dark = variant === "dark";

  return (
    <div
      className={cn(
        variant === "card" && "rounded-md border border-line bg-white p-6",
        dark && "rounded-md border border-white/10 bg-white/[0.04] p-6",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-sm",
            dark ? "bg-white text-brand-navy" : "bg-brand-red-tint text-brand-red",
          )}
        >
          <Icon name={icon} className="size-5.5" />
        </span>
        {step !== undefined ? (
          <span className={cn("text-sm font-bold tracking-wider", dark ? "text-white/60" : "text-subtle")}>
            Step {String(step).padStart(2, "0")}
          </span>
        ) : null}
      </div>
      <Heading className={cn("mt-4 text-lg font-bold", dark && "text-white")}>{title}</Heading>
      <p className={cn("mt-2 leading-relaxed", dark ? "text-white/75" : "text-subtle")}>{description}</p>
    </div>
  );
}
