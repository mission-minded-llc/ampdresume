import { Box } from "@mui/material";
import { EditPageContext } from "./EditContext";
import { EditSkills } from "./sections/skills/EditSkills";
import { useContext } from "react";

export const EditSection = () => {
  const { activeSection } = useContext(EditPageContext);

  return (
    <Box>
      {{
        Skills: <EditSkills />,
        "Work Experience": <div>Work Experience</div>,
        Education: <div>Education</div>,
      }[activeSection] || <div>Not found</div>}
    </Box>
  );
};
