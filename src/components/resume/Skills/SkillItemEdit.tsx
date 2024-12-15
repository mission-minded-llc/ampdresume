import { Box, Button } from "@mui/material";

import { RichTextEditor } from "@/components/resume/RichTextEditor/RichTextEditor";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { SkillType } from "@/graphql/getSkills";
import { useState } from "react";

export const SkillItemEdit = ({
  skill,
  skillType,
}: {
  skill: SkillForUserWithSkill;
  skillType: SkillType;
}) => {
  const [value, setValue] = useState(skill?.description ?? "");

  const handleSave = () => {
    // Save the value to the database
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <RichTextEditor
          name={skillType}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
