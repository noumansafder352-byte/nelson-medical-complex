"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { specialties } from "@/data/content";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { LoopCarousel } from "@/components/ui/LoopCarousel";
import { Container } from "@/components/layout/Container";

type Specialty = (typeof specialties.items)[number];

const total = String(specialties.items.length).padStart(2, "0");

/** Full-bleed photo card: brand-tinted scrim at the bottom keeps the eyebrow and heading crisp. */
function SpecialtyCard({ item, index, clone }: { item: Specialty; index: number; clone: boolean }) {
  const red = index % 2 === 1;
  return (
    <li className="group relative w-[16.5rem] shrink-0 hover:z-10 sm:w-[18.5rem]">
      {/* Opens the Specialists page filtered to this specialty. */}
      <Link
        href={`/specialists/?specialty=${item.slug}`}
        tabIndex={clone ? -1 : undefined}
        aria-label={`${item.name} specialists`}
        className="block rounded-[1.75rem]"
      >
      <article className="relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[1.75rem] bg-brand-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/15 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:shadow-[0_45px_80px_-25px_rgb(0_0_0/0.75)] group-hover:ring-2 group-hover:ring-white/60">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 640px) 18.5rem, 16.5rem"
          className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Scrims: strong brand tint at the bottom for the text, light shade at the top for the badges */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-t via-30% to-transparent to-55%",
            red
              ? "from-brand-red-strong/85 via-brand-red-strong/45"
              : "from-brand-navy-strong/85 via-brand-navy-strong/50",
          )}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/45 to-transparent" />

        <span
          aria-hidden="true"
          className="absolute top-4 left-5 rounded-full border border-white/25 bg-black/20 px-3 py-1 font-display text-xs font-bold tracking-[0.2em] text-white backdrop-blur-md"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-white/55"> / {total}</span>
        </span>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-xl border border-white/30 bg-white/15 text-white backdrop-blur-md transition-transform duration-500 group-hover:rotate-6"
        >
          <Icon name={item.icon} className="size-5.5" />
        </span>

        <div className="px-6 pb-7">
          <p className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] text-white uppercase">
            <span aria-hidden="true" className={cn("h-0.5 w-6 rounded-full", red ? "bg-white" : "bg-brand-red")} />
            Specialty
          </p>
          <h3 className="mt-2 text-2xl leading-tight font-bold text-white [text-shadow:0_2px_12px_rgb(0_0_0/0.35)] sm:text-[1.7rem]">
            {item.name}
          </h3>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition-colors group-hover:text-white">
            View specialists
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </p>
        </div>
      </article>
      </Link>
    </li>
  );
}

export function SpecialtiesMarquee() {
  return (
    <section
      aria-labelledby="specialties-title"
      className="on-dark relative isolate overflow-hidden bg-brand-navy-strong py-20 sm:py-24 lg:py-28"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute -top-40 -left-32 -z-10 size-[34rem] rounded-full bg-brand-red/25 blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-40 -bottom-48 -z-10 size-[38rem] rounded-full bg-[#4a33a8]/40 blur-[130px]" />
      <div aria-hidden="true" className="brand-grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <Container className="text-center">
        <p className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-white/80 uppercase sm:text-[0.8rem]">
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
          {specialties.eyebrow}
          <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
        </p>
        <h2
          id="specialties-title"
          className="mx-auto mt-4 max-w-3xl text-[2rem] leading-tight font-bold text-white sm:text-[2.75rem]"
        >
          {specialties.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{specialties.description}</p>
      </Container>

      <div className="mt-8 sm:mt-10">
        <LoopCarousel mode="step" spotlight prevLabel="Previous specialty" nextLabel="Next specialty">
          {(clone) =>
            specialties.items.map((item, index) => (
              <SpecialtyCard key={item.slug} item={item} index={index} clone={clone} />
            ))
          }
        </LoopCarousel>
      </div>
    </section>
  );
}
