import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { getLabServiceIcon, labCategories, labServices } from "@/data/laboratory-services";
import { telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ServiceChips } from "@/components/sections/ServiceChips";

/**
 * Laboratory Services page: the departments, each with its services as chips that
 * jump to the matching card in the catalogue above. Dark brand panel for contrast.
 */
export function DepartmentsSection() {
  const mainPhone = site.contact.phones[0];

  return (
    <section
      aria-labelledby="departments-title"
      className="on-dark relative isolate overflow-hidden bg-brand-navy-strong py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient glows and grid texture */}
      <div aria-hidden="true" className="absolute -top-40 -right-32 -z-10 size-[34rem] rounded-full bg-brand-red/20 blur-[130px]" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-40 -z-10 size-[38rem] rounded-full bg-[#4a33a8]/40 blur-[130px]" />
      <div aria-hidden="true" className="brand-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <Container>
        <SectionHeading
          id="departments-title"
          tone="dark"
          align="center"
          eyebrow="Our departments"
          title="Areas we cover"
          description="Laboratory testing, imaging and specialist procedures — all under one roof, with one team to guide you."
        />

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6">
          {labCategories.map((category, index) => {
            const services = labServices.filter((service) => service.categoryId === category.id);
            return (
              <li
                key={category.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] hover:ring-white/25 sm:p-8"
              >
                {/* Red accent that draws in along the top edge on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-red to-brand-red/30 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                {/* Large outlined index number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-5 font-display text-[6.5rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.09)] transition-colors duration-500 group-hover:[-webkit-text-stroke:1.5px_rgb(218_37_28/0.35)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-brand-red text-white shadow-[0_14px_30px_-12px_rgb(218_37_28/0.8)] transition-transform duration-500 group-hover:-rotate-6">
                    <Icon name={category.icon} className="size-7" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-[0.7rem] font-bold tracking-[0.18em] text-white/55 uppercase">
                      {services.length} {services.length === 1 ? "service" : "services"}
                    </p>
                    <h3 className="mt-0.5 text-xl font-bold text-white sm:text-[1.4rem]">{category.name}</h3>
                  </div>
                </div>

                <p className="mt-5 max-w-md leading-relaxed text-white/70">{category.description}</p>

                <div aria-hidden="true" className="mt-6 h-px bg-gradient-to-r from-white/15 via-white/10 to-transparent" />

                <ServiceChips
                  services={services.map((service) => ({
                    slug: service.slug,
                    name: service.name,
                    icon: getLabServiceIcon(service),
                  }))}
                />
              </li>
            );
          })}
        </ol>

        {/* Help strip */}
        {/* Soft glass panel with a gentle red wash, toned down from solid red. */}
        <div className="relative mt-6 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-red/25 via-white/[0.05] to-white/[0.03] p-7 ring-1 ring-white/12 backdrop-blur-sm sm:flex-row sm:items-center sm:p-8">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-brand-red" />
          <div>
            <p className="font-display text-xl font-bold text-white sm:text-2xl">Can&apos;t find your test or scan?</p>
            <p className="mt-1.5 max-w-xl leading-relaxed text-white/70">
              Our team can tell you whether a specific test, scan or procedure is available, and how to prepare.
            </p>
          </div>
          {/* TODO(relink): switch to the Contact page ("Ask our team") once it is ready. */}
          {mainPhone ? (
            <ButtonLink href={telHref(mainPhone.tel)} size="lg" variant="light" className="shrink-0">
              <Phone aria-hidden="true" className="size-4" />
              Call {mainPhone.display}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
