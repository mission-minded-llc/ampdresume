import { gql } from "@apollo/client";

export const mutationDefs = gql`
  type Mutation {
    # User-specific mutations.
    addSkillForUser(userId: ID!, skillId: ID!, yearStarted: Int, totalYears: Int): SkillForUser!
    updateSkillForUser(
      id: ID!
      userId: ID!
      yearStarted: Int
      totalYears: Int
      description: String
      icon: String
    ): SkillForUser!
    deleteSkillForUser(userId: ID!, id: ID!): SkillForUser
  }
`;
