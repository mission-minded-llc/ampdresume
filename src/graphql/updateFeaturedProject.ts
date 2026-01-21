import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const updateFeaturedProject = async ({
  id,
  userId,
  name,
  description,
  links,
}: {
  id: string;
  userId: string;
  name: string;
  description?: string | null;
  links: Array<{ label: string; url: string }>;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation updateFeaturedProject(
          $id: ID!
          $userId: ID!
          $name: String!
          $description: String
          $links: [FeaturedProjectLinkInput!]!
        ) {
          updateFeaturedProject(
            id: $id
            userId: $userId
            name: $name
            description: $description
            links: $links
          ) {
            id
          }
        }
      `,
      variables: {
        id,
        userId,
        name,
        description,
        links,
      },
    })
    .catch((error: unknown) => {
      Sentry.captureException(error);
    });
};
