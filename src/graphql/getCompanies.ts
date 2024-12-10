import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query getCompanies($userId: ID!) {
    companies(userId: $userId, sort: [{ field: "endDate", direction: DESC }]) {
      id
      name
      startDate
      endDate
    }
  }
`;
