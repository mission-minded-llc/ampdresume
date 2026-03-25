-- CreateTable
CREATE TABLE "ampdresume"."Feature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feature_userId_name_key" ON "ampdresume"."Feature"("userId", "name");

-- AddForeignKey
ALTER TABLE "ampdresume"."Feature" ADD CONSTRAINT "Feature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ampdresume"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Preserve prior email allowlist as DB rows (users must exist)
INSERT INTO "ampdresume"."Feature" ("id", "name", "userId", "enabled")
SELECT gen_random_uuid()::text, 'ai_assist', u."id", true
FROM "ampdresume"."User" u
WHERE u.email IN ('missionmiked@gmail.com', 'md@missionmike.dev', 'test@ampdresume.com');
