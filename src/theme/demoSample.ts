import { Response } from "@/types";
import { themeDavidsSampleData } from "./davids/sampleData";
import { themeLegalSampleData } from "./legal/sampleData";
import { themeDefaultSampleData } from "./sampleData";

const samplesByRoute: Record<string, Response> = {
  davids: themeDavidsSampleData,
  legal: themeLegalSampleData,
};

/**
 * Example resume for a demo route. Legal and David's demos carry their own
 * example. Every other demo, including Retro 80s and Times, uses the Classic sample.
 *
 * @param themeName Route slug, such as "legal" or "times".
 * @returns The resume to show on that demo, regardless of which layout the visitor selects.
 */
export const demoSampleForRoute = (themeName: string): Response =>
  samplesByRoute[themeName] ?? themeDefaultSampleData;
