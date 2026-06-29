import { PrismaClient } from "@prisma/client";
import type { Yard } from "@/lib/mock-yards";

const prisma = new PrismaClient();

type GetYardsOptions = {
  citySlug?: string;
  metalTypeSlug?: string;
};

type DatabaseYard = {
  id: string;
  name: string;
  address: string;
  latitude: unknown;
  longitude: unknown;
  isActive: boolean;
  city: {
    name: string;
  };
  prices: Array<{
    price: unknown;
  }>;
  reviews: Array<{
    rating: number;
  }>;
};

function formatRublesPerKg(price: unknown) {
  if (price == null) {
    return "Цена не указана";
  }

  return `${Number(price).toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽/кг`;
}

function getAverageRating(reviews: Array<{ rating: number }>) {
  if (reviews.length === 0) {
    return null;
  }

  const rating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  return Math.round(rating * 10) / 10;
}

export async function getYards(options: GetYardsOptions = {}): Promise<Yard[]> {
  const yards = (await prisma.scrapYard.findMany({
    where: {
      isActive: true,
      latitude: { not: null },
      longitude: { not: null },
      city: options.citySlug ? { slug: options.citySlug } : undefined,
      prices: options.metalTypeSlug
        ? {
            some: {
              isAccepting: true,
              scrapType: {
                slug: options.metalTypeSlug,
              },
            },
          }
        : undefined,
    },
    include: {
      city: true,
      prices: {
        where: {
          isAccepting: true,
          scrapType: {
            group: {
              category: {
                slug: "ferrous-scrap",
              },
            },
          },
        },
        orderBy: {
          price: "desc",
        },
        take: 1,
      },
      reviews: {
        where: {
          isPublished: true,
        },
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })) as DatabaseYard[];

  return yards.map((yard) => ({
    id: yard.id,
    name: yard.name,
    city: yard.city.name,
    address: yard.address,
    coordinates: {
      lat: Number(yard.latitude),
      lng: Number(yard.longitude),
    },
    ferrousPrice: formatRublesPerKg(yard.prices[0]?.price),
    rating: getAverageRating(yard.reviews),
    reviewCount: yard.reviews.length,
    status: yard.isActive ? "Открыто" : "Закрыто",
  }));
}
