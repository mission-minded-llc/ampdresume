import { gql } from "@apollo/client";

export const queryDefs = gql`
  type Query {
    # General queries.
    skills: [Skill!]!

    # User-specific queries.
    user(slug: String!): User
    socials(userId: ID!): [Social!]!
    skillsForUser(userId: ID!): [SkillForUser!]!
    experience(userId: ID!, sort: [SortInput!]): [Company!]!
    positions(companyIds: [ID!], sort: [SortInput!]): [Position!]!
    education(userId: ID!, sort: [SortInput!]): [Education!]!

    # Project-specific queries.
    skillsForProject(projectId: ID!): [SkillForProject!]!

    # Full resume query.
    resume(slug: String!): Resume

    # AI queries.
    companiesAi(userId: ID!, jobDescription: String!): [Company!]!
  }
`;
