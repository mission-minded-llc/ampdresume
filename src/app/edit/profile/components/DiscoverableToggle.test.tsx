import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { DiscoverableToggle } from "./DiscoverableToggle";

describe("DiscoverableToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("saves the opt-in immediately", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ enabled: true }),
    }) as jest.Mock;

    render(<DiscoverableToggle enabled={false} />);

    fireEvent.click(screen.getByRole("switch", { name: "Recruiter search" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/recruiter/discoverable",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ enabled: true }),
        }),
      );
    });
    expect(screen.getByRole("switch", { name: "Recruiter search" })).toBeChecked();
  });
});
