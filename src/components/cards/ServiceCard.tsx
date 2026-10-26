import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { IconName } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  summary: string;
  icon: IconName;
  meta?: string;
  /** Optional photo shown across the top of the card. */
  image?: { src: string; alt: string };
  /** Element id, so menus can link straight to this card (e.g. /laboratory-services/#open-mri). */
  id?: string;
  action: { label: string; href: string };
  headingLevel?: "h2" | "h3";
  className?: string;
}

const cardBase = cn(
  "group flex h-full scroll-mt-40 flex-col rounded-md border transition-all duration-200",
  "hover:-translate-y-0.5 hover:shadow-lift",
  // Highlight the card when the page is opened directly at its #anchor.
  "target:border-brand-red target:shadow-lift target:ring-2 target:ring-brand-red/20",
);

/** Card call to action; on hover an underline draws in smoothly from left to right. Colour comes from `className`. */
function CardAction({
  action,
  title,
  className,
}: {
  action: { label: string; href: string };
  title: string;
  className?: string;
}) {
  return (
    <Link
      href={action.href}
      className={cn("group/action inline-flex min-h-10 items-center gap-1.5 self-start text-sm font-semibold", className)}
    >
      <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300 after:ease-out group-hover/action:after:scale-x-100">
        {action.label}
      </span>
      <span className="sr-only">: {title}</span>
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Data-driven service card with a single call to action. With `image`, the photo covers the whole card. */
export function ServiceCard({
  title,
  summary,
  icon,
  meta,
  image,
  id,
  action,
  headingLevel: Heading = "h3",
  className,
}: ServiceCardProps) {
  if (image) {
    return (
      <article
        id={id}
        className={cn(
          cardBase,
          "on-dark relative isolate min-h-[20rem] justify-end overflow-hidden border-transparent bg-brand-navy p-5 text-white",
          className,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Navy scrim: clear at the top, strong at the bottom so the white text stays readable. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-navy-strong/95 via-brand-navy/70 via-45% to-transparent to-75%"
        />

        <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-brand-red text-white shadow-[0_10px_20px_-8px_rgb(218_37_28/0.8)]">
            <Icon name={icon} className="size-5" />
          </span>
          {meta ? (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur">
              {meta}
            </span>
          ) : null}
        </div>

        <Heading className="text-[1.05rem] leading-snug font-bold text-white">{title}</Heading>
        <p className="mt-1.5 text-sm leading-relaxed text-white/85">{summary}</p>
        <CardAction action={action} title={title} className="mt-3 text-white" />
      </article>
    );
  }

  return (
    <article id={id} className={cn(cardBase, "border-line bg-white p-6 hover:border-brand-navy/30", className)}>
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-sm bg-brand-navy-tint text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-white">
          <Icon name={icon} className="size-6" />
        </span>
        {meta ? (
          <span className="rounded-full border border-line px-2.5 py-1 text-xs font-semibold text-subtle">{meta}</span>
        ) : null}
      </div>
      <Heading className="mt-5 text-lg leading-snug font-bold">{title}</Heading>
      <p className="mt-2 flex-1 leading-relaxed text-subtle">{summary}</p>
      <CardAction action={action} title={title} className="mt-5 text-brand-red" />
    </article>
  );
}
