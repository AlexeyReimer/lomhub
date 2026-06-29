"use client";

import Script from "next/script";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MapMarker, type YMapMarkerComponent } from "@/components/map/MapMarker";
import type { Yard } from "@/lib/mock-yards";

type YMapComponent = React.ElementType<
  React.PropsWithChildren<{
    location: {
      bounds: [[number, number], [number, number]];
    };
    className?: string;
    mode?: "raster" | "vector";
    theme?: "light" | "dark";
    behaviors?: string[];
  }>
>;

type YMapLayerComponent = React.ElementType<Record<string, never>>;

type YandexMapComponents = {
  YMap: YMapComponent;
  YMapDefaultSchemeLayer: YMapLayerComponent;
  YMapDefaultFeaturesLayer: YMapLayerComponent;
  YMapMarker: YMapMarkerComponent;
};

type YandexMapProps = {
  yards: Yard[];
};

function getBounds(yards: Yard[]): [[number, number], [number, number]] {
  const lngs = yards.map((yard) => yard.coordinates.lng);
  const lats = yards.map((yard) => yard.coordinates.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const lngPadding = Math.max((maxLng - minLng) * 0.14, 1);
  const latPadding = Math.max((maxLat - minLat) * 0.14, 1);

  return [
    [minLng - lngPadding, minLat - latPadding],
    [maxLng + lngPadding, maxLat + latPadding],
  ];
}

export function YandexMap({ yards }: YandexMapProps) {
  const [components, setComponents] = React.useState<YandexMapComponents | null>(null);
  const [selectedYard, setSelectedYard] = React.useState<Yard | null>(yards[0] ?? null);
  const [loadError, setLoadError] = React.useState(false);
  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
  const bounds = React.useMemo(() => getBounds(yards), [yards]);

  const initializeMap = React.useCallback(async () => {
    if (!window.ymaps3 || components) {
      return;
    }

    await window.ymaps3.ready;
    const ymaps3React = await window.ymaps3.import("@yandex/ymaps3-reactify");
    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    const mapComponents = reactify.module(window.ymaps3);

    setComponents({
      YMap: mapComponents.YMap as YMapComponent,
      YMapDefaultSchemeLayer: mapComponents.YMapDefaultSchemeLayer as YMapLayerComponent,
      YMapDefaultFeaturesLayer: mapComponents.YMapDefaultFeaturesLayer as YMapLayerComponent,
      YMapMarker: mapComponents.YMapMarker as YMapMarkerComponent,
    });
  }, [components]);

  const scriptSrc = apiKey
    ? `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`
    : "https://api-maps.yandex.ru/v3/?lang=ru_RU";

  if (loadError) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
        Не удалось загрузить Яндекс Карту. Проверьте ключ NEXT_PUBLIC_YANDEX_MAPS_API_KEY.
      </div>
    );
  }

  const mapContent = components ? (
    <components.YMap
      location={{ bounds }}
      mode="vector"
      theme="light"
      behaviors={["drag", "scrollZoom", "dblClick"]}
      className="h-full w-full"
    >
      <components.YMapDefaultSchemeLayer />
      <components.YMapDefaultFeaturesLayer />
      {yards.map((yard) => (
        <MapMarker
          key={yard.id}
          yard={yard}
          isSelected={selectedYard?.id === yard.id}
          YMapMarker={components.YMapMarker}
          onSelect={setSelectedYard}
        />
      ))}
    </components.YMap>
  ) : (
    <div className="grid h-full place-items-center bg-slate-100 text-sm font-medium text-slate-500">
      Загрузка карты...
    </div>
  );

  return (
    <div className="relative h-[calc(100vh-10rem)] min-h-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:h-[620px]">
      <Script
        src={scriptSrc}
        strategy="afterInteractive"
        onReady={() => {
          void initializeMap();
        }}
        onError={() => setLoadError(true)}
      />
      {mapContent}
    </div>
  );
}
