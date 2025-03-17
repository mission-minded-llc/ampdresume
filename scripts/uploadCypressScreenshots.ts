/**
 * Helper script to upload cypress screenshots to S3.
 */

import { readFileSync, readdirSync } from "fs";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "../src/lib/s3";
import { join } from "path";

const s3 = getS3Client();

const bucket = process.env.AWS_S3_BUCKET_NAME;
const screenshotsDir = join(__dirname, "..", "cypress", "screenshots");

const files = readdirSync(screenshotsDir);

files.forEach(async (file) => {
  const filePath = join(screenshotsDir, file);
  const data = readFileSync(filePath);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: file,
      Body: data,
      ContentType: "image/png",
    }),
  );
});
