import { gql } from "@apollo/client";

export const types = gql`
  type User {
    id: ID!
    name: String!
    email: String
    displayEmail: String
    location: String
    title: String
    siteTitle: String
    siteDescription: String
    siteImage: String
    webThemeName: String
  }

  type Social {
    id: ID!
    userId: ID!
    platform: String!
    ref: String!
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
    description: String
    location: String
    startDate: String
    endDate: String
    positions: [Position!]!
    positionCount: Int
  }

  type Position {
    id: ID!
    title: String!
    startDate: String
    endDate: String
    company: Company!
    projects: [Project!]!
    projectCount: Int
  }

  type Project {
    id: ID!
    name: String!
    description: String
    skillsForProject: [SkillForProject!]!
    sortIndex: Int
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

  # This is the full resume query. It pieces together all
  # the data needed to render a full resume in either interactive,
  # or PDF form.
  type Resume {
    user: User
    socials: [Social!]!
    skillsForUser: [SkillForUser!]!
    companies: [Company!]!
    education: [Education!]!
  }

  # This type represents the parsed resume data from OpenAI
  type ParsedResume {
    user: User!
    skills: [Skill!]!
    companies: [Company!]!
    education: [Education!]!
  }

  input SortInput {
    field: String!
    direction: SortDirection!
  }

  enum SortDirection {
    ASC
    DESC
  }

  input UserInput {
    name: String!
    displayEmail: String
    location: String
    title: String
  }

  input CompanyInput {
    name: String!
    location: String
    startDate: String!
    endDate: String
    positions: [PositionInput!]!
  }

  input PositionInput {
    title: String!
    startDate: String!
    endDate: String
    projects: [ProjectInput!]!
  }

  input ProjectInput {
    name: String!
    description: String
  }

  input EducationInput {
    school: String!
    degree: String!
    dateAwarded: String!
  }
`;
