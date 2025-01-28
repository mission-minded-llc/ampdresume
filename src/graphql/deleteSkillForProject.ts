import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const deleteSkillForProject = async ({
  userId,
  id,
}: {
  userId: string;
  id: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation deleteSkillForProject($id: ID!, $userId: ID!) {
          deleteSkillForProject(id: $id, userId: $userId) {
            id
          }
        }
      `,
      variables: {
        userId,
        id,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
      client.stop();
    })
    .finally(() => {
      client.stop();
    });
};
