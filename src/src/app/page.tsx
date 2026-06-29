import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="border-b border-slate-200 bg-white">
        <Container className="grid min-h-[560px] content-center py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              ЛомХаб
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-6xl">
              Найдите лучшую цену на металлолом рядом с вами
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Сравнивайте предложения приемных пунктов и выбирайте удобный вариант для сдачи
              металлолома.
            </p>
            <div className="mt-8">
              <Button size="lg">Начать поиск</Button>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
