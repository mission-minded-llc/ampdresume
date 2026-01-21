import { Box } from "@mui/material";
import { Certifications } from "@/theme/components/Certifications/Certifications";
import { Education } from "@/theme/components/Education/Education";
import { FeaturedProjects } from "@/theme/components/FeaturedProjects/FeaturedProjects";
import { Skills } from "@/theme/components/Skills/Skills";
import {
  Certification,
  Company,
  Education as EducationType,
  FeaturedProject,
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
  featuredProjects,
}: {
  themeAppearance: ThemeAppearance;
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: EducationType[];
  certifications: Certification[];
  featuredProjects: FeaturedProject[];
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
      {featuredProjects?.length ? <FeaturedProjects featuredProjects={featuredProjects} /> : null}
      {education?.length ? <Education education={education} /> : null}
      {certifications?.length ? <Certifications certifications={certifications} /> : null}
    </Box>
  </MUIThemeProvider>
);
