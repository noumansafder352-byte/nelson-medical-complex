/**
 * Generates brand images from the official logo (the logo file itself is never modified):
 *
 *   public/opengraph-image.png   1200x630 social sharing image
 *   src/app/icon.png             512x512 favicon (the "Ni" mark, transparent)
 *   src/app/apple-icon.png       180x180 home-screen icon (mark on white)
 *   public/icons/icon-512.png    512x512 icon referenced by the web manifest
 *
 *   npm run generate:images
 *
 * Re-run if the logo file changes. MARK is the pixel box of the "Ni" symbol
 * inside public/images/branding/official-logo.png.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const NAVY = "#29176F";
const RED = "#DA251C";
const WHITE = "#FFFFFF";

const LOGO = { width: 2169, height: 725, visible: { x: 54, y: 154, width: 2065, height: 454 } };
const MARK = { x: 55, y: 159, width: 444, height: 422 };

const root = new URL("../", import.meta.url);
const logoData = `data:image/png;base64,${(await readFile(new URL("public/images/branding/official-logo.png", root))).toString("base64")}`;

async function save(relativePath, element, size) {
  const target = new URL(relativePath, root);
  await mkdir(new URL(".", target), { recursive: true });
  const image = new ImageResponse(element, size);
  await writeFile(target, Buffer.from(await image.arrayBuffer()));
  console.log(`Wrote ${fileURLToPath(target)}`);
}

/** Crops a square around the mark, with `padding` (fraction of the side) around it. */
function markElement(side, padding, background) {
  const inner = side * (1 - padding * 2);
  const scale = inner / Math.max(MARK.width, MARK.height);

  // Outer square centres an inner box clipped to exactly the mark, so no
  // neighbouring lettering ("NELSON") can show at the edges.
  return h(
    "div",
    { style: { width: side, height: side, display: "flex", alignItems: "center", justifyContent: "center", background } },
    h(
      "div",
      {
        style: {
          width: MARK.width * scale,
          height: MARK.height * scale,
          display: "flex",
          position: "relative",
          overflow: "hidden",
        },
      },
      h("img", {
        src: logoData,
        width: LOGO.width * scale,
        height: LOGO.height * scale,
        style: { position: "absolute", left: -MARK.x * scale, top: -MARK.y * scale },
      }),
    ),
  );
}

// Social sharing image: logo on white, navy band with the tagline.
const ogLogoWidth = 900;
const ogScale = ogLogoWidth / LOGO.visible.width;
const og = h(
  "div",
  { style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", background: WHITE, fontFamily: "sans-serif" } },
  h(
    "div",
    { style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center" } },
    h(
      "div",
      {
        style: {
          width: ogLogoWidth,
          height: LOGO.visible.height * ogScale,
          display: "flex",
          position: "relative",
          overflow: "hidden",
        },
      },
      h("img", {
        src: logoData,
        width: LOGO.width * ogScale,
        height: LOGO.height * ogScale,
        style: { position: "absolute", left: -LOGO.visible.x * ogScale, top: -LOGO.visible.y * ogScale },
      }),
    ),
  ),
  h("div", { style: { height: 10, background: RED, display: "flex" } }),
  h(
    "div",
    {
      style: {
        height: 150,
        background: NAVY,
        color: WHITE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40,
        fontWeight: 600,
      },
    },
    "Laboratory testing and medical services",
  ),
);

await save("public/opengraph-image.png", og, { width: 1200, height: 630 });
await save("src/app/icon.png", markElement(512, 0.04, "transparent"), { width: 512, height: 512 });
await save("public/icons/icon-512.png", markElement(512, 0.1, WHITE), { width: 512, height: 512 });
await save("src/app/apple-icon.png", markElement(180, 0.1, WHITE), { width: 180, height: 180 });
