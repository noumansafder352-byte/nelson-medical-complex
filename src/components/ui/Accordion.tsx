"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Heading level used for each item's trigger (keeps the page outline correct). */
  headingLevel?: 2 | 3 | 4;
  defaultOpenId?: string;
  /** Only one item open at a time. */
  single?: boolean;
  /** "list": one bordered box. "cards": separate numbered cards. */
  variant?: "list" | "cards";
  className?: string;
}

/**
 * Accessible accordion following the WAI-ARIA Accordion pattern:
 * buttons inside headings, aria-expanded/aria-controls, labelled regions,
 * and Up/Down/Home/End arrow-key navigation between triggers.
 * Panels slide open and closed; closed panels are inert.
 */
export function Accordion({
  items,
  headingLevel = 3,
  defaultOpenId,
  single = false,
  variant = "list",
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(defaultOpenId ? [defaultOpenId] : []));
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const Heading = `h${headingLevel}` as const;
  const cards = variant === "cards";

  const toggle = (id: string) =>
    setOpenIds((current) => {
      if (current.has(id)) {
        const next = new Set(current);
        next.delete(id);
        return next;
      }
      return new Set(single ? [id] : [...current, id]);
    });

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const target =
      event.key === "ArrowDown"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowUp"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;

    if (target === null) return;
    event.preventDefault();
    triggers.current[target]?.focus();
  };

  return (
    <div
      className={cn(
        cards ? "space-y-4" : "divide-y divide-line rounded-md border border-line bg-white",
        className,
      )}
    >
      {items.map((item, index) => {
        const open = openIds.has(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              cards &&
                "relative overflow-hidden rounded-2xl border bg-white transition-all duration-300",
              cards &&
                (open
                  ? "border-brand-navy/15 shadow-[0_24px_50px_-28px_rgb(41_23_111/0.45)]"
                  : "border-line hover:border-brand-navy/20 hover:shadow-[0_14px_30px_-24px_rgb(41_23_111/0.4)]"),
            )}
          >
            {cards ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-1 bg-brand-red transition-transform duration-300 origin-top",
                  open ? "scale-y-100" : "scale-y-0",
                )}
              />
            ) : null}
            <Heading className="font-sans text-base font-semibold tracking-normal text-ink sm:text-[1.05rem]">
              <button
                ref={(element) => {
                  triggers.current[index] = element;
                }}
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 text-left transition-colors",
                  cards ? "px-5 py-5 sm:px-7" : "px-5 py-4.5 hover:bg-canvas sm:px-6",
                )}
              >
                <span className="flex items-center gap-4">
                  {cards ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-sm font-bold tabular-nums transition-colors",
                        open ? "text-brand-red" : "text-brand-navy/35",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                  <span className={cn(cards && "transition-colors", cards && open && "text-brand-navy")}>
                    {item.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    open ? "rotate-45 border-brand-red bg-brand-red text-white" : "border-line text-brand-navy",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </Heading>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                inert={!open}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    "text-[0.98rem] leading-relaxed text-subtle",
                    cards ? "px-5 pb-6 sm:pr-7 sm:pl-[4.25rem]" : "px-5 pb-5 sm:px-6",
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
