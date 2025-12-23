/*
  Warnings:

  - You are about to drop the `AdminInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CostEstimation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItineraryDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."AdminInfo" DROP CONSTRAINT "AdminInfo_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CostEstimation" DROP CONSTRAINT "CostEstimation_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ItineraryDay" DROP CONSTRAINT "ItineraryDay_tripId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- DropTable
DROP TABLE "public"."AdminInfo";

-- DropTable
DROP TABLE "public"."CostEstimation";

-- DropTable
DROP TABLE "public"."ItineraryDay";

-- DropTable
DROP TABLE "public"."Trip";

-- CreateTable
CREATE TABLE "TripDetail" (
    "tripId" TEXT NOT NULL,
    "tripDetail" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TripDetail_pkey" PRIMARY KEY ("tripId")
);

-- AddForeignKey
ALTER TABLE "TripDetail" ADD CONSTRAINT "TripDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
