export const PDF_PAGE = {
  widthIn: 8.5,
  heightIn: 11,
  marginIn: 0.75,
};

export const PDF_HTML2CANVAS_SCALE = 2;
/** Keep the last line of a page off html2pdf's fixed canvas slice. */
export const PDF_PAGE_SAFETY_PX = 20;

export const PDF_UNIT_ATTR = "data-pdf-unit";
export const PDF_KEEP_WITH_NEXT_ATTR = "data-pdf-keep-with-next";
export const PDF_SECTION_ATTR = "data-pdf-section";
export const PDF_SPACER_ATTR = "data-pdf-page-spacer";

/** Leave this much of the next unit with a title, or move both to the next page. */
export const PDF_ORPHAN_THRESHOLD_PX = 48;

export type PdfFlowUnit = {
  height: number;
  keepWithNext?: boolean;
};

const contentWidthIn = PDF_PAGE.widthIn - PDF_PAGE.marginIn * 2;
const contentHeightIn = PDF_PAGE.heightIn - PDF_PAGE.marginIn * 2;
const pageRatio = contentHeightIn / contentWidthIn;

const groupEndIndex = (units: PdfFlowUnit[], start: number) => {
  let end = start;
  while (end < units.length && units[end].keepWithNext) {
    end += 1;
  }
  return Math.min(end, units.length - 1);
};

const groupHeight = (units: PdfFlowUnit[], start: number, end: number) =>
  units.slice(start, end + 1).reduce((sum, unit) => sum + unit.height, 0);

/**
 * First-fit page packer for resume blocks.
 * Returns unit indices that should start a new page. Index 0 is never included.
 *
 * Keep-with-next units (section titles, company headers) travel with the
 * following block when the pair fits on a page, so titles are not stranded.
 * A block taller than a page is allowed to split after starting as high as
 * possible on a fresh page.
 */
export const planPdfPageBreaks = (
  units: PdfFlowUnit[],
  pageHeight: number,
  orphanThreshold = PDF_ORPHAN_THRESHOLD_PX,
): number[] => {
  if (pageHeight <= 0 || units.length === 0) return [];

  const breaks: number[] = [];
  let used = 0;
  let index = 0;

  while (index < units.length) {
    const end = groupEndIndex(units, index);
    const height = groupHeight(units, index, end);
    const fitsRemaining = used + height <= pageHeight;
    const fitsPage = height <= pageHeight;

    if (used > 0 && !fitsRemaining && fitsPage) {
      breaks.push(index);
      used = 0;
      continue;
    }

    if (
      used > 0 &&
      units[index].keepWithNext &&
      index + 1 < units.length &&
      used + units[index].height <= pageHeight &&
      used + units[index].height + Math.min(units[index + 1].height, orphanThreshold) > pageHeight
    ) {
      breaks.push(index);
      used = 0;
      continue;
    }

    for (let cursor = index; cursor <= end; cursor += 1) {
      const unitHeight = units[cursor].height;
      if (used > 0 && used + unitHeight > pageHeight) {
        breaks.push(cursor);
        used = 0;
      }
      used += unitHeight;
      if (used >= pageHeight) {
        used %= pageHeight;
      }
    }

    index = end + 1;
  }

  return breaks;
};

export const getPdfContentHeightPx = (doc: Document = document): number => {
  const probe = doc.createElement("div");
  probe.style.height = `${contentHeightIn}in`;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  doc.body.appendChild(probe);
  const height = probe.offsetHeight;
  probe.remove();
  return height;
};

/**
 * Page height in CSS pixels that matches html2pdf's canvas slice:
 * `Math.floor(canvas.width * inner.ratio) / scale`.
 */
export const getHtml2PdfPageHeightPx = (
  root: HTMLElement,
  scale = PDF_HTML2CANVAS_SCALE,
): number => {
  const width = root.getBoundingClientRect().width || root.offsetWidth;
  if (width <= 0 || scale <= 0) {
    return getPdfContentHeightPx(root.ownerDocument);
  }

  return Math.floor(width * scale * pageRatio) / scale;
};

