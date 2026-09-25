"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Box, Button, Chip, Container, Tab, Tabs, Theme, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Icon } from "@iconify/react";
import { MuiLink } from "@/components/MuiLink";
import { LITERARY_DEMOS } from "@/constants/literaryDemos";
import { VERTICAL_DEMO_GROUPS } from "@/constants/verticalDemos";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { ThemeAwareLogo } from "./ThemeAwareLogo";

const LITERARY_TAB_ID = "literary";

const demoCardSx = (theme: Theme) => ({
  borderRadius: "16px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "#F7F2EC",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: theme.shadows[2],
  },
});

const DemoResumeCard = ({ slug, name, title }: { slug: string; name: string; title: string }) => {
  const isDesktop = useIsDesktop();

  return (
    <Box component="li" sx={demoCardSx}>
      <MuiLink
        href={`/r/${slug}`}
        aria-label={name}
        onClick={(event) => {
          if (!isDesktop || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          window.open(`/r/${slug}`, "_blank", "noopener,noreferrer");
        }}
        sx={{
          display: "block",
          height: "100%",
          p: 1.75,
          fontWeight: 650,
          textDecoration: "none",
          "&:hover": { textDecoration: "none" },
        }}
      >
        {name}
        <Typography
          component="span"
          color="text.secondary"
          sx={{ display: "block", mt: 0.5, fontSize: "0.9rem", lineHeight: 1.45 }}
        >
          {title}
        </Typography>
      </MuiLink>
    </Box>
  );
};

const demoGridSx = {
  m: 0,
  p: 0,
  listStyle: "none",
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
  },
  gap: 1.5,
} as const;

const features = [
  {
    icon: "fluent-color:cloud-16",
    title: "Hosted for free",
    body: "Build your resume and keep it live on the web — no hosting bill, no domain wrangling.",
  },
  {
    icon: "fluent-color:cursor-click-20",
    title: "Made to be explored",
    body: "Reviewers can open projects, skills, and history instead of skimming a flat PDF.",
  },
  {
    icon: "fluent-color:document-text-16",
    title: "Web and PDF, together",
    body: "Keep one source of truth and download a PDF whenever a job application asks for a file.",
  },
  {
    icon: "fluent-color:globe-16",
    title: "Skip the personal site",
    body: "A professional link you can share anywhere — without maintaining a website.",
  },
];

const comingSoon = [
  {
    icon: "fluent-color:design-ideas-16",
    title: "More open-source templates",
    body: (
      <>
        Help shape new looks by opening a PR — see the{" "}
        <MuiLink
          href="https://github.com/mission-minded-llc/ampdresume/blob/main/src/theme/README.md"
          target="_blank"
        >
          theme contribution guide
        </MuiLink>
        .
      </>
    ),
  },
  {
    icon: "fluent-color:bot-sparkle-16",
    title: "AI-assisted revisions",
    body: "Paste a job listing and get a tailored version of your resume — interactive and PDF — aimed at that posting.",
  },
];

const HeroCtas = ({ userName }: { userName: string | null }) => {
  if (userName) {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center" }}>
        <Button component={NextLink} href="/edit/profile" variant="contained" color="secondary">
          Edit your resume
        </Button>
        <Button component={NextLink} href="#example-resumes" variant="outlined" color="secondary">
          See example resumes
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center" }}>
      <Button component={NextLink} href="/login" variant="contained" color="secondary">
        Start building free
      </Button>
      <Button component={NextLink} href="#example-resumes" variant="outlined" color="secondary">
        See example resumes
      </Button>
    </Box>
  );
};

