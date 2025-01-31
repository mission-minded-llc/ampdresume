import { Box } from "@mui/material";
import { Education } from "@/components/resume/Education";
import { Metadata } from "next";
import { ResumeHeading } from "@/components/resume/ResumeHeading";
import { ResumeProvider } from "@/components/resume/ResumeContext";
import { ResumeTitle } from "@/components/resume/ResumeTitle";
import { Skills } from "@/components/resume/Skills/Skills";
import { WorkExperience } from "@/components/resume/WorkExperience/WorkExperience";
import { getCompanies } from "@/graphql/getCompanies";
import { getEducation } from "@/graphql/getEducation";
import { getPositionsWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { getSkillsForUser } from "@/graphql/getSkillsForUser";
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

  const skillsForUser = (await getSkillsForUser(user.id)) ?? [];
  const companies = (await getCompanies(user.id)) ?? [];
  const positionsWithSkillsForProjects =
    (await getPositionsWithSkillsForProjects(companies.map((company) => company.id))) ?? [];
  const education = (await getEducation(user.id)) ?? [];

  return (
    <ResumeProvider
      skillsForUser={skillsForUser}
      companies={companies}
      positionsWithProjects={[]}
      positionsWithSkillsForProjects={positionsWithSkillsForProjects}
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
              <Skills skillType="user" />
            </>
          ) : null}
          {companies?.length && positionsWithSkillsForProjects?.length ? (
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
