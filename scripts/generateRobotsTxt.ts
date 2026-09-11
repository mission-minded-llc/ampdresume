/**
 * This script generates a robots.txt file in the public directory based on the
 * NEXT_PUBLIC_ENVIRONMENT_NAME environment variable.
 *
 * Thank you: https://mmazzarolo.com/blog/2021-04-27-nextjs-robots-txt/
 *
 * This is run as part of the build process via prebuild script in package.json
 */

import * as fs from "fs";
import "dotenv/config";

const envName = process.env.NEXT_PUBLIC_ENVIRONMENT_NAME;

if (!envName) {
  console.error("NEXT_PUBLIC_ENVIRONMENT_NAME is not defined");
  process.exit(1);
}

// Only production is crawlable; local builds are kept out of search indexes.
const isProduction = envName === "production";

fs.writeFileSync("public/robots.txt", `User-agent: *\n${isProduction ? "Allow" : "Disallow"}: /`);

console.log(`Generated a ${isProduction ? "crawlable" : "non-crawlable"} public/robots.txt`);
