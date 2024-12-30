import { gql } from "@apollo/client";

export const types = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    displayEmail: String
    location: String
    title: String
    siteTitle: String
    siteImage: String
  }

  type SkillsForUser {
    skillsForUser: [SkillForUser!]
  }

  type SkillForUser {
    id: ID!
    userId: ID!
    skill: Skill!
    icon: String
    description: String
    yearStarted: Int
    totalYears: Int
  }

  type Skill {
    id: ID!
    name: String!
    icon: String
  }

  type Company {
    id: ID!
    name: String!
    location: String
    startDate: String
    endDate: String
  }

  type Position {
    id: ID!
    title: String!
    startDate: String
    endDate: String
    company: Company!
    projects: [Project!]!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    skillsForProject: [SkillForProject!]!
  }

  type SkillForProject {
    id: ID!
    skillForUser: SkillForUser!
    description: String
  }

  type Education {
    id: ID!
    school: String!
    degree: String
    dateAwarded: String
  }

  input SortInput {
    field: String!
    direction: SortDirection!
  }

  enum SortDirection {
    ASC
    DESC
  }
`;
