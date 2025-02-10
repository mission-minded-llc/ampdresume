import { Metadata } from "next";
import { ResumeView } from "./ResumeView";
import { getCompanies } from "@/graphql/getCompanies";
import { getEducation } from "@/graphql/getEducation";
import { getPositionsWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
import { getSocials } from "@/graphql/getSocials";
import { getUser } from "@/graphql/getUser";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUser(slug);

  const siteTitleDefault =
    user?.name && user?.title ? `Resume of ${user.name}, ${user.title}` : "OpenResume";

  const title = user?.siteTitle ? user.siteTitle : siteTitleDefault;
  const description = user?.siteDescription ? user.siteDescription : "";

  return {
    title,
    description,
    authors: [
      {
        name: user?.name ? user.name : "OpenResume",
      },
    ],
    openGraph: {
      title,
      description,
      images: user?.siteImage
        ? [
            {
              url: user.siteImage,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await getUser(slug);

  if (!user) notFound();

  const socials = (await getSocials(user.id)) ?? [];
  const skillsForUser = (await getSkillsForUser(user.id)) ?? [];
  const companies = (await getCompanies(user.id)) ?? [];
  const positionsWithSkillsForProjects =
    (await getPositionsWithSkillsForProjects(companies.map((company) => company.id))) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  return (
    <ResumeView
      user={user}
      socials={socials}
      skillsForUser={skillsForUser}
      companies={companies}
      positionsWithSkillsForProjects={positionsWithSkillsForProjects}
      education={education}
    />
  );
}
