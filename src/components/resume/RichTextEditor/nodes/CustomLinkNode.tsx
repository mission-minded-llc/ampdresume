import { DOMExportOutput, LexicalEditor } from "lexical";
import { LinkNode, SerializedAutoLinkNode, SerializedLinkNode } from "@lexical/link";

export const $createCustomLinkNode = ({ url }: { url: string }) => {
  return new CustomLinkNode({ url });
};

export class CustomLinkNode extends LinkNode {
  __rel: string;
  __target: string;

  static getType() {
    return "link";
  }

  static clone(node: LinkNode) {
    return new CustomLinkNode({ url: node.__url });
  }

  constructor({ url }: { url: string }) {
    super(url);
    this.__rel = "nofollow noopener";
    this.__target = "_blank";
  }

  decorate() {
    return (
      <a href={this.__url} target={this.__target} rel={this.__rel}>
        {this.__url}
      </a>
    );
  }

  createDOM() {
    const a = document.createElement("a");
    a.setAttribute("href", this.__url);
    a.setAttribute("target", this.__target);
    a.setAttribute("rel", this.__rel);

    return a;
  }

  updateDOM() {
    return false;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const a = document.createElement("a");
    a.setAttribute("href", this.__url);
    a.setAttribute("target", this.__target);
    a.setAttribute("rel", this.__rel);

    const editorState = editor.getEditorState();
    a.textContent = editorState.read(() => this.getTextContent());

    return { element: a };
  }

  exportJSON(): SerializedLinkNode | SerializedAutoLinkNode {
    return {
      ...super.exportJSON(),
      type: CustomLinkNode.getType(),
      version: 1,
    };
  }

  static importJSON(data: SerializedLinkNode | SerializedAutoLinkNode) {
    return new CustomLinkNode({ url: data.url });
  }
}
