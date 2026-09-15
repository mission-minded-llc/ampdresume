import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "@jest/globals";
import { OnboardingProvider } from "./OnboardingProvider";
import { useOnboarding } from "./OnboardingContext";
import { NavPrimaryProvider } from "./NavPrimaryContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockPush = jest.fn();
const mockSession = {
  data: { user: { id: "user-1" } } as { user: { id: string } } | null,
  status: "authenticated" as "authenticated" | "loading" | "unauthenticated",
};

jest.mock("next-auth/react", () => ({
  useSession: () => mockSession,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/edit/profile",
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("./demos/SkillsDemo", () => ({
  SkillsDemo: () => <div>Skills demo</div>,
}));

jest.mock("./demos/ExperienceDemo", () => ({
  ExperienceDemo: () => <div>Experience demo</div>,
}));

const StatusProbe = () => {
  const { isOnboardingStatusResolved, isOnboardingActive } = useOnboarding();
  return (
    <div>
      <span>resolved:{String(isOnboardingStatusResolved)}</span>
      <span>active:{String(isOnboardingActive)}</span>
    </div>
  );
};

describe("OnboardingProvider", () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockSession.data = { user: { id: "user-1" } };
    mockSession.status = "authenticated";
    global.fetch = jest.fn();
  });

  it("starts the tour when onboarding is pending", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ pending: true }),
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <ThemeProvider theme={createTheme()}>
        <QueryClientProvider client={queryClient}>
          <NavPrimaryProvider>
            <OnboardingProvider>
              <div>App</div>
            </OnboardingProvider>
          </NavPrimaryProvider>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(await screen.findByTestId("OnboardingRoot")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Amp'd Resume")).toBeInTheDocument();
  });

  it("does not start the tour when onboarding is complete", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ pending: false }),
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <ThemeProvider theme={createTheme()}>
        <QueryClientProvider client={queryClient}>
          <NavPrimaryProvider>
            <OnboardingProvider>
              <div>App</div>
            </OnboardingProvider>
          </NavPrimaryProvider>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/onboarding");
    });

    expect(screen.queryByTestId("OnboardingRoot")).not.toBeInTheDocument();
  });

  it("completes onboarding when skip is clicked", async () => {
    (global.fetch as jest.Mock).mockImplementation(async (url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return { ok: true, json: async () => ({ pending: false }) };
      }
      return { ok: true, json: async () => ({ pending: true }) };
    });

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <ThemeProvider theme={createTheme()}>
        <QueryClientProvider client={queryClient}>
          <NavPrimaryProvider>
            <OnboardingProvider>
              <div>App</div>
            </OnboardingProvider>
          </NavPrimaryProvider>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    fireEvent.click(await screen.findByTestId("OnboardingSkip"));

    await waitFor(() => {
      expect(screen.queryByTestId("OnboardingRoot")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/onboarding",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ pending: false }),
        }),
      );
    });
  });

  it("does not treat onboarding as resolved while the session is loading", () => {
    mockSession.data = null;
    mockSession.status = "loading";

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <ThemeProvider theme={createTheme()}>
        <QueryClientProvider client={queryClient}>
          <NavPrimaryProvider>
            <OnboardingProvider>
              <StatusProbe />
            </OnboardingProvider>
          </NavPrimaryProvider>
        </QueryClientProvider>
      </ThemeProvider>,
    );

    expect(screen.getByText("resolved:false")).toBeInTheDocument();
    expect(screen.getByText("active:false")).toBeInTheDocument();
    expect(screen.queryByTestId("OnboardingRoot")).not.toBeInTheDocument();
  });
});
