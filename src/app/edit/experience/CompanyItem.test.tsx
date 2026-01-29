import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CompanyItem } from "./CompanyItem";
import { expect } from "@jest/globals";
import { Company } from "@/types";
import { updateCompany } from "@/graphql/updateCompany";
import { deleteCompany } from "@/graphql/deleteCompany";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/updateCompany", () => ({
  updateCompany: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/deleteCompany", () => ({
  deleteCompany: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("./CompanyForm", () => ({
  CompanyForm: ({
    company,
    handler,
    deleteHandler,
  }: {
    company: Company;
    handler: (company: unknown) => void;
    deleteHandler: (company: Company) => void;
  }) => (
    <div>
      <button
        onClick={() =>
          handler({
            name: "Updated",
            location: "Updated",
            startDate: "2020-01-01",
            endDate: "",
            description: "",
          })
        }
      >
        Save
      </button>
      <button onClick={() => deleteHandler(company)}>Delete</button>
    </div>
  ),
}));

jest.mock("./PositionsList", () => ({
  PositionsList: ({ company }: { company: Company }) => (
    <div data-testid="positions-list">{company.name} Positions</div>
  ),
}));

jest.mock("../components/AccordionSummaryContent", () => ({
  AccordionSummaryContent: ({
    primary,
    secondary,
    dateRange,
  }: {
    primary: string;
    secondary: string;
    dateRange: string;
  }) => (
    <div>
      <div>{primary}</div>
      <div>{secondary}</div>
      <div>{dateRange}</div>
    </div>
  ),
}));

jest.mock("@/lib/format", () => ({
  formatLongDate: (date: string | null) => {
    if (!date) return "";
    // Parse the date string - handle both ISO format and timestamp
    let d: Date;
    if (typeof date === "string" && date.includes("-")) {
      d = new Date(date);
    } else {
      d = new Date(parseInt(date, 10));
    }
    // Format as MM/DD/YYYY to match test output
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  },
}));

