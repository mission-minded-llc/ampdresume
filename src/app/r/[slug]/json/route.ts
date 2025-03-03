import { NextResponse } from "next/server";
import { getCompanies } from "@/graphql/getCompanies";
import { getEducation } from "@/graphql/getEducation";
import { getUser } from "@/graphql/getUser";
import { notFound } from "next/navigation";
import { removeHiddenFields } from "@/util/userData";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const user = await getUser(params.slug);

  if (!user) return notFound();

  const companies = (await getCompanies(user.id)) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  return NextResponse.json(removeHiddenFields({ user, experience: companies, education }));
}
