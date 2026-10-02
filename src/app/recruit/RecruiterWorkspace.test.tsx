import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { RecruiterWorkspace } from "./RecruiterWorkspace";

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
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/recruiter/search",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ query: "Engineer", location: "", skill: "" }),
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
});
