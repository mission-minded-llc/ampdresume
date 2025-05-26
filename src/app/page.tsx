import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  TypographyOwnProps,
} from "@mui/material";

import Image from "next/image";
import { Metadata } from "next";
import { MuiLink } from "@/components/MuiLink";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const title = "Ampd Resume | Build Your Free Interactive Resume";
const description =
  "Ampd Resume is a free interactive resume builder. Sign in and start building your resume today!";

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
        <Typography component="h1" sx={{ mb: 2, typography: { sm: "h1", xs: "h4" } }}>
          Ampd Resume
        </Typography>
        <Typography
          component="h2"
          sx={{ mb: 4, pb: 4, borderBottom: "1px solid", typography: { sm: "h3", xs: "h5" } }}
        >
          Free Interactive Resume Builder
        </Typography>
        {user ? (
          <>
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
          </>
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
        <Divider />
        <Heading>What is Ampd Resume?</Heading>
        <Paragraph>
          <strong>Ampd Resume</strong> is an interactive resume builder that allows you to build
          your resume and host it <em>at no cost.</em> You can also download your resume as a PDF to
          use in job applications!
        </Paragraph>
        <Paragraph>
          Your resume is made up of sections. Each section can be edited to include your own
          information. You can add or remove sections as you like. Watch this video for a quick
          overview on how to set up your resume:
        </Paragraph>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "0",
            paddingBottom: "56.25%",
            marginBottom: "2rem",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/1SdxiH73ovQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          ></iframe>
        </Box>
        <Paragraph sx={{ textAlign: "center" }}>
          Check out the Ampd Resume founder&apos;s resume{" "}
          <MuiLink href="/r/michael-dinerstein" target="_blank">
            here
          </MuiLink>
          .
        </Paragraph>
        <Heading>Who is Ampd Resume For?</Heading>
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
          Not everyone has the means or time to maintain their own personal website. Ampd Resume is
          for anyone who wants to have a professional online presence without the hassle of
          maintaining a website.
        </Paragraph>
        <Paragraph>Think of it as a multi-purpose web presence:</Paragraph>
        <Box>
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                The content is based on your real work history and skills.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                Your Ampd Resume is <strong>interactive</strong> and <strong>engaging</strong> for
                reviewers.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                You can maintain your interactive and PDF-version resume in <em>one place.</em>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
        <Heading>New Features</Heading>
        <Paragraph>
          Ampd Resume is constantly being updated with new features. Some of the features that are
          coming soon include:
        </Paragraph>
        <Box>
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
                <strong>AI-assisted Revisions</strong> - Want to tailor your resume for a specific
                job listing? Paste the job listing and get a cusomtized version of <em>your</em>{" "}
                resume targeting the job posting&apos; requirements. This process saves an
                interactive version as well as a PDF version for a specific job.
              </ListItemText>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mt: 5, mb: 5 }}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            <MuiLink href="/login">Sign in</MuiLink> and start building your resume today!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
