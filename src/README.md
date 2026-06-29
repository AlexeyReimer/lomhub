# ЛомХаб

ЛомХаб — каркас сервиса для поиска пунктов приема металлолома и сравнения цен рядом с пользователем.

## Стек

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Docker и Docker Compose
- Яндекс Карты

## Запуск

1. Скопируйте переменные окружения:

```bash
cp .env.example .env
```

2. Запустите приложение и PostgreSQL:

```bash
docker compose up
```

Приложение будет доступно по адресу `http://localhost:3000`.

## Локальная разработка без Docker

```bash
npm install
npm run prisma:generate
npm run dev
```

## Проверки

```bash
npm run lint
npm run typecheck
npm run format:check
```

## Структура

```text
src/
  app/
  components/
    dashboard/
    layout/
    map/
    ui/
    yard/
  hooks/
  lib/
  services/
  styles/
  types/
database/
docs/
specs/
public/
```
