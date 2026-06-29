import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GroupSeed = {
  name: string;
  slug: string;
  types: Array<{
    code: string;
    name: string;
    slug: string;
    description?: string;
    unit?: string;
  }>;
};

const cities = [
  { name: "Москва", slug: "moscow", region: "Москва", latitude: "55.7558260", longitude: "37.6173000" },
  {
    name: "Красноярск",
    slug: "krasnoyarsk",
    region: "Красноярский край",
    latitude: "56.0105630",
    longitude: "92.8525720",
  },
  {
    name: "Ачинск",
    slug: "achinsk",
    region: "Красноярский край",
    latitude: "56.2694960",
    longitude: "90.4952310",
  },
];

const nonFerrousGroups: GroupSeed[] = [
  {
    name: "Медь",
    slug: "copper",
    types: [
      { code: "CU-001", name: "Медь", slug: "copper" },
      { code: "CU-002", name: "Лом меди", slug: "copper-scrap" },
      { code: "CU-003", name: "Лом меди луженой", slug: "tinned-copper-scrap" },
      { code: "CU-004", name: "Медная фольга", slug: "copper-foil" },
      { code: "CU-005", name: "Автомобильная медная проводка", slug: "car-copper-wiring" },
      { code: "CU-006", name: "Стружка медная", slug: "copper-shavings" },
    ],
  },
  { name: "Бронза", slug: "bronze", types: [{ code: "BR-001", name: "Лом бронзы", slug: "bronze-scrap" }] },
  {
    name: "Латунь",
    slug: "brass",
    types: [
      { code: "LA-001", name: "Лом латуни", slug: "brass-scrap" },
      { code: "LA-002", name: "Латунный радиатор", slug: "brass-radiator" },
      { code: "LA-003", name: "Стружка латунная", slug: "brass-shavings" },
    ],
  },
  {
    name: "Алюминий",
    slug: "aluminum",
    types: [
      { code: "AL-001", name: "Алюминиевый провод", slug: "aluminum-wire" },
      { code: "AL-002", name: "Лом пищевого алюминия", slug: "food-grade-aluminum-scrap" },
      { code: "AL-003", name: "Диски автомобильные", slug: "car-wheels" },
      { code: "AL-004", name: "Моторный лом", slug: "engine-aluminum-scrap" },
      { code: "AL-005", name: "Алюминиевые сплавы", slug: "aluminum-alloys" },
      { code: "AL-006", name: "Алюминиевые банки", slug: "aluminum-cans" },
      { code: "AL-007", name: "Алюминиевые радиаторы", slug: "aluminum-radiators" },
    ],
  },
  { name: "Нержавейка", slug: "stainless-steel", types: [{ code: "SS-001", name: "Лом нержавейки", slug: "stainless-steel-scrap" }] },
  {
    name: "Аккумуляторы",
    slug: "batteries",
    types: [
      { code: "BT-001", name: "Аккумуляторы слитые", slug: "drained-batteries" },
      { code: "BT-002", name: "Аккумуляторы не слитые", slug: "undrained-batteries" },
      { code: "BT-003", name: "Аккумуляторы эбонит", slug: "ebonite-batteries" },
      { code: "BT-004", name: "Аккумуляторы гелевые", slug: "gel-batteries" },
    ],
  },
  { name: "Свинец", slug: "lead", types: [{ code: "PB-001", name: "Лом свинца", slug: "lead-scrap" }] },
  {
    name: "ЦАМ",
    slug: "zamak",
    types: [
      { code: "ZM-001", name: "ЦАМ автомобильный", slug: "car-zamak" },
      { code: "ZM-002", name: "ЦАМ сантехнический", slug: "plumbing-zamak" },
    ],
  },
  {
    name: "Спецметаллы",
    slug: "special-metals",
    types: [
      { code: "SM-001", name: "Напайки", slug: "brazed-tips" },
      { code: "SM-002", name: "Лом баббита Б-83", slug: "babbitt-b83-scrap" },
      { code: "SM-003", name: "Лом баббита Б-16", slug: "babbitt-b16-scrap" },
      { code: "SM-004", name: "Лом титана", slug: "titanium-scrap" },
      { code: "SM-005", name: "Сверла и фрезы Р6М5", slug: "r6m5-drills-and-cutters" },
      { code: "SM-006", name: "Лом нихрома", slug: "nichrome-scrap" },
      { code: "SM-007", name: "Припои ПОС", slug: "pos-solders" },
      { code: "SM-008", name: "Припои ПОССУ", slug: "possu-solders" },
      { code: "SM-009", name: "Лом олова", slug: "tin-scrap" },
    ],
  },
];

