import { Box, Container, Typography } from "@mui/material";
import { AccountForm } from "./AccountForm";

const Page = async () => (
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
      <Typography component="p">Update your account information here.</Typography>
    </Box>
    <AccountForm />
  </Container>
);

export default Page;
