import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { AiAssist } from "./AiAssist";
import { expect } from "@jest/globals";
import { Company } from "@/types";
import { getResume } from "@/graphql/getResume";
import { getCompaniesAi } from "@/graphql/getCompaniesAi";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/graphql/getResume", () => ({
  getResume: jest.fn(),
}));

jest.mock("@/graphql/getCompaniesAi", () => ({
  getCompaniesAi: jest.fn(),
}));

jest.mock("../components/SectionTitle", () => ({
  SectionTitle: ({ title }: { title: string }) => <h2 data-testid="section-title">{title}</h2>,
}));

jest.mock("./AnimatedTextTransition", () => ({
  AnimatedTextTransition: ({ text }: { text: string }) => (
    <span data-testid="animated-text">{text}</span>
  ),
}));

jest.mock("@/components/CustomDialogTitle", () => ({
  CustomDialogTitle: ({
    children,
    closeHandler,
  }: {
    children: React.ReactNode;
    closeHandler: () => void;
  }) => (
    <div data-testid="dialog-title">
      {children}
      <button type="button" onClick={closeHandler} data-testid="dialog-close">
        Close
      </button>
    </div>
  ),
}));

jest.mock("@/components/LoadingOverlay", () => ({
  LoadingOverlay: ({ message: msg, open }: { message?: string; open?: boolean }) =>
    open !== false ? <div data-testid="loading-overlay">{msg ?? "Loading"}</div> : null,
}));

jest.mock("@/components/MuiLink", () => ({
  MuiLink: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/components/Tooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="tooltip">{children}</span>
  ),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  const theme = createTheme();
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    );
  };
}

function renderAiAssist() {
  return render(<AiAssist />, { wrapper: createWrapper() });
}