const outerHeight = (element: HTMLElement): number => {
  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  const marginTop = style ? parseFloat(style.marginTop) || 0 : 0;
  const marginBottom = style ? parseFloat(style.marginBottom) || 0 : 0;
  return Math.ceil(element.offsetHeight + marginTop + marginBottom);
};

const breakTarget = (element: HTMLElement, root: HTMLElement): HTMLElement => {
  const section = element.closest(`[${PDF_SECTION_ATTR}]`);
  if (section instanceof HTMLElement && root.contains(section)) {
    const firstUnit = section.querySelector(`[${PDF_UNIT_ATTR}]`);
    if (firstUnit === element) return section;
  }
  return element;
};

const insertSpacer = (before: HTMLElement, height: number): HTMLElement => {
  const spacer = before.ownerDocument.createElement("div");
  spacer.setAttribute(PDF_SPACER_ATTR, "true");
  spacer.setAttribute("aria-hidden", "true");
  spacer.style.height = `${Math.max(0, Math.ceil(height))}px`;
  spacer.style.width = "100%";
  spacer.style.pointerEvents = "none";
  before.parentElement?.insertBefore(spacer, before);
  return spacer;
};

const offsetRelativeToRoot = (element: HTMLElement, root: HTMLElement) => {
  const rootRect = root.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top - rootRect.top,
    bottom: rect.bottom - rootRect.top,
  };
};

/**
 * After planned spacers, push any unit that still crosses a slice so a line
 * of text cannot be cut in half. jsdom reports 0x0 rects, so this is a no-op
 * unless layout geometry is available.
 */
const pushUnitsOffSliceEdges = (
  root: HTMLElement,
  unitElements: HTMLElement[],
  sliceHeight: number,
  spacers: HTMLElement[],
) => {
  if (root.getBoundingClientRect().height <= 0) return;

  unitElements.forEach((element) => {
    const { top, bottom } = offsetRelativeToRoot(element, root);
    const height = bottom - top;
    if (height <= 0 || height > sliceHeight) return;

    const startPage = Math.floor(top / sliceHeight + 1e-6);
    const endPage = Math.floor((bottom - 0.5) / sliceHeight);
    if (endPage <= startPage) return;

    const remaining = sliceHeight - (top - startPage * sliceHeight);
    if (remaining <= 0.5) return;

    spacers.push(insertSpacer(breakTarget(element, root), remaining));
  });
};

/**
 * Inserts page-end spacers so html2pdf's fixed page slices land between
 * resume units instead of through them. Safe to run on an html2canvas clone.
 */
export const paginatePdfContent = (root: HTMLElement, pageHeightPx?: number): HTMLElement[] => {
  const sliceHeight = pageHeightPx ?? getHtml2PdfPageHeightPx(root);
  if (sliceHeight <= 0) return [];

  const packHeight = Math.max(sliceHeight - PDF_PAGE_SAFETY_PX, sliceHeight * 0.9);
  const unitElements = Array.from(root.querySelectorAll<HTMLElement>(`[${PDF_UNIT_ATTR}]`));
  if (unitElements.length === 0) return [];

  const units: PdfFlowUnit[] = unitElements.map((element) => ({
    height: outerHeight(element),
    keepWithNext: element.getAttribute(PDF_KEEP_WITH_NEXT_ATTR) === "true",
  }));

  const breakIndices = new Set(planPdfPageBreaks(units, packHeight));
  const spacers: HTMLElement[] = [];
  let used = 0;

  unitElements.forEach((element, index) => {
    const unitHeight = units[index].height;
    const overflowsPack = used > 0 && used + unitHeight > packHeight && unitHeight <= packHeight;

    if ((breakIndices.has(index) || overflowsPack) && used > 0) {
      const remaining = sliceHeight - used;
      if (remaining > 0.5) {
        spacers.push(insertSpacer(breakTarget(element, root), remaining));
      }
      used = 0;
    }

    used += unitHeight;
    if (used > sliceHeight) {
      used %= sliceHeight;
    }
  });

  pushUnitsOffSliceEdges(root, unitElements, sliceHeight, spacers);

  return spacers;
};
