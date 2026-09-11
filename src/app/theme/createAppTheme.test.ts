import { expect } from "@jest/globals";
import { createAppTheme } from "./createAppTheme";

describe("createAppTheme", () => {
  it("uses a generous radius and un-uppercased buttons in both modes", () => {
    const light = createAppTheme("light");
    const dark = createAppTheme("dark");

    expect(light.shape.borderRadius).toBe(16);
    expect(dark.shape.borderRadius).toBe(16);
    expect(light.typography.button?.textTransform).toBe("none");
    expect(dark.typography.button?.textTransform).toBe("none");
  });

  it("uses warm surfaces instead of stark black and white", () => {
    const light = createAppTheme("light");
    const dark = createAppTheme("dark");

    expect(light.palette.background.default).toBe("#FFF8F3");
    expect(light.palette.background.paper).toBe("#FFFFFF");
    expect(dark.palette.background.default).toBe("#141118");
    expect(dark.palette.background.paper).not.toBe("#000");
  });
});
