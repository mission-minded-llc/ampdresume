import { Company, getCompanies } from "@/graphql/getCompanies";
import { PositionWithProjects, getPositions } from "@/graphql/getPositions";

import { NextResponse } from "next/server";
import { getEducation } from "@/graphql/getEducation";
import { getUser } from "@/graphql/getUser";
import { notFound } from "next/navigation";

type CompanyJson = Omit<Company, "id"> & {
  positions?: PositionWithProjects[];
};

type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

function removeFields<T>(obj: T): T {
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
    return obj.map(removeFields) as T;
  }

  // Handle objects
  const newObj = {} as T;
  for (const key in obj) {
    if (!keysToRemove.includes(key)) {
      const value = (obj as Record<string, unknown>)[key];

      // Recursively process object values, skip null
      if (value !== null) {
        (newObj as Record<string, unknown>)[key] = removeFields(value);
      }
    }
  }

  return newObj;
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const user = await getUser(params.slug);

  if (!user) return notFound();

  const companies = (await getCompanies(user.id)) ?? [];
  const positions = (await getPositions(companies.map((company) => company.id))) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  const companiesWithPositions: CompanyJson[] = [];

  let i = 0;
  for (const company of companies) {
    const companyPositions = positions.filter((position) => position.company.id === company.id);
    companiesWithPositions[i++] = { ...company, positions: companyPositions };
  }

  return NextResponse.json(removeFields({ user, experience: companiesWithPositions, education }));
}
