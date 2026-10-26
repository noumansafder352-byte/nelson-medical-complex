import { facilityHighlights } from "@/data/content";
import { images } from "@/data/images";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

interface FacilitiesSectionProps {
  headingLevel?: "h2" | "h3";
}

export function FacilitiesSection({ headingLevel = "h2" }: FacilitiesSectionProps) {
  return (
    <section aria-labelledby="facilities-title" className="py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            as={headingLevel}
            id="facilities-title"
            eyebrow="Our Facility"
            title="A clean, organised environment for testing and care"
            description="Our facility brings reception, sample collection, laboratory and consultation spaces together, so your visit is straightforward."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {facilityHighlights.map((feature) => (
              <li key={feature.title}>
                <FeatureCard {...feature} headingLevel={headingLevel === "h2" ? "h3" : "h4"} />
              </li>
            ))}
          </ul>
        </div>
        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-5 gap-4">
            <MediaFrame image={images.laboratory} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 30vw, 60vw" className="col-span-3" />
            <div className="col-span-2 flex flex-col gap-4 pt-12">
              <MediaFrame image={images.facilities} aspect="aspect-square" tone="navy" sizes="(min-width: 1024px) 20vw, 40vw" />
              <div aria-hidden="true" className="h-full min-h-16 rounded-lg bg-brand-red" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
