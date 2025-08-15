import { Box, Typography } from "@mui/material";

export const InputSection = ({ children }: { children: React.ReactNode[] }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      height: "100%",
    }}
  >
    {children}
  </Box>
);

export const GridSection = ({
  children,
  isDesktop,
}: {
  children: React.ReactNode;
  isDesktop: boolean;
}) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
      gap: isDesktop ? 4 : 2,
      mb: 4,
    }}
  >
    {children}
  </Box>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="h5"
    component="h2"
    color="textPrimary"
    sx={{
      gridColumn: "1 / -1",
      borderTop: "1px solid",
      paddingTop: 2,
      marginTop: 2,
    }}
  >
    {children}
  </Typography>
);

export const FieldTitle = ({
  children,
  component = "p",
}: {
  children: React.ReactNode;
  component?: "p" | "span";
}) => (
  <Typography
    variant="h6"
    component={component}
    color="textPrimary"
    sx={{
      display: "flex",
      alignItems: "center",
      gap: "0.5em",
    }}
  >
    {children}
  </Typography>
);

export const FieldDescription = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="body2" color="textSecondary">
    {children}
  </Typography>
);
