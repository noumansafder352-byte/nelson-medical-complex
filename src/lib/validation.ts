import { MESSAGE_MAX_LENGTH } from "@/lib/constants";

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Allows +, spaces, dashes, dots and brackets; requires 7–15 digits (E.164 range).
const PHONE_ALLOWED = /^[+\d\s().-]+$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string) {
  const trimmed = value.trim();
  if (!PHONE_ALLOWED.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function todayIsoDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export type ContactField = "name" | "phone" | "email" | "subject" | "message" | "consent";
export type ContactValues = Record<Exclude<ContactField, "consent">, string> & { consent: boolean };

export function validateContact(values: ContactValues): FieldErrors<ContactField> {
  const errors: FieldErrors<ContactField> = {};

  if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Please enter a valid phone number, including the area or country code.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }
  if (!values.subject) errors.subject = "Please choose what your message is about.";
  if (values.message.trim().length < 10) errors.message = "Please enter a message of at least 10 characters.";
  if (values.message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`;
  }
  if (!values.consent) errors.consent = "Please confirm we may use your details to respond.";

  return errors;
}

export type AppointmentField = "name" | "phone" | "email" | "service" | "preferredDate" | "message" | "consent";
export type AppointmentValues = Record<Exclude<AppointmentField, "consent">, string> & { consent: boolean };

export function validateAppointment(values: AppointmentValues): FieldErrors<AppointmentField> {
  const errors: FieldErrors<AppointmentField> = {};

  if (values.name.trim().length < 2) errors.name = "Please enter the patient's full name.";
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number so our team can confirm your appointment.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Please enter a valid phone number, including the area or country code.";
  }
  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }
  if (!values.service) errors.service = "Please choose the service you are interested in.";
  if (values.preferredDate && values.preferredDate < todayIsoDate()) {
    errors.preferredDate = "Please choose today or a future date.";
  }
  if (values.message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`;
  }
  if (!values.consent) errors.consent = "Please confirm we may use your details to respond.";

  return errors;
}
