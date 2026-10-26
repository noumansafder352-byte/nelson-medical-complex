import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IconName, SiteImage } from "@/types";
import { homeHero } from "@/data/content";
import { images } from "@/data/images";
import { appointmentCta } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/layout/Container";

/** Title with the configured phrase underlined in brand red. */
function HeroTitle() {
  const { title, titleHighlight } = homeHero;
  const index = title.indexOf(titleHighlight);
  if (index === -1) return <>{title}</>;

  const rest = title.slice(index + titleHighlight.length);
  // Keep punctuation right after the phrase on the same line (avoids a line starting with ",").
  const punctuation = rest.match(/^[,.;:!?]+/)?.[0] ?? "";

  return (
    <>
      {title.slice(0, index)}
      <span className="whitespace-nowrap">
        <span className="relative inline-block">
          <span className="relative z-10">{titleHighlight}</span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[0.04em] z-0 h-[0.14em] rounded-full bg-brand-red"
          />
        </span>
        {punctuation}
      </span>
      {rest.slice(punctuation.length)}
    </>
  );
}

/** Layered brand backdrop: soft glows, concentric rings and a fading dot texture. */
function BrandBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-brand-navy">
      {/* Soft glows */}
      <div className="absolute -top-40 -right-32 size-[38rem] rounded-full bg-brand-red/20 blur-[140px]" />
      <div className="absolute -bottom-48 -left-40 size-[40rem] rounded-full bg-white/[0.08] blur-[140px]" />

      {/* Dot texture, fading towards the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.09)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      {/* Concentric rings centred behind the headline */}
      <div className="absolute top-[46%] left-1/2">
        {["w-[78rem] border-white/[0.04]", "w-[58rem] border-white/[0.05]", "w-[40rem] border-white/[0.06]"].map((ring) => (
          <div key={ring} className={cn("absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border", ring)} />
        ))}
      </div>

      {/* Diagonal from the "Ni" mark, along the bottom */}
      <div className="absolute inset-0 bg-white/[0.03] [clip-path:polygon(0_72%,100%_100%,0_100%)]" />
    </div>
  );
}

const floatingCards: { title: string; text: string; href: string; icon: IconName; position: string }[] = [
  {
    title: "Laboratory & Imaging",
    text: "PCR, pathology, MRI & CT",
    href: "/laboratory-services/",
    icon: "test-tubes",
    // Higher on wide screens; lower on 1280–1439px laptops, where it would touch the headline.
    position: "left-[3%] bottom-[30%] min-[1440px]:bottom-[40%]",
  },
  {
    title: "Medical Consultations",
    text: "Under the same roof",
    href: "/medical-services/",
    icon: "stethoscope",
    position: "right-[3%] bottom-[22%]",
  },
];

/** Frosted cards floating at the sides on wide screens. */
function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden xl:block">
      {floatingCards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className={cn(
            "group pointer-events-auto absolute flex w-[17.5rem] items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14]",
            card.position,
          )}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-brand-navy shadow-card transition-colors group-hover:bg-brand-red group-hover:text-white">
            <Icon name={card.icon} className="size-6" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1 font-display text-[0.95rem] leading-tight font-bold whitespace-nowrap text-white">
              {card.title}
              <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="mt-0.5 block text-[0.8rem] text-white/70">{card.text}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/**
 * Full-width, single-column hero. It sits beneath the frosted header (negative
 * top margin) so the glass effect shows over navy. Shows the facility photo
 * (src/data/images.ts) under a navy overlay once supplied; otherwise the brand backdrop.
 */
export function HomeHero() {
  const heroImage: SiteImage = images.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate -mt-(--header-total) overflow-hidden text-white"
    >
      {heroImage.src ? (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-brand-navy">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
          {/* Navy overlay: light enough to show the photo, dark enough for white text. */}
          <div aria-hidden="true" className="absolute inset-0 bg-brand-navy/75" />
          <div aria-hidden="true" className="absolute -top-40 -right-32 size-[38rem] rounded-full bg-brand-red/20 blur-[140px]" />
        </div>
      ) : (
        <BrandBackdrop />
      )}

      <FloatingCards />

      <Container className="relative flex flex-col items-center pt-[calc(var(--header-total)+3.5rem)] pb-24 text-center sm:pt-[calc(var(--header-total)+4.5rem)] sm:pb-28 lg:pt-[calc(var(--header-total)+5rem)] lg:pb-40">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-bold tracking-[0.18em] uppercase backdrop-blur-sm sm:text-[0.78rem]">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-red" />
          </span>
          {homeHero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-8 max-w-5xl text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.025em] text-white sm:text-6xl lg:text-[5rem]"
        >
          <HeroTitle />
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{homeHero.description}</p>

        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink
            href={appointmentCta.href}
            size="lg"
            withArrow
            className="px-8 shadow-[0_18px_40px_-14px_rgb(218_37_28/0.8)]"
          >
            {appointmentCta.label}
          </ButtonLink>
          <ButtonLink
            href="/laboratory-services/"
            size="lg"
            variant="outline-light"
            className="bg-white/[0.06] px-8 backdrop-blur-sm"
          >
            Explore our services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
