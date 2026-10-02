import { Box } from "@mui/material";
import { formatLongDate } from "@/lib/format";
import { Education as EducationType } from "@/types";
import { Section, SectionTitle } from "@/theme/default/components/pdf/styled";
import { groupEducationBySchool } from "../../groupEducation";
import { DocketLine } from "./docket";

/**
 * Printed education docket. The school is kept with its first degree so a caption
 * is not stranded at the bottom of a page.
 *
 * @param education Degree records from the resume.
 * @returns The education section, or nothing when no school is present.
 */
export const Education = ({ education }: { education: EducationType[] }) => {
  const groups = groupEducationBySchool(education);
  if (groups.length === 0) return null;

  return (
    <Section>
      <SectionTitle>Education</SectionTitle>
      {groups.map(({ school, degrees }) => (
        <Box key={school} sx={{ mb: 1 }}>
          <Box data-pdf-unit="" data-pdf-keep-with-next="true">
            <DocketLine primary={school} emphasize />
          </Box>
          {degrees.map((edu) => (
            <Box key={edu.id} data-pdf-unit="">
              <DocketLine primary={edu.degree} trailing={formatLongDate(edu.dateAwarded)} />
            </Box>
          ))}
        </Box>
      ))}
    </Section>
  );
};
