/*
  Warnings:

  - You are about to drop the column `urlSuffix` on the `Social` table. All the data in the column will be lost.
  - Added the required column `url` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "urlSuffix",
ADD COLUMN     "url" TEXT NOT NULL;
