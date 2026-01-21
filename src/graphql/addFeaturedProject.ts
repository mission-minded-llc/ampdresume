import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { getApolloClient } from "@/lib/apolloClient";

export const addFeaturedProject = async ({
  userId,
  name,
  description,
  links,
}: {
  userId: string;
  name: string;
  description?: string | null;
  links: Array<{ label: string; url: string }>;
}): Promise<void> => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addFeaturedProject(
          $userId: ID!
          $name: String!
          $description: String
          $links: [FeaturedProjectLinkInput!]!
        ) {
          addFeaturedProject(
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
