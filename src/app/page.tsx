import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  TypographyOwnProps,
} from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";

import { MuiLink } from "@/components/MuiLink";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { ThemeAwareImage } from "./components/ThemeAwareImage";

const title = "Amp'd Resume | Build Your Free Interactive Resume";
const description =
  "Amp'd Resume is a free interactive resume builder. Sign in and start building your resume today!";

const Heading = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component="h3"
    sx={{
      typography: { sm: "h4", xs: "h6" },
      textAlign: "center",
      mt: 10,
      mb: 5,
    }}
  >
    {children}
  </Typography>
);

const Paragraph = ({
  sx = {},
  children,
}: {
  sx?: TypographyOwnProps["sx"];
  children: React.ReactNode;
}) => (
  <Typography variant="body1" maxWidth="md" sx={{ m: "2rem auto", lineHeight: 2, ...sx }}>
    {children}
  </Typography>
);

export const metadata: Metadata = {
  title,
  description,
  authors: [
    {
      name: "Michael R. Dinerstein",
    },
  ],
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/images/og-image.png",
        width: 902,
        height: 556,
      },
    ],
  },
};

export default async function HomePage() {
  const session = await getSession();
  const userId = session?.user?.id;

  const user = userId
    ? await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
      })
    : null;

  if (userId && !user) {
    return {
      redirect: {
        destination: "/logout",
        permanent: false,
      },
    };
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ThemeAwareImage
          lightSrc="/images/ampd-resume-logo.svg"
          darkSrc="/images/ampd-resume-dark-mode-logo.svg"
          alt="Amp'd Resume Logo"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "700px",
          }}
          ariaLabel="Amp'd Resume"
        />
        <Typography
          component="h1"
          sx={{
            position: "absolute",
            left: "-10000px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          Amp&apos;d Resume
        </Typography>
        <Typography
          component="h2"
          sx={{
            mt: 4,
            mb: 4,
            pt: 2,
            pb: 2,
            width: "100%",
            typography: { sm: "h4", xs: "h5" },
          }}
        >
          Free Interactive Resume Builder
        </Typography>
        {user ? (
          <Box sx={{ p: 2, width: "100%" }}>
            <Typography component="h3" sx={{ typography: { sm: "h5", xs: "h6" } }}>
              Welcome back, {user.name}!{" "}
            </Typography>
            <Typography
              sx={{
                mt: "1rem",
              }}
            >
              <MuiLink href={`/edit/profile`}>Edit your resume here.</MuiLink>
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: "1.25rem",
              mt: "2rem",
            }}
          >
            <MuiLink href="/login">Sign in</MuiLink> and start building your resume today!
          </Typography>
        )}
      </Box>
      <Box>
        <Heading>What is Amp&apos;d Resume?</Heading>
        <Paragraph>
          <strong>Amp&apos;d Resume</strong> is an interactive resume builder that allows you to
          build your resume and host it <em>at no cost.</em> You can also download your resume as a
          PDF to use in job applications.
        </Paragraph>
        <Paragraph>
          Your resume is made up of sections. Each section can be edited to include your own
          information. You can add or remove sections as you like!
        </Paragraph>
        <Paragraph>
          Check out the Amp&apos;d Resume founder&apos;s resume{" "}
          <MuiLink href="/r/michael-dinerstein" target="_blank">
            here
          </MuiLink>
          .
        </Paragraph>
        <Heading>Who is Amp&apos;d Resume For?</Heading>
        <Paragraph>
          Have you ever applied for a job online, and encountered the field that asks for a website
          URL?
        </Paragraph>
        <Box sx={{ position: "relative", width: "100%", height: "400px", mt: 3 }}>
          <Image
            src="/images/home/form-fields.png"
            alt="Job application form fields"
            fill
            objectFit="contain"
          />
        </Box>
        <Paragraph>
          Not everyone has the means or time to maintain their own personal website. Amp&apos;d
          Resume is for anyone who wants to have a professional online presence without the hassle
          of maintaining a website.
        </Paragraph>
        <Paragraph>Think of it as a multi-purpose web presence:</Paragraph>
        <List sx={{ listStyleType: "disc" }}>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText>The content is based on your real work history and skills.</ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText>
              Your Amp&apos;d Resume is <strong>interactive</strong> and <strong>engaging</strong>{" "}
              for reviewers.
            </ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText>
              You can maintain your interactive and PDF-version resume in <em>one place.</em>
            </ListItemText>
          </ListItem>
        </List>
        <Heading>New Features</Heading>
        <Paragraph>
          Amp&apos;d Resume is constantly being updated with new features. Some of the features that
          are coming soon include:
        </Paragraph>
        <List sx={{ listStyleType: "disc" }}>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText>
              <strong>More Open-Source Templates!</strong> - To contribute, check out the{" "}
              <MuiLink href="https://github.com/mission-minded-llc/ampdresume-theme">
                GitHub repo.
              </MuiLink>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText>
              <strong>AI-assisted Revisions</strong> - Want to tailor your resume for a specific job
              listing? Paste the job listing and get a cusomtized version of <em>your</em> resume
              targeting the job posting&apos; requirements. This process saves an interactive
              version as well as a PDF version for a specific job.
            </ListItemText>
          </ListItem>
        </List>
        <Paragraph>
          <MuiLink href="/login">Sign in</MuiLink> and start building your resume today!
        </Paragraph>
      </Box>
    </Container>
  );
}
