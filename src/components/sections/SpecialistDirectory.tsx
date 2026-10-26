"use client";

import { Suspense, useState, type ReactNode } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Phone, SearchX, Users } from "lucide-react";
import type { PhoneNumber, Specialist, Specialty } from "@/types";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProfileDialog, SpecialistCard } from "@/components/sections/SpecialistShowcase";

const ALL = "all";
const PARAM = "specialty";

interface SpecialistDirectoryProps {
  doctors: Specialist[];
  specialties: Specialty[];
  /** Number offered in the empty state when no doctor matches a specialty. */
  receptionPhone?: PhoneNumber;
}

/** Updates `?specialty=` without a navigation; `useSearchParams` picks up the change. */
function choose(slug: string) {
  const url = new URL(window.location.href);
  if (slug === ALL) url.searchParams.delete(PARAM);
  else url.searchParams.set(PARAM, slug);
  window.history.replaceState(null, "", url);
}

/**
 * Specialists grid with a filter by specialty (the homepage specialty cards).
 * The selected specialty is kept in `?specialty=<slug>`, so homepage cards can link to a filtered view.
 * The prerendered HTML lists every specialist; the filter from the URL applies once the page loads.
 */
export function SpecialistDirectory(props: SpecialistDirectoryProps) {
  return (
    <Suspense fallback={<DirectoryView {...props} selected={ALL} />}>
      <DirectoryFromSearchParams {...props} />
    </Suspense>
  );
}

function DirectoryFromSearchParams(props: SpecialistDirectoryProps) {
  const fromUrl = useSearchParams().get(PARAM);
  const selected = fromUrl && props.specialties.some((item) => item.slug === fromUrl) ? fromUrl : ALL;
  return <DirectoryView {...props} selected={selected} />;
}

function DirectoryView({ doctors, specialties, receptionPhone, selected }: SpecialistDirectoryProps & { selected: string }) {
  const [active, setActive] = useState<Specialist | null>(null);

  const countFor = (slug: string) => doctors.filter((doctor) => doctor.specialties?.includes(slug)).length;
  const specialty = specialties.find((item) => item.slug === selected);
  const visible = specialty ? doctors.filter((doctor) => doctor.specialties?.includes(specialty.slug)) : doctors;

  return (
    <>
      {/* Filter */}
      <div role="group" aria-label="Filter specialists by specialty" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex w-max gap-2.5 sm:w-auto sm:flex-wrap sm:justify-center">
          <FilterChip pressed={selected === ALL} count={doctors.length} onClick={() => choose(ALL)}>
            <Users aria-hidden="true" className="size-4" strokeWidth={2} />
            All Specialists
          </FilterChip>
          {specialties.map((item) => (
            <FilterChip
              key={item.slug}
              pressed={selected === item.slug}
              count={countFor(item.slug)}
              onClick={() => choose(item.slug)}
            >
              <Icon name={item.icon} className="size-4" strokeWidth={2} />
              {item.name}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Selected specialty banner */}
      {specialty ? (
        <div className="relative isolate mt-10 flex items-center gap-5 overflow-hidden rounded-lg bg-brand-navy-strong p-5 text-white shadow-lift sm:p-6">
          <Image src={specialty.image} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-35" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy-strong via-brand-navy-strong/85 to-brand-navy-strong/30" />
          <span className="grid size-14 shrink-0 place-items-center rounded-md border border-white/25 bg-white/15 backdrop-blur-md">
            <Icon name={specialty.icon} className="size-7" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-[0.18em] text-white/70 uppercase">Specialty</p>
            <h2 className="mt-0.5 text-xl font-bold text-white sm:text-2xl">{specialty.name}</h2>
          </div>
        </div>
      ) : null}

      <p aria-live="polite" className={cn("text-sm font-semibold text-subtle", specialty ? "mt-6" : "mt-10")}>
        {visible.length === 0
          ? "No specialists listed"
          : `Showing ${visible.length} ${visible.length === 1 ? "specialist" : "specialists"}${specialty ? ` in ${specialty.name}` : ""}`}
      </p>

      {visible.length ? (
        <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((doctor) => (
            <SpecialistCard key={doctor.slug} doctor={doctor} onOpen={() => setActive(doctor)} className="w-full" />
          ))}
        </ul>
      ) : (
        <div className="mt-5 flex flex-col items-center rounded-lg border border-dashed border-brand-navy/20 bg-white px-6 py-14 text-center shadow-card">
          <span className="grid size-16 place-items-center rounded-full bg-brand-navy-tint text-brand-navy">
            <SearchX aria-hidden="true" className="size-7" strokeWidth={1.75} />
          </span>
          <h2 className="mt-5 text-xl font-bold">
            No {specialty?.name ?? ""} specialist is listed at the moment
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-subtle">
            Specialist availability and consultation schedules may vary. Please contact our reception for current
            availability.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {receptionPhone ? (
              <ButtonLink href={`tel:${receptionPhone.tel}`}>
                <Phone aria-hidden="true" className="size-4" />
                Call {receptionPhone.display}
              </ButtonLink>
            ) : null}
            <Button variant="outline" onClick={() => choose(ALL)}>
              View all specialists
            </Button>
          </div>
        </div>
      )}

      <ProfileDialog doctor={active} onClose={() => setActive(null)} />
    </>
  );
}

function FilterChip({
  pressed,
  count,
  onClick,
  children,
}: {
  pressed: boolean;
  count: number;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border py-2 pr-2 pl-4 text-sm font-semibold whitespace-nowrap transition-all duration-300",
        pressed
          ? "border-brand-navy bg-brand-navy text-white shadow-[0_12px_24px_-12px_rgb(41_23_111/0.7)]"
          : "border-line bg-white text-brand-navy hover:-translate-y-0.5 hover:border-brand-navy/40 hover:shadow-card",
      )}
    >
      {children}
      <span
        className={cn(
          "grid min-w-6 place-items-center rounded-full px-1.5 py-0.5 text-xs font-bold",
          pressed ? "bg-brand-red text-white" : "bg-brand-navy-tint text-brand-navy",
        )}
      >
        {count}
      </span>
    </button>
  );
}
