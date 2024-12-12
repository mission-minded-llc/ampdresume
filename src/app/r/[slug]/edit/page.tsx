"use client";

import { Container } from "@mui/material";
import { SidebarLeft } from "./components/SidebarLeft";
import { EditSection } from "./components/EditSection";
import { EditPageProvider } from "./components/EditContext";

const EditPage = () => {
  const sidebarWidth = 200;

  return (
    <EditPageProvider>
      <Container
        sx={{
          display: "grid",
          height: "100%",
          gridTemplateColumns: `${sidebarWidth}px 1fr`,
        }}
      >
        <SidebarLeft width={sidebarWidth} />
        <EditSection />
      </Container>
    </EditPageProvider>
  );
};

export default EditPage;
