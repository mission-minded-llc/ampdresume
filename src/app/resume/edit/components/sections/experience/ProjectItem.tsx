import { Box } from "@mui/material";
import { Project } from "@prisma/client";

export const ProjectItem = ({ project }: { project: Project }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        textAlign: "left",
        display: "grid",
        gridTemplateColumns: "50% 1fr",
        alignItems: "center",
        gap: "20px",
        padding: "10px 40px 10px 20px",
        "@media screen and (max-width: 600px)": {
          gridTemplateColumns: "1fr",
          gap: "10px",
          padding: "10px",
        },
      }}
    >
      <Box>{project.name}</Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "4px",
          "@media screen and (max-width: 600px)": {
            paddingBottom: "16px",
            borderBottom: "1px solid lightgray",
          },
        }}
      >
        Project Skills
      </Box>
    </Box>
  );
};
