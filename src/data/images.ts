import type { SiteImage } from "@/types";

/**
 * Image registry.
 *
 * Entries with `src: null` show branded artwork until a photo is supplied
 * (the homepage hero photo has been supplied). To use a photo:
 *   1. Add the file under public/images/<folder>/ (WebP or JPEG, ~1600px wide).
 *   2. Set `src` to its path (e.g. "/images/hero/reception.webp").
 *   3. Set the real `width` and `height` and write accurate `alt` text.
 * Only use photos of the actual facility or properly licensed stock images.
 */
export const images = {
  hero: {
    // Homepage hero background (decorative). Original PNG kept in design-assets/.
    src: "/images/hero/hero.webp",
    alt: "",
    width: 1672,
    height: 941,
    icon: "microscope",
  },
  about: {
    src: "/images/facilities/nelson-medical-complex-building.webp",
    alt: "Exterior of the Nelson Medical Complex building with its rooftop sign and emergency entrance",
    width: 768,
    height: 481,
    icon: "building",
  },
  leadership: {
    // Original PNG kept in design-assets/.
    src: "/images/leadership/imran-rashid.webp",
    alt: "Portrait of Ch. Imran Rashid, Chief Executive Officer of Nelson Medical Complex",
    width: 1024,
    height: 1536,
    icon: "user",
  },
  laboratory: {
    src: null,
    alt: "Laboratory workspace at Nelson Lab & Medical Complex",
    width: 1600,
    height: 1200,
    icon: "test-tubes",
  },
  facilities: {
    src: null,
    alt: "Sample collection room at Nelson Lab & Medical Complex",
    width: 1600,
    height: 1200,
    icon: "syringe",
  },
  medical: {
    // Original PNG kept in design-assets/.
    src: "/images/medical/medical-consultation.webp",
    alt: "A doctor in a white coat talking with a patient across the desk in a consultation room",
    width: 1553,
    height: 941,
    icon: "stethoscope",
  },
  combinedCare: {
    // Medical Services "Joined-up care" section. Original PNG kept in design-assets/.
    src: "/images/medical-services/consultation-and-laboratory.webp",
    alt: "A consultation room with an examination couch beside a laboratory bench with sample tubes, analysers and a microscope",
    width: 1254,
    height: 1254,
    icon: "stethoscope",
  },
  patient: {
    src: null,
    alt: "Patient being welcomed at the reception desk",
    width: 1600,
    height: 1200,
    icon: "hand-heart",
  },
} satisfies Record<string, SiteImage>;
