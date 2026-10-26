import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentNoticeProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Shown on pages that still contain sample content. Controlled by
 * `site.showContentNotices` and each record's `status` field.
 */
export function ContentNotice({ children, className }: ContentNoticeProps) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-sm border border-brand-navy/15 bg-brand-navy-tint px-4 py-3 text-sm leading-relaxed text-brand-navy",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <p>
        {children ??
          "Service details on this page are being confirmed. Please contact our team to check current availability before your visit."}
      </p>
    </div>
  );
}
