import { ADD_SKILL_FOR_USER } from "@/graphql/addSkillForUser";
import { GET_SKILLS } from "@/graphql/getSkills";
import { GET_SKILLS_FOR_USER, SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { getApolloClient } from "@/lib/apolloClient";
import { Skill } from "@prisma/client";

/**
 * Used to fetch all skills as part of a search/selector.
 *
 * @returns all available skills.
 */
export const getSkills = async () => {
  const client = getApolloClient();

  const { data: skills } = await client.query<{ skills: Skill[] }>({
    query: GET_SKILLS,
  });

  return skills;
};

/**
 * Used to fetch all skills for a specific user.
 *
 * @param userId - the user ID to fetch skills for.
 * @returns all skills for the user, including the parent skill.
 */
export const getSkillsForUser = async ({ userId }: { userId: string | undefined }) => {
  if (!userId) return;

  const client = getApolloClient();

  const { data: skillsForUser } = await client.query<{ skills: SkillForUserWithSkill[] }>({
    query: GET_SKILLS_FOR_USER,
    variables: {
      userId,
    },
  });

  return skillsForUser;
};

/**
 * Used to add a skill to a user.
 *
 * @param userId - the user ID to add the skill to.
 * @param skillId - the skill ID to add to the user.
 */
export const addSkillForUser = async ({
  userId,
  skillId,
  yearValue,
}: {
  userId: string;
  skillId: string;
  yearValue: number;
}) => {
  const client = getApolloClient();

  const yearStarted = yearValue > 100 ? yearValue : null;
  const totalYears = yearValue > 100 ? null : yearValue;

  await client.mutate({
    mutation: ADD_SKILL_FOR_USER,
    variables: {
      userId,
      skillId,
      yearStarted,
      totalYears,
    },
  });
};
