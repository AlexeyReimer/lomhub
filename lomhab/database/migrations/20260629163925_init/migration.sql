-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'YARD_OWNER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrapYard" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "phone" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "website" TEXT,
    "workingHours" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScrapYard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrapCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ScrapCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrapGroup" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ScrapGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrapType" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "unit" TEXT NOT NULL DEFAULT 'кг',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ScrapType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YardPrice" (
    "id" TEXT NOT NULL,
    "yardId" TEXT NOT NULL,
    "scrapTypeId" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "contaminationPercent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "isAccepting" BOOLEAN NOT NULL DEFAULT true,
    "comment" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YardPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL,
    "yardPriceId" TEXT NOT NULL,
    "oldPrice" DECIMAL(12,2),
    "newPrice" DECIMAL(12,2) NOT NULL,
    "oldContaminationPercent" DECIMAL(5,2),
    "newContaminationPercent" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YardPhoto" (
    "id" TEXT NOT NULL,
    "yardId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YardPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "yardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Company_inn_key" ON "Company"("inn");

-- CreateIndex
CREATE INDEX "Company_ownerId_idx" ON "Company"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- CreateIndex
CREATE INDEX "City_slug_idx" ON "City"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScrapYard_slug_key" ON "ScrapYard"("slug");

-- CreateIndex
CREATE INDEX "ScrapYard_slug_idx" ON "ScrapYard"("slug");

-- CreateIndex
CREATE INDEX "ScrapYard_cityId_idx" ON "ScrapYard"("cityId");

-- CreateIndex
CREATE INDEX "ScrapYard_companyId_idx" ON "ScrapYard"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "ScrapCategory_slug_key" ON "ScrapCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ScrapGroup_slug_key" ON "ScrapGroup"("slug");

-- CreateIndex
CREATE INDEX "ScrapGroup_categoryId_idx" ON "ScrapGroup"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ScrapType_code_key" ON "ScrapType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ScrapType_slug_key" ON "ScrapType"("slug");

-- CreateIndex
CREATE INDEX "ScrapType_groupId_idx" ON "ScrapType"("groupId");

-- CreateIndex
CREATE INDEX "YardPrice_yardId_idx" ON "YardPrice"("yardId");

-- CreateIndex
CREATE INDEX "YardPrice_scrapTypeId_idx" ON "YardPrice"("scrapTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "YardPrice_yardId_scrapTypeId_key" ON "YardPrice"("yardId", "scrapTypeId");

-- CreateIndex
CREATE INDEX "PriceHistory_yardPriceId_idx" ON "PriceHistory"("yardPriceId");

-- CreateIndex
CREATE INDEX "YardPhoto_yardId_idx" ON "YardPhoto"("yardId");

-- CreateIndex
CREATE INDEX "Review_yardId_idx" ON "Review"("yardId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");


-- AddCheckConstraints
ALTER TABLE "City" ADD CONSTRAINT "City_latitude_range_check" CHECK ("latitude" >= -90 AND "latitude" <= 90);
ALTER TABLE "City" ADD CONSTRAINT "City_longitude_range_check" CHECK ("longitude" >= -180 AND "longitude" <= 180);
ALTER TABLE "ScrapYard" ADD CONSTRAINT "ScrapYard_latitude_range_check" CHECK ("latitude" IS NULL OR ("latitude" >= -90 AND "latitude" <= 90));
ALTER TABLE "ScrapYard" ADD CONSTRAINT "ScrapYard_longitude_range_check" CHECK ("longitude" IS NULL OR ("longitude" >= -180 AND "longitude" <= 180));
ALTER TABLE "YardPrice" ADD CONSTRAINT "YardPrice_price_non_negative_check" CHECK ("price" >= 0);
ALTER TABLE "YardPrice" ADD CONSTRAINT "YardPrice_contamination_range_check" CHECK ("contaminationPercent" >= 0 AND "contaminationPercent" <= 100);
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_old_price_non_negative_check" CHECK ("oldPrice" IS NULL OR "oldPrice" >= 0);
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_new_price_non_negative_check" CHECK ("newPrice" >= 0);
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_old_contamination_range_check" CHECK ("oldContaminationPercent" IS NULL OR ("oldContaminationPercent" >= 0 AND "oldContaminationPercent" <= 100));
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_new_contamination_range_check" CHECK ("newContaminationPercent" >= 0 AND "newContaminationPercent" <= 100);
ALTER TABLE "Review" ADD CONSTRAINT "Review_rating_range_check" CHECK ("rating" >= 1 AND "rating" <= 5);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapYard" ADD CONSTRAINT "ScrapYard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapYard" ADD CONSTRAINT "ScrapYard_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapGroup" ADD CONSTRAINT "ScrapGroup_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ScrapCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapType" ADD CONSTRAINT "ScrapType_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ScrapGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YardPrice" ADD CONSTRAINT "YardPrice_yardId_fkey" FOREIGN KEY ("yardId") REFERENCES "ScrapYard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YardPrice" ADD CONSTRAINT "YardPrice_scrapTypeId_fkey" FOREIGN KEY ("scrapTypeId") REFERENCES "ScrapType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_yardPriceId_fkey" FOREIGN KEY ("yardPriceId") REFERENCES "YardPrice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YardPhoto" ADD CONSTRAINT "YardPhoto_yardId_fkey" FOREIGN KEY ("yardId") REFERENCES "ScrapYard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_yardId_fkey" FOREIGN KEY ("yardId") REFERENCES "ScrapYard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
