import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "on-dark";
  /** Height of the visible artwork. */
  size?: "md" | "lg";
  className?: string;
  priority?: boolean;
}

const heights = {
  md: "h-9 sm:h-11",
  lg: "h-11 sm:h-12",
};

/**
 * Official logo, linked to the homepage.
 *
 * The supplied file is displayed unmodified. Its transparent margins are
 * trimmed with CSS using `site.logo.visibleArea`. On dark backgrounds the
 * logo sits on a white plate (its navy lettering is not legible on navy)
 * unless a dedicated dark variant is configured in `site.logo.darkSrc`.
 * If the file is unavailable, the business name is shown as plain text.
 */
export function Logo({ variant = "default", size = "md", className, priority = false }: LogoProps) {
  const onDark = variant === "on-dark";
  const { logo } = site;

  if (logo.available) {
    const src = onDark && logo.darkSrc ? logo.darkSrc : logo.src;
    const needsPlate = onDark && !logo.darkSrc;
    const area = logo.visibleArea ?? { x: 0, y: 0, width: logo.width, height: logo.height };

    return (
      <Link
        href="/"
        aria-label={`${site.name} — home`}
        className={cn("inline-flex shrink-0 items-center", needsPlate && "rounded-sm bg-white px-4 py-3", className)}
      >
        <span
          className={cn("relative block overflow-hidden", heights[size])}
          style={{ aspectRatio: `${area.width} / ${area.height}` }}
        >
          <Image
            src={src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            className="absolute h-auto max-w-none"
            style={{
              width: `${(logo.width / area.width) * 100}%`,
              left: `${(-area.x / area.width) * 100}%`,
              top: `${(-area.y / area.height) * 100}%`,
            }}
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("inline-flex shrink-0 flex-col leading-none", className)}
    >
      <span className={cn("font-display text-[1.45rem] font-extrabold tracking-tight", onDark ? "text-white" : "text-brand-navy")}>
        Nelson
      </span>
      <span
        className={cn(
          "mt-1 text-[0.62rem] font-bold tracking-[0.18em] uppercase",
          onDark ? "text-white/80" : "text-brand-red",
        )}
      >
        Lab &amp; Medical Complex
      </span>
    </Link>
  );
}
