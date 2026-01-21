import { Box } from "@mui/material";
import { Certifications } from "@/theme/components/Certifications/Certifications";
import { Education } from "@/theme/components/Education/Education";
import { Skills } from "@/theme/components/Skills/Skills";
import {
  Certification,
  Company,
  Education as EducationType,
  SkillForUser,
  Social,
  ThemeAppearance,
  User,
} from "@/types";
import { ResumeHeading } from "./components/ResumeHeading";
import { WorkExperience } from "./components/WorkExperience/WorkExperience";
import { MUIThemeProvider } from "./MUIThemeProvider";

export const ThemeDefault = ({
  themeAppearance,
  user,
  socials,
  skillsForUser,
  companies,
  education,
  certifications,
}: {
  themeAppearance: ThemeAppearance;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  certifications: Certification[];
}) => (
  <MUIThemeProvider themeAppearance={themeAppearance}>
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
      {certifications?.length ? <Certifications certifications={certifications} /> : null}
    </Box>
  </MUIThemeProvider>
);
