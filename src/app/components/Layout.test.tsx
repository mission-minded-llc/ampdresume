import "@testing-library/jest-dom";

import { Layout } from "./Layout";
import React from "react";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

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
