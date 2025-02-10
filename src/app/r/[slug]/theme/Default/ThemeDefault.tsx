import { Social, User } from "@prisma/client";

import { Box } from "@mui/material";
import { Company } from "@/graphql/getCompanies";
import { Education } from "./components/Education";
import { Education as EducationType } from "@/graphql/getEducation";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { ResumeHeading } from "./components/ResumeHeading";
import { ResumeTitle } from "./components/ResumeTitle";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { Skills } from "./components/Skills/Skills";
import { WorkExperience } from "./components/WorkExperience/WorkExperience";

export const ThemeDefault = ({
  user,
  socials,
  skillsForUser,
  companies,
  positionsWithSkillsForProjects,
  education,
}: {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUserWithSkill[];
  companies: Company[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
  education: EducationType[];
}) => (
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
    <ResumeHeading user={user} socials={socials} />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {skillsForUser?.length ? (
        <>
          <ResumeTitle>Skills</ResumeTitle>
          <Skills skillType="user" skillsForUser={skillsForUser} />
        </>
      ) : null}
      {companies?.length && positionsWithSkillsForProjects?.length ? (
        <>
          <ResumeTitle>Work Experience</ResumeTitle>
          <WorkExperience
            companies={companies}
            positionsWithSkillsForProjects={positionsWithSkillsForProjects}
          />
        </>
      ) : null}
    </Box>
    {education?.length ? (
      <>
        <ResumeTitle>Education</ResumeTitle>
        <Education education={education} />
      </>
    ) : null}
  </Box>
);
