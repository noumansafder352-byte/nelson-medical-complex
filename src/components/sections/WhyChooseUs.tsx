import { whyChooseUs } from "@/data/content";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="on-dark brand-grid-dark relative isolate overflow-hidden bg-brand-navy py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-10 size-[30rem] rounded-full border-[56px] border-white/[0.04]" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="why-title"
            tone="dark"
            eyebrow="Why Nelson Lab"
            title="Care that starts before you arrive"
            className="lg:col-span-5"
          />
          <p className="text-lg leading-relaxed text-white/80 lg:col-span-6 lg:col-start-7 lg:self-end">
            We focus on the practical things that make a visit easier: clear guidance, a calm environment and support
            when you receive your report.
          </p>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((feature) => (
            <li key={feature.title}>
              <FeatureCard {...feature} variant="dark" className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
