"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Check,
  GraduationCap,
  Phone,
  ShieldCheck,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";
import type { Specialist } from "@/types";
import { cn } from "@/lib/utils";
import { LoopCarousel } from "@/components/ui/LoopCarousel";

const TITLE_PREFIX = /^(?:(?:Professor|Prof\.?|Brig\.?|Dr\.?|\(R\))(?=[\s(]|$)\s*)+/i;

/** "Professor Brig. (R) Sarfraz Ali Zahid SI(M)" → ["Professor Brig. (R)", "Sarfraz Ali Zahid SI(M)"]. */
function splitTitles(name: string): [string, string] {
  const prefix = name.match(TITLE_PREFIX)?.[0] ?? "";
  return [prefix.trim(), name.slice(prefix.length).trim()];
}

/** Doctor card that opens the profile popup. Also used in the Specialists page grid. */
export function SpecialistCard({
  doctor,
  clone = false,
  onOpen,
  className = "w-[17.5rem] shrink-0 sm:w-[19rem]",
}: {
  doctor: Specialist;
  clone?: boolean;
  onOpen: () => void;
  /** Width classes for the `<li>`; the carousel default is a fixed width. */
  className?: string;
}) {
  const [titles, personalName] = splitTitles(doctor.name);
  return (
    <li className={cn("flex", className)}>
      <button
        type="button"
        onClick={onOpen}
        tabIndex={clone ? -1 : undefined}
        aria-haspopup="dialog"
        className="group relative flex h-full w-full flex-col rounded-[2rem] bg-white p-2.5 text-left shadow-[0_18px_36px_-24px_rgb(41_23_111/0.35)] ring-1 ring-line transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-[0_28px_48px_-26px_rgb(41_23_111/0.5)] hover:ring-brand-red/30"
      >
        {/* Portrait */}
        <span className="relative isolate block aspect-square shrink-0 overflow-hidden rounded-[1.6rem] bg-brand-navy">
          <Image
            src={doctor.photo}
            alt=""
            fill
            sizes="(min-width: 640px) 18rem, 17rem"
            className="-z-10 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-navy-strong/55 via-transparent to-transparent"
          />
          <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/20 py-1 pr-3 pl-1.5 text-[0.7rem] font-bold tracking-[0.12em] text-white uppercase backdrop-blur-md">
            <BadgeCheck aria-hidden="true" className="size-4" strokeWidth={2} />
            Specialist
          </span>
        </span>

        {/* Details */}
        <span className="flex flex-1 flex-col px-3.5 pt-4 pb-2">
          {/* Rank/title line, name line and a two-line specialty slot keep every card the same height. */}
          <span title={doctor.name} className="block font-display leading-snug font-bold text-brand-navy">
            <span className="block min-h-[1.25rem] truncate text-sm text-brand-navy/70">{titles}</span>
            <span className="block truncate text-lg">{personalName}</span>
          </span>
          <span className="mt-1 mb-3 line-clamp-2 block min-h-[2.5rem] text-sm leading-5 font-semibold text-brand-red">
            {doctor.headline}
          </span>

          <span className="mt-auto flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm font-semibold text-brand-navy">View profile</span>
            <span className="grid size-9 place-items-center rounded-full bg-brand-navy-tint text-brand-navy transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

function SectionLabel({ id, icon: Icon, children }: { id: string; icon: LucideIcon; children: string }) {
  return (
    <h4 id={id} className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.16em] text-subtle uppercase">
      <span className="grid size-6 place-items-center rounded-md bg-brand-navy-tint text-brand-navy">
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
      </span>
      {children}
    </h4>
  );
}

export function ProfileDialog({ doctor, onClose }: { doctor: Specialist | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !doctor) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [doctor]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="specialist-dialog-title"
      onClose={onClose}
      // Clicking the backdrop (the dialog element itself, outside the panel) closes it.
      onClick={(event) => event.target === event.currentTarget && ref.current?.close()}
      className="m-auto max-h-[calc(100dvh-2.5rem)] w-[min(100%-2rem,50rem)] overflow-y-auto overscroll-contain rounded-[1.5rem] bg-white p-0 text-ink shadow-[0_50px_120px_-30px_rgb(29_15_82/0.65)] transition duration-300 backdrop:bg-brand-navy-strong/75 backdrop:backdrop-blur-md open:starting:translate-y-6 open:starting:scale-[0.98] open:starting:opacity-0"
    >
      {doctor ? (
        <div className="grid md:grid-cols-[17.5rem_1fr]">
          {/* Portrait panel: framed photo on a navy backdrop */}
          <aside className="relative isolate flex flex-col justify-center overflow-hidden bg-gradient-to-br from-brand-navy to-brand-navy-strong p-5 text-white sm:p-6">
            <div aria-hidden="true" className="brand-grid-dark absolute inset-0 -z-10 opacity-40" />
            <div aria-hidden="true" className="absolute -top-16 -left-16 -z-10 size-48 rounded-full bg-brand-red/30 blur-3xl" />
            <div aria-hidden="true" className="absolute -right-12 -bottom-12 -z-10 size-40 rounded-full bg-white/10 blur-3xl" />

            <figure className="relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden rounded-2xl bg-brand-navy-strong shadow-[0_24px_48px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/20 md:max-w-none">
              <Image
                src={doctor.photo}
                alt={`Portrait of ${doctor.name}`}
                fill
                sizes="(min-width: 768px) 15rem, 60vw"
                className="object-cover object-top"
              />
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-brand-red" />
            </figure>

            <div className="mt-5 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 py-1 pr-3 pl-1.5 text-[0.65rem] font-bold tracking-[0.14em] uppercase">
                <ShieldCheck aria-hidden="true" className="size-3.5 text-brand-red" strokeWidth={2.5} />
                Verified Specialist
              </span>
              <p className="mt-3 font-display text-base leading-snug font-semibold">Nelson Lab &amp; Medical Complex</p>
              <p className="mt-0.5 text-xs text-white/60">Consultations by appointment</p>
            </div>
          </aside>

          {/* Details panel */}
          <div className="flex min-w-0 flex-col">
            <header className="px-6 pt-7 pb-5 sm:px-8 sm:pt-8">
              <p className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] text-brand-red uppercase">
                <span aria-hidden="true" className="h-0.5 w-5 rounded-full bg-brand-red" />
                Specialist Profile
              </p>
              <h3
                id="specialist-dialog-title"
                className="mt-2.5 pr-10 text-2xl leading-tight font-bold text-brand-navy sm:text-[1.75rem]"
              >
                {doctor.name}
              </h3>
              <p className="mt-1.5 flex items-start gap-2 text-[0.95rem] font-semibold text-brand-red">
                <Stethoscope aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2.25} />
                {doctor.headline}
              </p>
            </header>

            <div className="mx-6 h-px bg-line sm:mx-8" />

            <div className="flex-1 space-y-5 px-6 py-5 sm:px-8">
              <section aria-labelledby="specialist-qualifications">
                <SectionLabel id="specialist-qualifications" icon={GraduationCap}>
                  Qualifications
                </SectionLabel>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {doctor.qualifications.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-brand-navy/10 bg-brand-navy-tint/60 px-2.5 py-1 text-[0.8rem] font-semibold text-brand-navy"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="specialist-roles">
                <SectionLabel id="specialist-roles" icon={Briefcase}>
                  Experience &amp; Appointments
                </SectionLabel>
                <ul className="mt-2.5 space-y-2">
                  {doctor.roles.map((role) => (
                    <li key={role} className="flex gap-2.5 text-[0.92rem] leading-snug">
                      <span className="mt-0.5 grid size-[1.125rem] shrink-0 place-items-center rounded-full bg-brand-red/10 text-brand-red">
                        <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                      </span>
                      {role}
                    </li>
                  ))}
                </ul>
              </section>

              {doctor.about ? (
                <p className="rounded-xl border-l-[3px] border-brand-red bg-brand-navy-tint/40 px-4 py-3 text-[0.92rem] leading-relaxed text-subtle">
                  {doctor.about}
                </p>
              ) : null}
            </div>

            <footer className="px-6 pb-6 sm:px-8 sm:pb-7">
              <a
                href={`tel:${doctor.phone.tel}`}
                className="group flex items-center gap-3.5 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-strong p-3 pr-3.5 text-white shadow-[0_18px_40px_-20px_rgb(29_15_82/0.8)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-red shadow-[0_10px_20px_-8px_rgb(218_37_28/0.8)]">
                  <Phone aria-hidden="true" className="size-[1.125rem]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.65rem] font-bold tracking-[0.16em] text-white/65 uppercase">
                    Book an Appointment
                  </span>
                  <span className="block font-display text-lg font-bold tracking-wide">{doctor.phone.display}</span>
                </span>
                <span className="hidden items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-navy transition-colors group-hover:bg-brand-red group-hover:text-white sm:inline-flex">
                  Call now
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </footer>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Close profile"
        onClick={() => ref.current?.close()}
        className="absolute top-3.5 right-3.5 grid size-9 place-items-center rounded-full border border-line bg-white/95 text-brand-navy shadow-card backdrop-blur transition-all duration-300 hover:rotate-90 hover:border-brand-red hover:bg-brand-red hover:text-white"
      >
        <X aria-hidden="true" className="size-4.5" />
      </button>
    </dialog>
  );
}

/** Auto-scrolling doctor cards; clicking one opens a profile popup. */
export function SpecialistShowcase({ doctors }: { doctors: Specialist[] }) {
  const [active, setActive] = useState<Specialist | null>(null);

  return (
    <>
      {/* Same spotlight carousel as the specialties: centred card largest, steps one card at a time. */}
      <LoopCarousel
        mode="step"
        spotlight
        tone="light"
        gapClassName="items-stretch gap-8 pr-8"
        prevLabel="Previous doctor"
        nextLabel="Next doctor"
      >
        {(clone) =>
          doctors.map((doctor) => (
            <SpecialistCard key={doctor.slug} doctor={doctor} clone={clone} onOpen={() => setActive(doctor)} />
          ))
        }
      </LoopCarousel>
      <ProfileDialog doctor={active} onClose={() => setActive(null)} />
    </>
  );
}
