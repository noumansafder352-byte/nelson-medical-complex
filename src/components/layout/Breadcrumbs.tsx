import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";

export interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  /** Trail after "Home"; the last item is the current page. */
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}

export function Breadcrumbs({ items, tone = "dark", className }: BreadcrumbsProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const onDark = tone === "dark";

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm", onDark ? "text-white/75" : "text-subtle")}>
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="inline-flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className={cn("font-semibold", onDark ? "text-white" : "text-brand-navy")}>
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.href} className="underline-offset-4 hover:underline">
                      {crumb.label}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 opacity-70" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </>
  );
}
