import { Box, Container, Typography } from "@mui/material";
import { AccountForm } from "./components/AccountForm";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

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
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h4">
          Account Settings
        </Typography>
        <AccountForm
          name={user?.name || ""}
          slug={user?.slug || ""}
          displayEmail={user?.displayEmail || ""}
          title={user?.title || ""}
          location={user?.location || ""}
          siteTitle={user?.siteTitle || ""}
          siteDescription={user?.siteDescription || ""}
        />
      </Box>
    </Container>
  );
};

export default Page;
