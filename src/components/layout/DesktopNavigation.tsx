"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import type { MainNavEntry, NavGroup, NavMenu } from "@/types";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isActivePath, isCurrentPage, isMenuActive, isNavMenu } from "@/components/layout/nav-utils";

const itemClasses = (active: boolean) =>
  cn(
    "relative inline-flex min-h-11 items-center gap-1 px-3 text-[0.94rem] font-semibold whitespace-nowrap transition-colors",
    "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-brand-red after:transition-transform after:duration-200",
    active
      ? "text-brand-navy after:scale-x-100"
      : "text-ink/80 after:scale-x-0 hover:text-brand-navy hover:after:scale-x-100",
  );

const CLOSE_DELAY_MS = 180;

/** Rows per dropdown column; longer lists flow into extra columns. */
const MENU_ROWS = 5;
/** Width of each column in a multi-column dropdown list. */
const MENU_COLUMN_WIDTH = "13.5rem";

/**
 * Dropdown following the disclosure pattern: a button toggles a panel of links.
 * Opens on click (and on hover for mouse users), closes on Escape, outside
 * click, focus leaving the menu, or choosing a link.
 */
function DropdownMenu({ menu, pathname }: { menu: NavMenu; pathname: string | null }) {
  const [open, setOpenState] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);
  // Mirrors `open` synchronously, so back-to-back events (hover then click)
  // see the latest value even before React re-renders.
  const openRef = useRef(false);
  const openedByHover = useRef(false);
  const active = isMenuActive(pathname, menu);

  const setOpen = useCallback((next: boolean) => {
    openRef.current = next;
    if (!next) openedByHover.current = false;
    setOpenState(next);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  useEffect(() => cancelClose, []);

  // The panel is centred under the header, so point its arrow at the button.
  useLayoutEffect(() => {
    if (!open) return;
    const placeArrow = () => {
      const button = buttonRef.current?.getBoundingClientRect();
      const panel = panelRef.current?.getBoundingClientRect();
      if (button && panel && arrowRef.current) {
        arrowRef.current.style.left = `${button.left + button.width / 2 - panel.left}px`;
      }
    };
    placeArrow();
    window.addEventListener("resize", placeArrow);
    return () => window.removeEventListener("resize", placeArrow);
  }, [open]);

  const focusFirstLink = () => requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());

  const onButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    setOpen(true);
    focusFirstLink();
  };

  return (
    <li
      ref={containerRef}
      // Not `relative`: the panel is positioned against the (sticky) header so it can be centred and wide.
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        if (!openRef.current) openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
      }}
      onBlur={(event) => {
        // Keyboard users tabbing out of the menu close it.
        const next = event.relatedTarget as Node | null;
        if (next && !containerRef.current?.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          // A click right after hover-opening keeps the menu open instead of closing it.
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen(!openRef.current);
        }}
        onKeyDown={onButtonKeyDown}
        className={itemClasses(active || open)}
      >
        {menu.label}
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Hangs from the bottom of the header, centred. pt-3 leaves room for the arrow and keeps
          the hover area continuous so the pointer can travel into the panel. */}
      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute top-full left-1/2 z-50 w-[min(80rem,calc(100vw-2rem))] -translate-x-1/2 pt-3"
      >
        <div className="relative">
          {/* Pointer towards the "Services" button (positioned in useLayoutEffect) */}
          <span
            ref={arrowRef}
            aria-hidden="true"
            className="absolute -top-1.5 left-1/2 z-10 size-3 -translate-x-1/2 rotate-45 rounded-tl-[3px] bg-brand-navy"
          />
          <div className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_28px_60px_-24px_rgb(41_23_111/0.38),0_2px_8px_rgb(41_23_111/0.06)]">
            <div aria-hidden="true" className="flex h-[3px]">
              <span className="w-28 bg-brand-red" />
              <span className="flex-1 bg-brand-navy" />
            </div>
            <div className="grid grid-cols-[auto_minmax(16rem,1fr)]">
              {menu.groups.map((group, index) => (
                <MenuColumn
                  key={group.href}
                  group={group}
                  pathname={pathname}
                  tinted={index > 0}
                  disabled={menu.disabled || group.disabled}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/** A link, or plain text when the menu is disabled. */
function MenuLink({ disabled, className, ...props }: ComponentProps<typeof Link> & { disabled?: boolean }) {
  if (disabled) return <span className={className}>{props.children}</span>;
  return <Link className={className} {...props} />;
}

/** One column of the dropdown: header, links and a "view all" link. */
function MenuColumn({
  group,
  pathname,
  tinted,
  disabled,
}: {
  group: NavGroup;
  pathname: string | null;
  tinted: boolean;
  disabled?: boolean;
}) {
  // Fixed number of rows; columns are added as the list grows. The "view all" button
  // takes the next free cell after the links, so it counts as one more item.
  const cells = group.links.length + (disabled ? 0 : 1);
  const columns = Math.ceil(cells / MENU_ROWS);

  return (
    <div className={cn("flex flex-col p-7", tinted && "border-l border-line bg-canvas")}>
      <MenuLink disabled={disabled} href={group.href} className={cn("flex items-start gap-3.5", !disabled && "group")}>
        <span className="grid size-12 shrink-0 place-items-center rounded-md bg-brand-navy text-white shadow-[0_6px_14px_-6px_rgb(41_23_111/0.6)] transition-colors group-hover:bg-brand-red">
          <Icon name={group.icon} className="size-6" />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.16em] whitespace-nowrap uppercase">
            <span className="text-brand-red">{group.eyebrow}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-line" />
            <span className="text-subtle">
              {group.links.length} {group.countLabel}
            </span>
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-display text-[1.05rem] font-bold whitespace-nowrap text-brand-navy">
            {group.label}
            {disabled ? null : (
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            )}
          </span>
          <span className="mt-1 block text-[0.84rem] leading-snug text-subtle">{group.description}</span>
        </span>
      </MenuLink>

      <ul
        className="-mx-3 mt-5 grid flex-1 grid-flow-col content-start gap-x-2 gap-y-0.5"
        style={{
          gridTemplateRows: `repeat(${Math.min(MENU_ROWS, cells)}, auto)`,
          // Multi-column lists use fixed-width columns so they only take the space they need;
          // the remaining width goes to the other group.
          gridTemplateColumns: columns > 1 ? `repeat(${columns}, ${MENU_COLUMN_WIDTH})` : "minmax(0, 1fr)",
        }}
      >
        {group.links.map((link) => {
          const current = isCurrentPage(pathname, link.href);
          return (
            <li key={link.href}>
              <MenuLink
                disabled={disabled}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex min-h-10 items-center gap-3 rounded-sm px-3 py-1.5 text-[0.92rem] leading-snug transition-colors",
                  !disabled && "group/link",
                  current
                    ? "bg-brand-red-tint font-semibold text-brand-red"
                    : cn("text-ink", !disabled && "hover:bg-brand-navy-tint hover:text-brand-navy"),
                )}
              >
                {link.icon ? (
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-sm border transition-colors",
                      current
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-line bg-white text-brand-navy group-hover/link:border-brand-red group-hover/link:bg-brand-red group-hover/link:text-white",
                    )}
                  >
                    <Icon name={link.icon} className="size-4" />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "size-1.5 shrink-0 rounded-full transition-colors",
                      current ? "bg-brand-red" : "bg-brand-navy/25 group-hover/link:bg-brand-red",
                    )}
                  />
                )}
                {/* Never more than two lines; the full name shows on hover if it is ever cut short. */}
                <span title={link.label} className="line-clamp-2 min-w-0 flex-1 hyphens-auto break-words">
                  {link.label}
                </span>
                {disabled ? null : (
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 -translate-x-1 text-brand-red opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100"
                  />
                )}
              </MenuLink>
            </li>
          );
        })}

        {/* "View all" sits in the next free cell after the links. It only navigates,
            so it is hidden while the menu is disabled. */}
        {disabled ? null : (
          <li className="flex items-center px-3 py-1.5">
            {/* Brand red button with the site-wide premium hover (lift, glow, sheen). */}
            <Link
              href={group.href}
              className={buttonClasses({ variant: "primary", className: "min-h-10 px-4 py-2 text-sm" })}
            >
              {group.viewAllLabel}
              <ArrowRight aria-hidden="true" className="btn-arrow size-4 shrink-0" />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export function DesktopNavigation({ items }: { items: MainNavEntry[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden xl:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          if (isNavMenu(item)) return <DropdownMenu key={item.label} menu={item} pathname={pathname} />;

          if (item.disabled) {
            return (
              <li key={item.href}>
                <span className="inline-flex min-h-11 cursor-default items-center px-3 text-[0.94rem] font-semibold whitespace-nowrap text-ink/80">
                  {item.label}
                </span>
              </li>
            );
          }

          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={active ? "page" : undefined} className={itemClasses(active)}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
