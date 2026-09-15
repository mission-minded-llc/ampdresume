import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { Header } from "./Header";
import { expect } from "@jest/globals";

describe("Header", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;

  it("renders user name", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.name as string)).toBeInTheDocument();
  });

  it("renders user title", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.title as string)).toBeInTheDocument();
  });

  it("renders location without email when displayEmail is omitted", () => {
    const userWithoutEmail = { ...sampleUser, displayEmail: null };
    render(<Header user={userWithoutEmail} />);
    expect(screen.getByText(sampleUser.location as string)).toBeInTheDocument();
    expect(screen.queryByText(sampleUser.displayEmail as string)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders location and email with separator when displayEmail is present", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.location as string, { exact: false })).toBeInTheDocument();
    const emailLink = screen.getByRole("link", {
      name: sampleUser.displayEmail as string,
    });
    expect(emailLink).toHaveAttribute("href", `mailto:${sampleUser.displayEmail}`);
  });

  it("renders email without location", () => {
    const userWithoutLocation = { ...sampleUser, location: null };
    render(<Header user={userWithoutLocation} />);
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: sampleUser.displayEmail as string }),
    ).toBeInTheDocument();
  });

  it("handles missing location and email", () => {
    const userWithoutContactInfo = {
      ...sampleUser,
      location: null,
      displayEmail: null,
    };
    render(<Header user={userWithoutContactInfo} />);
    expect(screen.queryByText(/\|/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
