export enum RichTextAction {
  Bold = "bold",
  Italics = "italics",
  Underline = "underline",
  Superscript = "superscript",
  Subscript = "subscript",
  LeftAlign = "leftAlign",
  CenterAlign = "centerAlign",
  RightAlign = "rightAlign",
  JustifyAlign = "justifyAlign",
  Divider = "divider",
  Undo = "undo",
  Redo = "redo",
  UnorderedList = "unorderedList",
  OrderedList = "orderedList",
}

export const RICH_TEXT_OPTIONS = [
  { id: RichTextAction.Bold, icon: "gridicons:bold", label: "Bold" },
  { id: RichTextAction.Italics, icon: "gridicons:italic", label: "Italics" },
  { id: RichTextAction.Underline, icon: "gridicons:underline", label: "Underline" },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Superscript,
    icon: "material-symbols:superscript",
    label: "Superscript",
  },
  {
    id: RichTextAction.Subscript,
    icon: "material-symbols:subscript",
    label: "Subscript",
  },
  { id: RichTextAction.Divider },
  {
    id: RichTextAction.LeftAlign,
    icon: "dashicons:editor-alignleft",
    label: "Align Left",
  },
  {
    id: RichTextAction.CenterAlign,
    icon: "dashicons:editor-aligncenter",
    label: "Align Center",
  },
  {
    id: RichTextAction.RightAlign,
    icon: "dashicons:editor-alignright",
    label: "Align Right",
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: "dashicons:editor-justify",
    label: "Align Justify",
  },

  { id: RichTextAction.Divider },
  {
    id: RichTextAction.Undo,
    icon: "material-symbols:undo",
    label: "Undo",
  },
  {
    id: RichTextAction.Redo,
    icon: "material-symbols:redo",
    label: "Redo",
  },
];

export const LOW_PRIORIRTY = 1;
export const HEADINGS = ["h1", "h2", "h3", "h4"];
