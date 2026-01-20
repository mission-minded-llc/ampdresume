import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addSkill = async ({
  userId,
  name,
  icon,
}: {
  userId: string;
  name: string;
  icon: string;
}): Promise<{ id: string; name: string; icon: string }> => {
  const client = getApolloClient();

  const { data } = await client
    .mutate<{ addSkill: { id: string; name: string; icon: string } }>({
      mutation: gql`
        mutation addSkill($userId: ID!, $name: String!, $icon: String!) {
          addSkill(userId: $userId, name: $name, icon: $icon) {
            id
            name
            icon
          }
        }
      `,
      variables: {
        userId,
        name,
        icon,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
      return { data: null };
    });

  if (!data?.addSkill) {
    const addSkillError = new Error("Failed to add skill: " + name);

    Sentry.captureException(addSkillError);
    throw addSkillError;
  }

  return data.addSkill;
};
