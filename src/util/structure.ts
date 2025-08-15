import { SkillForUser } from "@/types";

export const groupSkillsForUserByYearExperience = (skills: SkillForUser[]) => {
  const skillsByYear: {
    [year: string]: SkillForUser[];
  } = {};

  /**
   * Group the skills data by year. Converts data format from:
   *
   * [
   *   {
   *     _id: 12345,
   *     title: 'Some Skill',
   *     yearStart: '2020-01-01',
   *   },
   *   ...
   * ]
   *
   * to:
   *
   * {
   *   2020: [
   *     {
   *       _id: 12345,
   *       title: 'Some Skill',
   *     },
   *     ...
   *   ],
   *   ...
   * }
   *
   */
  skills.forEach((skill) => {
    // If yearStart isn't defined, use "0" as the object key to indicate
    // that there's no year. We can filter on this value later to conditionally
    // display a label.
    const year = skill?.yearStarted;

    // The totalYears field allows users to override the value of how many years'
    // experience per skill. For example, if it's currently 2024, and the yearStart
    // value is 2014, the auto-calc value is 10 years. But if the user wants to make
    // it clear that they only used this skill for 2 years, for example, they can
    // populate the totalYears value to override it.
    const totalYears = skill?.totalYears
      ? skill.totalYears.toString()
      : year
        ? new Date().getFullYear() - year
        : "1"; // Minimum 1 year.

    const skillWithoutYear = { ...skill };

    skillsByYear[totalYears] = skillsByYear?.[totalYears]
      ? [skillWithoutYear, ...skillsByYear[totalYears]]
      : [skillWithoutYear];
  });

  // Alter the structure of the data so that we can manipulate
  // the order of the render.
  const skillsExperienceList: [string, SkillForUser[]][] = [];

  Object.keys(skillsByYear).map((totalYears) => {
    skillsExperienceList.push([totalYears, skillsByYear[totalYears]]);
  });

  // Reverse the list order so that the oldest skills appear at the top.
  skillsExperienceList.reverse();

  return skillsExperienceList;
};