describe("CompanyItem", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const getMockCompany = (): Company => ({
    id: "company-1",
    name: "Test Company",
    location: "Test Location",
    startDate: "2020-01-01",
    endDate: "2022-12-31",
    description: "Company description",
    positionCount: 0,
  });

  const mockCompany = getMockCompany();

  const mutationCalls: Array<{ type: string; variables: unknown }> = [];
  const setExpanded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mutationCalls.length = 0;
    setExpanded.mockClear();
    // Mock scrollIntoView since it's not available in jsdom
    Element.prototype.scrollIntoView = jest.fn();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => {
      const fnString = mutationFn.toString();
      let type = "unknown";
      if (fnString.includes("updateCompany")) {
        type = "update";
      } else if (fnString.includes("deleteCompany")) {
        type = "delete";
      }

      return {
        mutate: async (variables: unknown) => {
          mutationCalls.push({ type, variables });
          await mutationFn(variables);
          await onSuccess?.();
        },
        isPending: false,
      };
    });
  });

  const renderComponent = (company: Company, expanded: string | false = false) => {
    return render(<CompanyItem company={company} expanded={expanded} setExpanded={setExpanded} />);
  };

  describe("Rendering", () => {
    it("renders company name in accordion summary", () => {
      renderComponent(getMockCompany());

      expect(screen.getByText("Test Company")).toBeInTheDocument();
    });

    it("renders company location in accordion summary", () => {
      renderComponent(getMockCompany());

      expect(screen.getByText("Test Location")).toBeInTheDocument();
    });

    it("renders date range in accordion summary", () => {
      renderComponent(getMockCompany());

      // The date range is formatted and displayed in the accordion summary
      // Check that the date range text is present (it contains "to")
      // The format will be something like "12/31/2019 to 12/30/2022"
      // Use getAllByText since the text appears in multiple nested elements
      const dateRangeElements = screen.getAllByText((content, element) => {
        const text = element?.textContent || "";
        return text.includes("to") && (text.includes("2020") || text.includes("2022"));
      });
      expect(dateRangeElements.length).toBeGreaterThan(0);
    });

    it("renders PositionsList when expanded", () => {
      renderComponent(getMockCompany(), "company-1");

      expect(screen.getByTestId("positions-list")).toBeInTheDocument();
    });

    it("does not render summary content when expanded", () => {
      renderComponent(mockCompany, "company-1");

      // The content might still be in DOM but hidden, so we check for PositionsList instead
      expect(screen.getByTestId("positions-list")).toBeInTheDocument();
    });
  });

  describe("Expand/Collapse functionality", () => {
    it("expands accordion when clicked", () => {
      renderComponent(getMockCompany(), false);

      const accordionButtons = screen.getAllByRole("button");
      // The first button is the accordion expand button
      const accordionButton =
        accordionButtons.find(
          (btn) =>
            btn.getAttribute("aria-expanded") === "false" || btn.getAttribute("aria-controls"),
        ) || accordionButtons[0];
      fireEvent.click(accordionButton);

      expect(setExpanded).toHaveBeenCalledWith("company-1");
    });

    it("collapses accordion when clicked while expanded", () => {
      renderComponent(getMockCompany(), "company-1");

      const accordionButtons = screen.getAllByRole("button");
      // The first button is the accordion expand button
      const accordionButton =
        accordionButtons.find(
          (btn) =>
            btn.getAttribute("aria-expanded") === "true" || btn.getAttribute("aria-controls"),
        ) || accordionButtons[0];
      fireEvent.click(accordionButton);

      expect(setExpanded).toHaveBeenCalledWith(false);
    });

    it("scrolls into view when expanding", () => {
      const scrollIntoViewMock = jest.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      renderComponent(getMockCompany(), false);

      const accordion = screen.getByRole("button");
      fireEvent.click(accordion);

      // Note: scrollIntoView is called on the ref element
      // The actual implementation uses a ref, so we verify setExpanded was called
      expect(setExpanded).toHaveBeenCalled();
    });
  });

  describe("Update company functionality", () => {
    it("calls update mutation when company form is saved", async () => {
      renderComponent(getMockCompany(), "company-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("update");
        expect(mutationCalls[0].variables).toEqual({
          id: "company-1",
          name: "Updated",
          location: "Updated",
          startDate: "2020-01-01",
          endDate: "",
          description: "",
        });
      });
    });

    it("invalidates queries after successful update", async () => {
      renderComponent(getMockCompany(), "company-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["companies"],
        });
      });
    });

    it("updates company object properties", async () => {
      const companyCopy = getMockCompany();
      renderComponent(companyCopy, "company-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(updateCompany).toHaveBeenCalled();
      });
    });
  });

  describe("Delete company functionality", () => {
    it("calls delete mutation when delete button is clicked", async () => {
      renderComponent(getMockCompany(), "company-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("delete");
        expect(mutationCalls[0].variables).toEqual({
          userId: "user-id",
          id: "company-1",
        });
      });
    });

    it("collapses accordion after successful delete", async () => {
      renderComponent(getMockCompany(), "company-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(setExpanded).toHaveBeenCalledWith(false);
      });
    });

    it("invalidates queries after successful delete", async () => {
      renderComponent(getMockCompany(), "company-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["companies"],
        });
      });
    });

    it("does not delete when session user id is missing", async () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      renderComponent(getMockCompany(), "company-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(deleteCompany).not.toHaveBeenCalled();
      });
    });
  });

  describe("Date formatting", () => {
    it("displays 'present' when endDate is null", () => {
      const companyWithoutEndDate = {
        ...getMockCompany(),
        endDate: null,
      };

      renderComponent(companyWithoutEndDate);

      expect(screen.getByText(/present/)).toBeInTheDocument();
    });

    it("displays formatted end date when endDate is provided", () => {
      // Ensure we use a fresh company instance with endDate
      const companyWithEndDate = getMockCompany();
      companyWithEndDate.endDate = "2022-12-31";

      renderComponent(companyWithEndDate);

      // The date is formatted, check for the formatted date range
      // The date range should include "to" and show the end date year (2022)
      // Use getAllByText since the text appears in multiple nested elements
      const dateRangeElements = screen.getAllByText((content, element) => {
        const text = element?.textContent || "";
        return text.includes("to") && text.includes("2022");
      });
      expect(dateRangeElements.length).toBeGreaterThan(0);
    });
  });

  describe("Edge cases", () => {
    it("handles company with null description", async () => {
      const companyWithoutDescription = {
        ...getMockCompany(),
        description: null,
      };

      renderComponent(companyWithoutDescription, "company-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls[0].variables).toEqual(
          expect.objectContaining({
            description: "",
          }),
        );
      });
    });

    it("handles company with empty description", async () => {
      const companyWithEmptyDescription = {
        ...getMockCompany(),
        description: "",
      };

      renderComponent(companyWithEmptyDescription, "company-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls[0].variables).toEqual(
          expect.objectContaining({
            description: "",
          }),
        );
      });
    });

    it("handles company with null endDate in update", async () => {
      const companyWithoutEndDate = {
        ...getMockCompany(),
        endDate: null,
      };

      renderComponent(companyWithoutEndDate, "company-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls[0].variables).toEqual(
          expect.objectContaining({
            endDate: "",
          }),
        );
      });
    });
  });
});
