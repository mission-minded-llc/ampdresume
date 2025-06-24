import fs from "fs";
import path from "path";

const sourceDir = path.join(process.cwd(), "node_modules/@iconify/json/json");
const targetDir = path.join(process.cwd(), "data/iconify");

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Exclude these files, they're too large.
const excludedFiles = [
  "fluent.json",
  "fluent-emoji.json",
  "fluent-emoji-flat.json",
  "noto.json",
  "twemoji.json",
  "arcticons.json",
  "emojione-v1.json",
];

fs.readdirSync(sourceDir)
  .filter((file) => file.endsWith(".json"))
  .forEach((file) => {
    if (excludedFiles.includes(file)) {
      return;
    }

    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
  });
