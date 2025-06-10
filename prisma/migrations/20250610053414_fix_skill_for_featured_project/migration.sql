/*
  Warnings:

  - You are about to drop the column `skillId` on the `SkillForFeaturedProject` table. All the data in the column will be lost.
  - Added the required column `skillForUserId` to the `SkillForFeaturedProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ampdresume"."SkillForFeaturedProject" DROP CONSTRAINT "SkillForFeaturedProject_skillId_fkey";

-- AlterTable
ALTER TABLE "ampdresume"."SkillForFeaturedProject" DROP COLUMN "skillId",
ADD COLUMN     "skillForUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForFeaturedProject" ADD CONSTRAINT "SkillForFeaturedProject_skillForUserId_fkey" FOREIGN KEY ("skillForUserId") REFERENCES "ampdresume"."SkillForUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
