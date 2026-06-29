import Link from "next/link";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Карта", href: "#map" },
  { label: "Цены", href: "#prices" },
  { label: "Приемки", href: "#yards" },
  { label: "Для бизнеса", href: "#business" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold">ЛомХаб</p>
          <p className="mt-2 text-sm text-slate-400">© 2026 ЛомХаб. Все права защищены.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Навигация в подвале">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
