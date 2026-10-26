import type { MedicalService, PhoneNumber } from "@/types";

/** Where "Explore Our Doctors" / "Find a Specialist" buttons lead. */
export const doctorsPageHref = "/specialists/";

/**
 * Direct laboratory number for the "Contact Laboratory" buttons.
 * TODO(business): add the laboratory number, e.g. { display: "051 0000000", tel: "+92510000000" }.
 * While null, the buttons call the main reception number from `site.contact.phones`.
 */
export const laboratoryPhone: PhoneNumber | null = null;

/** Medical services and consultations (copy supplied by Nelson Lab & Medical Complex). */
export const medicalServices: MedicalService[] = [
  {
    slug: "general-consultation",
    title: "General Medical Consultation",
    summary: "Consult experienced doctors for general health concerns, routine check-ups and follow-up visits.",
    description: [
      "Consult experienced doctors at Nelson Medical Complex for general health concerns, routine check-ups, follow-up visits and initial medical assessments. Our doctors can evaluate your symptoms, recommend appropriate investigations and guide you on the next steps in your care.",
    ],
    department: "Consultation",
    nextStep: {
      heading: "How to book",
      text: "Explore our doctors, review their profiles and contact your preferred doctor directly to arrange an appointment.",
    },
    cta: { label: "Explore Our Doctors", target: "doctors" },
    icon: "stethoscope",
    status: "verified",
  },
  {
    slug: "sample-collection",
    title: "Sample Collection",
    summary: "Laboratory sample collection for blood tests and other requested investigations.",
    description: [
      "Nelson Medical Complex offers laboratory sample collection for blood tests and other requested investigations. Our laboratory team will guide you through the collection process, explain any required preparation and help you understand the next steps.",
    ],
    department: "Laboratory",
    nextStep: {
      heading: "How to arrange",
      text: "To arrange sample collection, please contact our laboratory.",
    },
    cta: { label: "Contact Laboratory", target: "laboratory" },
    icon: "syringe",
    status: "verified",
  },
  {
    slug: "specialist-consultations",
    title: "Specialist Consultations",
    summary: "Doctors across cardiology, dermatology, rheumatology, endocrinology, allergy and immunology, and nutrition.",
    description: [
      "Nelson Medical Complex brings together doctors across various medical specialties, including cardiology, dermatology, rheumatology, endocrinology, allergy and immunology, and nutrition. Find a specialist suited to your health concerns and connect directly with the doctor for consultation and appointment details.",
    ],
    department: "Specialist Care",
    note: "Specialist availability and consultation schedules may vary.",
    nextStep: {
      heading: "How to book",
      text: "Explore our specialists, review their profiles and contact your preferred doctor directly to arrange an appointment.",
    },
    cta: { label: "Find a Specialist", target: "doctors" },
    icon: "users",
    status: "verified",
  },
  {
    slug: "report-collection",
    title: "Report Collection & Queries",
    summary: "Help with collecting laboratory reports, reporting times and general laboratory queries.",
    description: [
      "Need to collect your laboratory reports or ask about their availability? Our laboratory team can guide you on report collection, expected reporting times and general laboratory-related queries.",
    ],
    department: "Laboratory",
    note: "For explanations of test results or medical advice, please consult your treating doctor.",
    nextStep: {
      heading: "How to arrange",
      text: "For report collection, please contact our laboratory.",
    },
    cta: { label: "Contact Laboratory", target: "laboratory" },
    icon: "file-text",
    status: "verified",
  },
];
