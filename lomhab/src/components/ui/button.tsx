import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[#16A34A] text-white shadow-sm hover:bg-[#15803D] focus-visible:outline-[#16A34A]",
  secondary:
    "border border-[#E2E8F0] bg-white text-[#0F172A] shadow-sm hover:bg-[#F8FAFC] focus-visible:outline-[#64748B]",
  ghost: "bg-transparent text-[#0F172A] hover:bg-[#F8FAFC] focus-visible:outline-[#64748B]",
  danger: "bg-[#DC2626] text-white shadow-sm hover:bg-[#B91C1C] focus-visible:outline-[#DC2626]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
