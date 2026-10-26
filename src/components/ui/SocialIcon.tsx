import type { SocialLink, SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";

/** Simplified brand marks (Lucide does not ship brand logos). */
function Glyph({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const common = { "aria-hidden": true, focusable: false, viewBox: "0 0 24 24", className } as const;

  switch (platform) {
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v2H6v4h3v9h4v-9h3.2l.8-4h-4V9c0-.55.45-1 1-1Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58l11.09 14.47Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9V9Z" />
        </svg>
      );
  }
}

interface SocialIconProps {
  link: SocialLink;
  className?: string;
  iconClassName?: string;
}

/**
 * Social profile icon. Links out (new tab) once `href` is set in site.ts;
 * until then it renders as a non-interactive icon so there is no dead link.
 */
export function SocialIcon({ link, className, iconClassName = "size-4" }: SocialIconProps) {
  if (link.href) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`} className={className}>
        <Glyph platform={link.platform} className={iconClassName} />
      </a>
    );
  }

  return (
    <span role="img" aria-label={link.label} title={`${link.label} — coming soon`} className={cn(className, "cursor-default")}>
      <Glyph platform={link.platform} className={iconClassName} />
    </span>
  );
}
