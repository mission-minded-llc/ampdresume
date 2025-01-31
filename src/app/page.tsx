import { Box, Container, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

import Image from "next/image";
import { Metadata } from "next";
import { MuiLink } from "@/components/MuiLink";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const title = "OpenResume | Build Your Free Interactive Resume";
const description =
  "OpenResume is a free interactive resume builder. Sign in and start building your resume today!";

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

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body1" maxWidth="md" sx={{ m: "2rem auto", lineHeight: 2 }}>
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
    <Container maxWidth="lg">
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
          OpenResume
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
        <Heading>What is OpenResume?</Heading>
        <Paragraph>
          <strong>OpenResume</strong> is an interactive resume builder that allows you to build your
          resume and host it <em>for free.</em> You can also download your resume as a PDF to use in
          job applications.
        </Paragraph>
        <Paragraph>
          Your resume is made up of sections. Each section can be edited to include your own
          information. You can add or remove sections as you like. Watch this video for a quick
          overview on how to set up your resume:
        </Paragraph>
        <Paragraph>
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
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            ></iframe>
          </Box>
        </Paragraph>
        <Paragraph>
          Check out a sample resume <MuiLink href="/r/jane-doe">here</MuiLink>.
        </Paragraph>
        <Heading>Who is OpenResume For?</Heading>
        <Paragraph>
          Have you ever applied for a job online, and encountered the field that asks for a website
          URL?
          <Box sx={{ position: "relative", width: "100%", height: "400px", mt: 3 }}>
            <Image
              src="/images/home/form-fields.png"
              alt="Job application form fields"
              fill
              objectFit="contain"
            />
          </Box>
        </Paragraph>
        <Paragraph>
          Not everyone has the means or time to maintain their own personal website. OpenResume is
          for anyone who wants to have a professional online presence without the hassle of
          maintaining a website.
        </Paragraph>
        <Paragraph>
          Think of it as a multi-purpose web presence:
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                The content is all based on your real work history and skills.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                Your OpenResume is interactive and engaging for reviewers.
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                You can maintain your interactive and PDF-version resume in one place.
              </ListItemText>
            </ListItem>
          </List>
        </Paragraph>
        <Heading>New Features (Coming Soon)</Heading>
        <Paragraph>
          OpenResume is constantly being updated with new features. Some of the features that are
          coming soon include:
          <List sx={{ listStyleType: "disc" }}>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                <strong>More Templates</strong> - including an open-source custom template, open for
                anyone to contribute their layouts!
              </ListItemText>
            </ListItem>
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>
                <strong>AI-assisted Revisions</strong> - Want to tailor your resume for a specific
                job listing? Paste the job listing and get a cusomtized version of <em>your</em>{" "}
                resume targeting the job posting&apos; requirements.
              </ListItemText>
            </ListItem>
          </List>
        </Paragraph>
      </Box>
    </Container>
  );
}
