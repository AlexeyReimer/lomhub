export type YardStatus = "Открыто" | "Закрыто";

export type Yard = {
  id: string;
  name: string;
  city: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ferrousPrice: string;
  rating: number | null;
  reviewCount: number;
  status: YardStatus;
};

export const mockYards: Yard[] = [
  {
    id: "moscow",
    name: "ЛомХаб Москва",
    city: "Москва",
    address: "Москва",
    coordinates: {
      lat: 55.7558,
      lng: 37.6176,
    },
    ferrousPrice: "640 ₽/кг",
    rating: null,
    reviewCount: 0,
    status: "Открыто",
  },
  {
    id: "krasnoyarsk",
    name: "ЛомХаб Красноярск",
    city: "Красноярск",
    address: "Красноярск",
    coordinates: {
      lat: 56.0184,
      lng: 92.8672,
    },
    ferrousPrice: "612 ₽/кг",
    rating: null,
    reviewCount: 0,
    status: "Открыто",
  },
  {
    id: "achinsk",
    name: "ЛомХаб Ачинск",
    city: "Ачинск",
    address: "Ачинск",
    coordinates: {
      lat: 56.2694,
      lng: 90.4993,
    },
    ferrousPrice: "598 ₽/кг",
    rating: null,
    reviewCount: 0,
    status: "Закрыто",
  },
];
