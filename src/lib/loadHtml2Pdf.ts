export type Html2PdfFn = typeof import("html2pdf.js").default;

/**
 * html2pdf.js is CJS. Dynamic import() and Jest mocks can return the function
 * itself, `{ default: fn }`, or a double-wrapped `{ default: { default: fn } }`.
 */
export const resolveHtml2PdfExport = (mod: unknown): Html2PdfFn => {
  if (typeof mod === "function") {
    return mod as Html2PdfFn;
  }

  if (mod && typeof mod === "object" && "default" in mod) {
    return resolveHtml2PdfExport((mod as { default: unknown }).default);
  }

  throw new Error("html2pdf.js did not export a function");
};

export const loadHtml2Pdf = async (): Promise<Html2PdfFn> => {
  const mod = await import("html2pdf.js");
  return resolveHtml2PdfExport(mod);
};
