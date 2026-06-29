import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { YandexMap } from "@/components/map/YandexMap";
import { Container } from "@/components/ui/container";
import { getYards } from "@/services/yards";

export default async function MapPage() {
  const yards = await getYards();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <section className="py-6 sm:py-8 lg:py-10">
        <Container>
          <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Карта приёмок
              </p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                Приёмки ЛомХаба
              </h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Тестовые точки для MVP. Источник данных вынесен в сервисный слой.
            </p>
          </div>
          <YandexMap yards={yards} />
        </Container>
      </section>
      <Footer />
    </main>
  );
}
