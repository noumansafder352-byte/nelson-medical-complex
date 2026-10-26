/**
 * Shared types for all editable site content.
 *
 * `ContentStatus` marks whether a record has been confirmed by Nelson Lab &
 * Medical Complex ("verified") or is editable sample copy awaiting
 * confirmation ("sample"). Sample records trigger an on-page notice while
 * `site.showContentNotices` is enabled.
 */
export type ContentStatus = "verified" | "sample";

export type IconName =
  | "activity"
  | "apple"
  | "audio-waveform"
  | "award"
  | "badge-check"
  | "bone"
  | "briefcase-medical"
  | "building"
  | "calendar"
  | "clipboard"
  | "clock"
  | "dna"
  | "droplet"
  | "droplets"
  | "file-text"
  | "flask"
  | "hand-heart"
  | "handshake"
  | "heart-pulse"
  | "info"
  | "landmark"
  | "list-checks"
  | "magnet"
  | "mail"
  | "map-pin"
  | "message"
  | "microscope"
  | "person-standing"
  | "phone"
  | "pill"
  | "radiation"
  | "route"
  | "scan-face"
  | "scan-line"
  | "search"
  | "shield"
  | "shield-plus"
  | "stethoscope"
  | "store"
  | "syringe"
  | "test-tube"
  | "test-tubes"
  | "trophy"
  | "user"
  | "users";

export interface NavItem {
  label: string;
  href: string;
  /** Optional icon, used in dropdown menus. */
  icon?: IconName;
  /** Shown as plain text (no link), e.g. while the page is not ready. */
  disabled?: boolean;
}

/** A column in a dropdown menu: an overview page plus its individual pages. */
export interface NavGroup {
  /** Short label shown above the title, e.g. "Diagnostics". */
  eyebrow: string;
  label: string;
  href: string;
  description: string;
  icon: IconName;
  /** Label for the "view all" link to the overview page. */
  viewAllLabel: string;
  /** Noun for the link count badge, e.g. "tests" → "10 tests". */
  countLabel: string;
  links: NavItem[];
  /** Column is still shown, but its entries are plain text (no links), e.g. while the pages are not ready. */
  disabled?: boolean;
}

/** A top-level menu entry that opens a dropdown instead of linking directly. */
export interface NavMenu {
  label: string;
  groups: NavGroup[];
  /** Menu still opens, but its entries are plain text (no links), e.g. while the pages are not ready. */
  disabled?: boolean;
}

export type MainNavEntry = NavItem | NavMenu;

export interface OpeningHoursEntry {
  days: string;
  hours: string;
}

export type SocialPlatform = "facebook" | "instagram" | "x" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Profile URL. While null the icon is shown but not linked. */
  href: string | null;
}

export interface PhoneNumber {
  /** As shown on the site, e.g. "051 5564788". */
  display: string;
  /** International format for tel: links, e.g. "+92515564788". */
  tel: string;
}

export interface ContactDetails {
  /** Street address lines, e.g. ["Building name", "Street"]. Empty until confirmed. */
  addressLines: string[];
  city: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  /** Phone numbers, main number first. Empty until confirmed. */
  phones: PhoneNumber[];
  /** WhatsApp number in international format without "+" or spaces. */
  whatsapp: string | null;
  email: string | null;
}

export type SchemaType = "Organization" | "MedicalOrganization" | "MedicalClinic" | "DiagnosticLab";

export interface SiteConfig {
  name: string;
  shortName: string;
  url: string;
  locale: string;
  description: string;
  tagline: string;
  logo: {
    /** Set to true once the official logo file exists at `src`. */
    available: boolean;
    src: string;
    /** Optional variant for dark backgrounds. Leave null to show the logo on a white plate. */
    darkSrc: string | null;
    width: number;
    height: number;
    /**
     * Pixel box of the visible artwork inside the file. Lets the component
     * trim transparent margins with CSS without editing the original file.
     * Null to display the whole file.
     */
    visibleArea: { x: number; y: number; width: number; height: number } | null;
    alt: string;
  };
  colors: {
    primary: string;
    secondary: string;
    white: string;
  };
  contact: ContactDetails;
  openingHours: OpeningHoursEntry[];
  appointmentInstructions: string[];
  social: SocialLink[];
  map: {
    /** Google Maps "Embed a map" iframe src. Only set once the address is confirmed. */
    embedUrl: string | null;
    directionsUrl: string | null;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    ogImage: string;
  };
  forms: {
    contactEndpoint: string | null;
    appointmentEndpoint: string | null;
  };
  /** Structured data type. Keep "Organization" until the facility type is confirmed. */
  schemaType: SchemaType;
  /** Shows notices on pages whose content is still sample copy. */
  showContentNotices: boolean;
}

export interface SiteImage {
  /** Path inside /public, or null while a licensed photo has not been supplied. */
  src: string | null;
  alt: string;
  width: number;
  height: number;
  /** Icon shown on the branded artwork used until a photo is supplied. */
  icon: IconName;
}

export interface LabServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: IconName;
}

export interface LabService {
  slug: string;
  name: string;
  categoryId: string;
  /** Optional icon; falls back to the category's icon. */
  icon?: IconName;
  /** Optional photo shown at the top of the card on the Laboratory Services page. */
  image?: { src: string; alt: string };
  summary: string;
  description: string[];
  /** Only add preparation guidance that has been confirmed by the laboratory. */
  preparation?: string[];
  /** Only add sample requirements that have been confirmed by the laboratory. */
  sampleRequirements?: string[];
  status: ContentStatus;
}

export interface MedicalService {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  /** Short label shown above the title, e.g. "Consultation". */
  department?: string;
  /** Short highlighted note, e.g. about availability or scope. */
  note?: string;
  /** "How to book" panel at the foot of the card. */
  nextStep: { heading: string; text: string };
  /** Where the card's button leads: the doctors listing or the laboratory's phone line. */
  cta: { label: string; target: "doctors" | "laboratory" };
  icon: IconName;
  status: ContentStatus;
}

/** A visiting specialist shown in the homepage doctors carousel and its profile popup. */
export interface Specialist {
  slug: string;
  name: string;
  /** Short line shown under the name on the card. */
  headline: string;
  /** Path inside /public. */
  photo: string;
  qualifications: string[];
  roles: string[];
  about?: string;
  /** Slugs from `specialties.items` (data/content.ts) used by the Specialists page filter. */
  specialties?: string[];
  phone: PhoneNumber;
}

/** A specialty card in the homepage "Specialties" carousel; also a filter on the Specialists page. */
export interface Specialty {
  slug: string;
  name: string;
  icon: IconName;
  image: string;
}

export interface FaqCategory {
  id: string;
  name: string;
}

export interface FaqItem {
  id: string;
  categoryId: string;
  question: string;
  answer: string[];
  status: ContentStatus;
}

export interface Feature {
  title: string;
  description: string;
  icon: IconName;
}
