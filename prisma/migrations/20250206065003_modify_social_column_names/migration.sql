/*
  Warnings:

  - You are about to drop the column `name` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Social` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Social` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ref` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "openresume"."Social" DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "ref" TEXT NOT NULL;
