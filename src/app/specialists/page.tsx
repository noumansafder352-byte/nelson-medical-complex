import type { Metadata } from "next";
import { specialists, specialistsPage, specialties } from "@/data/content";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/sections/PageHero";
import { SpecialistDirectory } from "@/components/sections/SpecialistDirectory";

export const metadata: Metadata = pageMetadata({
  title: "Our Specialists",
  description:
    "Find a specialist at Nelson Lab & Medical Complex. Browse doctors by specialty, view their qualifications and contact them directly to arrange an appointment.",
  path: "/specialists/",
});

export default function SpecialistsPage() {
  return (
    <>
      <PageHero
        eyebrow={specialistsPage.eyebrow}
        title={specialistsPage.title}
        description={specialistsPage.description}
        breadcrumbs={[{ label: "Our Specialists", href: "/specialists/" }]}
      />

      <section
        aria-label="Specialists"
        className="relative isolate overflow-hidden bg-gradient-to-b from-white via-canvas to-white py-16 sm:py-20 lg:py-24"
      >
        <div aria-hidden="true" className="brand-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -top-40 -right-40 -z-10 size-[28rem] rounded-full bg-brand-red/10 blur-[120px]" />

        <Container>
          <SpecialistDirectory
            doctors={specialists.doctors}
            specialties={specialties.items}
            receptionPhone={site.contact.phones[0]}
          />
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-subtle">
            Specialist availability and consultation schedules may vary. Please contact your preferred doctor directly
            to confirm consultation days and timings.
          </p>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
