/**
 * Prints a comma-separated Cypress --spec list for one CI shard.
 *
 * SHARD_INDEX is 1-based. SHARD_COUNT is the number of shards.
 */

import { globSync } from "node:fs";

export function selectSpecsForShard(
  specs: string[],
  shardIndex: number,
  shardCount: number,
): string[] {
  if (!Number.isInteger(shardCount) || shardCount < 1) {
    throw new Error("SHARD_COUNT must be a positive integer");
  }
  if (!Number.isInteger(shardIndex) || shardIndex < 1 || shardIndex > shardCount) {
    throw new Error("SHARD_INDEX must be an integer from 1 to SHARD_COUNT");
  }

  return specs.filter((_, index) => index % shardCount === shardIndex - 1);
}

export function listIntegrationSpecs(): string[] {
  return globSync("cypress/integration/**/*.cy.ts").sort();
}

function main() {
  const shardIndex = Number(process.env.SHARD_INDEX);
  const shardCount = Number(process.env.SHARD_COUNT);
  const specs = listIntegrationSpecs();
  const selected = selectSpecsForShard(specs, shardIndex, shardCount);

  if (selected.length === 0) {
    console.error(`No Cypress specs assigned to shard ${shardIndex}/${shardCount}`);
    process.exit(1);
  }

  console.error(`Shard ${shardIndex}/${shardCount}: ${selected.length} spec(s)`);
  for (const spec of selected) {
    console.error(`  ${spec}`);
  }

  console.log(selected.join(","));
}

const entry = process.argv[1] ?? "";
const isDirectRun =
  process.env.JEST_WORKER_ID === undefined &&
  (entry.endsWith("cypressSpecsForShard.ts") || entry.endsWith("cypressSpecsForShard.js"));

if (isDirectRun) {
  main();
}
