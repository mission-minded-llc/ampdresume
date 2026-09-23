import { ThemeDefinition, ThemeName } from "@/types";
import { ThemeDavids } from "./davids/ThemeDavids";
import { ThemeDefault } from "./default/ThemeDefault";
import { ThemeDefaultPDF } from "./default/ThemeDefaultPDF";
import { ThemeRetro80s } from "./retro-80s/ThemeRetro80s";
import { ThemeTimesPDF } from "./times/ThemeTimesPDF";

// Using named exports here, because we want to be able to import the themes directly.
export { ThemeDavids, ThemeDefault, ThemeDefaultPDF, ThemeRetro80s, ThemeTimesPDF };
export {
  DEFAULT_PDF_THEME_NAME,
  getPdfThemeDefinition,
  isPdfThemeName,
  pdfThemeDefinitions,
  resolvePdfThemeName,
} from "./pdfThemes";

export const themeDefinitions: Record<ThemeName, ThemeDefinition> = {
  default: {
    name: "Classic",
    published: true,
    webComponent: ThemeDefault,
    description: "The default theme for Amp'd Resume. Single-page resume with expanding sections.",
    iconifyIcon: "fluent-emoji-flat:high-voltage",
    authors: [
      {
        name: "Michael R. Dinerstein",
        gitHubUrl: "https://github.com/missionmike",
        linkedInUrl: "https://www.linkedin.com/in/michaeldinerstein/",
      },
    ],
  },
  davids: {
    name: "David's Theme",
    published: true,
    webComponent: ThemeDavids,
    description: "The theme by David Schurer. Multi-page resume with a QR code to share.",
    iconifyIcon: "fluent-emoji-flat:memo",
    authors: [
      {
        name: "David Schurer",
        gitHubUrl: "https://github.com/davidschurer",
        linkedInUrl: "https://www.linkedin.com/in/david-schurer/",
      },
    ],
  },
  "retro-80s": {
    name: "Retro 80s",
    published: true,
    webComponent: ThemeRetro80s,
    description:
      "An 8-bit arcade take on the Classic layout: pixel type, neon synthwave palette, and CRT scanlines.",
    iconifyIcon: "fluent-emoji-flat:joystick",
    authors: [
      {
        name: "Michael R. Dinerstein",
        gitHubUrl: "https://github.com/missionmike",
        linkedInUrl: "https://www.linkedin.com/in/michaeldinerstein/",
      },
    ],
  },
};
