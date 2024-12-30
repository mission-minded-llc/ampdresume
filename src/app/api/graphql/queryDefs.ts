import { gql } from "@apollo/client";

export const queryDefs = gql`
  type Query {
    # General queries.
    skills: [Skill!]!

    # User-specific queries.
    user(slug: String!): User!
    skillsForUser(userId: ID!): [SkillForUser!]!
    companies(userId: ID!, sort: [SortInput!]): [Company!]!
    positions(companyIds: [ID!], sort: [SortInput!]): [Position!]!
    education(userId: ID!, sort: [SortInput!]): [Education!]!
  }
`;
