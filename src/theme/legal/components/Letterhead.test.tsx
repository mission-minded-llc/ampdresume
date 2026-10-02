import { render, screen } from "@testing-library/react";
import { getDemoPlaceholderSocials } from "@/lib/demoSocials";
import { themeDefaultSampleData } from "@/theme/sampleData";
import { generateSocialUrl } from "@/util/social";
import { Letterhead } from "./Letterhead";
import { expect } from "@jest/globals";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/demo/legal"),
}));

describe("Letterhead", () => {
  const user = themeDefaultSampleData.data.resume.user;
  const socials = getDemoPlaceholderSocials(user);

  it("renders a curriculum vitae letterhead with contact facts", () => {
    render(<Letterhead user={user} socials={socials} />);

    expect(screen.getByText("Curriculum Vitae")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: user.name as string })).toBeInTheDocument();
    expect(screen.getByText(user.title as string)).toBeInTheDocument();
    expect(screen.getByText(user.location as string)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: user.displayEmail as string })).toHaveAttribute(
      "href",
      `mailto:${user.displayEmail}`,
    );
    expect(screen.getByText("\u00b7")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view pdf/i })).toHaveAttribute(
      "href",
      "/demo/legal/pdf",
    );
  });

  it("renders a profile link for each social", () => {
    render(<Letterhead user={user} socials={socials} />);

    socials.forEach((social) => {
      expect(
        screen.getByText("", { selector: `a[href="${generateSocialUrl(social)}"]` }),
      ).toBeInTheDocument();
    });
  });

  it("omits the contact separator when email is absent", () => {
    render(<Letterhead user={{ ...user, displayEmail: null }} socials={[]} />);

    expect(screen.getByText(user.location as string)).toBeInTheDocument();
    expect(screen.queryByText("\u00b7")).not.toBeInTheDocument();
  });
});
