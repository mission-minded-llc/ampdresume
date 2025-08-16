import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateProject = async ({
  id,
  userId,
  projectName,
  description,
}: {
  id: string;
  userId: string;
  projectName: string;
  description: string;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateProject(
          $id: ID!
          $userId: ID!
          $projectName: String!
          $description: String!
        ) {
          updateProject(
            id: $id
            userId: $userId
            projectName: $projectName
            description: $description
          ) {
            id
          }
        }
      `,
      variables: {
        id,
        userId,
        projectName,
        description,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
