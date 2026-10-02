import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { getEducation } from "@/graphql/getEducation";
import { getExperience } from "@/graphql/getExperience";
import { getUser } from "@/graphql/getUser";
import { removeHiddenFields } from "@/util/userData";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getUser(slug);

  if (!user) return notFound();

  const experience = (await getExperience(user.id)) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  return NextResponse.json(removeHiddenFields({ user, experience, education }));
}
