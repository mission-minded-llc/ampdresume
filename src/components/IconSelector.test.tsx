import "@testing-library/jest-dom";

import { fireEvent, render, waitFor } from "@testing-library/react";

import { IconSelector } from "./IconSelector";
import React from "react";

global.fetch = jest.fn();

describe("IconSelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByLabelText } = render(<IconSelector setIcon={() => {}} />);
    expect(getByLabelText("Search Icons")).toBeInTheDocument();
  });

  it("displays loading indicator when searching", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ icons: [] }),
    });

    const { getByLabelText, getByRole } = render(<IconSelector setIcon={() => {}} />);
    const input = getByLabelText("Search Icons");

    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(getByRole("progressbar")).toBeInTheDocument();
    });
  });
});
