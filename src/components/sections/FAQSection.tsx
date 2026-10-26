import { MessageCircleQuestion, Phone } from "lucide-react";
import type { FaqItem } from "@/types";
import { site } from "@/data/site";
import { telHref } from "@/lib/utils";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

interface FAQSectionProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export function FAQSection({
  items,
  title = "Frequently asked questions",
  description = "Answers to common questions about visiting us, testing and reports.",
}: FAQSectionProps) {
  const mainPhone = site.contact.phones[0];

  return (
    <section
      aria-labelledby="faq-title"
      className="relative isolate overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="brand-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]" />
      <div aria-hidden="true" className="absolute -right-40 -bottom-40 -z-10 size-[28rem] rounded-full bg-brand-red/10 blur-[110px]" />

      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow="FAQs" title={title} description={description} />

          {/* Help card */}
          <div className="on-dark relative isolate mt-8 overflow-hidden rounded-2xl bg-brand-navy p-6 text-white sm:p-7">
            <div aria-hidden="true" className="brand-grid-dark absolute inset-0 -z-10 opacity-50" />
            <div aria-hidden="true" className="absolute -top-12 -right-12 -z-10 size-40 rounded-full bg-brand-red/40 blur-3xl" />
            <span className="grid size-12 place-items-center rounded-xl bg-brand-red shadow-[0_12px_24px_-10px_rgb(218_37_28/0.8)]">
              <MessageCircleQuestion aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </span>
            <p className="mt-5 font-display text-xl font-bold">Still have questions?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-white/70">
              Our team is happy to help with tests, preparation and reports.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {mainPhone ? (
                <a
                  href={telHref(mainPhone.tel)}
                  className="btn-premium inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-red hover:text-white [--btn-glow:rgb(218_37_28/0.55)]"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {mainPhone.display}
                </a>
              ) : null}
              {/* TODO(relink): hidden until the Contact page is ready.
              <Link
                href="/contact/"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Contact us
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link> */}
            </div>
          </div>
        </div>

        <Accordion
          variant="cards"
          single
          defaultOpenId={items[0]?.id}
          className="lg:col-span-7"
          items={items.map((faq) => ({
            id: faq.id,
            title: faq.question,
            content: (
              <div className="space-y-3">
                {faq.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ),
          }))}
        />
      </Container>
    </section>
  );
}
