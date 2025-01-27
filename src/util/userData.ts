/**
 * Removes hidden fields from an object, used to remove fields that
 * shouldn't be sent to the client for PDF or JSON output.
 *
 * @param {T} obj The object to remove hidden fields from.
 * @returns {T} The object without the hidden fields.
 */
export function removeHiddenFields<T>(obj: T): T {
  // Include additional keys to remove here.
  const keysToRemove = [
    "__typename",
    "id",
    "userId",
    "email",
    "siteTitle",
    "siteDescription",
    "siteImage",
    "companyId",
    "positionId",
    "icon",
    "description",
    "sortIndex",
    "skillsForProject",
  ];

  // Handle null or primitive values
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(removeHiddenFields) as T;
  }

  // Handle objects
  const newObj = {} as T;
  for (const key in obj) {
    if (!keysToRemove.includes(key)) {
      const value = (obj as Record<string, unknown>)[key];

      // Recursively process object values, skip null
      if (value !== null) {
        (newObj as Record<string, unknown>)[key] = removeHiddenFields(value);
      }
    }
  }

  return newObj;
}
