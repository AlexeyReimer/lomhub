import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "verified" | "open" | "closed" | "premium" | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  verified: "border-[#16A34A]/20 bg-[#16A34A]/10 text-[#15803D]",
  open: "border-[#16A34A]/20 bg-[#16A34A]/10 text-[#15803D]",
  closed: "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B]",
  premium: "border-[#F59E0B]/25 bg-[#F59E0B]/10 text-[#B45309]",
  neutral: "border-[#E2E8F0] bg-white text-[#64748B]",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold leading-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
