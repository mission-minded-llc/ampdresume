import "@testing-library/jest-dom";
import { YouTubeNode, $createYouTubeNode } from "./YouTubeNode";
import { expect } from "@jest/globals";
import { createEditor, DOMConversionOutput } from "lexical";
import React from "react";

describe("YouTubeNode", () => {
  let editor: ReturnType<typeof createEditor>;

  beforeEach(() => {
    editor = createEditor({
      nodes: [YouTubeNode],
    });
  });

  describe("$createYouTubeNode", () => {
    it("creates a YouTubeNode with the given id", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = $createYouTubeNode({ id: "test-id-123" });
      });

      expect(node!).toBeInstanceOf(YouTubeNode);
      expect(node!.__id).toBe("test-id-123");
    });
  });

  describe("getType", () => {
    it("returns 'youtube' as the node type", () => {
      expect(YouTubeNode.getType()).toBe("youtube");
    });
  });

  describe("constructor", () => {
    it("creates a node with the given id", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id" });
      });

      expect(node!.__id).toBe("test-id");
    });

    it("creates a node with optional key", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id", key: "custom-key" });
      });

      expect(node!.__id).toBe("test-id");
      expect(node!.getKey()).toBe("custom-key");
    });
  });

  describe("clone", () => {
    it("creates a copy of the node with the same id", () => {
      let original!: YouTubeNode;
      let cloned!: YouTubeNode;
      editor.update(() => {
        original = new YouTubeNode({ id: "test-id" });
        cloned = YouTubeNode.clone(original);
      });

      expect(cloned).toBeInstanceOf(YouTubeNode);
      expect(cloned.__id).toBe(original.__id);
      expect(cloned).not.toBe(original);
    });
  });

  describe("decorate", () => {
    it("returns an iframe element with correct attributes", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id-123" });
      });
      const decorated = node!.decorate();
      const props = decorated.props as React.IframeHTMLAttributes<HTMLIFrameElement>;

      expect(decorated.type).toBe("iframe");
      expect(props.height).toBe("315px");
      expect(props.width).toBe("560px");
      expect(props.src).toBe("https://www.youtube-nocookie.com/embed/test-id-123");
    });
  });

  describe("createDOM", () => {
    it("creates a div element", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id" });
      });
      const dom = node!.createDOM();

      expect(dom.tagName).toBe("DIV");
    });
  });

  describe("updateDOM", () => {
    it("returns false", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id" });
      });
      const result = node!.updateDOM();

      expect(result).toBe(false);
    });
  });

  describe("exportDOM", () => {
    it("creates an iframe element with correct attributes", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id-123" });
      });
      const output = node!.exportDOM();
      const element = output.element as HTMLElement;

      expect(element.tagName).toBe("IFRAME");
      expect(element.getAttribute("data-lexical-youtube")).toBe("test-id-123");
      expect(element.getAttribute("height")).toBe("315px");
      expect(element.getAttribute("width")).toBe("560px");
      expect(element.getAttribute("src")).toBe(
        "https://www.youtube-nocookie.com/embed/test-id-123",
      );
    });
  });

  describe("importDOM", () => {
    it("returns a conversion map for iframe elements", () => {
      const importMap = YouTubeNode.importDOM();

      expect(importMap).not.toBeNull();
      expect(importMap?.iframe).toBeDefined();
    });

    it("converts iframe element with data-lexical-youtube attribute", () => {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("data-lexical-youtube", "test-id-123");

      const importMap = YouTubeNode.importDOM();
      const conversion = importMap?.iframe?.(iframe);

      expect(conversion).toBeDefined();
      expect(conversion?.conversion).toBeDefined();

      let result: DOMConversionOutput | null = null;
      editor.update(() => {
        if (conversion?.conversion) {
          result = conversion.conversion(iframe);
        }
      });
      expect(result).not.toBeNull();
      expect(result!.node).toBeInstanceOf(YouTubeNode);
      expect((result!.node as YouTubeNode).__id).toBe("test-id-123");
    });

    it("returns null for iframe without data-lexical-youtube attribute", () => {
      const iframe = document.createElement("iframe");

      const importMap = YouTubeNode.importDOM();
      const conversion = importMap?.iframe?.(iframe);

      expect(conversion).toBeDefined();
      expect(conversion?.conversion).toBeDefined();

      let result: DOMConversionOutput | null = null;
      editor.update(() => {
        if (conversion?.conversion) {
          result = conversion.conversion(iframe);
        }
      });
      expect(result).toBeNull();
    });
  });

  describe("importJSON", () => {
    it("creates a node from serialized data", () => {
      const serialized = {
        type: "youtube",
        version: 1,
        id: "test-id-123",
      };

      let node: YouTubeNode;
      editor.update(() => {
        node = YouTubeNode.importJSON(serialized);
      });

      expect(node!).toBeInstanceOf(YouTubeNode);
      expect(node!.__id).toBe("test-id-123");
    });
  });

  describe("exportJSON", () => {
    it("exports node data as JSON", () => {
      let node: YouTubeNode;
      editor.update(() => {
        node = new YouTubeNode({ id: "test-id-123" });
      });
      const json = node!.exportJSON();

      expect(json.type).toBe("youtube");
      expect(json.version).toBe(1);
      expect(json.id).toBe("test-id-123");
    });
  });
});
