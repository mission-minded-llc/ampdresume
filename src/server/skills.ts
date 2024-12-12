import { GET_SKILLS_FOR_USER, SkillForUserWithSkill } from "@/graphql/getSkillsForUser";
import { getApolloClient } from "@/lib/apolloClient";

export const getSkillsForUser = async ({ userId }: { userId: string | undefined }) => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client.query<{ skills: SkillForUserWithSkill[] }>({
    query: GET_SKILLS_FOR_USER,
    variables: {
      userId,
    },
  });

  return data;
};
