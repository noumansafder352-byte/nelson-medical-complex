"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { IconName } from "@/types";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

interface ServiceChipsProps {
  services: { slug: string; name: string; icon: IconName }[];
}

const DURATION = 380;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Service chips limited to one row. When they don't all fit, the row ends with a
 * "View more (+N)" button that smoothly expands the full list; "View less" collapses
 * it again. Re-measured whenever the available width changes.
 */
export function ServiceChips({ services }: ServiceChipsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [overflows, setOverflows] = useState(false);
  // Height before expanding, so the next layout can animate from it.
  const expandFrom = useRef<number | null>(null);
  // Animations to clear once the collapsed layout has been applied.
  const pendingCleanup = useRef<Animation[]>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    if (!wrapper || !list) return;

    let lastWidth = -1;
    const fit = () => {
      // Only re-measure when the width changes (our own show/hide changes the height).
      if (list.clientWidth === lastWidth) return;
      lastWidth = list.clientWidth;

      const chips = Array.from(list.querySelectorAll<HTMLElement>("[data-chip]"));
      const toggle = list.querySelector<HTMLElement>("[data-toggle]");
      if (!chips.length || !toggle) return;

      // Lay everything out naturally first.
      const wasHidden = new Set(chips.filter((chip) => chip.hidden));
      chips.forEach((chip) => (chip.hidden = false));
      toggle.hidden = true;
      const top = chips[0].offsetTop;
      const fitsOneRow = chips.every((chip) => chip.offsetTop === top);
      setOverflows(!fitsOneRow);

      if (!fitsOneRow) {
        toggle.hidden = false;
        if (!expanded) {
          // Collapsed: hide chips from the end until the toggle sits on the first row.
          let hidden = 0;
          for (let i = chips.length - 1; i > 0 && toggle.offsetTop > top; i--) {
            chips[i].hidden = true;
            hidden++;
          }
          chips.forEach((chip) => {
            if (!chip.hidden && chip.offsetTop > top) {
              chip.hidden = true;
              hidden++;
            }
          });
          setHiddenCount(hidden);
        }
      } else {
        setHiddenCount(0);
      }

      // Collapse finished: drop the fade-out / height animations now the layout matches.
      pendingCleanup.current.forEach((animation) => animation.cancel());
      pendingCleanup.current = [];

      // Expand: grow from the old height and fade the newly shown chips in, one after another.
      if (expanded && expandFrom.current !== null && !prefersReducedMotion()) {
        const from = expandFrom.current;
        const to = wrapper.offsetHeight;
        wrapper.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: DURATION, easing: EASING });
        [...chips.filter((chip) => wasHidden.has(chip)), toggle].forEach((element, index) => {
          element.animate(
            [
              { opacity: 0, transform: "translateY(6px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 300, delay: 40 + index * 35, easing: EASING, fill: "backwards" },
          );
        });
      }
      expandFrom.current = null;
    };

    const observer = new ResizeObserver(fit);
    observer.observe(list);
    return () => observer.disconnect();
  }, [expanded, services]);

  function toggleList() {
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    if (!wrapper || !list) return;

    if (!expanded) {
      expandFrom.current = wrapper.offsetHeight;
      setExpanded(true);
      return;
    }

    if (prefersReducedMotion()) {
      setExpanded(false);
      return;
    }

    // Collapse: fade out everything below the first row while the height shrinks to one row,
    // then switch to the collapsed layout (which has exactly that height, so nothing jumps).
    const chips = Array.from(list.querySelectorAll<HTMLElement>("[data-chip]"));
    const top = chips[0]?.offsetTop ?? 0;
    const rowHeight = chips[0]?.offsetHeight ?? 0;
    const below = Array.from(list.querySelectorAll<HTMLElement>("[data-chip], [data-toggle]")).filter(
      (element) => element.offsetTop > top,
    );
    const fades = below.map((element) =>
      element.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease-out", fill: "forwards" }),
    );
    const shrink = wrapper.animate(
      [{ height: `${wrapper.offsetHeight}px` }, { height: `${rowHeight}px` }],
      { duration: DURATION, easing: EASING, fill: "forwards" },
    );
    pendingCleanup.current = [...fades, shrink];
    shrink.finished.then(() => setExpanded(false)).catch(() => {});
  }

  return (
    <div ref={wrapperRef} className="mt-6 overflow-hidden">
      <ul ref={listRef} className="flex flex-wrap gap-2">
        {services.map((service) => (
          <li key={service.slug} data-chip>
            <a
              href={`#${service.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
            >
              <Icon name={service.icon} className="size-4 opacity-80" />
              {service.name}
            </a>
          </li>
        ))}
        <li data-toggle hidden={!overflows}>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={toggleList}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-red/60 bg-brand-red/15 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:border-brand-red hover:bg-brand-red"
          >
            {expanded ? "View less" : `View more${hiddenCount ? ` (+${hiddenCount})` : ""}`}
            <ChevronDown
              aria-hidden="true"
              className={cn("size-4 transition-transform duration-300", expanded && "rotate-180")}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
