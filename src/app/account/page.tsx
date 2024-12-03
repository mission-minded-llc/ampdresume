import { getSession } from "@/lib/auth";
import { Box, Container, Typography } from "@mui/material";
import { AccountForm } from "./AccountForm";

export default async function HomePage() {
  const session = await getSession();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          marginBottom: 4,
          borderBottom: 1,
        }}
      >
        <Typography component="h1" variant="h2">
          OpenResume Account
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h2">
          Welcome{session?.user?.name?.length ? `, ${session.user.name}.` : ""}
        </Typography>
        <Typography component="p">You can update your account information here.</Typography>
      </Box>
      <AccountForm />
    </Container>
  );
}