const JobApplicationMock = () => (
  <Box
    aria-hidden="true"
    sx={(theme) => ({
      width: "100%",
      maxWidth: 420,
      mx: "auto",
      p: 3,
      borderRadius: "24px",
      bgcolor: "background.paper",
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[3],
    })}
  >
    <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1.2 }}>
      Job application
    </Typography>
    {[
      { label: "Full name", value: "Alex Rivera" },
      { label: "Email", value: "alex@email.com" },
      { label: "Resume", value: "alex-rivera.pdf" },
    ].map((field) => (
      <Box key={field.label} sx={{ mt: 2 }}>
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
          {field.label}
        </Typography>
        <Box
          sx={(theme) => ({
            px: 1.5,
            py: 1.1,
            borderRadius: 2,
            bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "#F7F2EC",
            color: "text.secondary",
            fontSize: "0.95rem",
          })}
        >
          {field.value}
        </Box>
      </Box>
    ))}
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
        Website URL
      </Typography>
      <Box
        sx={{
          px: 1.5,
          py: 1.1,
          borderRadius: 2,
          border: "2px solid",
          borderColor: "secondary.main",
          background: "linear-gradient(135deg, rgba(174,0,255,0.12), rgba(255,140,40,0.14))",
          fontWeight: 650,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <span>ampdresume.com/r/you</span>
        <Chip size="small" label="this one" color="secondary" />
      </Box>
    </Box>
  </Box>
);

export const HomePageView = ({ userName }: { userName: string | null }) => {
  const [selectedDemoId, setSelectedDemoId] = useState(VERTICAL_DEMO_GROUPS[0].id);
  const selectedVertical =
    VERTICAL_DEMO_GROUPS.find((group) => group.id === selectedDemoId) ?? VERTICAL_DEMO_GROUPS[0];
  const isLiteraryTab = selectedDemoId === LITERARY_TAB_ID;

  return (
    <Box>
      <Box
        sx={(theme) => ({
          position: "relative",
          overflow: "hidden",
          px: { xs: 2, sm: 3 },
          pt: { xs: 4, sm: 6 },
          pb: { xs: 7, sm: 10 },
          textAlign: "center",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(ellipse 80% 55% at 15% 0%, rgba(174,0,255,0.24), transparent 58%), radial-gradient(ellipse 70% 50% at 95% 10%, rgba(255,140,40,0.18), transparent 52%)"
              : "radial-gradient(ellipse 80% 55% at 15% 0%, rgba(174,0,255,0.16), transparent 58%), radial-gradient(ellipse 70% 50% at 95% 10%, rgba(255,140,40,0.18), transparent 52%)",
          "@keyframes ampDrift": {
            "0%, 100%": { transform: "translate3d(0, 0, 0)" },
            "50%": { transform: "translate3d(14px, -16px, 0)" },
          },
        })}
      >
        <Box
          sx={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            top: 40,
            right: "12%",
            background: "radial-gradient(circle, rgba(255,238,0,0.28), transparent 68%)",
            filter: "blur(8px)",
            animation: "ampDrift 9s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="md" sx={{ position: "relative" }}>
          <Box
            component="h1"
            sx={{
              display: "flex",
              justifyContent: "center",
              overflow: "visible",
              m: 0,
              mx: "auto",
              pl: 1,
              maxWidth: { xs: 280, sm: 360 },
            }}
          >
            <Box component="span" sx={visuallyHidden}>
              Amp&apos;d Resume
            </Box>
            <ThemeAwareLogo hideDomain maxWidth="100%" />
          </Box>
          <Typography
            component="p"
            sx={{
              mt: 1.5,
              fontSize: { xs: "1.15rem", sm: "1.45rem" },
              fontWeight: 650,
              letterSpacing: "-0.02em",
            }}
          >
            Your resume, alive on the web.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 1.5, mx: "auto", maxWidth: 560, lineHeight: 1.7 }}
          >
            A free interactive resume you can share in any application — plus a PDF when you need a
            file. No website to maintain.
          </Typography>
          {userName ? (
            <Typography sx={{ mt: 3, mb: 2, fontWeight: 650 }}>
              Welcome back, {userName}!
            </Typography>
          ) : (
            <Box sx={{ mt: 3 }} />
          )}
          <HeroCtas userName={userName} />
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {["Free forever", "Hosted for you", "PDF export"].map((label) => (
              <Box
                key={label}
                component="span"
                sx={(theme) => ({
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  color: "text.secondary",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(42,36,48,0.06)",
                  cursor: "default",
                  userSelect: "none",
                })}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pb: 8 }}>
        <Typography
          component="h2"
          variant="h4"
          sx={{ textAlign: "center", mb: 1, mt: { xs: 1, sm: 2 } }}
        >
          What is Amp&apos;d Resume?
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ textAlign: "center", mx: "auto", maxWidth: 640, mb: 5, lineHeight: 1.7 }}
        >
          Build your resume in sections, host it at no cost, and give reviewers something they can
          actually click through.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2.5,
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={(theme) => ({
                p: 3,
                borderRadius: "24px",
                bgcolor: "background.paper",
                border: `1px solid ${theme.palette.divider}`,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[3],
                },
              })}
            >
              <Icon icon={feature.icon} width={40} height={40} />
              <Typography variant="h6" component="h3" sx={{ mt: 1.5, mb: 1, fontWeight: 750 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {feature.body}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: { xs: 8, sm: 10 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "center",
          }}
        >
          <Box>
            <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
              Who is it for?
            </Typography>
            <Typography sx={{ lineHeight: 1.8, mb: 2 }}>
              Ever freeze at the field that asks for a website URL? Not everyone has the time — or
              desire — to keep a personal site online.
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
              Amp&apos;d Resume is a multi-purpose web presence based on your real work history and
              skills: interactive for reviewers, and a PDF when you need one, all in the same place.
            </Typography>
            <Typography>
              Peek at the founder&apos;s resume <MuiLink href="/r/missionmike">here</MuiLink>.
            </Typography>
          </Box>
          <JobApplicationMock />
        </Box>

        <Box
          id="example-resumes"
          sx={{ mt: { xs: 8, sm: 10 }, scrollMarginTop: { xs: 80, sm: 96 } }}
        >
          <Typography component="h2" variant="h4" sx={{ textAlign: "center", mb: 1 }}>
            Example resumes
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", mx: "auto", maxWidth: 560, mb: 4, lineHeight: 1.7 }}
          >
            Browse sample resumes by industry or literary character, then click a name to see a
            finished resume.
          </Typography>
          <Box sx={{ maxWidth: { xs: 720, md: 1040 }, mx: "auto" }}>
            <Tabs
              value={selectedDemoId}
              onChange={(_, value: string) => setSelectedDemoId(value)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="Sample resumes"
              sx={{
                mb: 3,
                "& .MuiTabs-flexContainer": { gap: 0.5 },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 650,
                  minHeight: 44,
                  px: 1.75,
                },
              }}
            >
              <Tab
                value={LITERARY_TAB_ID}
                label="Literary"
                id={`demo-tab-${LITERARY_TAB_ID}`}
                aria-controls={`demo-panel-${LITERARY_TAB_ID}`}
              />
              {VERTICAL_DEMO_GROUPS.map((group) => (
                <Tab
                  key={group.id}
                  value={group.id}
                  label={group.shortLabel}
                  id={`demo-tab-${group.id}`}
                  aria-controls={`demo-panel-${group.id}`}
                />
              ))}
            </Tabs>
            {isLiteraryTab ? (
              <Box
                role="tabpanel"
                id={`demo-panel-${LITERARY_TAB_ID}`}
                aria-labelledby={`demo-tab-${LITERARY_TAB_ID}`}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: 750 }}>
                  Literary
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2.5, lineHeight: 1.6 }}>
                  Four public-domain characters with finished interactive resumes — Holmes, Alice,
                  Arthur, and Robin Hood.
                </Typography>
                <Box component="ul" sx={demoGridSx}>
                  {LITERARY_DEMOS.map((character) => (
                    <DemoResumeCard
                      key={character.slug}
                      slug={character.slug}
                      name={character.name}
                      title={character.title}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                role="tabpanel"
                id={`demo-panel-${selectedVertical.id}`}
                aria-labelledby={`demo-tab-${selectedVertical.id}`}
              >
                <Typography variant="h6" component="h3" sx={{ fontWeight: 750 }}>
                  {selectedVertical.label}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5, mb: 2.5, lineHeight: 1.6 }}>
                  {selectedVertical.blurb}
                </Typography>
                <Box component="ul" sx={demoGridSx}>
                  {selectedVertical.resumes.map((resume) => (
                    <DemoResumeCard
                      key={resume.slug}
                      slug={resume.slug}
                      name={resume.name}
                      title={resume.title}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 8, sm: 10 } }}>
          <Typography component="h2" variant="h4" sx={{ textAlign: "center", mb: 1 }}>
            On the way
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", mx: "auto", maxWidth: 560, mb: 4, lineHeight: 1.7 }}
          >
            Amp&apos;d Resume keeps picking up new features. Next up:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2.5,
            }}
          >
            {comingSoon.map((item) => (
              <Box
                key={item.title}
                sx={(theme) => ({
                  p: 3,
                  borderRadius: "24px",
                  bgcolor: "background.paper",
                  border: `1px solid ${theme.palette.divider}`,
                })}
              >
                <Icon icon={item.icon} width={36} height={36} />
                <Typography variant="h6" component="h3" sx={{ mt: 1.5, mb: 1, fontWeight: 750 }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Box
        sx={(theme) => ({
          py: { xs: 6, sm: 8 },
          px: 2,
          textAlign: "center",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(174,0,255,0.16), rgba(255,140,40,0.12))"
              : "linear-gradient(135deg, rgba(174,0,255,0.1), rgba(255,140,40,0.14))",
        })}
      >
        <Typography component="h2" variant="h4" sx={{ mb: 1.5 }}>
          Ready when you are
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mb: 3, mx: "auto", maxWidth: 480, lineHeight: 1.7 }}
        >
          Sign in and start building your resume today. It&apos;s free.
        </Typography>
        <HeroCtas userName={userName} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 2,
          py: { xs: 4, sm: 6 },
        }}
      >
        <ThemeAwareLogo maxWidth={440} />
      </Box>
    </Box>
  );
};
