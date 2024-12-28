import {
  $getNodeByKey,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  LexicalEditor,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";
import { Box, IconButton, Paper, TextField, styled } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";

const ResizeHandle = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: 16,
  height: 16,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[300]}`,
  cursor: "se-resize",
  opacity: 0,
  transition: "opacity 0.2s",
}));

const ImageContainer = styled(Box)(() => ({
  position: "relative",
  "&:hover": {
    "& .resizeHandle": {
      opacity: 1,
    },
    "& .editButton": {
      opacity: 1,
    },
  },
}));

const EditButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  opacity: 0,
  transition: "opacity 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));
type ImageNodeData = {
  src: string;
  altText: string;
  width?: "inherit" | number;
  maxWidth?: number;
  height?: "inherit" | number;
  caption?: string;
};

type ImageNodeProps = ImageNodeData & {
  nodeKey: string;
  editor: LexicalEditor;
};

const ResizableImage = ({
  src,
  altText,
  width,
  height,
  maxWidth,
  caption,
  nodeKey,
  editor,
}: ImageNodeProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isEditingAlt, setIsEditingAlt] = useState(false);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [localAltText, setLocalAltText] = useState(altText || "");
  const [localCaption, setLocalCaption] = useState(caption || "");
  const imageRef = useRef<HTMLImageElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Update local state when props change
  useEffect(() => {
    setLocalAltText(altText || "");
  }, [altText]);

  useEffect(() => {
    setLocalCaption(caption || "");
  }, [caption]);

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    if (imageRef.current) {
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight,
      };
    }
  }, []);

  const handleResize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !editor) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      const newWidth = Math.max(100, startPos.current.width + deltaX);
      const newHeight = Math.max(100, startPos.current.height + deltaY);

      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if (node instanceof ImageNode) {
          node.updateDimensions(newWidth, newHeight);
        }
      });
    },
    [isResizing, editor, nodeKey],
  );

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleAltTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalAltText(e.target.value);
  }, []);

  const handleAltTextBlur = useCallback(() => {
    if (!editor) return;

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node instanceof ImageNode) {
        node.updateAltText(localAltText);
      }
    });
    setIsEditingAlt(false);
  }, [editor, nodeKey, localAltText]);

  const handleCaptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalCaption(e.target.value);
  }, []);

  const handleCaptionBlur = useCallback(() => {
    if (!editor) return;

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node instanceof ImageNode) {
        node.updateCaption(localCaption);
      }
    });
    setIsEditingCaption(false);
  }, [editor, nodeKey, localCaption]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", stopResize);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing, handleResize, stopResize]);

  return (
    <Box sx={{ width: "fit-content", margin: "0 auto" }}>
      <ImageContainer>
        <Box position="relative">
          <img
            ref={imageRef}
            src={src}
            alt={localAltText}
            style={{
              width: typeof width === "number" ? width : "inherit",
              maxWidth: maxWidth,
              height: typeof height === "number" ? height : "inherit",
            }}
          />

          <ResizeHandle className="resizeHandle" onMouseDown={startResize} />

          <EditButton className="editButton" size="small" onClick={() => setIsEditingAlt(true)}>
            <EditIcon fontSize="small" />
          </EditButton>
        </Box>

        {isEditingAlt && (
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              p: 1,
              zIndex: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={localAltText}
              onChange={handleAltTextChange}
              onBlur={handleAltTextBlur}
              autoFocus
              label="Alt Text"
            />
          </Paper>
        )}

        <Box sx={{ mt: 1 }}>
          {isEditingCaption ? (
            <TextField
              fullWidth
              size="small"
              value={localCaption}
              onChange={handleCaptionChange}
              onBlur={handleCaptionBlur}
              placeholder="Add a caption..."
              autoFocus
            />
          ) : (
            <Box
              sx={{
                textAlign: "center",
                color: "text.secondary",
                cursor: "pointer",
                "&:hover": {
                  color: "text.primary",
                },
              }}
              onClick={() => setIsEditingCaption(true)}
            >
              {localCaption || "Add caption..."}
            </Box>
          )}
        </Box>
      </ImageContainer>
    </Box>
  );
};

export const $createImageNode = ({
  src,
  altText,
  width,
  maxWidth = 400,
  height,
  caption,
}: ImageNodeData) => {
  return new ImageNode({
    src,
    altText,
    width,
    maxWidth,
    height,
    caption,
  });
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: "inherit" | number;
  __maxWidth: number;
  __height: "inherit" | number;
  __caption: string;

  constructor({
    src,
    altText,
    width,
    maxWidth,
    height,
    caption = "",
    key,
  }: ImageNodeData & { key?: NodeKey }) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__maxWidth = maxWidth || 400;
    this.__height = height || "inherit";
    this.__caption = caption;
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
      caption: node.__caption,
    });
  }

  updateDimensions(width: number, height: number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  updateAltText(altText: string): void {
    const writable = this.getWritable();
    writable.__altText = altText;
  }

  updateCaption(caption: string): void {
    const writable = this.getWritable();
    writable.__caption = caption;
  }

  decorate(editor: LexicalEditor): JSX.Element {
    return (
      <ResizableImage
        src={this.__src}
        altText={this.__altText}
        width={this.__width}
        maxWidth={this.__maxWidth}
        height={this.__height}
        caption={this.__caption}
        nodeKey={this.__key}
        editor={editor}
      />
    );
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const container = document.createElement("div");
    const image = document.createElement("img");
    image.setAttribute("src", this.__src);
    image.setAttribute("alt", this.__altText);
    image.setAttribute("width", String(this.__width));
    image.setAttribute("max-width", String(this.__maxWidth));
    image.setAttribute("height", String(this.__height));

    container.appendChild(image);

    if (this.__caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = this.__caption;
      container.appendChild(caption);
    }

    return { element: container };
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
    const { src, altText, width, maxWidth, height, caption } = serializedNode;
    return $createImageNode({
      src,
      altText,
      width,
      maxWidth,
      height,
      caption,
    });
  }

  exportJSON(): SerializedLexicalNode & ImageNodeData {
    return {
      type: "image",
      version: 1,
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      maxWidth: this.__maxWidth,
      height: this.__height,
      caption: this.__caption,
    };
  }
}

const convertImageElement = (domNode: HTMLElement): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt, width, height } = domNode;
    const node = $createImageNode({
      src,
      altText: alt,
      width: width ? width : undefined,
      height: height ? height : undefined,
    });
    return { node };
  }
  return null;
};
