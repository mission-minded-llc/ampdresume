import "@testing-library/jest-dom";

import { FieldDescription, FieldTitle, GridSection, InputSection, SectionTitle } from "./sections";

import React from "react";
import { render } from "@testing-library/react";

describe("sections components", () => {
  it("renders InputSection correctly", () => {
    const { container } = render(
      <InputSection>
        <div>Child 1</div>
        <div>Child 2</div>
      </InputSection>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders GridSection correctly for desktop", () => {
    const { container } = render(
      <GridSection isDesktop={true}>
        <div>Child 1</div>
        <div>Child 2</div>
      </GridSection>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders GridSection correctly for mobile", () => {
    const { container } = render(
      <GridSection isDesktop={false}>
        <div>Child 1</div>
        <div>Child 2</div>
      </GridSection>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders SectionTitle correctly", () => {
    const { container } = render(<SectionTitle>Section Title</SectionTitle>);
    expect(container).toMatchSnapshot();
  });

  it("renders FieldTitle correctly", () => {
    const { container } = render(<FieldTitle>Field Title</FieldTitle>);
    expect(container).toMatchSnapshot();
  });

  it("renders FieldDescription correctly", () => {
    const { container } = render(<FieldDescription>Field Description</FieldDescription>);
    expect(container).toMatchSnapshot();
  });
});
