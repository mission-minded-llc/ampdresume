import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { RecruiterWorkspace } from "./RecruiterWorkspace";

const mockRestartOnboarding = jest.fn();

jest.mock("@/app/components/onboarding/OnboardingContext", () => ({
  useOnboarding: () => ({ restartOnboarding: mockRestartOnboarding }),
}));

describe("RecruiterWorkspace", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("asks for a desk before searching", () => {
    render(<RecruiterWorkspace profile={null} />);

    expect(screen.getByTestId("recruiter-onboarding")).toBeInTheDocument();
    expect(screen.queryByTestId("recruiter-search")).not.toBeInTheDocument();
  });

  it("searches opted-in candidates and links to their public resumes", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            slug: "ada",
            name: "Ada Lovelace",
            title: "Engineer",
            location: "London",
            skills: ["Mathematics"],
          },
        ],
      }),
    }) as jest.Mock;

    render(<RecruiterWorkspace profile={{ companyName: "Northwind", title: "Recruiter" }} />);

    fireEvent.change(screen.getByLabelText("Name or title"), { target: { value: "Engineer" } });
    fireEvent.click(screen.getByRole("button", { name: "Search candidates" }));

    expect(await screen.findByRole("link", { name: "Ada Lovelace" })).toHaveAttribute(
      "href",
      "/r/ada",
    );
    expect(screen.getByText("Mathematics")).toBeInTheDocument();
    expect(screen.getByText("Engineer").tagName).toBe("MARK");
    expect(screen.getByText("Engineer")).toHaveStyle({ margin: "0px", padding: "0px" });
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/recruiter/search",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ query: "Engineer", location: "", skill: "", skills: [] }),
        }),
      );
    });
  });

  it("asks for a search term before calling the API", () => {
    global.fetch = jest.fn() as jest.Mock;

    render(<RecruiterWorkspace profile={{ companyName: "Northwind", title: "Recruiter" }} />);

    fireEvent.click(screen.getByRole("button", { name: "Search candidates" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a name, title, location, or skill");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects a search shorter than 3 characters", () => {
    global.fetch = jest.fn() as jest.Mock;

    render(<RecruiterWorkspace profile={{ companyName: "Northwind", title: "Recruiter" }} />);

    fireEvent.change(screen.getByLabelText("Skills"), { target: { value: "JS" } });
    fireEvent.click(screen.getByRole("button", { name: "Search candidates" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Use at least 3 characters in each search field",
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("highlights the skill that matched the search", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            slug: "ada",
            name: "Ada Lovelace",
            title: "Engineer",
            location: "London",
            skills: ["Mathematics", "Writing"],
          },
        ],
      }),
    }) as jest.Mock;

    render(<RecruiterWorkspace profile={{ companyName: "Northwind", title: "Recruiter" }} />);

    fireEvent.change(screen.getByLabelText("Skills"), { target: { value: "math" } });
    fireEvent.click(screen.getByRole("button", { name: "Search candidates" }));

    expect(await screen.findByText("Math")).toHaveProperty("tagName", "MARK");
    expect(screen.getByText("ematics")).toBeInTheDocument();
    expect(screen.getByText("Writing").closest(".MuiChip-root")).not.toHaveClass(
      "MuiChip-colorSecondary",
    );
    expect(screen.getByText("Math").closest(".MuiChip-root")).toHaveClass("MuiChip-colorSecondary");
    expect(screen.getByText("Math")).toHaveStyle({ margin: "0px", padding: "0px" });
  });

  it("highlights each comma-separated skill", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            slug: "ada",
            name: "Ada Lovelace",
            title: "Engineer",
            location: "London",
            skills: ["Mathematics", "Writing"],
          },
        ],
      }),
    }) as jest.Mock;

    render(<RecruiterWorkspace profile={{ companyName: "Northwind", title: "Recruiter" }} />);

    fireEvent.change(screen.getByLabelText("Skills"), { target: { value: "math, writ" } });
    fireEvent.click(screen.getByRole("button", { name: "Search candidates" }));

    expect(await screen.findByText("Math")).toHaveProperty("tagName", "MARK");
    expect(screen.getByText("Writ")).toHaveProperty("tagName", "MARK");
    expect(screen.getByText("Math").closest(".MuiChip-root")).toHaveClass("MuiChip-colorSecondary");
    expect(screen.getByText("Writ").closest(".MuiChip-root")).toHaveClass("MuiChip-colorSecondary");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/recruiter/search",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            query: "",
            location: "",
            skill: "math, writ",
            skills: ["math", "writ"],
          }),
        }),
      );
    });
  });

  it("does not restyle visible results when the form changes before the next search", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [
          {
            slug: "ada",
            name: "Ada Lovelace",
            title: "Engineer",
            location: "London",
            skills: ["Mathematics", "Writing"],
          },
        ],
      }),
    }) as jest.Mock;

    render(<RecruiterWorkspace profile={{ companyName: "Northwind", title: "Recruiter" }} />);

    fireEvent.change(screen.getByLabelText("Skills"), { target: { value: "math" } });
    fireEvent.click(screen.getByRole("button", { name: "Search candidates" }));

    expect(await screen.findByText("Math")).toHaveProperty("tagName", "MARK");

    fireEvent.change(screen.getByLabelText("Skills"), { target: { value: "Writ" } });

    expect(screen.getByText("Math").tagName).toBe("MARK");
    expect(screen.getByText("Writing").tagName).not.toBe("MARK");
    expect(screen.queryByText("Writ")).not.toBeInTheDocument();
  });

  it("restarts the recruiter tutorial from the page", () => {
    render(<RecruiterWorkspace profile={null} />);

    fireEvent.click(screen.getByTestId("RestartRecruiterTutorial"));

    expect(mockRestartOnboarding).toHaveBeenCalledWith("recruiter");
  });
});
