import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: site.colors.white,
    theme_color: site.colors.secondary,
    icons: [{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
