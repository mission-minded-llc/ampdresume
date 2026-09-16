-- Add an explicit display order for social media links.
ALTER TABLE "ampdresume"."Social" ADD COLUMN "sortIndex" INTEGER NOT NULL DEFAULT 0;

-- Preserve existing relative order per user (cuid values are roughly time-ordered).
WITH ordered AS (
  SELECT
    id,
    (ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY id) - 1)::INTEGER AS idx
  FROM "ampdresume"."Social"
)
UPDATE "ampdresume"."Social" AS social
SET "sortIndex" = ordered.idx
FROM ordered
WHERE social.id = ordered.id;
