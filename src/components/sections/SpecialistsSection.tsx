import { specialists } from "@/data/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { SpecialistShowcase } from "@/components/sections/SpecialistShowcase";

export function SpecialistsSection() {
  return (
    <section
      id="specialists"
      aria-labelledby="specialists-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-white to-brand-navy-tint/70 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="brand-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />
      <div aria-hidden="true" className="absolute -top-32 -right-32 -z-10 size-[26rem] rounded-full bg-brand-red/10 blur-[110px]" />

      <Container className="text-center">
        <p className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-brand-red uppercase sm:text-[0.8rem]">
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
          {specialists.eyebrow}
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
        </p>
        <h2 id="specialists-title" className="mx-auto mt-4 max-w-3xl text-[2rem] leading-tight font-bold sm:text-[2.75rem]">
          {specialists.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-subtle">{specialists.description}</p>
      </Container>

      <div className="mt-8 sm:mt-10">
        <SpecialistShowcase doctors={specialists.doctors} />
      </div>

      <Container className="mt-10 flex justify-center">
        <ButtonLink href="/specialists/" variant="secondary" withArrow>
          View all specialists
        </ButtonLink>
      </Container>
    </section>
  );
}
