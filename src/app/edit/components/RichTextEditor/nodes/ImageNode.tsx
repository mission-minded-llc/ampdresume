import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";

type ImageNodeData = {
  src: string;
  altText: string;
  width?: "inherit" | number;
  maxWidth?: number;
  height?: "inherit" | number;
};

export type SerializedImageNode = SerializedLexicalNode & ImageNodeData;

export const $createImageNode = ({
  src,
  altText,
  width,
  maxWidth = 400,
  height,
}: ImageNodeData) => {
  return new ImageNode({
    src,
    altText,
    width,
    maxWidth,
    height,
  });
};

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __maxWidth: number;
  __height: "inherit" | number;

  constructor({ src, altText, width, maxWidth, height, key }: ImageNodeData & { key?: NodeKey }) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__maxWidth = maxWidth || 400;
    this.__height = height || "inherit";
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({
      src: node.__src,
      altText: node.__altText,
      width: node.__width,
      maxWidth: node.__maxWidth,
      height: node.__height,
    });
  }

  decorate(): React.ReactElement {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={this.__src} alt={this.__altText} style={{ width: "100%", height: "auto" }} />;
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    element.setAttribute("width", String(this.__width));
    element.setAttribute("height", String(this.__height));
    return { element };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: HTMLElement) => ({
        conversion: () => convertImageElement(node),
        priority: 0,
      }),
    };
  }

  static importJSON(serializedNode: SerializedLexicalNode & ImageNodeData): ImageNode {
    const { src, altText, width, maxWidth, height } = serializedNode;
    return $createImageNode({
      src,
      altText,
      width,
      maxWidth,
      height,
    });
  }

  getSrc(): string {
    return this.__src;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      maxWidth: this.__maxWidth,
      height: this.__height,
    };
  }
}

export const convertImageElement = (domNode: HTMLElement): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt, width, height } = domNode;
    const node = $createImageNode({
      src,
      altText: alt,
      width: width ?? undefined,
      height: height ?? undefined,
    });
    return { node };
  }
  return null;
};
