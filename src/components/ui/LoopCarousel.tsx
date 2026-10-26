"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoopCarouselProps {
  /**
   * The `<li>` items of one run. Runs are repeated so the loop is seamless.
   * Pass a function to render the repeated runs differently (`clone` is true
   * for them), e.g. to take interactive items out of the tab order.
   */
  children: ReactNode | ((clone: boolean) => ReactNode);
  /**
   * "drift": scrolls continuously at `speed`.
   * "step": keeps one item centred, and glides to the next one every `stepInterval` ms.
   */
  mode?: "drift" | "step";
  /** Auto-scroll speed in pixels per second ("drift" mode). */
  speed?: number;
  /** Pause between automatic steps in milliseconds ("step" mode). */
  stepInterval?: number;
  /** Enlarge the item in the centre of the viewport and shrink/fade the ones beside it. */
  spotlight?: boolean;
  /** Classes for each run: gap + matching right padding, plus any alignment. */
  gapClassName?: string;
  /** Colour scheme of the arrow buttons. */
  tone?: "dark" | "light";
  prevLabel?: string;
  nextLabel?: string;
}

const NUDGE_MS = 650;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Spotlight look by position: index 0 is the centred item, 1 its neighbours,
 * 2 the next ones out (and anything further). Items moving between positions
 * blend smoothly from one value to the next.
 */
const SPOTLIGHT_SCALE = [1.1, 0.9, 0.75];
const SPOTLIGHT_OPACITY = [1, 0.85, 0.6];

/** Linear interpolation through `stops` at position `d` (0, 1, 2…); holds the last value. */
function lerpStops(stops: number[], d: number) {
  const i = Math.min(Math.floor(d), stops.length - 1);
  if (i >= stops.length - 1) return stops[stops.length - 1];
  return stops[i] + (stops[i + 1] - stops[i]) * (d - i);
}

/** Integral of `lerpStops(stops, u)` for u from 0 to `d`. */
function integrateStops(stops: number[], d: number) {
  let total = 0;
  for (let i = 0; i < d; i++) {
    const end = Math.min(i + 1, d);
    total += ((lerpStops(stops, i) + lerpStops(stops, end)) / 2) * (end - i);
  }
  return total;
}

/** Distance from one item to the next (item width + gap). */
function pitchOf(run: HTMLElement) {
  const first = run.firstElementChild as HTMLElement | null;
  if (!first) return 0;
  return first.offsetWidth + (parseFloat(getComputedStyle(run).columnGap) || 0);
}

/**
 * Endless horizontal carousel: moves on its own, pauses on hover/focus, and
 * the arrow buttons glide it by one item. Auto-scroll is off for reduced motion.
 */
