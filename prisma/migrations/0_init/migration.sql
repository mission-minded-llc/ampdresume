-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ampdresume";

-- CreateTable
CREATE TABLE "ampdresume"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayEmail" TEXT,
    "location" TEXT,
    "siteImage" TEXT,
    "siteTitle" TEXT,
    "title" TEXT,
    "siteDescription" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ampdresume"."Social" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "ref" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."SkillForUser" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "yearStarted" INTEGER,
    "totalYears" INTEGER,

    CONSTRAINT "SkillForUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."SkillForProject" (
    "id" TEXT NOT NULL,
    "skillForUserId" TEXT NOT NULL,
    "description" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "SkillForProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "positionId" TEXT NOT NULL,
    "sortIndex" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Position" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ampdresume"."Education" (
    "id" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "dateAwarded" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "ampdresume"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "ampdresume"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "ampdresume"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "ampdresume"."User"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "ampdresume"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "ampdresume"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_platform_ref_key" ON "ampdresume"."Social"("userId", "platform", "ref");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "ampdresume"."Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SkillForUser_userId_skillId_key" ON "ampdresume"."SkillForUser"("userId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillForProject_skillForUserId_projectId_key" ON "ampdresume"."SkillForProject"("skillForUserId", "projectId");

-- AddForeignKey
ALTER TABLE "ampdresume"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForUser" ADD CONSTRAINT "SkillForUser_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "ampdresume"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForUser" ADD CONSTRAINT "SkillForUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForProject" ADD CONSTRAINT "SkillForProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ampdresume"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."SkillForProject" ADD CONSTRAINT "SkillForProject_skillForUserId_fkey" FOREIGN KEY ("skillForUserId") REFERENCES "ampdresume"."SkillForUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Project" ADD CONSTRAINT "Project_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "ampdresume"."Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Position" ADD CONSTRAINT "Position_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "ampdresume"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ampdresume"."Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

