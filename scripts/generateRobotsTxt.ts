/**
 * This script generates a robots.txt file in the public directory based on the
 * NEXT_PUBLIC_ENVIRONMENT_NAME environment variable.
 *
 * Thank you: https://mmazzarolo.com/blog/2021-04-27-nextjs-robots-txt/
 *
 * This is run as part of the build process via prebuild script in package.json
 */
import * as fs from "fs";

const productionRobotsTxt = `User-agent: *\nAllow: /`;

const testRobotsTxt = `User-agent: *\nDisallow: /`;

const envName = process.env.NEXT_PUBLIC_ENVIRONMENT_NAME;

if (!envName) {
  // eslint-disable-next-line no-console
  console.error("NEXT_PUBLIC_ENVIRONMENT_NAME is not defined");
  process.exit(1);
}

const robotsTxt = envName === "production" ? productionRobotsTxt : testRobotsTxt;
fs.writeFileSync("public/robots.txt", robotsTxt);

// eslint-disable-next-line no-console
console.log(
  `Generated a ${envName === "production" ? "crawlable" : "non-crawlable"} public/robots.txt`,
);
