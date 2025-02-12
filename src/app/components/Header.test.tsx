import "@testing-library/jest-dom";

import { Header } from "./Header";
import React from "react";
import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("Header component", () => {
  it("matches snapshot", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
    });

    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
