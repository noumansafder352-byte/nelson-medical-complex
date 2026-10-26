import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { addressLines, hasAnyContactDetail, telHref, whatsappHref } from "@/lib/utils";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-brand-red-tint text-brand-red">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold tracking-wide text-subtle uppercase">{label}</dt>
        <dd className="mt-1 text-ink">{children}</dd>
      </div>
    </div>
  );
}

const linkClass = "font-semibold text-brand-navy underline-offset-4 hover:underline break-words";

/** Contact facts from site.ts. Only confirmed details are shown. */
export function ContactDetails({ className }: { className?: string }) {
  const { phones, email, whatsapp } = site.contact;
  const address = addressLines();

  return (
    <div className={className}>
      {hasAnyContactDetail() || site.openingHours.length ? (
        <dl className="divide-y divide-line">
          {address.length ? (
            <Row icon={<MapPin aria-hidden="true" className="size-5" />} label="Address">
              <address className="not-italic">
                {address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {site.map.directionsUrl ? (
                <a href={site.map.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-2 inline-flex items-center gap-1.5`}>
                  Get directions
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </Row>
          ) : null}
          {phones.length ? (
            <Row icon={<Phone aria-hidden="true" className="size-5" />} label="Phone">
              <ul className="space-y-1">
                {phones.map((number) => (
                  <li key={number.tel}>
                    <a href={telHref(number.tel)} className={linkClass}>
                      {number.display}
                    </a>
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}
          {whatsapp ? (
            <Row icon={<MessageCircle aria-hidden="true" className="size-5" />} label="WhatsApp">
              <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Row>
          ) : null}
          {email ? (
            <Row icon={<Mail aria-hidden="true" className="size-5" />} label="Email">
              <a href={`mailto:${email}`} className={linkClass}>
                {email}
              </a>
            </Row>
          ) : null}
          {site.openingHours.length ? (
            <Row icon={<Clock aria-hidden="true" className="size-5" />} label="Opening hours">
              <ul>
                {site.openingHours.map((entry) => (
                  <li key={entry.days}>
                    <span className="font-semibold">{entry.days}:</span> {entry.hours}
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}
        </dl>
      ) : (
        <div className="rounded-md border border-dashed border-brand-navy/30 bg-brand-navy-tint p-6 text-brand-navy">
          <p className="font-semibold">Contact details coming soon</p>
          <p className="mt-2 text-sm leading-relaxed">
            Our address, phone number, email and opening hours will be published here shortly.
          </p>
        </div>
      )}
    </div>
  );
}
