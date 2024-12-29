import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";

export const $createYouTubeNode = ({ id }: { id: string }) => {
  return new YouTubeNode({ id });
};

const ID_ATTR = "data-lexical-youtube";

const convertYoutubeElement = (domNode: HTMLElement): DOMConversionOutput | null => {
  const id = domNode?.getAttribute(ID_ATTR);

  if (!id) return null;

  const node = $createYouTubeNode({ id });

  return { node };
};

const HEIGHT = "315px";
const WIDTH = "560px";
const getYouTubeLink = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;

export class YouTubeNode extends DecoratorNode<JSX.Element> {
  __id: string;

  constructor({ id, key }: { id: string; key?: NodeKey }) {
    super(key);
    this.__id = id;
  }

  static getType(): string {
    return "youtube";
  }

  static clone(_node: YouTubeNode): YouTubeNode {
    return new YouTubeNode({
      id: _node.__id,
    });
  }

  decorate(): JSX.Element {
    return <iframe height={HEIGHT} width={WIDTH} src={getYouTubeLink(this.__id)} />;
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    return div;
  }

  updateDOM(): boolean {
    return false;
  }

  exportDOM(): DOMExportOutput {
    const iframe = document.createElement("iframe");
    iframe.setAttribute(ID_ATTR, this.__id);
    iframe.setAttribute("height", HEIGHT);
    iframe.setAttribute("width", WIDTH);
    iframe.setAttribute("src", getYouTubeLink(this.__id));

    return { element: iframe };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      iframe: () => {
        return { conversion: convertYoutubeElement, priority: 0 };
      },
    };
  }

  static importJSON(data: SerializedLexicalNode & { id: string }): YouTubeNode {
    return new YouTubeNode({ id: data.id });
  }

  exportJSON(): SerializedLexicalNode & { id: string } {
    return {
      ...super.exportJSON(),
      type: YouTubeNode.getType(),
      version: 1,
      id: this.__id,
    };
  }
}
