-- AlterTable
ALTER TABLE "ampdresume"."User" ADD COLUMN     "pdfThemeName" TEXT,
ADD COLUMN     "webThemeName" TEXT;

-- CreateTable
CREATE TABLE "ampdresume"."SkillForFeaturedProject" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "skillId" TEXT NOT NULL,
    "featuredProjectId" TEXT NOT NULL,

    CONSTRAINT "SkillForFeaturedProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."FeaturedProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "links" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FeaturedProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Certification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "dateAwarded" TIMESTAMP(3) NOT NULL,
    "credentialUrl" TEXT,
    "credentialId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForFeaturedProject" ADD CONSTRAINT "SkillForFeaturedProject_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "ampdresume"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForFeaturedProject" ADD CONSTRAINT "SkillForFeaturedProject_featuredProjectId_fkey" FOREIGN KEY ("featuredProjectId") REFERENCES "ampdresume"."FeaturedProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."FeaturedProject" ADD CONSTRAINT "FeaturedProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Certification" ADD CONSTRAINT "Certification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
