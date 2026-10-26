import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "light" | "outline-light";
type Size = "md" | "lg";

// `btn-premium` (globals.css) adds the lift, glow and sheen on hover.
const base =
  "btn-premium inline-flex min-h-11 items-center justify-center gap-2 rounded-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-strong [--btn-glow:rgb(218_37_28/0.55)] [--btn-shine:rgb(255_255_255/0.3)]",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-navy-strong [--btn-glow:rgb(41_23_111/0.55)] [--btn-shine:rgb(255_255_255/0.22)]",
  outline:
    "border border-brand-navy/25 bg-white text-brand-navy hover:border-brand-navy hover:bg-brand-navy-tint [--btn-glow:rgb(41_23_111/0.3)] [--btn-shine:rgb(41_23_111/0.08)]",
  light:
    "bg-white text-brand-navy hover:bg-brand-navy-tint [--btn-glow:rgb(0_0_0/0.35)] [--btn-shine:rgb(41_23_111/0.1)]",
  "outline-light":
    "border border-white/40 text-white hover:border-white hover:bg-white/10 [--btn-glow:rgb(0_0_0/0.4)] [--btn-shine:rgb(255_255_255/0.18)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-6 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = CommonProps & Omit<ComponentProps<typeof Link>, "className" | "children">;

/** Link styled as a button (internal routes, tel:, mailto: and external URLs). */
export function ButtonLink({ variant, size, withArrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {withArrow ? <ArrowRight aria-hidden="true" className="btn-arrow size-4 shrink-0" /> : null}
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant, size, withArrow, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {withArrow ? <ArrowRight aria-hidden="true" className="btn-arrow size-4 shrink-0" /> : null}
    </button>
  );
}
