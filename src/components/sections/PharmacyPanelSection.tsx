import Image from "next/image";
import { pharmacyPanel } from "@/data/content";
import { Container } from "@/components/layout/Container";
import { LoopCarousel } from "@/components/ui/LoopCarousel";

export function PharmacyPanelSection() {
  return (
    <section
      aria-labelledby="pharmacy-panel-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white to-brand-navy-tint/70 py-16 sm:py-20"
    >
      <div aria-hidden="true" className="brand-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />

      <Container className="text-center">
        <p className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-brand-red uppercase sm:text-[0.8rem]">
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
          {pharmacyPanel.eyebrow}
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
        </p>
        <h2 id="pharmacy-panel-title" className="mx-auto mt-4 max-w-3xl text-[2rem] leading-tight font-bold sm:text-[2.75rem]">
          {pharmacyPanel.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-subtle">{pharmacyPanel.description}</p>
      </Container>

      <div className="mt-4 sm:mt-6">
        <LoopCarousel tone="light" gapClassName="gap-5 pr-5" prevLabel="Previous organisation" nextLabel="Next organisation">
          {pharmacyPanel.organisations.map((org) => (
              <li key={org.name} className="w-[9.5rem] shrink-0 sm:w-[11rem]">
                <div className="relative aspect-[6/5] rounded-xl bg-white shadow-[0_20px_40px_-28px_rgb(41_23_111/0.45)] ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-28px_rgb(41_23_111/0.55)] hover:ring-brand-red/30">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    sizes="(min-width: 640px) 11rem, 9.5rem"
                    className="object-contain p-3"
                  />
                </div>
              </li>
            ))}
        </LoopCarousel>
      </div>
    </section>
  );
}
