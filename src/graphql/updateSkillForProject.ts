import * as Sentry from "@sentry/react";

import { getApolloClient, resetApolloClient } from "@/lib/apolloClient";

import { gql } from "@apollo/client";

export const updateSkillForProject = async ({
  id,
  userId,
  description,
}: {
  id: string;
  userId: string;
  description: string | null;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateSkillForProject($id: ID!, $userId: ID!, $description: String) {
          updateSkillForProject(id: $id, userId: $userId, description: $description) {
            id
          }
        }
      `,
      variables: {
        id,
        userId,
        description,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    })
    .finally(() => {
      resetApolloClient();
    });
};
