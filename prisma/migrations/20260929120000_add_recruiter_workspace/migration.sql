-- AlterTable
ALTER TABLE "ampdresume"."User" ADD COLUMN "recruiterDiscoverable" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "User_recruiterDiscoverable_idx" ON "ampdresume"."User"("recruiterDiscoverable");

-- CreateTable
CREATE TABLE "ampdresume"."RecruiterProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruiterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecruiterProfile_userId_key" ON "ampdresume"."RecruiterProfile"("userId");

-- AddForeignKey
ALTER TABLE "ampdresume"."RecruiterProfile" ADD CONSTRAINT "RecruiterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
