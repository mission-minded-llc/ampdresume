import { Box, Typography } from "@mui/material";
import { titleSuffix } from "@/constants";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SectionTitle } from "../components/SectionTitle";
import { AccountForm } from "./components/AccountForm";

export function generateMetadata() {
  return {
    title: `Edit Profile ${titleSuffix}`,
  };
}

const Page = async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    return (
      <Typography component="p">
        You need to be signed in to access this page.
      </Typography>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        width: "100%",
      }}
    >
      <SectionTitle title="Profile" />
      <AccountForm
        name={user?.name || ""}
        slug={user?.slug || ""}
        displayEmail={user?.displayEmail || ""}
        title={user?.title || ""}
        location={user?.location || ""}
        siteTitle={user?.siteTitle || ""}
        siteDescription={user?.siteDescription || ""}
        siteImage={user?.siteImage || ""}
      />
    </Box>
  );
};

export default Page;
