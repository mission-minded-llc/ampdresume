import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const updateProjectSortIndexes = async ({
  userId,
  positionId,
  projectSortIndexes,
}: {
  userId: string;
  positionId: string;
  projectSortIndexes: { id: string; sortIndex: number }[];
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateProjectSortIndexes(
          $userId: ID!
          $positionId: ID!
          $projectSortIndexes: [ProjectSortIndexInput!]!
        ) {
          updateProjectSortIndexes(
            userId: $userId
            positionId: $positionId
            projectSortIndexes: $projectSortIndexes
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        positionId,
        projectSortIndexes,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
