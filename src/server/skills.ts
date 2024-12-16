import { GET_SKILLS_FOR_USER, SkillForUserWithSkill } from "@/graphql/getSkillsForUser";

import { ADD_SKILL_FOR_USER } from "@/graphql/addSkillForUser";
import { GET_SKILLS } from "@/graphql/getSkills";
import { Skill } from "@prisma/client";
import { UPDATE_SKILL_FOR_USER } from "@/graphql/updateSkillForUser";
import { getApolloClient } from "@/lib/apolloClient";

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

  const { data: skillsForUser } = await client.query<{ skillsForUser: SkillForUserWithSkill[] }>({
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
  yearStarted,
  totalYears,
}: {
  userId: string;
  skillId: string;
  yearStarted: number;
  totalYears: number;
}) => {
  const client = getApolloClient();

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

/**
 * Used to update a skill for a user.
 *
 * @param id - the skill ID to update.
 * @param userId - the user ID to update the skill for.
 * @param skillId - the skill ID to update.
 * @param yearValue - the year value to update.
 */
export const updateSkillForUser = async ({
  id,
  userId,
  yearStarted,
  totalYears,
  description,
}: {
  id: string;
  userId: string;
  yearStarted: number;
  totalYears: number;
  description: string;
}) => {
  const client = getApolloClient();

  await client.mutate({
    mutation: UPDATE_SKILL_FOR_USER,
    variables: {
      id,
      userId,
      yearStarted,
      totalYears,
      description,
    },
  });
};
