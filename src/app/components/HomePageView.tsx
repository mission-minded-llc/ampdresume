"use client";

import NextLink from "next/link";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { MuiLink } from "@/components/MuiLink";

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
        Help shape new looks in the{" "}
        <MuiLink href="https://github.com/mission-minded-llc/ampdresume-theme">
          theme GitHub repo
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
        <Button
          component={NextLink}
          href="/r/michael-dinerstein"
          variant="outlined"
          color="secondary"
        >
          See an example
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center" }}>
      <Button component={NextLink} href="/login" variant="contained" color="secondary">
        Start building free
      </Button>
      <Button
        component={NextLink}
        href="/r/michael-dinerstein"
        target="_blank"
        variant="outlined"
        color="secondary"
      >
        See an example
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

export const HomePageView = ({ userName }: { userName: string | null }) => (
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
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1.5 }}>
          <Icon icon="fluent-emoji-flat:high-voltage" width={44} height={44} />
        </Box>
        <Typography component="h1" variant="h3" sx={{ typography: { xs: "h4", sm: "h3" } }}>
          Amp&apos;d Resume
        </Typography>
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
          <Typography sx={{ mt: 3, mb: 2, fontWeight: 650 }}>Welcome back, {userName}!</Typography>
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
            <Chip key={label} label={label} variant="outlined" color="secondary" />
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
            Peek at the founder&apos;s resume{" "}
            <MuiLink href="/r/michael-dinerstein" target="_blank">
              here
            </MuiLink>
            .
          </Typography>
        </Box>
        <JobApplicationMock />
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
      <Typography color="text.secondary" sx={{ mb: 3, mx: "auto", maxWidth: 480, lineHeight: 1.7 }}>
        Sign in and start building your resume today. It&apos;s free.
      </Typography>
      <HeroCtas userName={userName} />
    </Box>
  </Box>
);
