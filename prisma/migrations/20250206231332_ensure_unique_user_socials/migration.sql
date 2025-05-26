/*
  Warnings:

  - A unique constraint covering the columns `[userId,platform,ref]` on the table `Social` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_platform_ref_key" ON "ampdresume"."Social"("userId", "platform", "ref");
