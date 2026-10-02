import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { fireEvent, render, screen } from "@testing-library/react";
import { NavPrimary } from "./NavPrimary";
import { expect } from "@jest/globals";

jest.mock("next-auth/react", () => ({
  // Preserve other exports
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/edit/profile"),
}));

describe("NavPrimary Component", () => {
  it("matches snapshot when not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
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

  it("opens the menu on click, not hover", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(<NavPrimary />);

    fireEvent.mouseEnter(screen.getByTestId("NavPrimaryMenuIcon"));
    expect(screen.queryByTestId("NavPrimaryMenuHome")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("NavPrimaryMenuIcon"));
    expect(screen.getByTestId("NavPrimaryMenuHome")).toBeInTheDocument();
  });

  it("shows restart tutorial and import links when logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { slug: "test-user", id: "user-1" } },
      status: "authenticated",
    });
    render(<NavPrimary />);
    fireEvent.click(screen.getByTestId("NavPrimaryMenuIcon"));

    const restart = screen.getByTestId("NavPrimaryMenuRestartTutorial");
    expect(restart).toBeInTheDocument();
    expect(restart.querySelector("[data-icon]")?.getAttribute("data-icon")).toBe(
      "fluent-color:book-open-lightbulb-20",
    );
    expect(screen.getByTestId("NavPrimaryMenuEditImport")).toBeInTheDocument();
    expect(screen.getByTestId("NavPrimaryMenuEditExperience")).toBeInTheDocument();
    expect(screen.getByTestId("NavPrimaryMenuRecruiter")).toBeInTheDocument();
    expect(screen.getByTestId("NavPrimaryMenuMyResume")).toHaveAttribute("aria-current", "page");
  });

  it("shows recruiter links and hides resume editors on the recruiter workspace", () => {
    (usePathname as jest.Mock).mockReturnValue("/recruit");
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { slug: "test-user", id: "user-1" } },
      status: "authenticated",
    });
    render(<NavPrimary />);
    fireEvent.click(screen.getByTestId("NavPrimaryMenuIcon"));

    expect(screen.getByTestId("NavPrimaryMenuRecruiter")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Recruiter" })).toHaveAttribute("href", "/recruit");
    expect(screen.queryByText("Search candidates")).not.toBeInTheDocument();
    expect(screen.queryByTestId("NavPrimaryMenuEditExperience")).not.toBeInTheDocument();
    expect(screen.queryByTestId("NavPrimaryMenuRestartTutorial")).not.toBeInTheDocument();
  });
});
