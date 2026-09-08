-- Resumes are text-only, so the Open Graph image URL is no longer collected.
ALTER TABLE "ampdresume"."User" DROP COLUMN IF EXISTS "siteImage";
