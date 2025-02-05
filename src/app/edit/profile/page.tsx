import { Box, Typography } from "@mui/material";

import { AccountForm } from "./components/AccountForm";
import { EditPageLayout } from "../components/EditPageLayout";
import { SectionTitle } from "../components/SectionTitle";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { titleSuffix } from "@/constants";

export function generateMetadata() {
  return {
    title: `Edit Profile ${titleSuffix}`,
  };
}

const Page = async () => {
  const session = await getSession();
  if (!session?.user?.id) {
    return <Typography component="p">You need to be signed in to access this page.</Typography>;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return (
    <EditPageLayout>
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
    </EditPageLayout>
  );
};

export default Page;
