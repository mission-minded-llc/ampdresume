import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { render } from "@testing-library/react";
import { Layout } from "./Layout";
import { expect } from "@jest/globals";

jest.mock("next-auth/react");
jest.mock("next/navigation");

describe("Layout component", () => {
  it("matches snapshot", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {},
      status: "unauthenticated",
    });
    (usePathname as jest.Mock).mockReturnValue("/");
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    const { container } = render(<Layout>Test</Layout>);
    expect(container).toMatchSnapshot();
  });
});
