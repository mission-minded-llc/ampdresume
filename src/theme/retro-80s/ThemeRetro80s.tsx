import { Box } from "@mui/material";
import { Certifications } from "@/theme/components/Certifications/Certifications";
import { Education } from "@/theme/components/Education/Education";
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
import { ArcadeBackdrop } from "./components/ArcadeBackdrop";
import { ArcadeHeading } from "./components/ArcadeHeading";
import { PixelSection } from "./components/PixelSection";
import { WorkExperience } from "./components/WorkExperience/WorkExperience";
import { MUIThemeProvider } from "./MUIThemeProvider";
import { getRetroPalette, MONO_FONT, PIXEL_FONT } from "./styles";

/**
 * Retro 80s: the same single-page layout and section order as the Classic theme,
 * dressed as an arcade cabinet. Shared sections keep their behaviour and are
 * re-skinned by PixelSection; the header and work experience are theme-specific.
 */
export const ThemeRetro80s = ({
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
      sx={(theme) => {
        const retro = getRetroPalette(theme.palette.mode);

        return {
          position: "relative",
          // The app renders pages inside a centered max-width container. Break out of
          // it so the cabinet backdrop reaches both edges of the viewport.
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          backgroundColor: retro.background,
          color: retro.ink,
          fontFamily: MONO_FONT,
        };
      }}
    >
      <ArcadeBackdrop />
      <Box
        component="main"
        sx={(theme) => ({
          position: "relative",
          zIndex: 1,
          display: "block",
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "0 16px 100px",
          [theme.breakpoints.up("sm")]: {
            padding: "0 24px 100px",
          },
        })}
      >
        <ArcadeHeading user={user} socials={socials} />

        <PixelSection>
          <ProfessionalSummary user={user} />
        </PixelSection>

        {skillsForUser?.length ? (
          <PixelSection>
            <Skills skillType="user" skillsForUser={skillsForUser} />
          </PixelSection>
        ) : null}

        {companies?.length ? <WorkExperience companies={companies} /> : null}

        {featuredProjects?.length ? (
          <PixelSection>
            <FeaturedProjects featuredProjects={featuredProjects} />
          </PixelSection>
        ) : null}

        {education?.length ? (
          <PixelSection>
            <Education education={education} />
          </PixelSection>
        ) : null}

        {certifications?.length ? (
          <PixelSection>
            <Certifications certifications={certifications} />
          </PixelSection>
        ) : null}

        <Box
          sx={(theme) => {
            const retro = getRetroPalette(theme.palette.mode);

            return {
              mt: 6,
              textAlign: "center",
              fontFamily: PIXEL_FONT,
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: retro.inkMuted,
              "@keyframes retroBlink": {
                "0%, 49%": { opacity: 1 },
                "50%, 100%": { opacity: 0.15 },
              },
              animation: "retroBlink 1.4s steps(1, end) infinite",
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
              },
            };
          }}
        >
          Game Over &mdash; Insert Coin
        </Box>
      </Box>
    </Box>
  </MUIThemeProvider>
);
