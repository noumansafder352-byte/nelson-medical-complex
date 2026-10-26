import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about/", priority: 0.8 },
    { path: "/laboratory-services/", priority: 0.9 },
    { path: "/medical-services/", priority: 0.9 },
    { path: "/appointments/", priority: 0.8 },
    { path: "/specialists/", priority: 0.8 },
    { path: "/contact/", priority: 0.8 },
  ];

  return pages.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
