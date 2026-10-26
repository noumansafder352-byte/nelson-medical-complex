import Image from "next/image";
import type { SiteImage } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface MediaFrameProps {
  image: SiteImage;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes?: string;
  /** Load eagerly with high priority (use only for above-the-fold images). */
  priority?: boolean;
  tone?: "light" | "navy";
  className?: string;
}

/**
 * Displays a registered photo, or branded artwork while no licensed photo
 * has been supplied (see src/data/images.ts). The artwork is decorative and
 * hidden from assistive technology so it is never mistaken for a photo.
 */
export function MediaFrame({
  image,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  tone = "light",
  className,
}: MediaFrameProps) {
  if (image.src) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-canvas", aspect, className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover"
        />
      </div>
    );
  }

  const navy = tone === "navy";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden rounded-lg",
        navy ? "brand-grid-dark bg-brand-navy" : "brand-grid bg-brand-navy-tint",
        aspect,
        className,
      )}
    >
      <div
        className={cn(
          "absolute -right-16 -bottom-16 size-64 rounded-full border-[28px]",
          navy ? "border-white/5" : "border-brand-navy/6",
        )}
      />
      <div className="absolute top-6 left-6 h-1 w-14 rounded-full bg-brand-red" />
      <div className="absolute inset-0 grid place-items-center">
        <div
          className={cn(
            "grid size-28 place-items-center rounded-full shadow-lift sm:size-36",
            navy ? "bg-white text-brand-navy" : "bg-white text-brand-navy",
          )}
        >
          <Icon name={image.icon} className="size-12 sm:size-16" strokeWidth={1.4} />
        </div>
      </div>
      <div className="absolute right-6 bottom-6 flex gap-1.5">
        <span className={cn("size-2 rounded-full", navy ? "bg-white/60" : "bg-brand-navy/40")} />
        <span className="size-2 rounded-full bg-brand-red" />
      </div>
    </div>
  );
}
