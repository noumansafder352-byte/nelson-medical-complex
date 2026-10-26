import type { ReactNode } from "react";
import { CircleAlert, CircleCheck, PlugZap } from "lucide-react";
import { site } from "@/data/site";
import { HONEYPOT_FIELD } from "@/lib/constants";
import { telHref } from "@/lib/utils";
import { errorId } from "@/components/ui/FormField";

/** Off-screen field that humans never see; bots that fill it are rejected. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function DirectContact() {
  const { email } = site.contact;
  const phone = site.contact.phones[0];
  if (!phone && !email) {
    return <>Our contact details will be published on this website shortly.</>;
  }
  return (
    <>
      Please contact us directly
      {phone ? (
        <>
          {" "}by phone on{" "}
          <a href={telHref(phone.tel)} className="font-semibold underline underline-offset-2">
            {phone.display}
          </a>
        </>
      ) : null}
      {phone && email ? " or" : null}
      {email ? (
        <>
          {" "}by email at{" "}
          <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
            {email}
          </a>
        </>
      ) : null}
      .
    </>
  );
}

export function FormNotConfigured() {
  return (
    <div role="note" className="mb-8 flex gap-3 rounded-sm border border-brand-navy/15 bg-brand-navy-tint p-4 text-sm leading-relaxed text-brand-navy">
      <PlugZap aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <p>
        <strong className="block">Online submissions are not available yet.</strong>
        This form has not been connected to a submission service, so it cannot send messages. <DirectContact />
      </p>
    </div>
  );
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-brand-navy/15 bg-brand-navy-tint p-6 text-brand-navy sm:p-8">
      <CircleCheck aria-hidden="true" className="size-10 text-brand-navy" strokeWidth={1.75} />
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex gap-3 rounded-sm border border-brand-red/30 bg-brand-red-tint p-4 text-sm leading-relaxed text-ink">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
      <p>
        {message} <DirectContact />
      </p>
    </div>
  );
}

/** Lists validation errors with links that move focus to each field. */
export function ErrorSummary({ errors, labels }: { errors: Record<string, string | undefined>; labels: Record<string, string> }) {
  const entries = Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1]));
  if (!entries.length) return null;

  return (
    <div className="rounded-sm border border-brand-red/30 bg-brand-red-tint p-4 text-sm">
      <p className="font-semibold text-ink">Please correct {entries.length === 1 ? "the following field" : `${entries.length} fields`}:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
        {entries.map(([field]) => (
          <li key={field}>
            <a href={`#${field}`} aria-describedby={errorId(field)} className="underline underline-offset-2">
              {labels[field] ?? field}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConsentLabel() {
  return <>I agree to my details being used only to respond to this inquiry.</>;
}
