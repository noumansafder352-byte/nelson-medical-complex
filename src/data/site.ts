import type { SiteConfig } from "@/types";

/**
 * SINGLE SOURCE OF TRUTH for business information.
 *
 * Every value marked `TODO(business)` must be replaced with confirmed
 * information before launch. Values left as `null` or `[]` are simply hidden
 * by the components (nothing is invented in their place).
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com").replace(/\/+$/, "");

const normalizeEndpoint = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

/** Shown under the logo in the footer. */
export const footerDisclaimer =
  "For Diagnostic purposes, The Results Obtained Should Always Be Used In Combination With The Clinical Examination, Patient Medical History And Other Findings.";

export const site: SiteConfig = {
  name: "Nelson Lab & Medical Complex",
  shortName: "Nelson Lab",
  // TODO(business): set NEXT_PUBLIC_SITE_URL in .env.local / hosting settings.
  url: siteUrl,
  locale: "en",
  description:
    "Nelson Lab & Medical Complex provides laboratory testing and medical services with a focus on clear communication, careful sample handling and respectful patient care.",
  tagline: "Laboratory testing and medical care, delivered with clarity and care.",

  logo: {
    // Official logo, used unmodified (transparent PNG, 2169×725).
    available: true,
    src: "/images/branding/official-logo.png",
    // The logo's navy text is not legible on navy, so it is shown on a white plate there.
    darkSrc: null,
    width: 2169,
    height: 725,
    // The artwork sits inside wide transparent margins; this box is trimmed in CSS only.
    visibleArea: { x: 54, y: 154, width: 2065, height: 454 },
    alt: "Nelson Lab & Medical Complex",
  },

  colors: {
    primary: "#DA251C",
    secondary: "#29176F",
    white: "#FFFFFF",
  },

  contact: {
    addressLines: ["Nelson Medical Complex, Abid Majid Road", "Opposite MH Gate#: 6"],
    city: "Rawalpindi Cantt.",
    region: null, // TODO(business)
    postalCode: null, // TODO(business)
    country: null, // TODO(business)
    phones: [
      { display: "051 5564788", tel: "+92515564788" },
      { display: "0308 5000489", tel: "+923085000489" },
    ],
    whatsapp: null, // TODO(business): digits only, e.g. "923085000489"
    email: "contact@nelson.com.pk",
  },

  // TODO(business): e.g. [{ days: "Monday – Saturday", hours: "8:00 AM – 8:00 PM" }]
  openingHours: [],

  // Editable sample copy — confirm against the facility's actual process.
  appointmentInstructions: [
    "Contact our reception by phone or send an inquiry through this website.",
    "Tell us which test or consultation you need, and share your doctor's request form if you have one.",
    "Our team will confirm availability, timing and any preparation that applies to your test.",
    "Bring a valid photo ID and any previous reports that may be relevant to your visit.",
  ],

  // TODO(business): add the real profile URLs. Icons show without a link while href is null.
  social: [
    { platform: "facebook", label: "Facebook", href: null },
    { platform: "instagram", label: "Instagram", href: null },
    { platform: "x", label: "X (Twitter)", href: null },
    { platform: "linkedin", label: "LinkedIn", href: null },
  ],

  // Built from the address above. TODO(business): swap for the exact Google Maps place links if the pin is off.
  map: {
    embedUrl:
      "https://maps.google.com/maps?q=Nelson%20Medical%20Complex%2C%20Abid%20Majid%20Road%2C%20Rawalpindi%20Cantt&z=16&output=embed",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Nelson%20Medical%20Complex%2C%20Abid%20Majid%20Road%2C%20Rawalpindi%20Cantt",
  },

  seo: {
    defaultTitle: "Nelson Lab & Medical Complex | Laboratory Testing & Medical Services",
    titleTemplate: "%s | Nelson Lab & Medical Complex",
    description:
      "Nelson Lab & Medical Complex offers laboratory testing and medical services. Learn about our services, prepare for your visit and contact our team.",
    ogImage: "/opengraph-image.png",
  },

  forms: {
    // Public form-service endpoints (e.g. Formspree). These are not secrets.
    contactEndpoint: normalizeEndpoint(process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT),
    appointmentEndpoint: normalizeEndpoint(process.env.NEXT_PUBLIC_APPOINTMENT_FORM_ENDPOINT),
  },

  // TODO(business): change to "DiagnosticLab" / "MedicalClinic" once the facility type is confirmed.
  schemaType: "Organization",

  // Set to false once every service and FAQ entry is verified.
  showContentNotices: true,
};
