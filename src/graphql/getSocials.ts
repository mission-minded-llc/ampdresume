import { Social } from "@ampdresume/theme";
import { gql } from "@apollo/client";
import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";


export const getSocials = async (userId: string | undefined): Promise<Social[] | undefined> => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ socials: Social[] }>({
      query: gql`
        query getSocials($userId: ID!) {
          socials(userId: $userId) {
            id
            platform
            ref
          }
        }
      `,
      variables: {
        userId,
      },
      fetchPolicy: "no-cache",
    })
    .catch((error) => {
      Sentry.captureException(error);
      return { data: { socials: [] } };
    });

  return data.socials;
};
