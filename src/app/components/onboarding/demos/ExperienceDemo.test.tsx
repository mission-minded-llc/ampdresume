import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals";
import { ExperienceDemo } from "./ExperienceDemo";

jest.mock("@mui/x-date-pickers", () => ({
  DatePicker: ({
    label,
    value,
  }: {
    label: string;
    value: { format?: (fmt: string) => string } | null;
  }) => (
    <div>
      <label>{label}</label>
      <input readOnly value={value?.format?.("YYYY-MM") || ""} />
    </div>
  ),
}));

jest.mock("@/app/edit/components/RichTextEditor/RichTextEditor", () => ({
  RichTextEditor: () => <div data-testid="rich-text-editor">Editor</div>,
}));

jest.mock("@/app/edit/components/DeleteWithConfirmation", () => ({
  DeleteWithConfirmation: ({ buttonLabel }: { buttonLabel: string }) => (
    <button>{buttonLabel}</button>
  ),
}));

describe("ExperienceDemo", () => {
  it("renders company, role, and project editors with sample data", () => {
    render(<ExperienceDemo autoPlay={false} />);

    expect(screen.getByTestId("OnboardingExperienceDemo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Northwind Labs")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByTestId("rich-text-editor")).toBeInTheDocument();
  });
});
