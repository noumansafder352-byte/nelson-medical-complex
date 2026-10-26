import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  actions?: ReactNode;
}

/** Interior page header: navy band with breadcrumbs, H1 and optional actions. */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions }: PageHeroProps) {
  return (
    // Pulled up beneath the frosted header so the glass effect shows over navy.
    <section className="on-dark brand-grid-dark relative isolate -mt-(--header-total) overflow-hidden bg-brand-navy text-white">
      <div aria-hidden="true" className="absolute top-0 left-0 h-full w-1.5 bg-brand-red" />
      <div aria-hidden="true" className="absolute -top-40 -right-32 -z-10 size-[34rem] rounded-full bg-brand-red/20 blur-[130px]" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 size-[22rem] rounded-full border-[48px] border-white/[0.04] sm:size-[30rem]"
      />
      <Container className="pt-[calc(var(--header-total)+3rem)] pb-12 sm:pt-[calc(var(--header-total)+4rem)] sm:pb-16 lg:pt-[calc(var(--header-total)+5rem)] lg:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-white/85 uppercase sm:text-[0.8rem]">
              <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-[2rem] leading-[1.1] font-bold text-white sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          {description ? <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{description}</div> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
