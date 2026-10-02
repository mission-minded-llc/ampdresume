import { Education } from "@/types";

export type EducationBySchool = {
  school: string;
  degrees: Education[];
};

/**
 * Groups degrees under the school that awarded them, in the order schools first appear.
 *
 * @param education Degree records from the resume.
 * @returns One entry per school, with that school's degrees in their original order.
 */
export const groupEducationBySchool = (education: Education[]): EducationBySchool[] => {
  const grouped = new Map<string, Education[]>();

  education.forEach((edu) => {
    if (!edu?.school) return;

    const degrees = grouped.get(edu.school);
    if (degrees) {
      degrees.push(edu);
      return;
    }

    grouped.set(edu.school, [edu]);
  });

  return Array.from(grouped, ([school, degrees]) => ({ school, degrees }));
};
