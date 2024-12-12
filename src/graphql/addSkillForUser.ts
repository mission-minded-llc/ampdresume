import { gql } from "@apollo/client";

export const ADD_SKILL_FOR_USER = gql`
  mutation addSkillForUser($userId: ID!, $skillId: ID!, $yearStarted: Int, $totalYears: Int) {
    addSkillForUser(
      userId: $userId
      skillId: $skillId
      yearStarted: $yearStarted
      totalYears: $totalYears
    ) {
      id
    }
  }
`;
