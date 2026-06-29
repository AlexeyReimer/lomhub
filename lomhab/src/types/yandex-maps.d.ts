import type * as YMaps3 from "@yandex/ymaps3-types";

declare global {
  interface Window {
    ymaps3?: typeof YMaps3;
  }
}

export {};
