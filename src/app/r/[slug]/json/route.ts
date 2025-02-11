import { Company, getCompanies } from "@/graphql/getCompanies";
import {
  PositionWithProjectsWithSkills,
  getPositionsWithSkillsForProjects,
} from "@/graphql/getPositionsWithSkillsForProjects";

import { NextResponse } from "next/server";
import { getEducation } from "@/graphql/getEducation";
import { getUser } from "@/graphql/getUser";
import { notFound } from "next/navigation";
import { removeHiddenFields } from "@/util/userData";

type CompanyJson = Omit<Company, "id"> & {
  positions?: PositionWithProjectsWithSkills[];
};

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const user = await getUser(params.slug);

  if (!user) return notFound();

  const companies = (await getCompanies(user.id)) ?? [];
  const positions =
    (await getPositionsWithSkillsForProjects(companies.map((company) => company.id))) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  const companiesWithPositions: CompanyJson[] = [];

  let i = 0;
  for (const company of companies) {
    const companyPositions = positions.filter((position) => position.company.id === company.id);
    companiesWithPositions[i++] = { ...company, positions: companyPositions };
  }

  return NextResponse.json(
    removeHiddenFields({ user, experience: companiesWithPositions, education }),
  );
}
