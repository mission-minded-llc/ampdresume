import { expect, describe, it } from "@jest/globals";
import { removeHiddenFields } from "./userData";

describe("removeHiddenFields", () => {
  it("removes specified hidden fields from an object", () => {
    const input = {
      id: 123,
      name: "Alice",
      __typename: "User",
      details: {
        userId: 456,
        email: "alice@example.com",
        city: "Wonderland",
      },
    };

    const result = removeHiddenFields(input);

    expect(result).toEqual({
      name: "Alice",
      details: {
        city: "Wonderland",
      },
    });
  });

  it("handles arrays and nested objects correctly", () => {
    const input = [
      {
        __typename: "Item1",
        name: "ItemOne",
        nested: { email: "test@example.com", description: "Hidden field" },
      },
      {
        name: "ItemTwo",
        userId: "shouldRemove",
      },
    ];

    const result = removeHiddenFields(input);

    expect(result).toEqual([
      {
        name: "ItemOne",
        nested: {},
      },
      {
        name: "ItemTwo",
      },
    ]);
  });

  it("returns null or primitive values unchanged", () => {
    expect(removeHiddenFields(null)).toBeNull();
    expect(removeHiddenFields("Hello")).toBe("Hello");
    expect(removeHiddenFields(42)).toBe(42);
  });
});
