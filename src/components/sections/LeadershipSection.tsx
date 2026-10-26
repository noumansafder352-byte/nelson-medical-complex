import Image from "next/image";
import type { SiteImage } from "@/types";
import { leadership } from "@/data/content";
import { images } from "@/data/images";
import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/layout/Container";

/** "Chairman, PCDA, Rawalpindi City" → { role: "Chairman", organisation: "PCDA, Rawalpindi City" } */
function splitAffiliation(text: string) {
  const index = text.indexOf(",");
  return index === -1
    ? { role: text, organisation: "" }
    : { role: text.slice(0, index).trim(), organisation: text.slice(index + 1).trim() };
}

function Portrait({ image }: { image: SiteImage }) {
  return (
    <div className="relative mx-auto max-w-md p-5 sm:p-6 lg:mr-0">
      {/* Red tile behind the top-right corner */}
      <div aria-hidden="true" className="absolute top-0 right-0 size-28 rounded-2xl bg-brand-red sm:size-36" />
      {/* Outline frame, offset down and left */}
      <div
        aria-hidden="true"
        className="absolute top-12 right-12 bottom-0 left-0 rounded-[2rem] border-2 border-brand-navy/20 sm:top-16 sm:right-16"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-white shadow-[0_35px_70px_-30px_rgb(41_23_111/0.45)]">
        {image.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 28rem, 90vw"
            className="object-cover object-top"
          />
        ) : null}
      </div>
    </div>
  );
}

export function LeadershipSection() {
  return (
    <section aria-labelledby="leadership-title" className="bg-brand-navy-tint py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-brand-red uppercase sm:text-[0.8rem]">
            <span aria-hidden="true" className="h-0.5 w-6 rounded-full bg-brand-red" />
            {leadership.eyebrow}
          </p>
          <h2 id="leadership-title" className="mt-3 text-[2rem] leading-tight font-bold sm:text-[2.6rem]">
            {leadership.name}
          </h2>
          <p className="mt-1.5 font-semibold text-brand-red">{leadership.role}</p>
          <p className="mt-5 text-lg leading-relaxed text-subtle">{leadership.bio}</p>

          <h3 className="mt-8 font-sans text-sm font-bold tracking-[0.14em] text-brand-navy uppercase">
            {leadership.affiliationsTitle}
          </h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 border-t border-brand-navy/10 pt-5 sm:grid-cols-2">
            {leadership.affiliations.map((item) => {
              const { role, organisation } = splitAffiliation(item.text);
              return (
                <li key={item.text} className="group flex items-center gap-3 leading-snug">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-navy/10 bg-white text-brand-navy shadow-card transition-colors group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white">
                    <Icon name={item.icon} className="size-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-semibold text-brand-navy">{role}</span>
                    {organisation ? <span className="text-subtle">, {organisation}</span> : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <Portrait image={images.leadership} />
        </div>
      </Container>
    </section>
  );
}
