import { site } from "@/data/site";

/** Joins class names, ignoring falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Absolute URL for a site path, using the configured production domain. */
export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Full postal address as lines, or an empty array if not yet confirmed. */
export function addressLines() {
  const { addressLines: lines, city, region, postalCode, country } = site.contact;
  const locality = [city, region, postalCode].filter(Boolean).join(", ");
  return [...lines, locality, country].filter((line): line is string => Boolean(line));
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

export function hasAnyContactDetail() {
  const { phones, email, whatsapp } = site.contact;
  return Boolean(phones.length || email || whatsapp || addressLines().length);
}

export function initials(name: string) {
  return name
    .replace(/^(dr\.?|prof\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** True when at least one record is still sample content and notices are enabled. */
export function needsContentNotice(records: Array<{ status: "verified" | "sample" }>) {
  return site.showContentNotices && records.some((record) => record.status === "sample");
}
