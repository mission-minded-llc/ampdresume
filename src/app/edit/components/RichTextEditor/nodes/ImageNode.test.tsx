import "@testing-library/jest-dom";
import { ImageNode, $createImageNode, convertImageElement, SerializedImageNode } from "./ImageNode";
import { expect } from "@jest/globals";
import { createEditor, DOMConversionOutput } from "lexical";
import React from "react";

describe("ImageNode", () => {
  let editor: ReturnType<typeof createEditor>;

  beforeEach(() => {
    editor = createEditor({
      nodes: [ImageNode],
    });
  });

  describe("$createImageNode", () => {
    it("creates an ImageNode with required properties", () => {
      let node: ImageNode;
      editor.update(() => {
        node = $createImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });

      expect(node!).toBeInstanceOf(ImageNode);
      expect(node!.__src).toBe("https://example.com/image.jpg");
      expect(node!.__altText).toBe("Test image");
      expect(node!.__maxWidth).toBe(400);
      expect(node!.__width).toBe("inherit");
      expect(node!.__height).toBe("inherit");
    });

    it("creates an ImageNode with optional properties", () => {
      let node: ImageNode;
      editor.update(() => {
        node = $createImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          width: 500,
          maxWidth: 600,
          height: 300,
        });
      });

      expect(node!.__width).toBe(500);
      expect(node!.__maxWidth).toBe(600);
      expect(node!.__height).toBe(300);
    });

    it("uses default maxWidth when not provided", () => {
      let node: ImageNode;
      editor.update(() => {
        node = $createImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });

      expect(node!.__maxWidth).toBe(400);
    });
  });

  describe("getType", () => {
    it("returns 'image' as the node type", () => {
      expect(ImageNode.getType()).toBe("image");
    });
  });

  describe("constructor", () => {
    it("creates a node with required properties", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });

      expect(node!.__src).toBe("https://example.com/image.jpg");
      expect(node!.__altText).toBe("Test image");
    });

    it("creates a node with optional key", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          key: "custom-key",
        });
      });

      expect(node!.getKey()).toBe("custom-key");
    });

    it("uses default values for optional properties", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });

      expect(node!.__width).toBe("inherit");
      expect(node!.__maxWidth).toBe(400);
      expect(node!.__height).toBe("inherit");
    });
  });

  describe("clone", () => {
    it("creates a copy of the node with the same properties", () => {
      let original!: ImageNode;
      let cloned!: ImageNode;
      editor.update(() => {
        original = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          width: 500,
          maxWidth: 600,
          height: 300,
        });
        cloned = ImageNode.clone(original);
      });

      expect(cloned).toBeInstanceOf(ImageNode);
      expect(cloned.__src).toBe(original.__src);
      expect(cloned.__altText).toBe(original.__altText);
      expect(cloned.__width).toBe(original.__width);
      expect(cloned.__maxWidth).toBe(original.__maxWidth);
      expect(cloned.__height).toBe(original.__height);
      expect(cloned).not.toBe(original);
    });
  });

  describe("decorate", () => {
    it("returns an img element with correct attributes", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });
      const decorated = node!.decorate();
      const props = decorated.props as React.ImgHTMLAttributes<HTMLImageElement>;

      expect(decorated.type).toBe("img");
      expect(props.src).toBe("https://example.com/image.jpg");
      expect(props.alt).toBe("Test image");
      expect(props.style).toEqual({ width: "100%", height: "auto" });
    });
  });

  describe("createDOM", () => {
    it("creates a span element", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });
      const dom = node!.createDOM();

      expect(dom.tagName).toBe("SPAN");
    });
  });

  describe("exportDOM", () => {
    it("creates an img element with correct attributes", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          width: 500,
          height: 300,
        });
      });
      const output = node!.exportDOM();
      const element = output.element as HTMLElement;

      expect(element.tagName).toBe("IMG");
      expect(element.getAttribute("src")).toBe("https://example.com/image.jpg");
      expect(element.getAttribute("alt")).toBe("Test image");
      expect(element.getAttribute("width")).toBe("500");
      expect(element.getAttribute("height")).toBe("300");
    });

    it("handles inherit values in exportDOM", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          width: "inherit",
          height: "inherit",
        });
      });
      const output = node!.exportDOM();
      const element = output.element as HTMLElement;

      expect(element.getAttribute("width")).toBe("inherit");
      expect(element.getAttribute("height")).toBe("inherit");
    });
  });

  describe("importDOM", () => {
    it("returns a conversion map for img elements", () => {
      const importMap = ImageNode.importDOM();

      expect(importMap).not.toBeNull();
      expect(importMap?.img).toBeDefined();
    });

    it("converts HTMLImageElement to ImageNode", () => {
      const img = document.createElement("img");
      img.src = "https://example.com/image.jpg";
      img.alt = "Test image";
      img.width = 500;
      img.height = 300;

      const importMap = ImageNode.importDOM();
      const conversion = importMap?.img?.(img);

      expect(conversion).toBeDefined();
      expect(conversion?.conversion).toBeDefined();

      let result: DOMConversionOutput | null = null;
      editor.update(() => {
        if (conversion?.conversion) {
          result = conversion.conversion(img);
        }
      });
      expect(result).not.toBeNull();
      expect(result!.node).toBeInstanceOf(ImageNode);
      expect((result!.node as ImageNode).__src).toBe("https://example.com/image.jpg");
      expect((result!.node as ImageNode).__altText).toBe("Test image");
    });

    it("handles image without width/height", () => {
      const img = document.createElement("img");
      img.src = "https://example.com/image.jpg";
      img.alt = "Test image";

      const importMap = ImageNode.importDOM();
      const conversion = importMap?.img?.(img);

      expect(conversion).toBeDefined();
      let result: DOMConversionOutput | null = null;
      editor.update(() => {
        if (conversion?.conversion) {
          result = conversion.conversion(img);
        }
      });
      expect(result).not.toBeNull();
      expect((result!.node as ImageNode).__src).toBe("https://example.com/image.jpg");
    });

    it("returns null for non-HTMLImageElement", () => {
      const div = document.createElement("div");

      const result = convertImageElement(div);
      expect(result).toBeNull();
    });
  });

  describe("importJSON", () => {
    it("creates a node from serialized data", () => {
      const serialized: SerializedImageNode = {
        type: "image",
        version: 1,
        src: "https://example.com/image.jpg",
        altText: "Test image",
        width: 500,
        maxWidth: 600,
        height: 300,
      };

      let node: ImageNode;
      editor.update(() => {
        node = ImageNode.importJSON(serialized);
      });

      expect(node!).toBeInstanceOf(ImageNode);
      expect(node!.__src).toBe("https://example.com/image.jpg");
      expect(node!.__altText).toBe("Test image");
      expect(node!.__width).toBe(500);
      expect(node!.__maxWidth).toBe(600);
      expect(node!.__height).toBe(300);
    });

    it("handles serialized data with inherit values", () => {
      const serialized: SerializedImageNode = {
        type: "image",
        version: 1,
        src: "https://example.com/image.jpg",
        altText: "Test image",
        width: "inherit",
        maxWidth: 400,
        height: "inherit",
      };

      let node: ImageNode;
      editor.update(() => {
        node = ImageNode.importJSON(serialized);
      });

      expect(node!.__width).toBe("inherit");
      expect(node!.__height).toBe("inherit");
    });
  });

  describe("getSrc", () => {
    it("returns the src property", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
        });
      });

      expect(node!.getSrc()).toBe("https://example.com/image.jpg");
    });
  });

  describe("exportJSON", () => {
    it("exports node data as JSON", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          width: 500,
          maxWidth: 600,
          height: 300,
        });
      });
      const json = node!.exportJSON();

      expect(json.type).toBe("image");
      expect(json.version).toBe(1);
      expect(json.src).toBe("https://example.com/image.jpg");
      expect(json.altText).toBe("Test image");
      expect(json.width).toBe(500);
      expect(json.maxWidth).toBe(600);
      expect(json.height).toBe(300);
    });

    it("exports node with inherit values", () => {
      let node: ImageNode;
      editor.update(() => {
        node = new ImageNode({
          src: "https://example.com/image.jpg",
          altText: "Test image",
          width: "inherit",
          height: "inherit",
        });
      });
      const json = node!.exportJSON();

      expect(json.width).toBe("inherit");
      expect(json.height).toBe("inherit");
    });
  });

  describe("convertImageElement", () => {
    it("converts HTMLImageElement to ImageNode", () => {
      const img = document.createElement("img");
      img.src = "https://example.com/image.jpg";
      img.alt = "Test image";
      img.width = 500;
      img.height = 300;

      let result: DOMConversionOutput | null = null;
      editor.update(() => {
        result = convertImageElement(img);
      });

      expect(result).not.toBeNull();
      expect(result!.node).toBeInstanceOf(ImageNode);
      expect((result!.node as ImageNode).__src).toBe("https://example.com/image.jpg");
      expect((result!.node as ImageNode).__altText).toBe("Test image");
    });

    it("returns null for non-HTMLImageElement", () => {
      const div = document.createElement("div");

      const result = convertImageElement(div);
      expect(result).toBeNull();
    });
  });
});
