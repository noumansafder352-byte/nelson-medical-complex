import type { Metadata } from "next";
import { Check } from "lucide-react";
import { aboutIntro, mission, qualityApproach, values, vision } from "@/data/content";
import { images } from "@/data/images";
import { pageMetadata } from "@/lib/metadata";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Nelson Lab & Medical Complex â€” our mission, values, facility and our approach to quality, safety and patient care.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Laboratory testing and medical care, built on trust"
        description="Get to know the people, principles and facility behind Nelson Lab & Medical Complex."
        breadcrumbs={[{ label: "About Us", href: "/about/" }]}
      />

      {/* Introduction */}
      <section aria-labelledby="intro-title" className="py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="intro-title" eyebrow="Who we are" title={aboutIntro.title} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-subtle">
              {aboutIntro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <MediaFrame
            image={images.about}
            aspect="aspect-[768/481]"
            className="shadow-lift lg:col-span-6"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Container>
      </section>

      {/* Mission & vision */}
      <section aria-label="Mission and vision" className="bg-canvas py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {[mission, vision].map((item, index) => (
            <div
              key={item.title}
              className={
                index === 0
                  ? "on-dark rounded-lg bg-brand-navy p-8 text-white sm:p-12"
                  : "rounded-lg border border-line bg-white p-8 sm:p-12"
              }
            >
              <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-brand-red" />
              <h2 className={`mt-6 text-3xl font-bold ${index === 0 ? "text-white" : ""}`}>{item.title}</h2>
              <p className={`mt-4 text-xl leading-relaxed ${index === 0 ? "text-white/85" : "text-subtle"}`}>{item.text}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="values-title"
            eyebrow="Our values"
            title="How we care for every patient"
            description="These principles guide how our team works with patients, families and referring clinicians."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.title}>
                <FeatureCard {...value} variant="card" className="h-full" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="border-t border-line">
        <FacilitiesSection />
      </div>

      {/* Quality & safety */}
      <section aria-labelledby="quality-title" className="bg-canvas py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading id="quality-title" eyebrow="Quality & safety" title={qualityApproach.title} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-subtle">
              {qualityApproach.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ul className="space-y-3 lg:col-span-6 lg:self-center">
            {qualityApproach.points.map((point) => (
              <li key={point} className="flex items-center gap-4 rounded-md border border-line bg-white p-5 font-semibold text-ink">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-red text-white">
                  <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
