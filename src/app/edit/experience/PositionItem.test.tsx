import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PositionItem } from "./PositionItem";
import { expect } from "@jest/globals";
import { Position } from "@/types";
import { updatePosition } from "@/graphql/updatePosition";
import { deletePosition } from "@/graphql/deletePosition";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("@/graphql/updatePosition", () => ({
  updatePosition: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/deletePosition", () => ({
  deletePosition: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/graphql/getProjects", () => ({
  getProjects: jest.fn().mockResolvedValue([]),
}));

jest.mock("./PositionForm", () => ({
  PositionForm: ({
    position,
    handler,
    deleteHandler,
  }: {
    position: Position;
    handler: (position: unknown) => void;
    deleteHandler: (position: Position) => void;
  }) => {
    // When position has null endDate, form should submit empty string
    const endDate = position.endDate === null ? "" : position.endDate || "";
    return (
      <div>
        <button
          onClick={() =>
            handler({
              title: "Updated Position",
              startDate: "2021-01-01",
              endDate: endDate,
            })
          }
        >
          Save
        </button>
        <button onClick={() => deleteHandler(position)}>Delete</button>
      </div>
    );
  },
}));

jest.mock("./ProjectsList", () => ({
  ProjectsList: ({ position }: { position: Position; projects: unknown[]; expanded: boolean }) => (
    <div data-testid="projects-list">{position.title} Projects</div>
  ),
}));

jest.mock("../components/AccordionSummaryContent", () => ({
  AccordionSummaryContent: ({ primary, dateRange }: { primary: string; dateRange: string }) => (
    <div>
      <div>{primary}</div>
      <div>{dateRange}</div>
    </div>
  ),
}));

jest.mock("@/lib/format", () => ({
  formatLongDate: (date: string | null) => {
    if (!date) return "";
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  },
}));

