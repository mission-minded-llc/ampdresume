import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

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
    });
};
