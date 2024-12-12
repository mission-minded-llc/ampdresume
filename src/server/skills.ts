import { GET_SKILLS, SkillForUserWithSkill } from "@/graphql/getSkills";
import { getApolloClient } from "@/lib/apolloClient";

export const getSkills = async ({ userId }: { userId: string | undefined }) => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client.query<{ skills: SkillForUserWithSkill[] }>({
    query: GET_SKILLS,
    variables: {
      userId,
    },
  });

  return data;
};
