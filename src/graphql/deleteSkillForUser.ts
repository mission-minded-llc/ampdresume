import { gql } from "@apollo/client";

export const DELETE_SKILL_FOR_USER = gql`
  mutation updateSkillForUser($id: ID!, $userId: ID!) {
    deleteSkillForUser(id: $id, userId: $userId) {
      id
    }
  }
`;
