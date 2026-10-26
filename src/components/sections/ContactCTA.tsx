import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { appointmentCta } from "@/data/navigation";
import { telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

interface ContactCTAProps {
  title?: string;
  description?: string;
}

export function ContactCTA({
  title = "Ready to arrange your test or consultation?",
  description = "Send us an appointment inquiry and our team will contact you to confirm the details.",
}: ContactCTAProps) {
  const mainPhone = site.contact.phones[0];

  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <Container>
        <div className="on-dark brand-grid-dark relative isolate overflow-hidden rounded-lg bg-brand-navy px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-1/3 bg-brand-red [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)] lg:block" />
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="cta-title" className="text-3xl leading-tight font-bold text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:flex-col lg:items-end">
              <ButtonLink href={appointmentCta.href} size="lg" variant="light" withArrow>
                {appointmentCta.label}
              </ButtonLink>
              {mainPhone ? (
                <ButtonLink href={telHref(mainPhone.tel)} size="lg" variant="outline-light">
                  <Phone aria-hidden="true" className="size-4" />
                  Call {mainPhone.display}
                </ButtonLink>
              ) : (
                <ButtonLink href="/contact/" size="lg" variant="outline-light">
                  Contact us
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
