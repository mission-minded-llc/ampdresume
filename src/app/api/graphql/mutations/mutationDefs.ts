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

    # Company specific mutations.
    addCompany(
      userId: ID!
      name: String!
      location: String
      startDate: String!
      endDate: String
    ): Company!
    updateCompany(
      id: ID!
      userId: ID!
      name: String!
      location: String
      startDate: String!
      endDate: String
    ): Company!
    deleteCompany(userId: ID!, id: ID!): Company

    # Position specific mutations.
    addPosition(
      userId: ID!
      companyId: ID!
      title: String!
      startDate: String!
      endDate: String
    ): Position!
    updatePosition(
      id: ID!
      userId: ID!
      companyId: ID!
      title: String!
      startDate: String!
      endDate: String
    ): Position!
    deletePosition(userId: ID!, id: ID!): Position

    # Project specific mutations.
    addProject(userId: ID!, positionId: ID!, name: String!): Project!
    updateProjectSortIndexes(
      userId: ID!
      positionId: ID!
      projectSortIndexes: [ProjectSortIndexInput!]!
    ): [Project!]!
  }

  input ProjectSortIndexInput {
    id: ID!
    sortIndex: Int!
  }
`;
