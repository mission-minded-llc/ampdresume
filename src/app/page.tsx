import { getSession } from "@/lib/auth";
import { Container, Box, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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

  const userEmail = session?.user?.email ?? "Not logged in.";

  // if logged in, and user name is not set, redirect to /account to set it.
  if (session && !session.user?.name) {
    redirect("/account");
  }

  // Using MUI, generate a basic homepage with a welcome message, logo
  // nav and footer. If the user is signed in, the nav should have a link to lead to /edit
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          OpenResume
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
          Free Interactive Resume Builder
        </Typography>
        <Link href="/r/michael-dinerstein/edit" color="secondary" component={NextLink}>
          Welcome, {userEmail}
        </Link>
      </Box>
    </Container>
  );
}
