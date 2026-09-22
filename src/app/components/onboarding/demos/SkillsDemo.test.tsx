import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect } from "@jest/globals";
import { SkillsDemo } from "./SkillsDemo";

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { id: "user-1" } },
    status: "authenticated",
  }),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/edit/profile",
}));

jest.mock("@/app/edit/components/RichTextEditor/RichTextEditor", () => ({
  RichTextEditor: () => <div data-testid="rich-text-editor">Editor</div>,
}));

jest.mock("@/components/IconSelector", () => ({
  IconSelector: () => <div>IconSelector</div>,
}));

jest.mock("@/app/edit/components/DeleteWithConfirmation", () => ({
  DeleteWithConfirmation: ({ buttonLabel }: { buttonLabel: string }) => (
    <button>{buttonLabel}</button>
  ),
}));

const renderDemo = (autoPlay = false) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <SkillsDemo autoPlay={autoPlay} />
    </QueryClientProvider>,
  );
};

describe("SkillsDemo", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the real skills editor with sample skills", () => {
    renderDemo();

    expect(screen.getByTestId("OnboardingSkillsDemo")).toBeInTheDocument();
    expect(screen.getByLabelText("Search Skills to Add")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText(/TypeScript example/)).toBeInTheDocument();
  });

  it("types a demo search and then reveals the skill detail form", () => {
    jest.useFakeTimers();
    const { unmount } = renderDemo(true);

    expect(screen.queryByText(/TypeScript example/)).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(90 * 5);
    });
    expect(screen.getByLabelText("Search Skills to Add")).toHaveValue("React");

    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(screen.getByText(/TypeScript example/)).toBeInTheDocument();
    unmount();
  });

  it("adds a catalog skill from the demo search", async () => {
    renderDemo();

    fireEvent.change(screen.getByLabelText("Search Skills to Add"), {
      target: { value: "Graph" },
    });
    fireEvent.click(await screen.findByText("GraphQL"));
    fireEvent.click(screen.getByRole("button", { name: "Add Skill" }));

    await waitFor(() => {
      expect(screen.getAllByText("GraphQL").length).toBeGreaterThan(0);
    });
  });
});

