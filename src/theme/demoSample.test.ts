import { expect } from "@jest/globals";
import { themeDavidsSampleData } from "./davids/sampleData";
import { demoSampleForRoute } from "./demoSample";
import { themeLegalSampleData } from "./legal/sampleData";
import { themeDefaultSampleData } from "./sampleData";

describe("demoSampleForRoute", () => {
  it("uses a legal example for the legal demo and David's example for that demo", () => {
    expect(demoSampleForRoute("legal")).toBe(themeLegalSampleData);
    expect(demoSampleForRoute("davids")).toBe(themeDavidsSampleData);
  });

  it("uses the Classic example for other demos, including print-only routes", () => {
    expect(demoSampleForRoute("default")).toBe(themeDefaultSampleData);
    expect(demoSampleForRoute("retro-80s")).toBe(themeDefaultSampleData);
    expect(demoSampleForRoute("times")).toBe(themeDefaultSampleData);
  });
});
