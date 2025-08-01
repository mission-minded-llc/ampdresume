/**
 * This script is used to copy the Iconify JSON files from the `node_modules/@iconify/json/json`
 * directory to the `data/iconify` directory.
 *
 * This is used to ensure that the Iconify JSON files are available to the application. It excludes
 * files that are larger than 5MB to stay within the limits of Vercel's hosting.
 */

import fs from "fs";
import path from "path";

const sourceDir = path.join(process.cwd(), "node_modules/@iconify/json/json");
const targetDir = path.join(process.cwd(), "data/iconify");

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.readdirSync(sourceDir)
  .filter((file) => file.endsWith(".json"))
  .forEach((file) => {
    const filePath = path.join(sourceDir, file);
    const stats = fs.statSync(filePath);
    const fileSizeInMB = stats.size / (1024 * 1024);

    if (fileSizeInMB > 5) {
      return;
    }

    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
  });
