import { Box, Container, Typography } from "@mui/material";

import { Metadata } from "next";
import { MuiLink } from "@/components/MuiLink";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const title = "OpenResume | Free Interactive Resume Builder";
const description =
  "OpenResume is a free interactive resume builder. Sign in and start building your resume today!";

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
    // TODO: Add an image.
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
              <MuiLink href={`/resume/edit`}>Edit your resume</MuiLink> or{" "}
              <MuiLink href="/account">update your account settings</MuiLink>.
            </Typography>
          </>
        ) : (
          <Typography
            sx={{
              fontSize: "1.25rem",
              mt: "2rem",
            }}
          >
            <MuiLink href="/api/auth/signin">Sign in</MuiLink> and start building your resume today!
          </Typography>
        )}
      </Box>
    </Container>
  );
}
