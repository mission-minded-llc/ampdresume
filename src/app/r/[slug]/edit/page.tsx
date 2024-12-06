"use client";

import { Box, Container } from "@mui/material";

const EditPage = () => {
  const sections = [
    {
      title: "Skills",
    },
    {
      title: "Work Experience",
    },
    {
      title: "Education",
    },
  ];

  return (
    <Container
      sx={{
        display: "grid",
        height: "100%",
        gridTemplateColumns: "200px 1fr",
      }}
    >
      <Box
        sx={{
          borderRight: "1px solid #aaa",
        }}
      >
        {sections.map((section) => (
          <Box key={section.title}>{section.title}</Box>
        ))}
      </Box>
      <Box>Content</Box>
    </Container>
  );
};

export default EditPage;
