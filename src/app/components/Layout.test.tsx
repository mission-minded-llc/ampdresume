import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

import { Layout } from "./Layout";

jest.mock("next-auth/react");
jest.mock("next/navigation");

describe("Layout component", () => {
  it("matches snapshot", async () => {
    (useSession as jest.Mock).mockReturnValueOnce({
      data: {},
    });
    (usePathname as jest.Mock).mockReturnValue("/");

    const { container } = render(<Layout>Test</Layout>);
    expect(container).toMatchSnapshot();
  });
});
