import { ThemeDefinition, ThemeName } from "@/types";
import { ThemeDavids } from "./davids/ThemeDavids";
import { ThemeDefault } from "./default/ThemeDefault";
import { ThemeDefaultPDF } from "./default/ThemeDefaultPDF";
import { ThemeRetro80s } from "./retro-80s/ThemeRetro80s";

// Using named exports here, because we want to be able to import the themes directly.
export { ThemeDavids, ThemeDefault, ThemeDefaultPDF, ThemeRetro80s };

export const themeDefinitions: Record<ThemeName, ThemeDefinition> = {
  default: {
    name: "Classic",
    published: true,
    webComponent: ThemeDefault,
    pdfComponent: ThemeDefaultPDF,
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
    pdfComponent: null,
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
    published: false,
    webComponent: ThemeRetro80s,
    pdfComponent: null,
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
