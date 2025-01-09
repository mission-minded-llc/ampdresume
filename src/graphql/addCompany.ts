import * as Sentry from "@sentry/react";

import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to add a company for a user.
 *
 * @param userId - the user ID to add the skill to.
 * @param companyName - the name of the company.
 * @param location - the location of the company.
 * @param startDate - the date the user started at the company.
 * @param endDate - the date the user ended at the company.
 */
export const addCompany = async ({
  userId,
  companyName,
  location,
  startDate,
  endDate,
}: {
  userId: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
}) => {
  const client = getApolloClient();

  await client
    .mutate({
      mutation: gql`
        mutation addCompany(
          $userId: ID!
          $name: String!
          $location: String
          $startDate: String!
          $endDate: String
        ) {
          addCompany(
            userId: $userId
            name: $name
            location: $location
            startDate: $startDate
            endDate: $endDate
          ) {
            id
          }
        }
      `,
      variables: {
        userId,
        name: companyName,
        location,
        startDate,
        endDate,
      },
    })
    .catch((error) => {
      Sentry.captureException(error);
    });
};
