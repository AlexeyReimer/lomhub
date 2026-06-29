import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type StatusBadgeVariant = "success" | "warning" | "error" | "neutral";

type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: StatusBadgeVariant;
};

const variants: Record<StatusBadgeVariant, string> = {
  success: "bg-[#16A34A] text-white",
  warning: "bg-[#F59E0B] text-[#0F172A]",
  error: "bg-[#DC2626] text-white",
  neutral: "bg-[#64748B] text-white",
};

export function StatusBadge({ className, variant = "neutral", ...props }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold leading-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
