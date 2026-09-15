import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
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

const renderDemo = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <SkillsDemo autoPlay={false} />
    </QueryClientProvider>,
  );
};

describe("SkillsDemo", () => {
  it("renders the real skills editor with sample skills", () => {
    renderDemo();

    expect(screen.getByTestId("OnboardingSkillsDemo")).toBeInTheDocument();
    expect(screen.getByLabelText("Search Skills to Add")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText(/TypeScript example/)).toBeInTheDocument();
  });
});
