import type { Metadata } from "next";
import { labCategories, labServices } from "@/data/laboratory-services";
import { labFaqs } from "@/data/faqs";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCatalog } from "@/components/sections/ServiceCatalog";

export const metadata: Metadata = pageMetadata({
  title: "Laboratory Services",
  description:
    "Nelson Laboratory services: fully automated real-time PCR, hematology, viral serology, histopathology, cytology, microbiology, chemical pathology, open MRI, multi-slice CT, 3D ultrasound, colour Doppler, contrast X-ray studies and physiotherapy.",
  path: "/laboratory-services/",
});

export default function LaboratoryServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nelson Laboratory"
        title="Laboratory, imaging & diagnostic services"
        description="Find a test or scan, learn what it involves and send us an inquiry. Our team will confirm availability and any preparation before your visit."
        breadcrumbs={[{ label: "Laboratory Services", href: "/laboratory-services/" }]}
        actions={
          <ButtonLink href="/appointments/" size="lg" withArrow>
            Book a test or scan
          </ButtonLink>
        }
      />

      <section aria-label="Service catalogue" className="py-16 sm:py-20">
        <Container>
          <ServiceCatalog services={labServices} categories={labCategories} />
        </Container>
      </section>

      <DepartmentsSection />

      <FAQSection
        items={labFaqs}
        title="Questions about tests and scans"
        description="Answers to common questions about preparing for your test or scan and receiving your results."
      />

      <ContactCTA title="Have a test or scan request from your doctor?" description="Send us an appointment inquiry and our team will confirm timing and any preparation needed." />
    </>
  );
}
