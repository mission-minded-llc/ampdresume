import { Box } from "@mui/material";
import { EditEducation } from "./sections/education/EditEducation";
import { EditExperience } from "./sections/experience/EditExperience";
import { EditPageContext } from "./EditContext";
import { EditSkills } from "./sections/skills/EditSkills";
import { useContext } from "react";

export const EditSection = () => {
  const { activeSection } = useContext(EditPageContext);

  return (
    <Box>
      {{
        Skills: <EditSkills />,
        "Professional Experience": <EditExperience />,
        Education: <EditEducation />,
      }[activeSection] || <div>Not found</div>}
    </Box>
  );
};
