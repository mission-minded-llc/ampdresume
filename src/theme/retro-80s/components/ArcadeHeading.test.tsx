import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { generateSocialUrl, getSocialMediaPlatformByPlatformName } from "@/util/social";
import { ArcadeHeading } from "./ArcadeHeading";
import { expect } from "@jest/globals";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("ArcadeHeading", () => {
  const sampleUser = themeDefaultSampleData.data.resume.user;
  const sampleSocials = getDemoPlaceholderSocials(sampleUser);

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/demo/retro-80s");
  });

  it("renders the name, title, and location", () => {
    render(<ArcadeHeading user={sampleUser} socials={sampleSocials} />);

    expect(screen.getByRole("heading", { name: sampleUser.name as string })).toBeInTheDocument();
    expect(screen.getByText(sampleUser.title as string)).toBeInTheDocument();
    expect(screen.getByText(`Zone: ${sampleUser.location}`)).toBeInTheDocument();
  });

  it("omits the location readout when the user has no location", () => {
    render(<ArcadeHeading user={{ ...sampleUser, location: null }} socials={sampleSocials} />);

    expect(screen.queryByText(/^Zone:/)).not.toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<ArcadeHeading user={sampleUser} socials={sampleSocials} />);

    sampleSocials.forEach((social) => {
      const platformName = getSocialMediaPlatformByPlatformName(social.platform).name;
      const link = screen.getByRole("link", {
        name: `${platformName} profile for ${sampleUser.name}`,
      });

      expect(link).toHaveAttribute("href", generateSocialUrl(social));
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("renders the PDF link for the current path", () => {
    render(<ArcadeHeading user={sampleUser} socials={sampleSocials} />);

    const pdfLink = screen.getByRole("link", { name: /view pdf/i });
    expect(pdfLink).toHaveAttribute("href", "/demo/retro-80s/pdf");
    expect(pdfLink).toHaveAttribute("target", "_blank");
    expect(screen.getByTestId("demo-resume-tag")).toHaveTextContent("Demo");
  });

  it("handles an empty socials array", () => {
    render(<ArcadeHeading user={sampleUser} socials={[]} />);

    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent(/view pdf/i);
  });
});
