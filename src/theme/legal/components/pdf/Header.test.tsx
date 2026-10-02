import { render, screen } from "@testing-library/react";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { Header } from "./Header";
import { expect } from "@jest/globals";

describe("Legal Header", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;

  it("renders a centered curriculum vitae letterhead", () => {
    render(<Header user={sampleUser} />);

    expect(screen.getByText("Curriculum Vitae")).toBeInTheDocument();
    expect(screen.getByText(sampleUser.name as string)).toBeInTheDocument();
    expect(screen.getByText(sampleUser.title as string)).toBeInTheDocument();
    expect(screen.getByText(sampleUser.location as string)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: sampleUser.displayEmail as string })).toHaveAttribute(
      "href",
      `mailto:${sampleUser.displayEmail}`,
    );
    expect(screen.getByText("\u00b7")).toBeInTheDocument();
  });

  it("omits the contact separator when email is absent", () => {
    render(<Header user={{ ...sampleUser, displayEmail: null }} />);

    expect(screen.getByText(sampleUser.location as string)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByText("\u00b7")).not.toBeInTheDocument();
  });

  it("renders email without location", () => {
    render(<Header user={{ ...sampleUser, location: null }} />);

    expect(screen.queryByText("\u00b7")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: sampleUser.displayEmail as string }),
    ).toBeInTheDocument();
  });
});
