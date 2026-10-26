import type { Metadata } from "next";
import { site } from "@/data/site";
import { absoluteUrl, addressLines } from "@/lib/utils";

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/about/". */
  path: string;
  /** Use the title exactly as given (skips the "| Nelson Lab…" template). */
  absoluteTitle?: boolean;
}

/** Builds unique, canonical page metadata from a single helper. */
export function pageMetadata({ title, description, path, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : site.seo.titleTemplate.replace("%s", title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: site.seo.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [site.seo.ogImage],
    },
  };
}

/**
 * Organization structured data. Only properties that are confirmed in
 * `site.ts` are included — empty values are omitted, never invented.
 */
export function organizationJsonLd() {
  const lines = addressLines();
  const { contact } = site;

  return {
    "@context": "https://schema.org",
    "@type": site.schemaType,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    ...(site.logo.available ? { logo: absoluteUrl(site.logo.src) } : {}),
    ...(contact.phones.length ? { telephone: contact.phones[0].tel } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(lines.length && contact.city
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.addressLines.join(", "),
            addressLocality: contact.city,
            ...(contact.region ? { addressRegion: contact.region } : {}),
            ...(contact.postalCode ? { postalCode: contact.postalCode } : {}),
            ...(contact.country ? { addressCountry: contact.country } : {}),
          },
        }
      : {}),
    ...(site.social.some((link) => link.href)
      ? { sameAs: site.social.flatMap((link) => (link.href ? [link.href] : [])) }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
    })),
  };
}
