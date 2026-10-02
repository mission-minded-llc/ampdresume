import { Box } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { ResumeTitle } from "@/theme/components/ResumeTitle/ResumeTitle";
import { Education as EducationType } from "@/types";
import { groupEducationBySchool } from "../groupEducation";
import { DocketLine } from "./DocketLine";

/**
 * Education set as a credential docket: the school on the left, the award date on the right.
 *
 * @param education Degree records from the resume.
 * @returns The education section, or nothing when no school is present.
 */
export const Education = ({ education }: { education: EducationType[] }) => {
  const groups = groupEducationBySchool(education);
  if (groups.length === 0) return null;

  return (
    <Box component="section">
      <ResumeTitle>Education</ResumeTitle>
      {groups.map(({ school, degrees }) => (
        <Box key={school} sx={{ mt: 2 }}>
          <DocketLine primary={school} emphasize />
          {degrees.map((edu) => (
            <DocketLine
              key={edu.id}
              primary={edu.degree}
              trailing={formatLongDate(edu.dateAwarded)}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};
