import { AllCompany, GET_COMPANIES } from "@/graphql/getCompanies";
import { AllEducation, GET_EDUCATION } from "@/graphql/getEducation";
import { AllPosition, GET_POSITIONS } from "@/graphql/getPositions";
import { AllSkill, GET_SKILLS } from "@/graphql/getSkills";
import { AllThemeOptions, GET_THEME_OPTIONS } from "@/graphql/getThemeOptions";

import { DataProvider } from "@/context/DataContext";
import { Education } from "@/components/sections/Education/Education";
import { ResumeHeading } from "@/components/sections/ResumeHeading";
import { Skills } from "@/components/sections/Skills/Skills";
import { WorkExperience } from "@/components/sections/WorkExperience/WorkExperience";
import { getApolloClient } from "@/lib/apolloClient";
import styles from "./page.module.scss";
import { Company } from "../../../../sanity.types";
import { Metadata } from "next";

const client = getApolloClient();

const { data: allThemeOptions } = await client.query<AllThemeOptions>({
  query: GET_THEME_OPTIONS,
});

const { userName, userTitle, siteTitle, siteDescription, siteImage } =
  allThemeOptions.allThemeOptions[0];

const siteTitleDefault =
  userName && userTitle ? `Resume of ${userName}, ${userTitle}` : "Interactive Resume";

export const metadata: Metadata = {
  title: siteTitle ? siteTitle : siteTitleDefault,
  description: siteDescription ? siteDescription : "",
  authors: [
    {
      name: userName ? userName : "",
    },
  ],
  openGraph: {
    title: siteTitle ? siteTitle : siteTitleDefault,
    description: siteDescription ? siteDescription : "",
    images: siteImage?.asset?.url
      ? [
          {
            url: siteImage.asset.url,
            width: siteImage.asset.metadata.dimensions.width,
            height: siteImage.asset.metadata.dimensions.height,
          },
        ]
      : [],
  },
};

export default async function Page() {
  const client = getApolloClient();

  const { data: allThemeOptionsData } = await client.query<AllThemeOptions>({
    query: GET_THEME_OPTIONS,
  });

  const { data: allSkillData } = await client.query<AllSkill>({
    query: GET_SKILLS,
  });

  const { data: allCompanyData } = await client.query<AllCompany>({
    query: GET_COMPANIES,
  });

  const { data: allPositionData } = await client.query<AllPosition>({
    query: GET_POSITIONS,
    variables: {
      companyIds: allCompanyData.allCompany.map((company: Company) => company._id),
    },
  });

  const { data: allEducationData } = await client.query<AllEducation>({
    query: GET_EDUCATION,
  });

  return (
    <DataProvider
      skills={allSkillData.allSkill}
      companies={allCompanyData.allCompany}
      positions={allPositionData.allPosition}
      education={allEducationData.allEducation}
    >
      <main className={styles.main}>
        <ResumeHeading themeOptions={allThemeOptionsData.allThemeOptions[0]} />
        <div className={styles.workExperienceSkills}>
          <Skills />
          <WorkExperience />
        </div>
        <Education />
      </main>
    </DataProvider>
  );
}
