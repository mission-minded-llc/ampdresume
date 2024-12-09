/*
  Warnings:

  - Made the column `companyId` on table `Position` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_companyId_fkey";

-- AlterTable
ALTER TABLE "Position" ALTER COLUMN "companyId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
