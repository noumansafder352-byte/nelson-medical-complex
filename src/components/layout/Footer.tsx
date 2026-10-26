import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { footerDisclaimer, site } from "@/data/site";
import { footerNavigation } from "@/data/navigation";
import { addressLines, telHref } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";

const linkClass = "group inline-flex min-h-9 items-center gap-2 text-white/70 transition-colors hover:text-white";

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-6 font-sans text-sm font-bold tracking-[0.16em] text-white uppercase">
      {children}
      <span aria-hidden="true" className="mt-3 flex gap-1">
        <span className="h-0.5 w-8 rounded-full bg-brand-red" />
        <span className="h-0.5 w-2 rounded-full bg-brand-red/50" />
      </span>
    </h2>
  );
}

function ContactItem({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-brand-red">
        <Icon aria-hidden="true" className="size-[1.125rem]" strokeWidth={2} />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[0.68rem] font-bold tracking-[0.14em] text-white/50 uppercase">{label}</p>
        <div className="mt-0.5 text-[0.95rem] leading-snug text-white/85">{children}</div>
      </div>
    </li>
  );
}

function FooterContact() {
  const { phones, email } = site.contact;
  const address = addressLines();

  return (
    <ul className="space-y-4">
      {address.length ? (
        <ContactItem icon={MapPin} label="Address">
          <address className="not-italic">{address.join(", ")}</address>
        </ContactItem>
      ) : null}
      {phones.length ? (
        <ContactItem icon={Phone} label="Phone">
          {phones.map((number, index) => (
            <span key={number.tel}>
              {index > 0 ? <span aria-hidden="true" className="mx-1.5 text-white/30">|</span> : null}
              <a href={telHref(number.tel)} className="transition-colors hover:text-white">
                {number.display}
              </a>
            </span>
          ))}
        </ContactItem>
      ) : null}
      {email ? (
        <ContactItem icon={Mail} label="Email">
          <a href={`mailto:${email}`} className="break-all transition-colors hover:text-white">
            {email}
          </a>
        </ContactItem>
      ) : null}
      {site.openingHours.length ? (
        <ContactItem icon={Clock} label="Opening hours">
          {site.openingHours.map((entry) => (
            <span key={entry.days} className="block">
              {entry.days}: {entry.hours}
            </span>
          ))}
        </ContactItem>
      ) : null}
    </ul>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-brand-navy-strong text-white">
      <div aria-hidden="true" className="h-1 bg-brand-red" />
      <div aria-hidden="true" className="absolute -top-48 -right-48 -z-10 size-[32rem] rounded-full bg-brand-red/10 blur-[120px]" />

      <Container className="grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        {/* Column 1 — brand */}
        <div className="lg:col-span-4">
          <Logo variant="on-dark" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{footerDisclaimer}</p>
          {site.social.length ? (
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Social media">
              {site.social.map((link) => (
                <li key={link.platform}>
                  <SocialIcon
                    link={link}
                    className="grid size-10 place-items-center rounded-lg border border-white/15 bg-white/[0.04] text-white/80 transition-all hover:-translate-y-0.5 hover:border-brand-red hover:bg-brand-red hover:text-white"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Columns 2 & 3 — navigation */}
        {footerNavigation.map((group) => (
          <nav key={group.title} aria-label={`Footer — ${group.title}`} className="lg:col-span-2">
            <ColumnHeading>{group.title}</ColumnHeading>
            <ul className="space-y-0.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    <ArrowRight aria-hidden="true" className="size-3.5 text-brand-red transition-transform group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Column 4 — contact details */}
        <div className="lg:col-span-4">
          <ColumnHeading>Contact Us</ColumnHeading>
          <FooterContact />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Laboratory &middot; Medical Services &middot; Pharmacy</p>
        </Container>
      </div>
    </footer>
  );
}
