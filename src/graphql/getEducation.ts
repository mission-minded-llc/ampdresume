import { gql } from "@apollo/client";

export const GET_EDUCATION = gql`
  query getEducation($userId: ID!) {
    education(userId: $userId, sort: [{ field: "dateAwarded", direction: DESC }]) {
      id
      school
      degree
      dateAwarded
    }
  }
`;
