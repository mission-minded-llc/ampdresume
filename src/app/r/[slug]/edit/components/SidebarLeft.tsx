import { Box } from "@mui/material";

export const SidebarLeft = ({ sections }: { sections: object[] }) => (
  <Box
    sx={{
      borderRight: "1px solid #aaa",
    }}
  >
    {sections.map((section) => (
      <Box key={section.title}>{section.title}</Box>
    ))}
  </Box>
);
