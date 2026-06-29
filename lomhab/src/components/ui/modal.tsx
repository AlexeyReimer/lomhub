import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  onClose?: () => void;
};

export function Modal({
  open,
  title,
  description,
  children,
  className,
  onClose,
  ...props
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#020617]/60 p-4" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl",
          className,
        )}
        {...props}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid gap-1.5">
            {title ? <h2 className="text-xl font-semibold text-[#0F172A]">{title}</h2> : null}
            {description ? <p className="text-sm leading-6 text-[#64748B]">{description}</p> : null}
          </div>
          {onClose ? (
            <Button aria-label="Закрыть" size="sm" variant="ghost" onClick={onClose}>
              ×
            </Button>
          ) : null}
        </div>
        {children}
      </section>
    </div>
  );
}
