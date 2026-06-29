"use client";

import Script from "next/script";
import * as React from "react";
import type { Yard } from "@/lib/mock-yards";

type YandexMapProps = {
  yards: Yard[];
  apiKey: string;
  initialCenter: [number, number];
  initialZoom: number;
};

function getBounds(yards: Yard[]): [[number, number], [number, number]] {
  const lats = yards.map((yard) => yard.coordinates.lat);
  const lngs = yards.map((yard) => yard.coordinates.lng);

  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ];
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getBalloonContent(yard: Yard) {
  const rating = yard.rating == null ? "Нет оценок" : `${yard.rating} ★`;

  return `
    <div style="min-width:260px;padding:6px 2px;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <h3 style="margin:0 0 10px;font-size:17px;line-height:23px;font-weight:700;">${escapeHtml(yard.name)}</h3>
      <div style="margin:0 0 12px;color:#64748b;font-size:13px;line-height:18px;">${escapeHtml(yard.address)}</div>
      <div style="display:grid;gap:8px;margin-bottom:14px;font-size:14px;line-height:20px;">
        <div style="display:flex;justify-content:space-between;gap:14px;"><span style="color:#64748b;">Рейтинг</span><strong>${rating}</strong></div>
        <div style="display:flex;justify-content:space-between;gap:14px;"><span style="color:#64748b;">Отзывы</span><strong>${yard.reviewCount}</strong></div>
        <div style="display:flex;justify-content:space-between;gap:14px;"><span style="color:#64748b;">Черный лом</span><strong style="color:#047857;">${escapeHtml(yard.ferrousPrice)}</strong></div>
      </div>
      <button type="button" style="width:100%;height:36px;border:0;border-radius:12px;background:#16a34a;color:white;font-weight:700;cursor:pointer;">
        Подробнее
      </button>
    </div>
  `;
}

export function YandexMap({ yards, apiKey, initialCenter, initialZoom }: YandexMapProps) {
  const mapRootRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<YMapInstance | null>(null);
  const [loadError, setLoadError] = React.useState(false);
  const hasApiKey = apiKey.trim().length > 0;

  const initializeMap = React.useCallback(() => {
    const ymaps = window.ymaps;

    if (!hasApiKey || !mapRootRef.current || !ymaps || mapRef.current) {
      return;
    }

    ymaps.ready(() => {
      if (!mapRootRef.current || mapRef.current) {
        return;
      }

      const map = new ymaps.Map(mapRootRef.current, {
        center: initialCenter,
        controls: ["zoomControl", "fullscreenControl"],
        zoom: initialZoom,
      });

      yards.forEach((yard) => {
        const placemark = new ymaps.Placemark(
          [yard.coordinates.lat, yard.coordinates.lng],
          {
            balloonContent: getBalloonContent(yard),
            hintContent: yard.name,
          },
          {
            iconColor: yard.status === "Открыто" ? "#16a34a" : "#64748b",
          },
        );

        map.geoObjects.add(placemark);
      });

      if (yards.length > 1) {
        map.setBounds(getBounds(yards), {
          checkZoomRange: true,
          duration: 300,
          zoomMargin: 48,
        });
      }

      mapRef.current = map;
    });
  }, [hasApiKey, initialCenter, initialZoom, yards]);

  React.useEffect(() => {
    return () => {
      mapRef.current?.destroy();
      mapRef.current = null;
    };
  }, []);

  if (!hasApiKey || loadError) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
        Не удалось загрузить Яндекс Карту. Проверьте ключ NEXT_PUBLIC_YANDEX_MAPS_API_KEY.
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-10rem)] min-h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[620px]">
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=ru_RU`}
        strategy="afterInteractive"
        onReady={initializeMap}
        onError={() => setLoadError(true)}
      />
      <div ref={mapRootRef} className="h-full w-full" />
    </div>
  );
}
