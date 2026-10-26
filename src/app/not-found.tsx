import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="brand-grid relative isolate flex min-h-[70vh] items-center overflow-hidden py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <p className="inline-flex items-center gap-2.5 text-sm font-bold tracking-[0.16em] text-brand-red uppercase">
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
          Error 404
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-extrabold sm:text-6xl">We couldn&apos;t find that page</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-subtle">
          The page may have moved or no longer exists. Return to the homepage or contact our team for help.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact/" size="lg" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
