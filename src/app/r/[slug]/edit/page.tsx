"use client";

import { Container } from "@mui/material";
import { SidebarLeft } from "./components/SidebarLeft";
import { EditSection } from "./components/EditSection";

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
      <SidebarLeft sections={sections} />
      <EditSection />
    </Container>
  );
};

export default EditPage;
