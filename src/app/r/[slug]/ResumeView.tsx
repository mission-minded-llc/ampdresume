"use client";

import { Social, User } from "@prisma/client";

import { CompanyWithPositionsWithProjectsWithSkills } from "@/graphql/getCompanies";
import { Education } from "@/graphql/getEducation";
import { SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { ThemeDefault } from "openresume-theme";

export const ResumeView = ({
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUserWithSkill[];
  companies: CompanyWithPositionsWithProjectsWithSkills[];
  education: Education[];
}) => {
  return (
    <ThemeDefault
      user={user}
      socials={socials}
      skillsForUser={skillsForUser}
      companies={companies}
      education={education}
    />
  );
};
