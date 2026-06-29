import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navigation = [
  { label: "Карта", href: "/map" },
  { label: "Цены", href: "#prices" },
  { label: "Приемки", href: "#yards" },
  { label: "Для бизнеса", href: "#business" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl font-semibold text-slate-950" aria-label="ЛомХаб">
          ЛомХаб
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button variant="secondary" size="sm">
          Войти
        </Button>
      </Container>
    </header>
  );
}
