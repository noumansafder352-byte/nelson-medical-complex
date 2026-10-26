import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck } from "lucide-react";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/Container";
import { AppointmentForm, AppointmentFormFromSearchParams } from "@/components/forms/AppointmentForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Send an appointment inquiry to Nelson Lab & Medical Complex for a laboratory test or medical consultation. Our team will contact you to confirm.",
  path: "/appointments/",
});

export default function AppointmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Book a test or consultation"
        description="Tell us what you need and our team will contact you to confirm availability, timing and any preparation."
        breadcrumbs={[{ label: "Book an Appointment", href: "/appointments/" }]}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-10 lg:col-span-7">
            {/* The fallback renders the full form in the static HTML; the URL's ?service= value is applied on the client. */}
            <Suspense fallback={<AppointmentForm />}>
              <AppointmentFormFromSearchParams />
            </Suspense>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-lg bg-canvas p-6 sm:p-8">
              <h2 className="text-xl font-bold">How appointment requests work</h2>
              <ol className="mt-5 space-y-4">
                {site.appointmentInstructions.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-navy text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-line p-6 sm:p-8">
              <h2 className="text-xl font-bold">Prefer to call or visit?</h2>
              <ContactDetails className="mt-2" />
            </div>

            <div className="flex gap-3 rounded-md border border-brand-navy/15 bg-brand-navy-tint p-5 text-sm leading-relaxed text-brand-navy">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <p>Your inquiry is used only to arrange your visit. Please do not include medical history or results.</p>
            </div>

            <p className="text-sm leading-relaxed text-subtle">
              <strong className="text-ink">Medical emergency?</strong> Do not use this form. Contact your local emergency
              services immediately.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
