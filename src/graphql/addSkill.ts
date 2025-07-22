import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

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
    .mutate({
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
    .catch((error) => {
      Sentry.captureException(error);
      return { data: null };
    });

  if (!data?.addSkill) throw new Error("Failed to add skill");
  return data.addSkill;
};
