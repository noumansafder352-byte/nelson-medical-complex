import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "dark";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Replaces the default title size classes (e.g. to keep a title on one line). */
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  as: Heading = "h2",
  id,
  className,
  titleClassName,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase sm:text-[0.8rem]",
            dark ? "text-white/85" : "text-brand-red",
          )}
        >
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "leading-[1.15] font-bold",
          titleClassName ?? "text-[1.75rem] sm:text-4xl lg:text-[2.6rem]",
          dark && "text-white",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <div className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-white/80" : "text-subtle")}>
          {description}
        </div>
      ) : null}
    </div>
  );
}
