import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { Header } from "./Header";

describe("Times Header", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;

  it("renders user name and title", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.name as string)).toBeInTheDocument();
    expect(screen.getByText(sampleUser.title as string)).toBeInTheDocument();
  });

  it("separates location and email with a middot", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.location as string)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: sampleUser.displayEmail as string })).toHaveAttribute(
      "href",
      `mailto:${sampleUser.displayEmail}`,
    );
    expect(screen.getByText("\u00b7")).toBeInTheDocument();
    expect(screen.queryByText("|")).not.toBeInTheDocument();
  });

  it("renders location without email when displayEmail is omitted", () => {
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
