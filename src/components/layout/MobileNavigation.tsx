"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import type { MainNavEntry, NavItem, NavMenu } from "@/types";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isActivePath, isCurrentPage, isMenuActive, isNavMenu } from "@/components/layout/nav-utils";

/** A link, or plain text when the menu is disabled. */
function MenuLink({ disabled, className, ...props }: ComponentProps<typeof Link> & { disabled?: boolean }) {
  if (disabled) return <span className={className}>{props.children}</span>;
  return <Link className={className} {...props} />;
}

/** Expandable "Services" section inside the mobile menu. Starts open on a services page. */
function MobileSubmenu({ menu, pathname }: { menu: NavMenu; pathname: string | null }) {
  const active = isMenuActive(pathname, menu);
  const [expanded, setExpanded] = useState(active);
  const panelId = useId();

  return (
    <li>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
        className={cn(
          "flex min-h-14 w-full items-center justify-between gap-3 py-3 text-left text-lg font-semibold",
          active ? "text-brand-red" : "text-brand-navy",
        )}
      >
        {menu.label}
        <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform duration-200", expanded && "rotate-180")} />
      </button>

      <div id={panelId} hidden={!expanded} className="space-y-5 pb-5">
        {menu.groups.map((group) => (
          <div key={group.href} className="rounded-md bg-canvas p-4">
            <MenuLink
              disabled={menu.disabled || group.disabled}
              href={group.href}
              aria-current={isCurrentPage(pathname, group.href) ? "page" : undefined}
              className="flex min-h-11 items-center gap-3 font-display font-bold text-brand-navy"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-white text-brand-navy">
                <Icon name={group.icon} className="size-5" />
              </span>
              {group.label}
            </MenuLink>
            <ul className="mt-2 border-l-2 border-line pl-4">
              {group.links.map((link) => {
                const current = isCurrentPage(pathname, link.href);
                return (
                  <li key={link.href}>
                    <MenuLink
                      disabled={menu.disabled || group.disabled}
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center text-[0.98rem]",
                        current ? "font-semibold text-brand-red" : "text-ink",
                      )}
                    >
                      {link.label}
                    </MenuLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </li>
  );
}

interface MobileNavigationProps {
  items: MainNavEntry[];
  cta: NavItem;
  logo: ReactNode;
  /** Extra content shown at the bottom of the menu (e.g. contact links). */
  footer?: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen modal menu for screens below 1280px.
 * - Escape and the close button dismiss it; focus returns to the toggle.
 * - Focus is trapped inside while open; page scrolling is locked.
 * - Selecting a link closes it.
 */
export function MobileNavigation({ items, cta, logo, footer }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close automatically if the viewport grows to the desktop layout.
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open, close]);

  return (
    <div className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-11 items-center justify-center rounded-sm border border-line text-brand-navy transition-colors hover:bg-brand-navy-tint"
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      <div
        ref={dialogRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        hidden={!open}
        onClick={(event) => {
          // Any link inside the menu (logo, nav, contact) closes it.
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white"
      >
        <div className="flex h-(--header-height) shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
          {logo}
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-line text-brand-navy transition-colors hover:bg-brand-navy-tint"
          >
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 px-4 py-6 sm:px-6">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => {
              if (isNavMenu(item)) return <MobileSubmenu key={item.label} menu={item} pathname={pathname} />;

              if (item.disabled) {
                return (
                  <li key={item.href} className="flex min-h-14 items-center py-3 text-lg font-semibold text-brand-navy">
                    {item.label}
                  </li>
                );
              }

              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between gap-3 py-3 text-lg font-semibold",
                      active ? "text-brand-red" : "text-brand-navy",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span className="text-xs font-bold tracking-wider text-brand-red uppercase">Current</span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={cta.href}
            className={buttonClasses({ variant: "primary", size: "lg", className: "mt-8 w-full" })}
          >
            {cta.label}
          </Link>

          {footer ? <div className="mt-8">{footer}</div> : null}
        </nav>
      </div>
    </div>
  );
}
