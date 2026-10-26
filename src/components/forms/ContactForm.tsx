"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { site } from "@/data/site";
import { MESSAGE_MAX_LENGTH } from "@/lib/constants";
import { validateContact, type ContactField, type ContactValues, type FieldErrors } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { LoadingState } from "@/components/ui/LoadingState";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ConsentLabel, ErrorSummary, FormError, FormSuccess, Honeypot } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";

const SUBJECTS = [
  "General inquiry",
  "Laboratory services",
  "Medical services",
  "Reports",
  "Feedback",
  "Other",
].map((subject) => ({ value: subject, label: subject }));

const LABELS: Record<ContactField, string> = {
  name: "Full name",
  phone: "Phone number",
  email: "Email address",
  subject: "Subject",
  message: "Message",
  consent: "Consent to respond",
};

const EMPTY: ContactValues = { name: "", phone: "", email: "", subject: "", message: "", consent: false };

export function ContactForm() {
  const endpoint = site.forms.contactEndpoint;
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});
  const [honeypot, setHoneypot] = useState("");
  const { status, errorMessage, submit, reset } = useFormSubmission(endpoint);
  const summaryRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ContactValues>(field: K, value: ContactValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const sent = await submit(
      {
        _subject: `Website contact: ${values.subject}`,
        formType: "Contact",
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        subject: values.subject,
        message: values.message.trim(),
        privacyAcknowledged: values.consent,
      },
      honeypot,
    );
    if (sent) setValues(EMPTY);
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite">
        <FormSuccess title="Thank you â€” your message has been sent">
          <p>Our team has received your message and will reply using the contact details you provided.</p>
          <Button variant="outline" onClick={reset}>
            Send another message
          </Button>
        </FormSuccess>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="contact-form-title" className="relative">
      <h2 id="contact-form-title" className="mb-8 text-2xl font-bold">
        Send us a message
      </h2>

      <fieldset disabled={!endpoint || submitting} className="min-w-0 space-y-5">
        <legend className="sr-only">Your details</legend>
        <div ref={summaryRef} tabIndex={-1} className="focus:outline-none">
          <ErrorSummary errors={errors} labels={LABELS} />
        </div>

        <Input
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Phone number"
            autoComplete="tel"
            inputMode="tel"
            required
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            error={errors.phone}
          />
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            error={errors.email}
          />
        </div>
        <Select
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Choose a subject"
          required
          groups={[{ label: "", options: SUBJECTS }]}
          value={values.subject}
          onChange={(event) => update("subject", event.target.value)}
          error={errors.subject}
        />
        <Textarea
          id="message"
          name="message"
          label="Message"
          required
          maxLength={MESSAGE_MAX_LENGTH}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          error={errors.message}
        />
        <Checkbox
          id="consent"
          name="consent"
          required
          label={<ConsentLabel />}
          checked={values.consent}
          onChange={(event) => update("consent", event.target.checked)}
          error={errors.consent}
        />
        <Honeypot value={honeypot} onChange={setHoneypot} />

        {status === "error" && errorMessage ? <FormError message={errorMessage} /> : null}

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {submitting ? <LoadingState label="Sendingâ€¦" /> : "Send message"}
        </Button>
      </fieldset>
    </form>
  );
}
