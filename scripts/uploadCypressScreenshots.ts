/* eslint-disable no-console */
/**
 * Helper script to upload cypress screenshots to S3.
 */

import { readFileSync, readdirSync } from "fs";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { fileURLToPath } from "url";
import { getS3Client } from "../src/lib/s3";
import { join } from "path";

const s3 = getS3Client();

const bucket = "ci.openresume.org";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

console.log("Uploading screenshots to S3...");
const screenshotsDir = join(__dirname, "..", "cypress", "screenshots");

console.log("Local screenshots directory:", screenshotsDir);
const files = readdirSync(screenshotsDir);
console.log("Screenshot files list:", files);

const s3dir = "cypress/screenshots/" + new Date().toISOString();
console.log("S3 bucket:", bucket);
console.log("S3 directory:", s3dir);

files.forEach(async (file) => {
  const filePath = join(screenshotsDir, file);
  const data = readFileSync(filePath);

  console.log("Uploading file:", file);
  await s3
    .send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: `${s3dir}/${file}`,
        Body: data,
        ContentType: "image/png",
      }),
    )
    .catch((error) => {
      console.error("Error uploading file:", file, error);
    });

  console.log("Done.");
});
