import { Company, Education as EducationType, User } from "@prisma/client";
import { GET_POSITIONS, PositionWithProjects } from "@/graphql/getPositions";
import { GET_SKILLS_FOR_USER, SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

import { Box } from "@mui/material";
import { Education } from "@/components/resume/Education";
import { GET_COMPANIES } from "@/graphql/getCompanies";
import { GET_EDUCATION } from "@/graphql/getEducation";
import { GET_USER } from "@/graphql/getUser";
import { Metadata } from "next";
import { ResumeHeading } from "@/components/resume/ResumeHeading";
import { ResumeProvider } from "@/components/resume/ResumeContext";
import { ResumeTitle } from "@/components/resume/ResumeTitle";
import { Skills } from "@/components/resume/Skills/Skills";
import { WorkExperience } from "@/components/resume/WorkExperience/WorkExperience";
import { getApolloClient } from "@/lib/apolloClient";
import { notFound } from "next/navigation";

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
  } = await client
    .query<{ user: User }>({
      query: GET_USER,
      variables: {
        slug,
      },
    })
    .catch(() => {
      notFound();
    });

  const {
    data: { skillsForUser },
  } = await client.query<{ skillsForUser: SkillForUserWithSkill[] }>({
    query: GET_SKILLS_FOR_USER,
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
    <ResumeProvider
      skillsForUser={skillsForUser}
      companies={companies}
      positions={positions}
      education={education}
    >
      <Box
        component="main"
        sx={{
          position: "relative",
          display: "block",
          maxWidth: "1024px",
          margin: "0 auto",
          paddingBottom: "100px",
        }}
      >
        <ResumeHeading user={user} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "@media screen and (max-width: 600px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          {skillsForUser?.length ? (
            <>
              <ResumeTitle>Skills</ResumeTitle>
              <Skills />
            </>
          ) : null}
          {companies?.length && positions?.length ? (
            <>
              <ResumeTitle>Work Experience</ResumeTitle>
              <WorkExperience />
            </>
          ) : null}
        </Box>
        {education?.length ? (
          <>
            <ResumeTitle>Education</ResumeTitle>
            <Education />
          </>
        ) : null}
      </Box>
    </ResumeProvider>
  );
}
