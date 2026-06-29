import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: ReactNode;
};

export function Input({
  className,
  type = "text",
  label,
  error,
  hint,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-[#0F172A]" htmlFor={inputId}>
      {label ? <span>{label}</span> : null}
      <input
        id={inputId}
        type={type}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 text-sm text-[#0F172A] outline-none transition placeholder:text-[#64748B] focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/10 disabled:cursor-not-allowed disabled:bg-[#F8FAFC]",
          error && "border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs font-medium text-[#DC2626]">{error}</span> : null}
      {!error && hint ? <span className="text-xs font-normal text-[#64748B]">{hint}</span> : null}
    </label>
  );
}