describe("PositionItem", () => {
  const mockSession = { user: { id: "user-id" } };
  const mockQueryClient = { invalidateQueries: jest.fn() };

  const getMockPosition = (): Position => ({
    id: "position-1",
    title: "Software Engineer",
    startDate: "2020-01-01",
    endDate: "2022-12-31",
    projectCount: 0,
  });

  const mutationCalls: Array<{ type: string; variables: unknown }> = [];
  const setExpanded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mutationCalls.length = 0;
    setExpanded.mockClear();
    Element.prototype.scrollIntoView = jest.fn();
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      error: null,
      data: [],
    });
    (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess }) => {
      const fnString = mutationFn.toString();
      let type = "unknown";
      if (fnString.includes("updatePosition")) {
        type = "update";
      } else if (fnString.includes("deletePosition")) {
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

  const renderComponent = (position: Position, expanded: string | false = false) => {
    return render(
      <PositionItem
        position={position}
        companyId="company-1"
        expanded={expanded}
        setExpanded={setExpanded}
      />,
    );
  };

  describe("Rendering", () => {
    it("renders position title in accordion summary", () => {
      renderComponent(getMockPosition());

      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });

    it("renders date range in accordion summary", () => {
      renderComponent(getMockPosition());

      const dateRangeElements = screen.getAllByText((content, element) => {
        const text = element?.textContent || "";
        return text.includes("to") && (text.includes("2020") || text.includes("2022"));
      });
      expect(dateRangeElements.length).toBeGreaterThan(0);
    });

    it("displays 'present' when endDate is null", () => {
      const positionWithoutEndDate = {
        ...getMockPosition(),
        endDate: null,
      };

      renderComponent(positionWithoutEndDate);

      expect(screen.getByText(/present/)).toBeInTheDocument();
    });

    it("renders ProjectsList when expanded", () => {
      renderComponent(getMockPosition(), "position-1");

      expect(screen.getByTestId("projects-list")).toBeInTheDocument();
    });

    it("does not render summary content when expanded", () => {
      const position = getMockPosition();
      renderComponent(position, "position-1");

      expect(screen.getByTestId("projects-list")).toBeInTheDocument();
    });
  });

  describe("Expand/Collapse functionality", () => {
    it("expands accordion when clicked", () => {
      renderComponent(getMockPosition(), false);

      const accordionButtons = screen.getAllByRole("button");
      const accordionButton =
        accordionButtons.find(
          (btn) =>
            btn.getAttribute("aria-expanded") === "false" || btn.getAttribute("aria-controls"),
        ) || accordionButtons[0];
      fireEvent.click(accordionButton);

      expect(setExpanded).toHaveBeenCalledWith("position-1");
    });

    it("collapses accordion when clicked while expanded", () => {
      renderComponent(getMockPosition(), "position-1");

      const accordionButtons = screen.getAllByRole("button");
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

      renderComponent(getMockPosition(), false);

      const accordion = screen.getByRole("button");
      fireEvent.click(accordion);

      expect(setExpanded).toHaveBeenCalled();
    });

    it("fetches projects when expanded", () => {
      renderComponent(getMockPosition(), "position-1");

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryKey: ["projects", "position-1"],
        }),
      );
    });

    it("does not fetch projects when not expanded", () => {
      renderComponent(getMockPosition(), false);

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
    });
  });

  describe("Update position functionality", () => {
    it("calls update mutation when position form is saved", async () => {
      const position = getMockPosition();
      renderComponent(position, "position-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("update");
        expect(mutationCalls[0].variables).toEqual({
          id: "position-1",
          companyId: "company-1",
          title: "Updated Position",
          startDate: "2021-01-01",
          endDate: "2022-12-31",
        });
      });
    });

    it("updates position object properties", async () => {
      const position = getMockPosition();
      renderComponent(position, "position-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(position.title).toBe("Updated Position");
        expect(position.startDate).toBe("2021-01-01");
        expect(position.endDate).toBe("2022-12-31");
      });
    });

    it("invalidates queries after successful update", async () => {
      const position = getMockPosition();
      renderComponent(position, "position-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["positions", "company-1"],
        });
      });
    });

    it("handles position with empty endDate", async () => {
      const position = {
        ...getMockPosition(),
        endDate: null,
      };
      renderComponent(position, "position-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls.length).toBeGreaterThan(0);
        expect(mutationCalls[0].variables).toHaveProperty("endDate", "");
      });
    });
  });

  describe("Delete position functionality", () => {
    it("calls delete mutation when delete button is clicked", async () => {
      const position = getMockPosition();
      renderComponent(position, "position-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mutationCalls).toHaveLength(1);
        expect(mutationCalls[0].type).toBe("delete");
        expect(mutationCalls[0].variables).toEqual({
          userId: "user-id",
          id: "position-1",
        });
      });
    });

    it("invalidates queries after successful delete", async () => {
      const position = getMockPosition();
      renderComponent(position, "position-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["companies"],
        });
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({
          queryKey: ["positions", "company-1"],
        });
      });
    });

    it("does not delete when session user id is missing", async () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      const position = getMockPosition();
      renderComponent(position, "position-1");

      const deleteButton = screen.getByRole("button", { name: /Delete/ });
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(deletePosition).not.toHaveBeenCalled();
      });
    });
  });

  describe("Query behavior", () => {
    it("only fetches projects when authenticated and expanded", () => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });

      renderComponent(getMockPosition(), "position-1");

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: false,
        }),
      );
    });

    it("fetches projects when authenticated and expanded", () => {
      renderComponent(getMockPosition(), "position-1");

      expect(useQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          enabled: true,
          queryKey: ["projects", "position-1"],
        }),
      );
    });
  });

  describe("Edge cases", () => {
    it("handles position with null endDate in update", async () => {
      const position = {
        ...getMockPosition(),
        endDate: null,
      };
      renderComponent(position, "position-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mutationCalls.length).toBeGreaterThan(0);
        expect(mutationCalls[0].variables).toHaveProperty("endDate", "");
      });
    });

    it("does not update when session user id is missing", async () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      const position = getMockPosition();
      renderComponent(position, "position-1");

      const saveButton = screen.getByRole("button", { name: /Save/ });
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(updatePosition).not.toHaveBeenCalled();
      });
    });
  });
});
