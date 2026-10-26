"use client";

import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { LabService, LabServiceCategory } from "@/types";
import { getLabServiceIcon } from "@/data/laboratory-services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { cn } from "@/lib/utils";

interface ServiceCatalogProps {
  services: LabService[];
  categories: LabServiceCategory[];
}

const ALL = "all";

/** Laboratory service listing with text search and category filtering (no extra libraries). */
export function ServiceCatalog({ services, categories }: ServiceCatalogProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const categoryById = useMemo(() => new Map(categories.map((item) => [item.id, item])), [categories]);
  const usedCategories = categories.filter((item) => services.some((service) => service.categoryId === item.id));

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return services.filter((service) => {
      if (category !== ALL && service.categoryId !== category) return false;
      if (!needle) return true;
      const haystack = [service.name, service.summary, categoryById.get(service.categoryId)?.name ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [services, query, category, categoryById]);

  const clear = () => {
    setQuery("");
    setCategory(ALL);
  };

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-md border border-line bg-white p-4 shadow-card sm:p-5 lg:flex-row lg:items-center">
        <div className="relative lg:w-80 lg:shrink-0">
          <label htmlFor={searchId} className="sr-only">
            Search laboratory services
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-subtle" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search services, e.g. MRI, PCR"
            className="block w-full rounded-sm border border-line bg-canvas py-3 pr-4 pl-11 text-base text-ink placeholder:text-subtle/80 focus:border-brand-navy focus:bg-white focus:outline-none"
          />
        </div>

        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {[{ id: ALL, name: "All services" }, ...usedCategories].map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(item.id)}
                className={cn(
                  "min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
                  active
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-line bg-white text-brand-navy hover:border-brand-navy/40 hover:bg-brand-navy-tint",
                )}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm font-semibold text-subtle">
        {results.length === 1 ? "Showing 1 service" : `Showing ${results.length} services`}
        {category !== ALL ? ` in ${categoryById.get(category)?.name}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>

      {results.length ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((service) => {
            const serviceCategory = categoryById.get(service.categoryId);
            return (
              <li key={service.slug}>
                <ServiceCard
                  id={service.slug}
                  headingLevel="h2"
                  title={service.name}
                  summary={service.summary}
                  icon={getLabServiceIcon(service)}
                  meta={serviceCategory?.name}
                  image={service.image}
                  action={{ label: "Book this service", href: `/appointments/?service=lab:${service.slug}` }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-5 rounded-md border border-dashed border-line bg-canvas p-10 text-center">
          <p className="font-display text-lg font-bold text-brand-navy">No services match your search</p>
          <p className="mt-2 text-subtle">
            Try a different term, or contact our team — we can tell you whether a test or scan is available.
          </p>
          <button
            type="button"
            onClick={clear}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-white px-4 font-semibold text-brand-navy hover:bg-brand-navy-tint"
          >
            <X aria-hidden="true" className="size-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
