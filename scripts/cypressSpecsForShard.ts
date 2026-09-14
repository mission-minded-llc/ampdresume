/**
 * Prints Cypress spec groups for CI.
 *
 * Default: comma-separated --spec list for SHARD_INDEX / SHARD_COUNT.
 * --matrix: JSON `{ include: [{ name, spec }] }` for a GitHub Actions matrix.
 */

import { globSync, readFileSync } from "node:fs";

export type WeightedSpec = { file: string; weight: number; name: string };
export type SpecGroup = { name: string; spec: string; files: string[]; weight: number };

export function specDisplayName(file: string): string {
  return file.replace(/^cypress\/integration\//, "").replace(/\.cy\.ts$/, "");
}

export function specWeight(source: string): number {
  const its = source.match(/\bit\s*\(/g)?.length ?? 0;
  const waits = source.match(/cy\.wait\s*\(/g)?.length ?? 0;
  return Math.max(1, its + waits);
}

export function groupName(files: string[]): string {
  const names = files.map(specDisplayName).sort();
  return names.join(" + ");
}

export function packSpecsIntoBins(specs: WeightedSpec[], binCount: number): SpecGroup[] {
  if (!Number.isInteger(binCount) || binCount < 1) {
    throw new Error("binCount must be a positive integer");
  }
  if (specs.length === 0) return [];

  const bins = Array.from({ length: Math.min(binCount, specs.length) }, () => ({
    files: [] as string[],
    weight: 0,
  }));

  const sorted = [...specs].sort((a, b) => b.weight - a.weight || a.file.localeCompare(b.file));
  for (const spec of sorted) {
    const lightest = bins.reduce((best, bin) => (bin.weight < best.weight ? bin : best));
    lightest.files.push(spec.file);
    lightest.weight += spec.weight;
  }

  return bins
    .filter((bin) => bin.files.length > 0)
    .map((bin) => {
      const files = [...bin.files].sort();
      return { name: groupName(files), spec: files.join(","), files, weight: bin.weight };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function autoBinCount(specs: WeightedSpec[]): number {
  if (specs.length === 0) return 0;
  const total = specs.reduce((sum, spec) => sum + spec.weight, 0);
  const heaviest = Math.max(...specs.map((spec) => spec.weight));
  // Enough bins that no group is much heavier than the slowest spec.
  return Math.min(specs.length, Math.max(1, Math.ceil(total / heaviest)));
}

export function listWeightedSpecs(): WeightedSpec[] {
  return globSync("cypress/integration/**/*.cy.ts")
    .sort()
    .map((file) => ({
      file,
      name: specDisplayName(file),
      weight: specWeight(readFileSync(file, "utf8")),
    }));
}

function printShard(groups: SpecGroup[], shardIndex: number) {
  if (shardIndex < 1 || shardIndex > groups.length) {
    throw new Error(`SHARD_INDEX must be an integer from 1 to ${groups.length}`);
  }
  const group = groups[shardIndex - 1];
  console.error(`Shard ${shardIndex}/${groups.length} (${group.name}, weight ${group.weight}):`);
  for (const file of group.files) {
    console.error(`  ${file}`);
  }
  console.log(group.spec);
}

function main() {
  const specs = listWeightedSpecs();
  const matrixMode = process.argv.includes("--matrix");
  const requestedCount = Number(process.env.SHARD_COUNT);
  const binCount =
    Number.isInteger(requestedCount) && requestedCount > 0 ? requestedCount : autoBinCount(specs);
  const groups = packSpecsIntoBins(specs, binCount);

  if (groups.length === 0) {
    console.error("No Cypress specs found under cypress/integration");
    process.exit(1);
  }

  if (matrixMode) {
    console.error(`Packed ${specs.length} spec(s) into ${groups.length} Cypress job(s):`);
    for (const group of groups) {
      console.error(`  ${group.name} (weight ${group.weight})`);
      for (const file of group.files) {
        console.error(`    ${file}`);
      }
    }
    console.log(JSON.stringify({ include: groups.map(({ name, spec }) => ({ name, spec })) }));
    return;
  }

  const shardIndex = Number(process.env.SHARD_INDEX);
  if (!Number.isInteger(shardIndex)) {
    console.error("Set SHARD_INDEX (1-based) or pass --matrix");
    process.exit(1);
  }
  printShard(groups, shardIndex);
}

const entry = process.argv[1] ?? "";
const isDirectRun =
  process.env.JEST_WORKER_ID === undefined &&
  (entry.endsWith("cypressSpecsForShard.ts") || entry.endsWith("cypressSpecsForShard.js"));

if (isDirectRun) {
  main();
}
