import * as Cypress from "cypress";
import * as fs from "fs";
import * as path from "path";

interface GetMagicLinkParams {
  email: string;
}

const pluginFunction = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions => {
  on("task", {
    getMagicLink({ email }: GetMagicLinkParams): string {
      // Convert email to safe filename
      const safeEmail = email.replace(/[@.]/g, "_");
      const tempDir = path.join(process.cwd(), ".cypress-temp");
      const filePath = path.join(tempDir, `magic-link-${safeEmail}.txt`);

      // Try to read the file
      try {
        if (!fs.existsSync(filePath)) {
          throw new Error(`Magic link file not found for ${email} at ${filePath}`);
        }

        // Read the magic link from the file
        const magicLink = fs.readFileSync(filePath, "utf8").trim();

        // Optional: Remove the file after reading it
        // fs.unlinkSync(filePath);

        return magicLink;
      } catch (error) {
        throw new Error(`Error reading magic link for ${email}: ${(error as Error).message}`);
      }
    },

    // Optional: Add a task to clean up all magic link files
    cleanupMagicLinks(): null {
      const tempDir = path.join(process.cwd(), ".cypress-temp");

      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);

        for (const file of files) {
          if (file.startsWith("magic-link-")) {
            fs.unlinkSync(path.join(tempDir, file));
          }
        }
      }

      return null;
    },
  });

  return config;
};

export default pluginFunction;
