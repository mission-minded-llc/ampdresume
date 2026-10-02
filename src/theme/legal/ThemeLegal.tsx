import { Box } from "@mui/material";
import { FeaturedProjects } from "@/theme/components/FeaturedProjects/FeaturedProjects";
import { ProfessionalSummary } from "@/theme/components/ProfessionalSummary/ProfessionalSummary";
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
import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Letterhead } from "./components/Letterhead";
import { MUIThemeProvider } from "./MUIThemeProvider";
import { chambersContentSx, getLegalPalette } from "./styles";

/**
 * Chambers layout for lawyers and legal staff. Credentials come before experience,
 * and shared sections keep their behaviour under a letterhead and oxford-rule captions.
 *
 * @param themeAppearance Light or dark, from the parent site toggle.
 * @param user Profile shown in the letterhead and summary.
 * @param socials Profile links in the letterhead.
 * @param skillsForUser Skills listed after experience.
 * @param companies Employers rendered as a docket.
 * @param education Degrees, placed before experience.
 * @param certifications Credentials placed with education.
 * @param featuredProjects Selected work after the skills list.
 * @returns The legal web resume.
 */
export const ThemeLegal = ({
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
      data-testid="theme-legal"
      sx={(theme) => ({
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        backgroundColor: getLegalPalette(theme.palette.mode).background,
        color: getLegalPalette(theme.palette.mode).ink,
      })}
    >
      <Box
        component="main"
        sx={(theme) => ({
          maxWidth: "760px",
          margin: "0 auto",
          padding: "0 20px 100px",
          ...chambersContentSx(getLegalPalette(theme.palette.mode)),
          [theme.breakpoints.up("sm")]: {
            padding: "0 28px 100px",
          },
        })}
      >
        <Letterhead user={user} socials={socials} />
        <ProfessionalSummary user={user} />
        <Education education={education} />
        <Certifications certifications={certifications} />
        <Experience companies={companies} />
        {skillsForUser?.length ? <Skills skillType="user" skillsForUser={skillsForUser} /> : null}
        {featuredProjects?.length ? <FeaturedProjects featuredProjects={featuredProjects} /> : null}
      </Box>
    </Box>
  </MUIThemeProvider>
);
