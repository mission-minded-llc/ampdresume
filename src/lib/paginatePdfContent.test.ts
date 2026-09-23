import { expect } from "@jest/globals";
import {
  PDF_KEEP_WITH_NEXT_ATTR,
  PDF_PAGE_SAFETY_PX,
  PDF_SECTION_ATTR,
  PDF_SPACER_ATTR,
  PDF_UNIT_ATTR,
  getHtml2PdfPageHeightPx,
  paginatePdfContent,
  planPdfPageBreaks,
} from "./paginatePdfContent";

describe("planPdfPageBreaks", () => {
  it("returns no breaks when everything fits on one page", () => {
    expect(planPdfPageBreaks([{ height: 40 }, { height: 50 }], 200)).toEqual([]);
  });

  it("returns no breaks for an empty flow or invalid page height", () => {
    expect(planPdfPageBreaks([], 200)).toEqual([]);
    expect(planPdfPageBreaks([{ height: 40 }], 0)).toEqual([]);
  });

  it("starts a new page when the next unit does not fit", () => {
    expect(planPdfPageBreaks([{ height: 80 }, { height: 80 }, { height: 80 }], 200)).toEqual([2]);
  });

  it("moves a keep-with-next title with its following block", () => {
    expect(
      planPdfPageBreaks([{ height: 100 }, { height: 20, keepWithNext: true }, { height: 60 }], 150),
    ).toEqual([1]);
  });

  it("does not orphan a title when only the title would fit", () => {
    expect(
      planPdfPageBreaks([{ height: 120 }, { height: 20, keepWithNext: true }, { height: 80 }], 150),
    ).toEqual([1]);
  });

  it("allows a block taller than a page to split after starting a fresh page", () => {
    expect(planPdfPageBreaks([{ height: 40 }, { height: 280 }, { height: 40 }], 100)).toEqual([
      1, 2,
    ]);
  });

  it("fills pages with many small units", () => {
    const units = Array.from({ length: 10 }, () => ({ height: 30 }));
    expect(planPdfPageBreaks(units, 100)).toEqual([3, 6, 9]);
  });

  it("does not insert a break when units fill a page exactly", () => {
    expect(planPdfPageBreaks([{ height: 50 }, { height: 50 }, { height: 50 }], 100)).toEqual([]);
  });
});

describe("paginatePdfContent", () => {
  const mount = (html: string) => {
    const root = document.createElement("div");
    root.innerHTML = html;
    document.body.appendChild(root);
    return root;
  };

  const stubHeight = (element: HTMLElement, height: number) => {
    Object.defineProperty(element, "offsetHeight", { configurable: true, value: height });
  };

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("inserts spacers before units that start a new page", () => {
    const root = mount(`
      <div ${PDF_UNIT_ATTR} id="a"></div>
      <div ${PDF_UNIT_ATTR} id="b"></div>
      <div ${PDF_UNIT_ATTR} id="c"></div>
    `);
    stubHeight(root.querySelector("#a") as HTMLElement, 80);
    stubHeight(root.querySelector("#b") as HTMLElement, 80);
    stubHeight(root.querySelector("#c") as HTMLElement, 80);

    const spacers = paginatePdfContent(root, 200);

    expect(spacers).toHaveLength(1);
    expect(spacers[0].getAttribute(PDF_SPACER_ATTR)).toBe("true");
    expect(spacers[0].style.height).toBe("40px");
    expect(root.querySelector("#c")?.previousElementSibling).toBe(spacers[0]);
  });

  it("inserts a section-level spacer so a title is not left on the previous page", () => {
    const root = mount(`
      <div ${PDF_UNIT_ATTR} id="lead"></div>
      <section ${PDF_SECTION_ATTR}>
        <h2 ${PDF_UNIT_ATTR} ${PDF_KEEP_WITH_NEXT_ATTR}="true" id="title"></h2>
        <p ${PDF_UNIT_ATTR} id="body"></p>
      </section>
    `);
    stubHeight(root.querySelector("#lead") as HTMLElement, 100);
    stubHeight(root.querySelector("#title") as HTMLElement, 20);
    stubHeight(root.querySelector("#body") as HTMLElement, 60);

    paginatePdfContent(root, 150);

    const section = root.querySelector("section");
    expect(section?.previousElementSibling?.getAttribute(PDF_SPACER_ATTR)).toBe("true");
  });

  it("does nothing when there are no marked units", () => {
    const root = mount(`<p>Plain resume text</p>`);
    expect(paginatePdfContent(root, 150)).toEqual([]);
  });

  it("leaves a safety gap so the last line is not sliced in half", () => {
    const root = mount(`
      <div ${PDF_UNIT_ATTR} id="a"></div>
      <div ${PDF_UNIT_ATTR} id="b"></div>
      <div ${PDF_UNIT_ATTR} id="c"></div>
    `);
    stubHeight(root.querySelector("#a") as HTMLElement, 90);
    stubHeight(root.querySelector("#b") as HTMLElement, 90);
    stubHeight(root.querySelector("#c") as HTMLElement, 90);

    const sliceHeight = 200;
    const spacers = paginatePdfContent(root, sliceHeight);

    expect(spacers).toHaveLength(1);
    expect(spacers[0].style.height).toBe(`${sliceHeight - 180}px`);
    expect(PDF_PAGE_SAFETY_PX).toBeGreaterThan(0);
    expect(root.querySelector("#c")?.previousElementSibling).toBe(spacers[0]);
  });

  it("matches html2pdf's canvas slice height from the root width", () => {
    const root = document.createElement("div");
    Object.defineProperty(root, "offsetWidth", { configurable: true, value: 672 });
    document.body.appendChild(root);

    expect(getHtml2PdfPageHeightPx(root, 2)).toBe(912);
  });

  it("pushes a unit that still straddles the html2pdf slice", () => {
    const rect = (top: number, height: number, width = 672): DOMRect =>
      ({
        top,
        bottom: top + height,
        height,
        width,
        left: 0,
        right: width,
        x: 0,
        y: top,
        toJSON: () => ({}),
      }) as DOMRect;

    const root = mount(`<div ${PDF_UNIT_ATTR} id="cut"></div>`);
    const unit = root.querySelector("#cut") as HTMLElement;
    stubHeight(unit, 40);
    root.getBoundingClientRect = () => rect(0, 1000);
    unit.getBoundingClientRect = () => rect(900, 40);

    const spacers = paginatePdfContent(root, 912);

    expect(spacers.at(-1)?.style.height).toBe("12px");
  });
});
