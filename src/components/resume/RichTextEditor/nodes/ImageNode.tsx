import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  NodeKey,
} from "lexical";

export const $createImageNode = ({
  src,
  altText,
  width,
  maxWidth = 400,
  height,
}: {
  src: string;
  altText: string;
  width?: number;
  maxWidth?: number;
  height?: number;
}) => {
  return new ImageNode({ src, altText, width, maxWidth, height });
};

const convertImageElement = (domNode: HTMLElement): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt, width, height } = domNode;
    const node = $createImageNode({ src, altText: alt, width, height });
    return { node };
  }

  return null;
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __maxWidth: number;
  __height: "inherit" | number;

  constructor({
    src,
    altText,
    width,
    maxWidth,
    height,
    key,
  }: {
    src: string;
    altText: string;
    width?: "inherit" | number;
    maxWidth: number;
    height?: "inherit" | number;
    key?: NodeKey;
  }) {
    super(key);

    this.__altText = altText;
    this.__width = width || "inherit";
    this.__maxWidth = maxWidth;
    this.__height = height || "inherit";
    this.__src = src;
  }

  static getType(): string {
    return "image";
  }

  static clone(_node: ImageNode): ImageNode {
    return new ImageNode({
      src: _node.__src,
      altText: _node.__altText,
      width: _node.__width,
      maxWidth: _node.__maxWidth,
      height: _node.__height,
    });
  }

  decorate(): JSX.Element {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        style={{
          width: this.__width,
          maxWidth: this.__maxWidth,
          height: this.__height,
        }}
      />
    );
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const image = document.createElement("img");
    image.setAttribute("src", this.__src);
    image.setAttribute("alt", this.__altText);
    image.setAttribute("width", String(this.__width));
    image.setAttribute("max-width", String(this.__maxWidth));
    image.setAttribute("height", String(this.__height));

    return { element: image };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: HTMLElement) => {
        return { conversion: () => convertImageElement(node), priority: 0 };
      },
    };
  }
}
