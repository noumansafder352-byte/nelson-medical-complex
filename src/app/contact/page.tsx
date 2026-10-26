import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Nelson Lab & Medical Complex: phone, email, address, opening hours and an online contact form.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch"
        description="Questions about a test, a consultation or your visit? Contact our team and we will be glad to help."
        breadcrumbs={[{ label: "Contact Us", href: "/contact/" }]}
        actions={
          <ButtonLink href="/appointments/" size="lg" withArrow>
            Book an appointment
          </ButtonLink>
        }
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Column stretches to the form's height; the map fills the remaining space so both end level. */}
          <div className="flex flex-col lg:col-span-5">
            <h2 className="text-2xl font-bold">Contact details</h2>
            <ContactDetails className="mt-2" />

            {site.map.embedUrl ? (
              <div className="mt-2 flex flex-1 flex-col">
                <div className="min-h-72 flex-1 overflow-hidden rounded-lg border border-line bg-canvas shadow-card">
                  <iframe
                    src={site.map.embedUrl}
                    title={`Map showing the location of ${site.name}`}
                    className="size-full min-h-72"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-10 lg:col-span-7">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
