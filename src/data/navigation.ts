import type { MainNavEntry, NavGroup, NavItem, NavMenu } from "@/types";
import { getLabServiceIcon, labServices } from "@/data/laboratory-services";
import { medicalServices } from "@/data/medical-services";

/** Service groups shown in the "Services" dropdown — built from the service data files. */
export const serviceGroups: NavGroup[] = [
  {
    eyebrow: "Diagnostics",
    label: "Laboratory Services",
    href: "/laboratory-services/",
    description: "Pathology, PCR, radiology & imaging, and physiotherapy.",
    icon: "test-tubes",
    // Kept short: it sits in a single dropdown column.
    viewAllLabel: "View all services",
    countLabel: "services",
    links: labServices.map((service) => ({
      label: service.name,
      href: `/laboratory-services/#${service.slug}`,
      icon: getLabServiceIcon(service),
    })),
  },
  {
    eyebrow: "Care",
    label: "Medical Services",
    href: "/medical-services/",
    description: "Consultations and patient services at our facility.",
    icon: "stethoscope",
    viewAllLabel: "View all medical services",
    countLabel: "services",
    links: medicalServices.map((service) => ({
      label: service.title,
      href: `/medical-services/#${service.slug}`,
      icon: service.icon,
    })),
    // TODO(relink): shown as plain text until this page is ready. To reconnect: remove `disabled: true`.
    disabled: true,
  },
];

export const servicesMenu: NavMenu = {
  label: "Services",
  groups: serviceGroups,
};

/** Primary header navigation. */
export const mainNavigation: MainNavEntry[] = [
  { label: "Home", href: "/" },
  // TODO(relink): shown as plain text until this page is ready. To reconnect: remove `disabled: true`.
  { label: "About", href: "/about/", disabled: true },
  servicesMenu,
  { label: "Specialists", href: "/specialists/" },
  { label: "Contact", href: "/contact/" },
];

export const appointmentCta: NavItem = {
  label: "Book an Appointment",
  href: "/appointments/",
};

export const footerNavigation: { title: string; links: NavItem[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Laboratory Services", href: "/laboratory-services/" },
      { label: "Medical Services", href: "/medical-services/" },
      { label: "Book an Appointment", href: "/appointments/" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Our Specialists", href: "/specialists/" },
      { label: "About Us", href: "/about/" },
      { label: "Contact Us", href: "/contact/" },
    ],
  },
];
