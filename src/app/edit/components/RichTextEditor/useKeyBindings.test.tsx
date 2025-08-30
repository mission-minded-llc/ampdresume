import {
  LexicalComposerContext,
  LexicalComposerContextType,
} from "@lexical/react/LexicalComposerContext";
import { renderHook } from "@testing-library/react";
import { createEditor, KEY_ENTER_COMMAND, LexicalEditor } from "lexical";
import { RichTextAction } from "@/app/edit/components/RichTextEditor/plugins/constants";
import { useKeyBindings } from "@/app/edit/components/RichTextEditor/useKeyBindings";
import { expect } from "@jest/globals";

describe("useKeyBindings", () => {
  let onAction: jest.Mock;
  let editor: LexicalEditor;
  let contextType: LexicalComposerContextType;

  beforeEach(() => {
    onAction = jest.fn();
    editor = createEditor();
    contextType = {
      getTheme: jest.fn(),
    };
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <LexicalComposerContext.Provider value={[editor, contextType]}>
      {children}
    </LexicalComposerContext.Provider>
  );

  it("should call onAction with Bold when Ctrl+B is pressed", () => {
    renderHook(() => useKeyBindings({ onAction }), { wrapper });

    const event = new KeyboardEvent("keydown", { key: "B", ctrlKey: true });
    editor.dispatchCommand(KEY_ENTER_COMMAND, event);

    expect(onAction).toHaveBeenCalledWith(RichTextAction.Bold);
  });

  it("should call onAction with Italics when Ctrl+I is pressed", () => {
    renderHook(() => useKeyBindings({ onAction }), { wrapper });

    const event = new KeyboardEvent("keydown", { key: "I", ctrlKey: true });
    editor.dispatchCommand(KEY_ENTER_COMMAND, event);

    expect(onAction).toHaveBeenCalledWith(RichTextAction.Italics);
  });

  it("should call onAction with Underline when Ctrl+U is pressed", () => {
    renderHook(() => useKeyBindings({ onAction }), { wrapper });

    const event = new KeyboardEvent("keydown", { key: "U", ctrlKey: true });
    editor.dispatchCommand(KEY_ENTER_COMMAND, event);

    expect(onAction).toHaveBeenCalledWith(RichTextAction.Underline);
  });

  it("should call onAction with Undo when Ctrl+Z is pressed", () => {
    renderHook(() => useKeyBindings({ onAction }), { wrapper });

    const event = new KeyboardEvent("keydown", { key: "Z", ctrlKey: true });
    editor.dispatchCommand(KEY_ENTER_COMMAND, event);

    expect(onAction).toHaveBeenCalledWith(RichTextAction.Undo);
  });

  it("should call onAction with Redo when Ctrl+Shift+Z is pressed", () => {
    renderHook(() => useKeyBindings({ onAction }), { wrapper });

    const event = new KeyboardEvent("keydown", {
      key: "Z",
      ctrlKey: true,
      shiftKey: true,
    });
    editor.dispatchCommand(KEY_ENTER_COMMAND, event);

    expect(onAction).toHaveBeenCalledWith(RichTextAction.Redo);
  });
});
