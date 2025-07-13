-- DropForeignKey
ALTER TABLE "ampdresume"."Position" DROP CONSTRAINT "Position_companyId_fkey";

-- DropForeignKey
ALTER TABLE "ampdresume"."Project" DROP CONSTRAINT "Project_positionId_fkey";

-- AddForeignKey
ALTER TABLE "ampdresume"."Project" ADD CONSTRAINT "Project_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "ampdresume"."Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Position" ADD CONSTRAINT "Position_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "ampdresume"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
