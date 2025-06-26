import "@testing-library/jest-dom";

import { EditPageNav } from "./EditPageNav";
import React from "react";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("EditPageNav", () => {
  it("renders correctly with sections", () => {
    (usePathname as jest.Mock).mockReturnValue("/edit/profile");

    const { getByText } = render(<EditPageNav />);

    expect(getByText("Profile")).toBeInTheDocument();
    expect(getByText("Skills")).toBeInTheDocument();
    expect(getByText("Work Experience")).toBeInTheDocument();
    expect(getByText("Education")).toBeInTheDocument();
  });
});
