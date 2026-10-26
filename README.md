# Nelson Lab & Medical Complex — Website

A multi-page, fully static website for **Nelson Lab & Medical Complex**, built with Next.js (App Router) and exported to plain HTML/CSS/JS. It can be hosted on any static host (cPanel, Vercel, Netlify, S3 and similar). No Node.js server is needed in production.

> **Before launch:** the site contains no invented business details. The address, phone, email, opening hours, photos, doctors and confirmed services must be supplied. See [Launch checklist](#launch-checklist).

---

## Technology stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, `output: "export"`) |
| UI | React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 with CSS design tokens in `src/app/globals.css` |
| Icons | Lucide React (one icon library throughout) |
| Fonts | Inter (body) and Plus Jakarta Sans (headings) via `next/font`, self-hosted at build time |
| Linting | ESLint 9 with `eslint-config-next` |

The only runtime dependencies are `next`, `react`, `react-dom` and `lucide-react`.

## Prerequisites

- Node.js **20.9 or newer** (tested with Node 24)
- npm 10 or newer

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm run build` | Build the static site into `out/` (also runs the post-build fix below) |
| `npm run check` | Lint, type-check and build in one go |
| `npm run preview` | Serve `out/` locally at http://localhost:3000 to test the exported site |
| `npm run generate:images` | Regenerate the sharing image and icons from the official logo |

## Project structure

```text
public/
  images/                 Photos go here (branding/, hero/, laboratory/, facilities/, …)
  images/branding/official-logo.png   The official logo (unmodified)
  icons/icon-512.png      Web-manifest icon (generated from the logo)
  opengraph-image.png     Social sharing image, 1200×630 (generated from the logo)
scripts/
  generate-brand-images.mjs  Builds the sharing image, favicon and app icons from the logo
  fix-export-segments.mjs Post-build fix for Next 16.4 static export (see Known limitations)
src/
  app/                    Routes, root layout, global styles, sitemap, robots, manifest, icon
  components/
    layout/               Header, Desktop/MobileNavigation, Footer, Logo, Container, Breadcrumbs
    sections/             Page sections (HomeHero, PageHero, FAQSection, ContactCTA, ServiceCatalog, …)
    cards/                ServiceCard, DoctorCard, FeatureCard
    forms/                ContactForm, AppointmentForm, shared submission hook
    ui/                   Button, Input, Select, Textarea, Checkbox, Accordion, Icon, MediaFrame, …
  data/                   ALL editable content (see below)
  lib/                    utils, metadata/SEO helpers, form validation, constants
  types/                  Shared TypeScript types
```

## Editing content

All business information and copy lives in `src/data/`. Components read from these files, so you never need to edit a layout to change content. Search the project for `TODO(business)` to find every value still waiting to be filled in.

| File | Contents |
| --- | --- |
| `site.ts` | **Single source of truth.** Name, logo, contact details, opening hours, social links, map, SEO defaults, form settings, structured-data type, content notices |
| `navigation.ts` | Header and footer links |
| `laboratory-services.ts` | Test categories and tests |
| `medical-services.ts` | Consultations and patient services |
| `doctors.ts` | Medical team profiles (empty until confirmed) |
| `faqs.ts` | FAQ categories and answers |
| `content.ts` | Homepage and About copy: hero, specialties, specialists, "Your Visit" steps, mission, vision, values, quality approach |
| `images.ts` | Image registry (paths, alt text, sizes) |

### Business details

Fill in `site.contact`, `site.openingHours`, `site.social` and `site.map` in `src/data/site.ts`. Anything left as `null` or `[]` is **hidden**. The site never shows placeholder phone numbers or addresses. Once a value is set, it appears automatically in the top bar, footer, contact page, appointment page, mobile menu and structured data. `contact.phones` takes several numbers (main number first): `display` is shown on the site and `tel` (international format) is used for tap-to-call links.

### Services and FAQs

- **Add a test:** copy a record in `laboratory-services.ts` and give it a unique `slug` and a valid `categoryId`. A card on the Laboratory Services page, an entry in the Services menu and an option in the appointment form are created automatically. Tests and medical services have no individual pages; menu links jump to the item on its overview page (for example `/laboratory-services/#hba1c`).
- **Remove a test:** delete its record.
- Every record has a `status` of `"sample"` or `"verified"`. While any visible record is `"sample"` and `site.showContentNotices` is `true`, the page shows a short "details are being confirmed" notice. Mark records `"verified"` once the facility confirms them. When everything is verified, set `showContentNotices: false`.
- Only add `preparation` and `sampleRequirements` that the laboratory has confirmed. When they are absent, pages tell patients to contact the team. They never guess.
- Only FAQs marked `"verified"` are published as FAQ structured data.

### Doctors

`doctors.ts` is empty on purpose. While it is empty, the Doctors link is hidden from the navigation, the page shows a "coming soon" message, and it is excluded from the sitemap and marked `noindex`. Add confirmed profiles (shape documented in the file) and all of this switches on automatically.

### Logo

The official logo is at `public/images/branding/official-logo.png`, unmodified (transparent PNG, 2169×725). It is configured in `site.logo`:

- `visibleArea` is the pixel box of the artwork inside the file. The file has wide transparent margins, and the `Logo` component trims them with CSS, so the file itself is never edited.
- The logo's navy lettering is not legible on navy, so the footer shows it on a white plate. If a version designed for dark backgrounds is supplied, add it and set `logo.darkSrc`.

The favicon (`src/app/icon.png`), Apple touch icon (`src/app/apple-icon.png`), manifest icon and social sharing image are all generated from the logo by `npm run generate:images`. The icons use the "Ni" mark.

**To replace the logo:** overwrite the file, update `width`, `height` and `visibleArea` in `site.ts`, update the `LOGO` and `MARK` boxes at the top of `scripts/generate-brand-images.mjs`, then run `npm run generate:images`. If the logo file is missing, set `logo.available: false` and the site shows the business name as plain text.

### Images

No facility photos were supplied, so `src/data/images.ts` has `src: null` for every slot and the site shows branded artwork panels instead. To add a photo, put it under `public/images/<folder>/` (WebP or JPEG, about 1600px wide), then set `src`, the real `width` and `height`, and accurate `alt` text. Use only photos of the actual facility or properly licensed stock.

**Homepage hero:** supplied. `public/images/hero/hero.webp` (73 KB, converted from the original PNG kept in `design-assets/hero-original.png`, which is not published). It sits under a 75% navy overlay so the white text keeps about 7:1 contrast. To replace it, add a new image (about 1600–1920px wide, WebP) and update `images.hero` in `src/data/images.ts`.

Still required: about (reception), laboratory (lab bench), facilities (sample collection room), medical (consultation room), patient (reception welcome).

## SEO

- **Domain:** set `NEXT_PUBLIC_SITE_URL` (for example `https://www.nelsonlab.com`, no trailing slash) in `.env.local` **and** in your build environment. Canonical URLs, Open Graph URLs, `sitemap.xml` and `robots.txt` are all built from it. It defaults to `https://www.example.com`, so **set it before building for production**.
- Each page sets a unique title, description and canonical URL through `pageMetadata()` in `src/lib/metadata.ts`.
- `sitemap.xml`, `robots.txt` and `manifest.webmanifest` are generated at build time.
- **Structured data:** `Organization` JSON-LD includes only the fields filled in `site.ts`; breadcrumbs use `BreadcrumbList`. After the facility type is confirmed, change `site.schemaType` to `DiagnosticLab`, `MedicalClinic` or `MedicalOrganization`.
- **Social image:** `public/opengraph-image.png`, generated from the logo by `npm run generate:images`. You can also replace it with a designed 1200×630 image.

## Forms (contact and appointment inquiry)

A static site cannot send email by itself, so the forms post to an external form service. **Until an endpoint is configured, each form shows a clear "online submissions are not available yet" notice and its submit button is disabled.** Nothing pretends to send.

### Connecting Formspree (or any compatible service)

1. Create two forms at https://formspree.io (one for contact, one for appointments).
2. Copy each form's endpoint (for example `https://formspree.io/f/abcd1234`).
3. Set these in `.env.local` and in your hosting/build environment:
   ```
   NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   NEXT_PUBLIC_APPOINTMENT_FORM_ENDPOINT=https://formspree.io/f/yyyyyyy
   ```
4. Rebuild (`npm run build`). These values are baked in at build time.
5. In Formspree, restrict submissions to your domain and enable its spam filtering.
6. Send a test submission from the live site and confirm it arrives.

How submission works:

- Forms send JSON via `POST` with `Accept: application/json`. Any service that accepts JSON and returns a 2xx status works the same way.
- A success message appears **only** after the service returns a 2xx response. Network or server errors show an error message with direct contact details.
- **Spam protection:** a hidden honeypot field (`_gotcha`, recognised by Formspree) and a minimum fill time of 3 seconds. Add the provider's CAPTCHA if spam becomes a problem.
- **Data minimisation:** the forms ask only for name, phone, email, service, preferred date and a short message, and warn users not to send medical details. Nothing is stored in the browser.
- The appointment success message states clearly that the appointment is **not yet confirmed**.

Endpoint URLs are public identifiers, not secrets. Never put API keys or secrets in any `NEXT_PUBLIC_` variable.

## Building the static export

```bash
npm run lint
npm run typecheck
npm run build      # outputs to out/
npm run preview    # optional: check the exported site locally
```

## Deployment

### Namecheap / cPanel (Apache)

1. Set `NEXT_PUBLIC_SITE_URL` (and the form endpoints) in `.env.local`, then run `npm run build` on your computer.
2. In cPanel, open **File Manager** and go to the domain's document root (usually `public_html/`, or the folder set for an addon domain).
3. Upload the **contents** of `out/` (not the `out` folder itself), so `index.html` sits directly in the document root. Uploading a zip and using **Extract** is fastest.
4. Make sure hidden and underscore-prefixed folders (`_next/`) were uploaded.
5. Enable HTTPS: **SSL/TLS Status → Run AutoSSL**. Then force HTTPS with **Domains → Force HTTPS Redirect**, or add this to `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ErrorDocument 404 /404.html
   ```
6. No Node.js app setup is needed in cPanel.

Because `trailingSlash: true` is set, every page is exported as `folder/index.html` (for example `out/about/index.html`). Apache serves these for `/about/` without rewrite rules, and refreshing any page works.

### Vercel

1. Push the project to GitHub, GitLab or Bitbucket and import it in Vercel.
2. Framework preset: **Next.js**. Build command `npm run build`. Vercel detects `output: "export"` and serves `out/` as static files.
3. Add the environment variables from `.env.example` under **Settings → Environment Variables**, then redeploy.
4. Add your domain under **Settings → Domains**. HTTPS is automatic.

### After deploying, verify

- [ ] Home and nested routes load, for example `/laboratory-services/` and `/contact/`
- [ ] Refreshing a nested page works (no 404)
- [ ] CSS, fonts and images load (check the browser console for 404s)
- [ ] An unknown URL shows the branded 404 page
- [ ] `https://your-domain/sitemap.xml` and `/robots.txt` use the real domain
- [ ] Page source shows `<link rel="canonical">` with the real domain
- [ ] A test form submission arrives (once forms are connected)
- [ ] `tel:` and `mailto:` links work on a phone (once details are added)

## Launch checklist

**Business details** (`src/data/site.ts`)
- [x] Official logo, favicon and sharing image
- [ ] Street address, city, region, postal code, country
- [x] Phone numbers (051 5564788, 0308 5000489) and email (contact@nelson.com.pk)
- [ ] WhatsApp number (optional)
- [ ] Opening hours
- [ ] Google Maps embed URL and directions link
- [ ] Social profile URLs for Facebook, Instagram, X and LinkedIn (`site.social`, `href`). The icons already show in the top bar and footer but are not linked until a URL is set.
- [ ] Confirm the appointment process wording (`appointmentInstructions`)
- [ ] Production domain in `NEXT_PUBLIC_SITE_URL`
- [ ] `schemaType` once the facility type is confirmed

**Content**
- [ ] Confirm, edit or remove every laboratory test; mark as `"verified"`
- [ ] Confirm medical services and specialties; mark as `"verified"`
- [ ] Doctor profiles (only real, confirmed data)
- [ ] Confirm the FAQ answers
- [ ] Tag each specialist with their `specialties` (Specialists page filter)
- [ ] Review About copy (mission, vision, values, quality approach)
- [ ] Add accreditation or quality-scheme details **only if verified**
- [ ] Facility photos (see [Images](#images))
- [ ] Set `showContentNotices: false` once everything is verified

**Legal**
- [ ] Decide whether to publish a Privacy Policy, Terms, Cookie Policy and Medical Disclaimer (removed for now, see Known limitations), and have them prepared for your jurisdiction

**Integrations**
- [ ] Form endpoints configured and tested

## Third-party services

| Service | Status | Notes |
| --- | --- | --- |
| Form provider (e.g. Formspree) | Not configured | Receives form submissions |
| Google Maps embed | Not configured | Loaded only when `site.map.embedUrl` is set; Google may set its own cookies |
| Google Fonts | Build time only | `next/font` downloads the fonts during the build and self-hosts them; no requests to Google at runtime |
| Analytics / advertising | None | None installed. If you add any, publish a cookie policy and add a consent mechanism where required |

## Known limitations

- **Forms** need an external service. Without one they show a notice and cannot submit.
- **No server features:** no API routes, server actions, redirects, headers or rewrites. HTTPS redirects and security headers are configured on the host.
- **Images** use `unoptimized: true` (required for static export). Supply appropriately sized and compressed files.
- **Post-build fix:** Next.js 16.4's static export writes nested route-segment prefetch files into folders (`__next.about/__PAGE__.txt`), but the browser router requests dot-separated names (`__next.about.__PAGE__.txt`). Without a fix, those requests return 404 and each in-site link falls back to a full page load. `scripts/fix-export-segments.mjs` runs automatically after `npm run build` and writes copies under the expected names. It can be removed once a later Next.js release fixes the mismatch.
- **Content is sample copy** until confirmed (see the launch checklist). No prices, turnaround times or test-preparation instructions are published.
- **No legal pages.** The Privacy Policy, Terms and Conditions, Cookie Policy and Medical Disclaimer were removed at the client's request. The forms still ask for consent to use the visitor's details to respond, and the service pages still say the content is not medical advice. Many jurisdictions require a privacy notice wherever personal data is collected, so consider restoring at least a Privacy Policy before connecting the forms. To restore them, add route folders under `src/app/` and link them from the footer in `src/components/layout/Footer.tsx`.
