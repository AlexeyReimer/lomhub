import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-10 sm:py-12", className)} {...props} />;
}

export function SectionHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-6 grid gap-2", className)} {...props} />;
}

export function SectionTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-2xl font-semibold text-[#0F172A]", className)} {...props} />;
}

export function SectionDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("max-w-2xl text-sm leading-6 text-[#64748B]", className)} {...props} />;
}
