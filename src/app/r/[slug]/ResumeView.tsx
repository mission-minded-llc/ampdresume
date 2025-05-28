"use client";

import { Company, Education, SkillForUser, ThemeDefault } from "@ampdresume/theme";
import { Social, User } from "@ampdresume/theme";

import { ThemeAppearanceContext } from "@/app/components/ThemeContext";
import { useContext } from "react";

export const ResumeView = ({
  user,
  socials,
  skillsForUser,
  companies,
  education,
}: {
  user: User;
  socials: Social[];
  skillsForUser: SkillForUser[];
  companies: Company[];
  education: Education[];
}) => {
  const { themeAppearance } = useContext(ThemeAppearanceContext);

  return (
    <ThemeDefault
      themeAppearance={themeAppearance}
      user={user}
      socials={socials}
      skillsForUser={skillsForUser}
      companies={companies}
      education={education}
    />
  );
};
