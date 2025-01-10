import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { EditPageContext, EditSection } from "./EditContext";
import React, { useContext } from "react";

export const SidebarLeft = ({ width = 240 }) => {
  const { sections, activeSection, setActiveSection } = useContext(EditPageContext);

  const handleSectionClick = (section: EditSection) => {
    setActiveSection(section.title);
  };

  return (
    <Box
      sx={{
        width: width,
        borderRight: "1px solid #e0e0e0",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Edit
      </Typography>

      <List>
        {sections.map((section) => (
          <ListItem
            key={section.title}
            disablePadding
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              backgroundColor:
                activeSection === section.title ? theme.palette.action.hover : "inherit",
            })}
          >
            <ListItemButton
              onClick={() => handleSectionClick(section)}
              sx={{
                py: 1.5,
                px: 2,
              }}
            >
              <ListItemText primary={section.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SidebarLeft;
