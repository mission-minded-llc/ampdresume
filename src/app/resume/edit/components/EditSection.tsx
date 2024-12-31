import { Box } from "@mui/material";
import { EditEducation } from "./sections/education/EditEducation";
import { EditPageContext } from "./EditContext";
import { EditSkills } from "./sections/skills/EditSkills";
import { EditWorkExperience } from "./sections/experience/EditWorkExperience";
import { useContext } from "react";

export const EditSection = () => {
  const { activeSection } = useContext(EditPageContext);

  return (
    <Box>
      {{
        Skills: <EditSkills />,
        "Professional Experience": <EditWorkExperience />,
        Education: <EditEducation />,
      }[activeSection] || <div>Not found</div>}
    </Box>
  );
};
