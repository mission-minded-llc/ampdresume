/**
 * Helper script to upload Cypress screenshots to Cloud Storage. Used during
 * CI/CD to ensure that the screenshots are available for review.
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { Storage } from "@google-cloud/storage";

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

async function uploadScreenshots() {
  const bucketName = process.env.GCS_CI_ARTIFACTS_BUCKET;

  if (!bucketName) {
    throw new Error("GCS_CI_ARTIFACTS_BUCKET environment variable is required.");
  }

  // Authenticates via Application Default Credentials, which GitHub Actions
  // provides through Workload Identity Federation.
  const bucket = new Storage().bucket(bucketName);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, "..");

  const screenshotsDir = join(__dirname, "..", "cypress", "screenshots");

  console.log("Local screenshots directory:", screenshotsDir);

  const files = getAllFiles(screenshotsDir).map((filePath) =>
    filePath.replace(`${screenshotsDir}/`, ""),
  );
  console.log("Screenshot files list:", files);

  const destinationDir = "cypress/screenshots/" + new Date().toISOString();
  console.log("Bucket:", bucketName);
  console.log("Destination directory:", destinationDir);

  for (const file of files) {
    const filePath = join(screenshotsDir, file);
    const data = readFileSync(filePath);

    console.log("Uploading file:", file);

    try {
      await bucket.file(`${destinationDir}/${file}`).save(data, {
        contentType: "image/png",
        resumable: false,
      });
    } catch (error) {
      console.error("Error uploading file:", file, error);
    }
  }

  console.log("Done.");
}

uploadScreenshots().catch((error) => {
  console.error(error);
  process.exit(1);
});
