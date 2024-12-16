import { gql } from "@apollo/client";

export const UPDATE_SKILL_FOR_USER = gql`
  mutation updateSkillForUser(
    $id: ID!
    $userId: ID!
    $yearStarted: Int
    $totalYears: Int
    $description: String
  ) {
    updateSkillForUser(
      id: $id
      userId: $userId
      yearStarted: $yearStarted
      totalYears: $totalYears
      description: $description
    ) {
      id
    }
  }
`;
