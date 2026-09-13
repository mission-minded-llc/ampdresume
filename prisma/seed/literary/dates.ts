export function toDate(iso: string): Date {
  // Noon UTC keeps the calendar day stable in US timezones (midnight UTC
  // otherwise renders as the previous evening).
  return new Date(`${iso}T12:00:00.000Z`);
}

export function toDateOrNull(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  return toDate(iso);
}

export function datesEqual(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (a == null && b == null) return true;
  if (a == null || b == null) return false;
  return a.getTime() === b.getTime();
}

export function stringsEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  return (a ?? null) === (b ?? null);
}

export function numbersEqual(a: number | null | undefined, b: number | null | undefined): boolean {
  return (a ?? null) === (b ?? null);
}

export function jsonEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(normalizeJson(a)) === JSON.stringify(normalizeJson(b));
}

function normalizeJson(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(normalizeJson);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nested]) => [key, normalizeJson(nested)]),
    );
  }

  return value ?? null;
}
