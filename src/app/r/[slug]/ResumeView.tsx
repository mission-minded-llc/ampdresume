"use client";

import { Social, User } from "@prisma/client";

import { Company } from "@/graphql/getCompanies";
import { Education } from "@/graphql/getEducation";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { ThemeDefault } from "./theme";

export const ResumeView = ({
  user,
  socials,
  skillsForUser,
  companies,
  positionsWithSkillsForProjects,
  education,
}: {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUserWithSkill[];
  companies: Company[];
  positionsWithSkillsForProjects: PositionWithSkillsForProjects[];
  education: Education[];
}) => {
  return (
    <ThemeDefault
      user={user}
      socials={socials}
      skillsForUser={skillsForUser}
      companies={companies}
      positionsWithSkillsForProjects={positionsWithSkillsForProjects}
      education={education}
    />
  );
};
