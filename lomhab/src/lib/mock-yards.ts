export type YardStatus = "Открыто" | "Закрыто";

export type Yard = {
  id: string;
  name: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  minPrice: string;
  status: YardStatus;
};

export const mockYards: Yard[] = [
  {
    id: "moscow",
    name: "ЛомХаб Москва",
    city: "Москва",
    coordinates: {
      lat: 55.7558,
      lng: 37.6176,
    },
    minPrice: "640 ₽/кг",
    status: "Открыто",
  },
  {
    id: "krasnoyarsk",
    name: "ЛомХаб Красноярск",
    city: "Красноярск",
    coordinates: {
      lat: 56.0184,
      lng: 92.8672,
    },
    minPrice: "612 ₽/кг",
    status: "Открыто",
  },
  {
    id: "achinsk",
    name: "ЛомХаб Ачинск",
    city: "Ачинск",
    coordinates: {
      lat: 56.2694,
      lng: 90.4993,
    },
    minPrice: "598 ₽/кг",
    status: "Закрыто",
  },
];
