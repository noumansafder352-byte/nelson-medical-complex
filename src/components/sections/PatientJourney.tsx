import { patientJourney } from "@/data/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

export function PatientJourney() {
  return (
    <section
      aria-labelledby="journey-title"
      className="border-y border-line bg-canvas py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <SectionHeading
          id="journey-title"
          align="center"
          eyebrow="Your Visit"
          title="Four simple steps to your test or consultation"
          description="Here is what to expect, from your first call to receiving your report."
        />
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-brand-navy/20 lg:block"
          />
          <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {patientJourney.map((step, index) => (
              <li key={step.title} className="relative text-center">
                <span className="relative mx-auto grid size-14 place-items-center rounded-full border-4 border-canvas bg-brand-navy text-white">
                  <Icon name={step.icon} className="size-6" />
                  <span className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-brand-red text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-64 leading-relaxed text-subtle">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
