import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { appointmentCta, mainNavigation } from "@/data/navigation";
import { cn, telHref } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Container } from "@/components/layout/Container";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

/** Phone numbers and email: "bar" for the header top bar, "stack" for the mobile menu. */
function QuickContact({ layout }: { layout: "bar" | "stack" }) {
  const { phones, email } = site.contact;
  if (!phones.length && !email) return null;

  const bar = layout === "bar";
  const link = cn(
    "transition-colors hover:text-brand-red hover:underline hover:underline-offset-4",
    bar ? "font-medium text-ink/80" : "font-semibold text-brand-navy",
  );
  const icon = cn("shrink-0 text-brand-red", bar ? "size-3.5" : "size-4");

  return (
    <ul className={cn("flex", bar ? "items-center gap-x-6" : "flex-col gap-3")}>
      {phones.length ? (
        <li className="flex items-center gap-2">
          <Phone aria-hidden="true" className={icon} />
          <span className="flex items-center gap-1.5">
            {phones.map((number, index) => (
              <span
                key={number.tel}
                // In the top bar, only the main number is shown on small phones.
                className={cn("items-center gap-1.5", index > 0 && bar ? "hidden sm:inline-flex" : "inline-flex")}
              >
                {index > 0 ? <span aria-hidden="true" className="text-subtle/60">·</span> : null}
                <a href={telHref(number.tel)} className={link}>
                  {number.display}
                </a>
              </span>
            ))}
          </span>
        </li>
      ) : null}
      {email ? (
        <li className={cn("items-center gap-2", bar ? "hidden md:flex" : "flex")}>
          <Mail aria-hidden="true" className={icon} />
          <a href={`mailto:${email}`} className={link}>
            {email}
          </a>
        </li>
      ) : null}
    </ul>
  );
}

/**
 * Top row of the header: contact details left, social icons right.
 * Shares the header's frosted background. Its height is --topbar-height,
 * which heroes include (via --header-total) when sliding under the header.
 */
function TopBar() {
  return (
    <div className="border-b border-brand-navy/10 text-[0.82rem]">
      <Container className="flex h-(--topbar-height) items-center justify-between gap-4">
        <QuickContact layout="bar" />
        {site.social.length ? (
          <ul aria-label="Social media" className="flex items-center gap-1.5">
            {site.social.map((link) => (
              <li key={link.platform}>
                <SocialIcon
                  link={link}
                  iconClassName="size-3.5"
                  className="grid size-7 place-items-center rounded-full border border-brand-navy/15 text-brand-navy transition-colors hover:border-brand-navy hover:bg-brand-navy hover:text-white"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 isolate">
      {/* Frosted "mirror" layer behind both rows. Kept on a sibling element: a backdrop-filter
          on the header itself would trap the full-screen mobile menu inside the header box. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-white/50 bg-white/75 shadow-[0_8px_30px_-12px_rgb(41_23_111/0.25)] backdrop-blur-xl backdrop-saturate-150"
      />
      <TopBar />
      <Container className="flex h-(--header-height) items-center justify-between gap-6">
        <Logo priority />
        <DesktopNavigation items={mainNavigation} />
        <div className="flex items-center gap-3">
          {/* Wrapper controls visibility: the button's own display class would override `hidden`. */}
          <div className="hidden sm:block">
            <ButtonLink href={appointmentCta.href}>{appointmentCta.label}</ButtonLink>
          </div>
          <MobileNavigation
            items={mainNavigation}
            cta={appointmentCta}
            logo={<Logo />}
            footer={<QuickContact layout="stack" />}
          />
        </div>
      </Container>
    </header>
  );
}