const ferrousGroups: GroupSeed[] = [
  {
    name: "Стальной лом",
    slug: "steel-scrap",
    types: [
      { code: "3A", name: "3А — габаритный стальной лом", slug: "3a-sized-steel-scrap" },
      { code: "5A", name: "5А — негабаритный стальной лом", slug: "5a-oversized-steel-scrap" },
      { code: "5AR", name: "5АР — негабаритный стальной рельсовый лом", slug: "5ar-rail-steel-scrap" },
      { code: "12A", name: "12А — легковесный стальной лом", slug: "12a-lightweight-steel-scrap" },
    ],
  },
  {
    name: "Стальная стружка",
    slug: "steel-shavings",
    types: [
      { code: "14A-16A", name: "14А–16А — стальная стружка", slug: "14a-16a-steel-shavings" },
      {
        code: "14A-16A-MIX",
        name: "14А–16А с содержанием лома черных металлов",
        slug: "14a-16a-mixed-ferrous-shavings",
      },
    ],
  },
  {
    name: "Чугун",
    slug: "cast-iron",
    types: [
      { code: "17A-19A", name: "17А–19А — чугун габаритный", slug: "17a-19a-sized-cast-iron" },
      { code: "20A", name: "20А — чугун негабаритный", slug: "20a-oversized-cast-iron" },
      { code: "22A", name: "22А — чугун негабаритный", slug: "22a-oversized-cast-iron" },
    ],
  },
  {
    name: "Спецсталь",
    slug: "special-steel",
    types: [{ code: "B22", name: "Б22 — лом марганцовистой стали", slug: "b22-manganese-steel-scrap" }],
  },
];

async function seedCities() {
  for (const city of cities) {
    await prisma.city.upsert({ where: { slug: city.slug }, update: city, create: city });
  }
}

async function seedScrapDirectory() {
  const categories = [
    { name: "Цветной лом", slug: "non-ferrous-scrap", groups: nonFerrousGroups },
    { name: "Черный лом", slug: "ferrous-scrap", groups: ferrousGroups },
  ];

  for (const [categoryIndex, category] of categories.entries()) {
    const savedCategory = await prisma.scrapCategory.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: categoryIndex, isActive: true },
      create: { name: category.name, slug: category.slug, sortOrder: categoryIndex, isActive: true },
    });

    for (const [groupIndex, group] of category.groups.entries()) {
      const savedGroup = await prisma.scrapGroup.upsert({
        where: { slug: group.slug },
        update: { categoryId: savedCategory.id, name: group.name, sortOrder: groupIndex, isActive: true },
        create: { categoryId: savedCategory.id, name: group.name, slug: group.slug, sortOrder: groupIndex, isActive: true },
      });

      for (const [typeIndex, type] of group.types.entries()) {
        await prisma.scrapType.upsert({
          where: { code: type.code },
          update: {
            groupId: savedGroup.id,
            name: type.name,
            slug: type.slug,
            description: type.description ?? null,
            unit: type.unit ?? "кг",
            sortOrder: typeIndex,
            isActive: true,
          },
          create: {
            groupId: savedGroup.id,
            code: type.code,
            name: type.name,
            slug: type.slug,
            description: type.description,
            unit: type.unit ?? "кг",
            sortOrder: typeIndex,
            isActive: true,
          },
        });
      }
    }
  }
}