describe("AiAssist", () => {
  const mockSession = {
    user: { id: "user-id", slug: "user-slug" },
  };

  const mockResume = {
    companies: [
      {
        id: "company-1",
        name: "Acme Corp",
        description: null,
        location: "NYC",
        startDate: "2020-01-01",
        endDate: null,
        positions: [
          {
            id: "position-1",
            title: "Engineer",
            startDate: "2020-01-01",
            endDate: null,
            projects: [
              {
                id: "project-1",
                name: "Original bullet one",
                description: null,
                sortIndex: 0,
                skillsForProject: [],
              },
            ],
          },
        ],
      },
    ] as Company[],
  };

  const mockCompaniesAi: Company[] = [
    {
      id: "company-1",
      name: "Acme Corp",
      description: null,
      location: "NYC",
      startDate: "2020-01-01",
      endDate: null,
      positions: [
        {
          id: "position-1",
          title: "Engineer",
          startDate: "2020-01-01",
          endDate: null,
          projects: [
            {
              id: "project-1",
              name: "AI revised bullet one",
              description: null,
              sortIndex: 0,
              skillsForProject: [],
            },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    (getResume as jest.Mock).mockResolvedValue(mockResume);
    (getCompaniesAi as jest.Mock).mockResolvedValue(mockCompaniesAi);
  });

  describe("session and loading states", () => {
    it("renders loading overlay when session status is loading", () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "loading" });

      renderAiAssist();
      expect(screen.getByTestId("loading-overlay")).toHaveTextContent("Loading session...");
    });

    it("renders login prompt when unauthenticated", () => {
      (useSession as jest.Mock).mockReturnValue({ data: null, status: "unauthenticated" });

      renderAiAssist();
      expect(screen.getByText(/Please/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /log in/ })).toHaveAttribute("href", "/login");
    });

    it("renders loading overlay when resume is pending", async () => {
      (getResume as jest.Mock).mockImplementation(() => new Promise(() => {}));

      renderAiAssist();
      expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    });

    it("renders error when resume query fails", async () => {
      (getResume as jest.Mock).mockRejectedValue(new Error("Resume failed"));

      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByText(/Error loading resume data: Resume failed/)).toBeInTheDocument();
      });
    });

    it("renders error when companiesAi query fails", async () => {
      (getCompaniesAi as jest.Mock).mockRejectedValue(new Error("AI failed"));

      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));
      const textarea = screen.getByRole("textbox");
      await act(async () => {
        fireEvent.change(textarea, { target: { value: "Job description here" } });
      });
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Run it!/ }));
      });

      await waitFor(() => {
        expect(screen.getByText(/Error loading: AI failed/)).toBeInTheDocument();
      });
    });
  });

  describe("authenticated main UI", () => {
    it("renders section title and action buttons", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByTestId("section-title")).toHaveTextContent(
          "Tweak Your Resume with AI Assist",
        );
      });

      expect(screen.getByRole("button", { name: /View Original/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /View AI-Edited/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
    });

    it("renders companies and project names from resume data", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
      });

      expect(screen.getByText("Engineer")).toBeInTheDocument();
      expect(screen.getByTestId("animated-text")).toHaveTextContent("Original bullet one");
    });

    it("View Original is disabled when there is no companies data", async () => {
      (getResume as jest.Mock).mockResolvedValue({ companies: [] });

      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /View Original/ })).toBeDisabled();
      });
    });

    it("switches display when View Original / View AI-Edited are clicked", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByText("Acme Corp")).toBeInTheDocument();
      });

      expect(screen.getByTestId("animated-text")).toHaveTextContent("Original bullet one");

      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));
      const textarea = screen.getByRole("textbox");
      await act(async () => {
        fireEvent.change(textarea, { target: { value: "Senior developer role" } });
      });
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Run it!/ }));
      });

      await waitFor(() => {
        expect(screen.queryByTestId("dialog-title")).not.toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByTestId("animated-text")).toHaveTextContent("AI revised bullet one");
      });

      fireEvent.click(screen.getByRole("button", { name: /View Original/ }));
      expect(screen.getByTestId("animated-text")).toHaveTextContent("Original bullet one");

      fireEvent.click(screen.getByRole("button", { name: /View AI-Edited/ }));
      expect(screen.getByTestId("animated-text")).toHaveTextContent("AI revised bullet one");
    });
  });

  describe("Get AI Assistance dialog", () => {
    it("opens dialog when Get AI Assistance is clicked", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
      });

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));

      expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
      expect(screen.getByText(/Paste in the job description below/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Run it!/ })).toBeInTheDocument();
    });

    it("closes dialog when close handler is triggered", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));
      expect(screen.getByTestId("dialog-title")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("dialog-close"));
      await waitFor(() => {
        expect(screen.queryByTestId("dialog-title")).not.toBeInTheDocument();
      });
    });

    it("Run it! with empty text does not close dialog", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("");
      fireEvent.click(screen.getByRole("button", { name: /Run it!/ }));

      expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    });

    it("Run it! trims and normalizes job description and closes dialog", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));

      const textarea = screen.getByRole("textbox");
      await act(async () => {
        fireEvent.change(textarea, {
          target: { value: "  Senior developer role  \n\n  " },
        });
      });
      expect(textarea).toHaveValue("  Senior developer role  \n\n  ");

      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Run it!/ }));
      });

      await waitFor(() => {
        expect(screen.queryByTestId("dialog-title")).not.toBeInTheDocument();
      });
    });

    it("Run it! strips emojis from job description", async () => {
      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));

      const textarea = screen.getByRole("textbox");
      await act(async () => {
        fireEvent.change(textarea, {
          target: { value: "Build APIs ✅ and scale systems 🚀" },
        });
      });

      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Run it!/ }));
      });

      await waitFor(() => {
        expect(screen.queryByTestId("dialog-title")).not.toBeInTheDocument();
      });
    });
  });

  describe("LoadingOverlay for AI fetch", () => {
    it("shows conferring message when companiesAi is fetching", async () => {
      (getCompaniesAi as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockCompaniesAi), 100)),
      );

      renderAiAssist();
      await waitFor(() => {
        expect(screen.getByRole("button", { name: /Get AI Assistance/ })).toBeInTheDocument();
      });
      fireEvent.click(screen.getByRole("button", { name: /Get AI Assistance/ }));
      const textarea = screen.getByRole("textbox");
      await act(async () => {
        fireEvent.change(textarea, { target: { value: "Job description" } });
      });
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: /Run it!/ }));
      });

      expect(screen.getByText(/Conferring with bots/)).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.queryByText(/Conferring with bots/)).not.toBeInTheDocument();
      });
    });
  });
});
