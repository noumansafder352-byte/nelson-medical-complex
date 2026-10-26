import {
  featuredLabServiceSlugs,
  getLabCategory,
  getLabServiceIcon,
  labCategories,
  labServices,
} from "@/data/laboratory-services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

export function LaboratoryOverview() {
  const featured = featuredLabServiceSlugs
    .map((slug) => labServices.find((service) => service.slug === slug))
    .filter((service) => service !== undefined);

  return (
    <section aria-labelledby="lab-overview-title" className="bg-canvas py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="lab-overview-title"
            eyebrow="Nelson Laboratory"
            title="Laboratory, imaging and diagnostics in one place"
            description="From fully automated real-time PCR and pathology to open MRI, CT and 3D ultrasound, our team will help you understand what your test or scan involves and how to prepare."
          />
        </div>

        <ul aria-label="Service categories" className="mt-10 flex flex-wrap gap-2.5">
          {labCategories.map((category) => (
            <li
              key={category.id}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-brand-navy"
            >
              <Icon name={category.icon} className="size-4 text-brand-red" />
              {category.name}
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <li key={service.slug}>
              <ServiceCard
                title={service.name}
                summary={service.summary}
                icon={getLabServiceIcon(service)}
                meta={getLabCategory(service.categoryId)?.name}
                action={{ label: "Book this service", href: `/appointments/?service=lab:${service.slug}` }}
              />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/laboratory-services/" size="lg" variant="secondary" withArrow className="px-8">
            Explore More Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
