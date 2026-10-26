"use client";

import { useRef, useState, type SubmitEvent } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/data/site";
import { labServices } from "@/data/laboratory-services";
import { medicalServices } from "@/data/medical-services";
import { MESSAGE_MAX_LENGTH } from "@/lib/constants";
import {
  todayIsoDate,
  validateAppointment,
  type AppointmentField,
  type AppointmentValues,
  type FieldErrors,
} from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { LoadingState } from "@/components/ui/LoadingState";
import { Select, type SelectGroup } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ConsentLabel, ErrorSummary, FormError, FormNotConfigured, FormSuccess, Honeypot } from "@/components/forms/FormParts";
import { useFormSubmission } from "@/components/forms/useFormSubmission";

const OTHER_SERVICE = "other";

const SERVICE_GROUPS: SelectGroup[] = [
  {
    label: "Laboratory & imaging",
    options: labServices.map((service) => ({ value: `lab:${service.slug}`, label: service.name })),
  },
  {
    label: "Medical services",
    options: medicalServices.map((service) => ({ value: `medical:${service.slug}`, label: service.title })),
  },
  {
    label: "Other",
    options: [{ value: OTHER_SERVICE, label: "Other / not sure" }],
  },
];

const ALL_OPTIONS = SERVICE_GROUPS.flatMap((group) => group.options);
const serviceLabel = (value: string) => ALL_OPTIONS.find((option) => option.value === value)?.label ?? value;

const LABELS: Record<AppointmentField, string> = {
  name: "Patient's full name",
  phone: "Phone number",
  email: "Email address",
  service: "Requested service",
  preferredDate: "Preferred date",
  message: "Additional information",
  consent: "Consent to respond",
};

const emptyValues = (service = ""): AppointmentValues => ({
  name: "",
  phone: "",
  email: "",
  service,
  preferredDate: "",
  message: "",
  consent: false,
});

interface AppointmentFormProps {
  /** Pre-selected option value, e.g. "lab:real-time-pcr". */
  initialService?: string;
}

export function AppointmentForm({ initialService = "" }: AppointmentFormProps) {
  const endpoint = site.forms.appointmentEndpoint;
  const validInitial = ALL_OPTIONS.some((option) => option.value === initialService) ? initialService : "";
  const [values, setValues] = useState<AppointmentValues>(() => emptyValues(validInitial));
  const [errors, setErrors] = useState<FieldErrors<AppointmentField>>({});
  const [honeypot, setHoneypot] = useState("");
  const { status, errorMessage, submit, reset } = useFormSubmission(endpoint);
  const summaryRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof AppointmentValues>(field: K, value: AppointmentValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAppointment(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const sent = await submit(
      {
        _subject: `Appointment inquiry: ${serviceLabel(values.service)}`,
        formType: "Appointment inquiry",
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        service: serviceLabel(values.service),
        preferredDate: values.preferredDate || "No preference",
        message: values.message.trim(),
        privacyAcknowledged: values.consent,
      },
      honeypot,
    );
    if (sent) setValues(emptyValues());
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite">
        <FormSuccess title="Thank you — your inquiry has been sent">
          <p>
            <strong>Your appointment is not confirmed yet.</strong> A member of our team will contact you to confirm
            availability, timing and any preparation needed.
          </p>
          <p>If your request is urgent, please contact the facility directly.</p>
          <Button variant="outline" onClick={reset}>
            Send another inquiry
          </Button>
        </FormSuccess>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="appointment-form-title" className="relative">
      <h2 id="appointment-form-title" className="text-2xl font-bold">
        Appointment inquiry
      </h2>
      <p className="mt-2 mb-8 text-subtle">
        Fields marked <span className="text-brand-red">*</span> are required. Please share only what we need to arrange
        your visit — no medical history or results.
      </p>

      {!endpoint ? <FormNotConfigured /> : null}

      <fieldset disabled={!endpoint || submitting} className="min-w-0 space-y-5">
        <legend className="sr-only">Appointment details</legend>
        <div ref={summaryRef} tabIndex={-1} className="focus:outline-none">
          <ErrorSummary errors={errors} labels={LABELS} />
        </div>

        <Input
          id="name"
          name="name"
          label="Patient's full name"
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
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            error={errors.email}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            id="service"
            name="service"
            label="Requested service"
            placeholder="Choose a service"
            required
            groups={SERVICE_GROUPS}
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            error={errors.service}
          />
          <Input
            id="preferredDate"
            name="preferredDate"
            type="date"
            label="Preferred date"
            hint="We will confirm the final date and time."
            min={todayIsoDate()}
            value={values.preferredDate}
            onChange={(event) => update("preferredDate", event.target.value)}
            error={errors.preferredDate}
            suppressHydrationWarning
          />
        </div>
        <Textarea
          id="message"
          name="message"
          label="Additional information"
          rows={4}
          maxLength={MESSAGE_MAX_LENGTH}
          hint="For example, a preferred time of day. Please do not include medical history or results."
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
          {submitting ? <LoadingState label="Sending…" /> : "Send appointment inquiry"}
        </Button>
      </fieldset>
    </form>
  );
}

/** Reads `?service=lab:slug` from the URL. Render inside <Suspense>. */
export function AppointmentFormFromSearchParams() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") ?? "";
  return <AppointmentForm key={service} initialService={service} />;
}
