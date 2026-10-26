/**
 * Post-build fix for Next.js 16.4 static export (runs automatically after `npm run build`).
 *
 * The exporter writes nested route-segment prefetch files into folders, e.g.
 *   out/appointments/__next.appointments/__PAGE__.txt
 * but the client router requests them with dot-separated names, e.g.
 *   /appointments/__next.appointments.__PAGE__.txt
 * which 404s on a plain static host and forces a full page load on navigation.
 *
 * This script writes a copy of each nested file under the flat, dot-separated
 * name the client expects. Original files are left untouched. It is safe to
 * remove once a Next.js release emits matching file names.
 */
import { copyFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../out", import.meta.url));

async function filesUnder(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await filesUnder(full)));
    else files.push(full);
  }
  return files;
}

async function walk(dir) {
  let copied = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);

    if (entry.name.startsWith("__next.")) {
      for (const file of await filesUnder(full)) {
        const relative = path.relative(dir, file).split(path.sep).join(".");
        const target = path.join(dir, relative);
        if (!(await stat(target).catch(() => null))) {
          await copyFile(file, target);
          copied++;
        }
      }
    } else {
      copied += await walk(full);
    }
  }
  return copied;
}

if (!(await stat(outDir).catch(() => null))) {
  console.error("fix-export-segments: out/ not found — run `next build` first.");
  process.exit(1);
}

const count = await walk(outDir);
console.log(`fix-export-segments: wrote ${count} flattened segment file(s).`);
