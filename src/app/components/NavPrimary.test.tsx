import "@testing-library/jest-dom";

import { NavPrimary } from "./NavPrimary";
import React from "react";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  // Preserve other exports
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

describe("NavPrimary Component", () => {
  it("matches snapshot when not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });
    const { container } = render(<NavPrimary />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { slug: "test-user" } },
      status: "authenticated",
    });
    const { container } = render(<NavPrimary />);
    expect(container).toMatchSnapshot();
  });
});
