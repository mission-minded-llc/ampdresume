import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const deleteSkillForFeaturedProject = async ({
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
        mutation deleteSkillForFeaturedProject($id: ID!, $userId: ID!) {
          deleteSkillForFeaturedProject(id: $id, userId: $userId) {
            id
          }
        }
      `,
      variables: {
        userId,
        id,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
