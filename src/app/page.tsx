import type { Metadata } from "next";
import { site } from "@/data/site";
import { featuredFaqs } from "@/data/faqs";
import { pageMetadata } from "@/lib/metadata";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { LaboratoryOverview } from "@/components/sections/LaboratoryOverview";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { MedicalServicesOverview } from "@/components/sections/MedicalServicesOverview";
import { PatientJourney } from "@/components/sections/PatientJourney";
import { PharmacyPanelSection } from "@/components/sections/PharmacyPanelSection";
import { SpecialistsSection } from "@/components/sections/SpecialistsSection";
import { SpecialtiesMarquee } from "@/components/sections/SpecialtiesMarquee";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = pageMetadata({
  title: site.seo.defaultTitle,
  description: site.seo.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesOverview />
      <AboutPreview />
      <LeadershipSection />
      <SpecialtiesMarquee />
      <LaboratoryOverview />
      <MedicalServicesOverview />
      <WhyChooseUs />
      <SpecialistsSection />
      <PatientJourney />
      <FAQSection items={featuredFaqs} />
      <PharmacyPanelSection />
      <ContactCTA />
    </>
  );
}