async function seedDemoData() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@lomhub.local" },
    update: { phone: "+79990000000", fullName: "Администратор ЛомХаба", role: "ADMIN" },
    create: {
      email: "admin@lomhub.local",
      phone: "+79990000000",
      passwordHash: "$2b$10$local-development-password-hash",
      fullName: "Администратор ЛомХаба",
      role: "ADMIN",
    },
  });

  const company = await prisma.company.upsert({
    where: { inn: "2466000000" },
    update: { ownerId: admin.id, name: "ЛомХаб Тест", description: "Тестовая компания для локальной разработки." },
    create: { ownerId: admin.id, name: "ЛомХаб Тест", inn: "2466000000", description: "Тестовая компания для локальной разработки." },
  });

  const krasnoyarsk = await prisma.city.findUniqueOrThrow({ where: { slug: "krasnoyarsk" } });
  const moscow = await prisma.city.findUniqueOrThrow({ where: { slug: "moscow" } });
  const achinsk = await prisma.city.findUniqueOrThrow({ where: { slug: "achinsk" } });

  const yards = [
    { cityId: krasnoyarsk.id, name: "Северный металл", slug: "severny-metall", address: "Красноярск, ул. Северное шоссе, 12", latitude: "56.0469010", longitude: "92.9011220", phone: "+73912000001", isVerified: true },
    { cityId: moscow.id, name: "Столичный лом", slug: "stolichny-lom", address: "Москва, Рязанский проспект, 45", latitude: "55.7161020", longitude: "37.7932840", phone: "+74950000002", isVerified: true },
    { cityId: achinsk.id, name: "Ачинск ВторМет", slug: "achinsk-vtormet", address: "Ачинск, Промышленная зона, 3", latitude: "56.2526330", longitude: "90.5131270", phone: "+73915100003", isVerified: false },
  ];

  for (const yard of yards) {
    await prisma.scrapYard.upsert({
      where: { slug: yard.slug },
      update: { companyId: company.id, cityId: yard.cityId, name: yard.name, address: yard.address, latitude: yard.latitude, longitude: yard.longitude, phone: yard.phone, isVerified: yard.isVerified, isActive: true },
      create: { companyId: company.id, cityId: yard.cityId, name: yard.name, slug: yard.slug, description: "Тестовая приемка для проверки каталога и цен.", address: yard.address, latitude: yard.latitude, longitude: yard.longitude, phone: yard.phone, workingHours: "Пн-Сб 09:00-18:00", isVerified: yard.isVerified, isActive: true },
    });
  }

  const copper = await prisma.scrapType.findUniqueOrThrow({ where: { code: "CU-002" } });
  const aluminum = await prisma.scrapType.findUniqueOrThrow({ where: { code: "AL-001" } });
  const steel = await prisma.scrapType.findUniqueOrThrow({ where: { code: "3A" } });
  const prices = [
    { yardSlug: "severny-metall", scrapTypeId: copper.id, price: "640.00", contaminationPercent: "1.50" },
    { yardSlug: "severny-metall", scrapTypeId: aluminum.id, price: "132.00", contaminationPercent: "3.00" },
    { yardSlug: "stolichny-lom", scrapTypeId: copper.id, price: "655.00", contaminationPercent: "1.00" },
    { yardSlug: "achinsk-vtormet", scrapTypeId: steel.id, price: "24.00", contaminationPercent: "5.00" },
  ];

  for (const price of prices) {
    const yard = await prisma.scrapYard.findUniqueOrThrow({ where: { slug: price.yardSlug } });
    const savedPrice = await prisma.yardPrice.upsert({
      where: { yardId_scrapTypeId: { yardId: yard.id, scrapTypeId: price.scrapTypeId } },
      update: { price: price.price, contaminationPercent: price.contaminationPercent, isAccepting: true, comment: "Тестовая цена" },
      create: { yardId: yard.id, scrapTypeId: price.scrapTypeId, price: price.price, contaminationPercent: price.contaminationPercent, isAccepting: true, comment: "Тестовая цена" },
    });

    await prisma.priceHistory.create({
      data: { yardPriceId: savedPrice.id, oldPrice: null, newPrice: price.price, oldContaminationPercent: null, newContaminationPercent: price.contaminationPercent },
    });
  }
}

async function main() {
  await seedCities();
  await seedScrapDirectory();
  await seedDemoData();
  console.log("Database seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
