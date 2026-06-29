declare global {
  type YMapCoordinates = [number, number];

  type YMapInstance = {
    destroy: () => void;
    geoObjects: {
      add: (geoObject: YMapPlacemarkInstance) => void;
    };
    setBounds: (
      bounds: [YMapCoordinates, YMapCoordinates],
      options?: {
        checkZoomRange?: boolean;
        duration?: number;
        zoomMargin?: number;
      },
    ) => void;
  };

  type YMapPlacemarkInstance = unknown;

  type YMapsApi = {
    ready: (callback: () => void) => void;
    Map: new (
      element: HTMLElement,
      state: {
        center: YMapCoordinates;
        controls?: string[];
        zoom: number;
      },
    ) => YMapInstance;
    Placemark: new (
      coordinates: YMapCoordinates,
      properties: {
        balloonContent: string;
        hintContent: string;
      },
      options?: {
        iconColor?: string;
      },
    ) => YMapPlacemarkInstance;
  };

  interface Window {
    ymaps?: YMapsApi;
  }
}

export {};
