import { Social, User } from "@prisma/client";

import { Box } from "@mui/material";
import { CompanyWithPositionsWithProjectsWithSkills } from "@/graphql/getCompanies";
import { Education } from "./components/Education";
import { Education as EducationType } from "@/graphql/getEducation";
import { ResumeHeading } from "./components/ResumeHeading";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { Skills } from "./components/Skills/Skills";
import { WorkExperience } from "./components/WorkExperience/WorkExperience";

export const ThemeDefault = ({
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUserWithSkill[];
  companies: CompanyWithPositionsWithProjectsWithSkills[];
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

    {skillsForUser?.length ? <Skills skillType="user" skillsForUser={skillsForUser} /> : null}
    {companies?.length ? <WorkExperience companies={companies} /> : null}
    {education?.length ? <Education education={education} /> : null}
  </Box>
);
