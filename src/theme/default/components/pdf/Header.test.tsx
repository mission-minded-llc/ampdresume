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

  it("renders location without email", () => {
    render(<Header user={sampleUser} />);
    expect(screen.getByText(sampleUser.location as string)).toBeInTheDocument();
    expect(screen.queryByText(sampleUser.displayEmail as string)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("handles missing location", () => {
    const userWithoutLocation = { ...sampleUser, location: null };
    render(<Header user={userWithoutLocation} />);
    expect(screen.queryByText(sampleUser.location as string)).not.toBeInTheDocument();
    expect(screen.queryByText(sampleUser.displayEmail as string)).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
