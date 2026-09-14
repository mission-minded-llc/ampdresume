import { describe, expect, it } from "@jest/globals";
import { selectSpecsForShard } from "./cypressSpecsForShard";

describe("selectSpecsForShard", () => {
  const specs = ["a.cy.ts", "b.cy.ts", "c.cy.ts", "d.cy.ts", "e.cy.ts"];

  it("splits specs round-robin across shards", () => {
    expect(selectSpecsForShard(specs, 1, 3)).toEqual(["a.cy.ts", "d.cy.ts"]);
    expect(selectSpecsForShard(specs, 2, 3)).toEqual(["b.cy.ts", "e.cy.ts"]);
    expect(selectSpecsForShard(specs, 3, 3)).toEqual(["c.cy.ts"]);
  });

  it("rejects invalid shard bounds", () => {
    expect(() => selectSpecsForShard(specs, 0, 3)).toThrow(/SHARD_INDEX/);
    expect(() => selectSpecsForShard(specs, 4, 3)).toThrow(/SHARD_INDEX/);
    expect(() => selectSpecsForShard(specs, 1, 0)).toThrow(/SHARD_COUNT/);
  });
});
