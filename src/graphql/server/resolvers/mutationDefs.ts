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
    addSocial(userId: ID!, platform: String!, ref: String!): Social!
    updateSocial(userId: ID!, id: ID!, ref: String!): Social!
    deleteSocial(userId: ID!, id: ID!): Social

    # Save all extracted resume data at once
    saveExtractedResumeData(
      userId: ID!
      user: UserInput!
      skills: [String!]!
      companies: [CompanyInput!]!
      education: [EducationInput!]!
    ): Boolean!

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
    updateProject(userId: ID!, id: ID!, projectName: String!, description: String): Project!
    deleteProject(userId: ID!, id: ID!): Project!
    updateProjectSortIndexes(
      userId: ID!
      positionId: ID!
      projectSortIndexes: [ProjectSortIndexInput!]!
    ): Boolean!
    addSkillForProject(userId: ID!, projectId: ID!, skillForUserId: ID!): SkillForProject!
    updateSkillForProject(userId: ID!, id: ID!, description: String): SkillForProject!
    deleteSkillForProject(userId: ID!, id: ID!): SkillForProject!

    # Education specific mutations.
    addEducation(userId: ID!, school: String!, degree: String!, dateAwarded: String!): Education!
    updateEducation(
      id: ID!
      userId: ID!
      school: String!
      degree: String!
      dateAwarded: String!
    ): Education!
    deleteEducation(userId: ID!, id: ID!): Education!
  }

  input ProjectSortIndexInput {
    id: ID!
    sortIndex: Int!
  }
`;
