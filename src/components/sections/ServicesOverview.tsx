import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { IconName } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/layout/Container";

// TODO(relink): `linked: false` cards render without a link until their pages are ready.
// Set them back to `true` (or remove the flag) to reconnect.
const quickLinks: { title: string; description: string; href: string; icon: IconName; linked: boolean }[] = [
  {
    title: "Laboratory Services",
    description: "Pathology, PCR, MRI, CT, ultrasound and more.",
    href: "/laboratory-services/",
    icon: "test-tubes",
    linked: true,
  },
  {
    title: "Medical Services",
    description: "Consultations and patient services at our facility.",
    href: "/medical-services/",
    icon: "stethoscope",
    linked: true,
  },
  {
    title: "Book an Appointment",
    description: "Send an inquiry and our team will confirm with you.",
    href: "/appointments/",
    icon: "calendar",
    linked: true,
  },
  {
    title: "Our Specialists",
    description: "Find a specialist by discipline and contact them directly.",
    href: "/specialists/",
    icon: "users",
    linked: true,
  },
];

/** Quick-access row directly below the homepage hero. */
export function ServicesOverview() {
  return (
    <section aria-labelledby="quick-access-title" className="relative z-10 -mt-8 lg:-mt-14">
      <h2 id="quick-access-title" className="sr-only">
        Quick access
      </h2>
      <Container>
        <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const content = (
              <>
                <span
                  className={
                    link.linked
                      ? "grid size-12 shrink-0 place-items-center rounded-sm bg-brand-red-tint text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white"
                      : "grid size-12 shrink-0 place-items-center rounded-sm bg-brand-red-tint text-brand-red"
                  }
                >
                  <Icon name={link.icon} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-display text-[1.05rem] font-bold text-brand-navy">
                    {link.title}
                    {link.linked ? (
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-subtle">{link.description}</span>
                </span>
              </>
            );

            return (
              <li key={link.href} className="bg-white">
                {link.linked ? (
                  <Link
                    href={link.href}
                    className="group flex h-full items-start gap-4 p-6 transition-colors hover:bg-canvas focus-visible:-outline-offset-4"
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="flex h-full items-start gap-4 p-6">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
