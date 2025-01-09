import * as Sentry from "@sentry/react";

import { Education } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to get all education for a user.
 *
 * @param {string} userId the user ID to get the education for.
 * @returns {Education[]} all education for the user.
 */
export const getEducation = async (userId: string | undefined) => {
  if (!userId) return;

  const client = getApolloClient();

  const { data } = await client
    .query<{ education: Education[] }>({
      query: gql`
        query getEducation($userId: ID!) {
          education(userId: $userId, sort: [{ field: "dateAwarded", direction: DESC }]) {
            id
            school
            degree
            dateAwarded
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

      return { data: { education: [] } };
    });

  return data.education;
};
