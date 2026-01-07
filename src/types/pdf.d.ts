declare module "pdfjs-dist/build/pdf.worker.mjs" {
  const worker: string;
  export default worker;
}

// Declare module for pdfjs-dist/build/pdf.mjs to fix webpack import issue
// This module is the ESM build of pdfjs-dist and has the same API
declare module "pdfjs-dist/build/pdf.mjs" {
  // Re-export all types from pdfjs-dist types
  export * from "pdfjs-dist/types/src/pdf";
}
