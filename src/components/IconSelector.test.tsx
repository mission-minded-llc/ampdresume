import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { IconSelector } from "./IconSelector";

global.fetch = jest.fn();

describe("IconSelector", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <IconSelector setIcon={() => {}} icon="test" />
    );
    expect(getByTestId("icon-selector-input")).toBeInTheDocument();
  });

  it("displays loading indicator when searching", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ icons: [] }),
    });

    const { getByTestId, getByRole } = render(
      <IconSelector setIcon={() => {}} />
    );
    const input = getByTestId("icon-selector-input").querySelector("input");
    expect(input).not.toBeNull();
    fireEvent.change(input!, { target: { value: "test" } });

    await waitFor(() => {
      expect(getByRole("progressbar")).toBeInTheDocument();
    });
  });
});
