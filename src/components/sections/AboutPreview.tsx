import Image from "next/image";
import type { SiteImage } from "@/types";
import { homeAbout } from "@/data/content";
import { images } from "@/data/images";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/layout/Container";

/**
 * Building photo with offset accents: a red tile peeking out top-left,
 * a navy outline frame shifted bottom-right and a dot texture.
 */
function BuildingPhoto({ image }: { image: SiteImage }) {
  return (
    <div className="relative mx-auto max-w-2xl p-5 sm:p-7 lg:mx-0">
      {/* Red tile behind the top-left corner */}
      <div aria-hidden="true" className="absolute top-0 left-0 size-24 rounded-2xl bg-brand-red sm:size-32" />
      {/* Navy outline frame, offset down and right */}
      <div
        aria-hidden="true"
        className="absolute top-10 left-10 right-0 bottom-0 rounded-[2rem] border-2 border-brand-navy/25 sm:top-14 sm:left-14"
      />
      {/* Dot texture, bottom left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-24 w-32 bg-[radial-gradient(rgb(41_23_111/0.3)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
      />

      <div className="relative overflow-hidden rounded-[1.75rem] bg-canvas shadow-[0_35px_70px_-30px_rgb(41_23_111/0.55)]">
        {image.src ? (
          <div className="relative" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <MediaFrame image={image} aspect="aspect-[16/10]" className="rounded-none" />
        )}
      </div>
    </div>
  );
}

export function AboutPreview() {
  return (
    <section aria-labelledby="about-preview-title" className="py-20 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <BuildingPhoto image={images.about} />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <SectionHeading
            id="about-preview-title"
            eyebrow={homeAbout.eyebrow}
            title={homeAbout.title}
            // Kept on one line; sizes are chosen so it fits the text column at every width.
            titleClassName="whitespace-nowrap text-[clamp(1.2rem,6vw,1.75rem)] sm:text-[2.25rem] lg:text-[1.875rem] xl:text-[2.4rem]"
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-subtle">
            {homeAbout.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* TODO(relink): hidden until the About page is ready.
          <ButtonLink href="/about/" variant="secondary" withArrow className="mt-10">
            More About Us
          </ButtonLink> */}
        </div>
      </Container>
    </section>
  );
}
