import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  title?: string;
  children: ReactNode;
};

export function Modal({ open, title, children, className, ...props }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn("w-full max-w-lg rounded-md bg-white p-6 shadow-xl", className)}
        {...props}
      >
        {title ? <h2 className="mb-4 text-xl font-semibold text-slate-950">{title}</h2> : null}
        {children}
      </section>
    </div>
  );
}
