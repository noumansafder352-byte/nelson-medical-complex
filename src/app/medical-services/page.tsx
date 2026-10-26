import type { Metadata } from "next";
import { Info, Phone } from "lucide-react";
import { doctorsPageHref, laboratoryPhone, medicalServices } from "@/data/medical-services";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/sections/PageHero";
import { PatientJourney } from "@/components/sections/PatientJourney";

export const metadata: Metadata = pageMetadata({
  title: "Medical Services",
  description:
    "Medical consultations and patient services at Nelson Lab & Medical Complex. Learn what is available and how to arrange a visit.",
  path: "/medical-services/",
});

// Falls back to the main reception number until the laboratory's own number is added.
const labPhone = laboratoryPhone ?? site.contact.phones[0];

export default function MedicalServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Medical Services"
        title="Consultations and patient services"
        description="Medical services alongside our laboratory, so you can arrange testing and consultations in one place."
        breadcrumbs={[{ label: "Medical Services", href: "/medical-services/" }]}
        actions={
          <ButtonLink href="/appointments/" size="lg" withArrow>
            Request an appointment
          </ButtonLink>
        }
      />

      <section
        aria-labelledby="medical-services-title"
        className="relative isolate overflow-hidden bg-gradient-to-b from-white via-canvas to-white py-20 sm:py-24 lg:py-28"
      >
        <div aria-hidden="true" className="brand-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -top-40 -left-40 -z-10 size-[28rem] rounded-full bg-brand-navy/10 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-40 bottom-0 -z-10 size-[28rem] rounded-full bg-brand-red/10 blur-[120px]" />

        <Container>
          <SectionHeading
            id="medical-services-title"
            eyebrow="Our Services"
            title="Care, consultation and laboratory support"
            description="From your first consultation to collecting your reports, here is how each service works and how to get started."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
            {medicalServices.map((service, index) => {
              const lab = service.cta.target === "laboratory";
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  aria-labelledby={`${service.slug}-title`}
                  className="group relative flex scroll-mt-40 flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-brand-navy/20 hover:shadow-lift target:border-brand-red target:ring-2 target:ring-brand-red/20"
                >
                  {/* Accent bar that sweeps across on hover. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] bg-gradient-to-r transition-transform duration-700 ease-out group-hover:scale-x-100",
                      lab ? "from-brand-red to-brand-navy" : "from-brand-navy to-brand-red",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-5 right-6 font-display text-7xl leading-none font-bold text-brand-navy/[0.06] select-none sm:text-8xl"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex-1 p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "grid size-14 shrink-0 place-items-center rounded-md text-white ring-4 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105",
                          lab
                            ? "bg-gradient-to-br from-brand-red to-brand-red-strong shadow-[0_14px_28px_-12px_rgb(218_37_28/0.7)] ring-brand-red-tint"
                            : "bg-gradient-to-br from-brand-navy to-brand-navy-strong shadow-[0_14px_28px_-12px_rgb(41_23_111/0.7)] ring-brand-navy-tint",
                        )}
                      >
                        <Icon name={service.icon} className="size-7" />
                      </span>
                      {service.department ? (
                        <p className="text-xs font-bold tracking-[0.16em] text-brand-red uppercase">{service.department}</p>
                      ) : null}
                    </div>

                    <h2 id={`${service.slug}-title`} className="mt-6 text-2xl font-bold sm:text-[1.65rem]">
                      {service.title}
                    </h2>
                    <div className="mt-4 space-y-3 leading-relaxed text-subtle">
                      {service.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {service.note ? (
                      <p className="mt-5 flex items-start gap-3 rounded-sm border-l-2 border-brand-red bg-brand-red-tint/60 px-4 py-3 text-sm leading-relaxed text-ink">
                        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" strokeWidth={2.25} />
                        {service.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="relative flex flex-col gap-5 border-t border-line bg-canvas/80 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                    <div className="max-w-sm">
                      <h3 className="text-sm font-bold tracking-[0.12em] uppercase">{service.nextStep.heading}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed">{service.nextStep.text}</p>
                    </div>
                    {lab ? (
                      <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                        <ButtonLink href={`tel:${labPhone.tel}`}>
                          <Phone aria-hidden="true" className="size-4" />
                          {service.cta.label}
                        </ButtonLink>
                        <span className="text-xs text-subtle">{labPhone.display}</span>
                      </div>
                    ) : (
                      <ButtonLink href={doctorsPageHref} variant="secondary" withArrow className="shrink-0 self-start sm:self-auto">
                        {service.cta.label}
                      </ButtonLink>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-subtle">
            This information is general and is not medical advice. Always follow the instructions of your doctor and our
            team.
          </p>
        </Container>
      </section>

      <section aria-labelledby="combined-care-title" className="pb-20 sm:pb-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <MediaFrame
            image={images.combinedCare}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div>
            <SectionHeading
              id="combined-care-title"
              eyebrow="Joined-up care"
              title="Consultation and testing under one roof"
              description="When a clinician requests laboratory tests, having our laboratory on site can make the next step more convenient. Our team will explain how to arrange any tests you need."
            />
            <ButtonLink href="/laboratory-services/" variant="outline" withArrow className="mt-8">
              View laboratory services
            </ButtonLink>
          </div>
        </Container>
      </section>

      <PatientJourney />
      <ContactCTA />
    </>
  );
}
