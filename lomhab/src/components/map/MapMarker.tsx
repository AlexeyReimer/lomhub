"use client";

import type { ElementType, PropsWithChildren } from "react";
import { MapPopup } from "@/components/map/MapPopup";
import { cn } from "@/lib/cn";
import type { Yard } from "@/lib/mock-yards";

export type YMapMarkerComponent = ElementType<
  PropsWithChildren<{
    coordinates: [number, number];
    onClick?: () => void;
    zIndex?: number;
  }>
>;

type MapMarkerProps = {
  yard: Yard;
  isSelected: boolean;
  YMapMarker: YMapMarkerComponent;
  onSelect: (yard: Yard) => void;
};

export function MapMarker({ yard, isSelected, YMapMarker, onSelect }: MapMarkerProps) {
  const handleSelect = () => onSelect(yard);

  return (
    <YMapMarker
      coordinates={[yard.coordinates.lng, yard.coordinates.lat]}
      zIndex={isSelected ? 20 : 10}
      onClick={handleSelect}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={yard.name}
        className={cn(
          "group relative grid h-11 w-11 -translate-x-1/2 -translate-y-full cursor-pointer place-items-center rounded-full border-4 border-white bg-emerald-600 shadow-lg transition hover:scale-105 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
          isSelected && "bg-slate-950 hover:bg-slate-900",
        )}
        onClick={handleSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect();
          }
        }}
      >
        <span className="h-3 w-3 rounded-full bg-white shadow-sm" />
        <span className="absolute left-1/2 top-[34px] h-4 w-4 -translate-x-1/2 rotate-45 rounded-br-sm border-b-4 border-r-4 border-white bg-inherit" />
        {isSelected ? (
          <span className="absolute bottom-[54px] left-1/2 z-30 -translate-x-1/2">
            <MapPopup yard={yard} />
          </span>
        ) : null}
      </div>
    </YMapMarker>
  );
}