export function LoopCarousel({
  children,
  mode = "drift",
  speed = 40,
  stepInterval = 3000,
  spotlight = false,
  gapClassName = "gap-8 pr-8",
  tone = "dark",
  prevLabel = "Previous",
  nextLabel = "Next",
}: LoopCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const runRef = useRef<HTMLUListElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);
  // `start` is filled in by the animation loop on the next frame.
  const nudge = useRef<{ from: number; to: number; start: number | null } | null>(null);
  // Enough runs that the viewport is always covered while the first run scrolls out.
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const run = runRef.current;
    if (!viewport || !track || !run) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let runWidth = 0;
    let pitch = 0;

    // In step mode, snap to the nearest position where an item sits in the centre.
    // The first time, centre the first item, so the list starts on it.
    let aligned = false;
    const align = () => {
      if (mode !== "step" || !pitch || nudge.current) return;
      const firstCenter = (run.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      const half = viewport.clientWidth / 2;
      const k = aligned ? Math.round((offset.current + half - firstCenter / 2) / pitch) : 0;
      offset.current = firstCenter / 2 + k * pitch - half;
      aligned = true;
    };

    const measure = () => {
      runWidth = run.offsetWidth;
      pitch = pitchOf(run);
      // Spotlight pulls items towards the centre, so keep an extra run on each side of the viewport.
      const extra = spotlight ? 2 : 1;
      if (runWidth > 0) setCopies(Math.max(2, Math.ceil(viewport.clientWidth / runWidth) + extra));
      align();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(run);
    observer.observe(viewport);

    const applySpotlight = () => {
      if (!pitch) return;
      const view = viewport.getBoundingClientRect();
      const centre = view.left + view.width / 2;
      for (const item of track.querySelectorAll<HTMLElement>(":scope > ul > li")) {
        const width = item.offsetWidth;
        const gap = pitch - width;
        const box = item.getBoundingClientRect();
        // Remove last frame's shift so we measure the item's natural position.
        const shifted = Number(item.dataset.shift) || 0;
        // Signed distance from the centre, in item positions (0 = centred, ±1 = neighbours…).
        const s = (box.left + box.width / 2 - shifted - centre) / pitch;
        const d = Math.abs(s);

        // Pull scaled items together so the visible gaps stay even: each item sits where the
        // (scaled) widths of the items between it and the centre say it should.
        const target = Math.sign(s) * (width * integrateStops(SPOTLIGHT_SCALE, d) + gap * d);
        const shift = target - s * pitch;

        item.dataset.shift = String(shift);
        item.style.transform = `translateX(${shift}px) scale(${lerpStops(SPOTLIGHT_SCALE, d)})`;
        item.style.opacity = String(lerpStops(SPOTLIGHT_OPACITY, d));
        item.style.zIndex = String(10 - Math.round(d));
      }
    };

    let frame = 0;
    let last = performance.now();
    let lastStep = last;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const auto = !paused.current && !reduceMotion.matches;

      if (nudge.current) {
        nudge.current.start ??= now;
        const t = Math.min((now - nudge.current.start) / NUDGE_MS, 1);
        offset.current = nudge.current.from + (nudge.current.to - nudge.current.from) * easeInOut(t);
        if (t === 1) {
          nudge.current = null;
          lastStep = now;
        }
      } else if (mode === "drift" && auto) {
        offset.current += speed * dt;
      } else if (mode === "step") {
        if (!auto) lastStep = now;
        else if (now - lastStep >= stepInterval && pitch) {
          nudge.current = { from: offset.current, to: offset.current + pitch, start: now };
        }
      }

      if (runWidth > 0) {
        // With spotlight, keep one full run to the left of the viewport as well.
        const base = spotlight ? runWidth : 0;
        const wrapped = base + (((offset.current % runWidth) + runWidth) % runWidth);
        if (nudge.current) {
          const shift = wrapped - offset.current;
          nudge.current.from += shift;
          nudge.current.to += shift;
        }
        offset.current = wrapped;
      }
      track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
      if (spotlight) applySpotlight();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [mode, speed, stepInterval, spotlight]);

  function step(direction: 1 | -1) {
    const run = runRef.current;
    if (!run) return;
    const from = nudge.current?.to ?? offset.current;
    nudge.current = { from: offset.current, to: from + direction * pitchOf(run), start: null };
  }

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);
  const render = (clone: boolean) => (typeof children === "function" ? children(clone) : children);

  return (
    <div>
      <div
        ref={viewportRef}
        // Extra bottom padding (offset by the negative margin) leaves room for card shadows,
        // which would otherwise be cut off in a hard line by overflow-hidden.
        className="-mb-14 overflow-hidden pt-10 pb-24 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          <ul ref={runRef} className={cn("flex", gapClassName)}>
            {render(false)}
          </ul>
          {Array.from({ length: copies - 1 }, (_, i) => (
            <ul key={i} aria-hidden="true" className={cn("flex", gapClassName)}>
              {render(true)}
            </ul>
          ))}
        </div>
      </div>

      {/* Sits over the viewport's extra bottom padding, so keep it on top and clickable. */}
      <div className="relative z-10 mt-4 flex justify-center gap-4">
        {(
          [
            [-1, prevLabel, ChevronLeft],
            [1, nextLabel, ChevronRight],
          ] as const
        ).map(([direction, label, Chevron]) => (
          <button
            key={direction}
            type="button"
            aria-label={label}
            onClick={() => step(direction)}
            className={cn(
              "grid size-13 place-items-center rounded-full border transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white active:scale-95",
              tone === "dark"
                ? "border-white/25 bg-white/10 text-white backdrop-blur-md"
                : "border-line bg-white text-brand-navy shadow-card",
            )}
          >
            <Chevron aria-hidden="true" className="size-5.5" strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
}
