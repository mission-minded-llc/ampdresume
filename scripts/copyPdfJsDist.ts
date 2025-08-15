/**
 * This script is used to copy the PDF.js distribution files from the `node_modules/pdfjs-dist`
 * directory to the `public` directory.
 *
 * This is used to ensure that the PDF.js distribution files are available to the application.
 */

import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfjsDistPath = join(__dirname, "..", "node_modules", "pdfjs-dist");
const publicPath = join(__dirname, "..", "public");

mkdirSync(publicPath, { recursive: true });
copyFileSync(
  join(pdfjsDistPath, "build", "pdf.worker.min.mjs"),
  join(publicPath, "pdf.worker.min.mjs"),
);
