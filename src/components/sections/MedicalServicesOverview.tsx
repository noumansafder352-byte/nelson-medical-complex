import Link from "next/link";
import { medicalServices } from "@/data/medical-services";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

export function MedicalServicesOverview() {
  if (!medicalServices.length) return null;

  return (
    <section aria-labelledby="medical-overview-title" className="py-20 sm:py-24 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <SectionHeading
              id="medical-overview-title"
              eyebrow="Medical Services"
              title="Consultations and patient services"
              description="Alongside our laboratory, we offer medical services designed to make your care more convenient."
            />
            <MediaFrame
              image={images.medical}
              aspect="aspect-[16/10]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-8"
            />
            <ButtonLink href="/medical-services/" variant="secondary" withArrow className="mt-8">
              All medical services
            </ButtonLink>
          </div>
        </div>

        <ul className="divide-y divide-line self-center border-y border-line lg:col-span-7 lg:mt-12">
          {medicalServices.map((service) => (
            <li key={service.slug}>
              <Link href={`/medical-services/#${service.slug}`} className="group flex items-start gap-5 py-7 sm:gap-6">
                {/* Brand red icon tile; hovering the row animates only the icon. */}
                <span className="grid size-14 shrink-0 place-items-center rounded-sm border border-brand-red/20 bg-brand-red-tint text-brand-red transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white group-hover:shadow-[0_14px_28px_-12px_rgb(218_37_28/0.7)]">
                  <Icon name={service.icon} className="size-6 transition-transform duration-300 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-xl font-bold text-brand-navy">{service.title}</span>
                  <span className="mt-1.5 block leading-relaxed text-subtle">{service.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
