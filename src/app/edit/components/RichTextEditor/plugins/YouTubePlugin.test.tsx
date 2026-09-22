import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import YoutubePlugin from "./YouTubePlugin";
import { expect } from "@jest/globals";

const update = jest.fn((fn: () => void) => fn());

jest.mock("@lexical/react/LexicalComposerContext", () => ({
  useLexicalComposerContext: () => [{ update }],
}));

jest.mock("lexical", () => ({
  $insertNodes: jest.fn(),
}));

jest.mock("../nodes/YouTubeNode", () => ({
  $createYouTubeNode: jest.fn((args: { id: string }) => args),
}));

describe("YouTubePlugin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("embeds a valid YouTube URL and ignores invalid input", async () => {
    render(<YoutubePlugin />);

    fireEvent.click(screen.getByTestId("YouTubeIcon"));
    expect(screen.getByText("Embed YouTube Video")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Add Youtube URL");
    fireEvent.change(input, { target: { value: "not-a-video" } });
    expect(screen.getByRole("button", { name: "Embed" })).toBeDisabled();

    fireEvent.change(input, { target: { value: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } });
    fireEvent.click(screen.getByRole("button", { name: "Embed" }));

    expect(update).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("does not embed when the URL is empty", () => {
    render(<YoutubePlugin />);
    fireEvent.click(screen.getByTestId("YouTubeIcon"));
    fireEvent.click(screen.getByRole("button", { name: "Embed" }));
    expect(update).not.toHaveBeenCalled();
  });
});
