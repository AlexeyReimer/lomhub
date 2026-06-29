import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PriceTagProps = HTMLAttributes<HTMLSpanElement> & {
  value: number | string;
  unit: string;
  currency?: string;
};

export function PriceTag({ value, unit, currency = "₽", className, ...props }: PriceTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 rounded-xl bg-[#16A34A]/10 px-3.5 py-2 font-semibold text-[#0F172A]",
        className,
      )}
      {...props}
    >
      <span className="text-xl leading-none text-[#16A34A]">{value}</span>
      <span className="text-sm text-[#64748B]">
        {currency}/{unit}
      </span>
    </span>
  );
}
