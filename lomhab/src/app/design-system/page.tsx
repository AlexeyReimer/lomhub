"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { PriceTag } from "@/components/ui/price-tag";
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const badgeExamples = [
  { label: "Проверено", variant: "verified" as const },
  { label: "Открыто", variant: "open" as const },
  { label: "Закрыто", variant: "closed" as const },
  { label: "Премиум", variant: "premium" as const },
  { label: "Нейтрально", variant: "neutral" as const },
];

const yards = [
  { name: "Северный металл", metal: "Медь", price: "640 ₽/кг", status: "Открыто" },
  { name: "ЛомПункт", metal: "Алюминий", price: "132 ₽/кг", status: "Проверено" },
  { name: "ВторМет", metal: "Черный лом", price: "24 ₽/кг", status: "Закрыто" },
];

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Container className="py-10 sm:py-14">
        <Section className="pt-0">
          <SectionHeader>
            <SectionTitle>Дизайн-система ЛомХаба</SectionTitle>
            <SectionDescription>
              Базовые компоненты интерфейса для будущих страниц продукта.
            </SectionDescription>
          </SectionHeader>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Кнопки</CardTitle>
                <CardDescription>Основные действия, вторичные сценарии и опасные операции.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Поля ввода</CardTitle>
                <CardDescription>Label, placeholder, подсказка и состояние ошибки.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input label="Город" name="city" placeholder="Красноярск" hint="Используется для поиска приемок рядом." />
                <Input label="Телефон" name="phone" placeholder="+7 999 000-00-00" error="Введите корректный номер." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Бейджи</CardTitle>
                <CardDescription>Статусы карточек, приемок и предложений.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                {badgeExamples.map((badge) => (
                  <Badge key={badge.variant} variant={badge.variant}>
                    {badge.label}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Цена и статус</CardTitle>
                <CardDescription>Компоненты для карточек цен и операционных состояний.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <PriceTag value={640} unit="кг" />
                <PriceTag value="24 500" unit="т" />
                <StatusBadge variant="success">Активно</StatusBadge>
                <StatusBadge variant="warning">На проверке</StatusBadge>
                <StatusBadge variant="error">Ошибка</StatusBadge>
                <StatusBadge>Архив</StatusBadge>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Таблица</SectionTitle>
            <SectionDescription>Компактное представление данных для списков и кабинетов.</SectionDescription>
          </SectionHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Приемка</TableHead>
                <TableHead>Металл</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yards.map((yard) => (
                <TableRow key={yard.name}>
                  <TableCell className="font-semibold">{yard.name}</TableCell>
                  <TableCell>{yard.metal}</TableCell>
                  <TableCell>{yard.price}</TableCell>
                  <TableCell>
                    <Badge variant={yard.status === "Закрыто" ? "closed" : "open"}>{yard.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section className="pb-0">
          <Card>
            <CardHeader>
              <CardTitle>Модальное окно</CardTitle>
              <CardDescription>Базовый слой для подтверждений и коротких форм.</CardDescription>
            </CardHeader>
            <CardContent className="items-start">
              <Button onClick={() => setModalOpen(true)}>Открыть окно</Button>
            </CardContent>
          </Card>
        </Section>
      </Container>

      <Modal
        open={modalOpen}
        title="Пример модального окна"
        description="Компонент принимает заголовок, описание, содержимое и обработчик закрытия."
        onClose={() => setModalOpen(false)}
      >
        <div className="grid gap-4">
          <p className="text-sm leading-6 text-[#64748B]">
            Здесь можно разместить форму, подтверждение действия или короткое сообщение.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Отмена
            </Button>
            <Button onClick={() => setModalOpen(false)}>Готово</Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
