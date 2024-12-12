import { Box } from "@mui/material";
import { useContext } from "react";
import { EditPageContext } from "./EditContext";
import { EditSkills } from "./sections/skills/EditSkills";

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
