import { GET_COMPANIES } from "@/graphql/getCompanies";
import { GET_EDUCATION } from "@/graphql/getEducation";
import { GET_POSITIONS, PositionWithProjects } from "@/graphql/getPositions";
import { GET_SKILLS, SkillForUserWithSkill } from "@/graphql/getSkills";
import { GET_USER } from "@/graphql/getUser";

import { DataProvider } from "@/context/DataContext";
import { Education } from "@/components/sections/Education/Education";
import { ResumeHeading } from "@/components/sections/ResumeHeading";
import { Skills } from "@/components/sections/Skills/Skills";
import { WorkExperience } from "@/components/sections/WorkExperience/WorkExperience";
import { getApolloClient } from "@/lib/apolloClient";
import styles from "./page.module.scss";
import { User, Company, Education as EducationType } from "@prisma/client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const client = getApolloClient();

  const {
    data: { user },
  } = await client.query<{ user: User }>({
    query: GET_USER,
    variables: { slug },
  });

  const { name, title, siteTitle, siteDescription, siteImage } = user;

  const siteTitleDefault = name && title ? `Resume of ${name}, ${title}` : "OpenResume";

  return {
    title: siteTitle ? siteTitle : siteTitleDefault,
    description: siteDescription ? siteDescription : "",
    authors: [
      {
        name: name ? name : "",
      },
    ],
    openGraph: {
      title: siteTitle ? siteTitle : siteTitleDefault,
      description: siteDescription ? siteDescription : "",
      images: siteImage
        ? [
            {
              url: siteImage,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const client = getApolloClient();

  const {
    data: { user },
  } = await client.query<{ user: User }>({
    query: GET_USER,
    variables: {
      slug,
    },
  });

  const {
    data: { skills },
  } = await client.query<{ skills: SkillForUserWithSkill[] }>({
    query: GET_SKILLS,
    variables: {
      userId: user.id,
    },
  });

  const {
    data: { companies },
  } = await client.query<{ companies: Company[] }>({
    query: GET_COMPANIES,
    variables: {
      userId: user.id,
    },
  });

  const {
    data: { positions },
  } = await client.query<{ positions: PositionWithProjects[] }>({
    query: GET_POSITIONS,
    variables: {
      companyIds: companies.map((company) => company.id),
    },
  });

  const {
    data: { education },
  } = await client.query<{ education: EducationType[] }>({
    query: GET_EDUCATION,
    variables: {
      userId: user.id,
    },
  });

  return (
    <DataProvider skills={skills} companies={companies} positions={positions} education={education}>
      <main className={styles.main}>
        <ResumeHeading user={user} />
        <div className={styles.workExperienceSkills}>
          <Skills />
          <WorkExperience />
        </div>
        <Education />
      </main>
    </DataProvider>
  );
}
