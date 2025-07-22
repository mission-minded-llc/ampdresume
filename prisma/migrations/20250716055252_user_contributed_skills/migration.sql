-- AlterTable
ALTER TABLE "ampdresume"."Skill" ADD COLUMN     "publishDate" TIMESTAMP(3),
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ampdresume"."SkillContribution" (
    "id" TEXT NOT NULL,
    "submitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skillId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SkillContribution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillContribution" ADD CONSTRAINT "SkillContribution_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "ampdresume"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillContribution" ADD CONSTRAINT "SkillContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
