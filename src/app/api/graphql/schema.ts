import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import gql from "graphql-tag";

const prisma = new PrismaClient();

// Define type definitions
const typeDefs = gql`
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

  type Mutation {
    # User-specific mutations.
    addSkillForUser(userId: ID!, skillId: ID!, yearStarted: Int, totalYears: Int): SkillForUser!
  }

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

const resolvers = {
  Query: {
    // General queries.
    skills: async () => {
      return await prisma.skill.findMany();
    },

    // User-specific queries.
    user: async (_: string, { slug }: { slug: string }) => {
      return await prisma.user.findUnique({
        where: { slug },
      });
    },
    skillsForUser: async (_: string, { userId }: { userId: string }) => {
      return await prisma.skillForUser.findMany({
        where: { userId },
        include: { skill: true }, // Include skill details
      });
    },
    companies: async (
      _: string,
      {
        userId,
        sort,
      }: { userId: string; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
    ) => {
      // Map the sort array into Prisma-compatible orderBy
      const orderBy =
        sort?.map(({ field, direction }) => ({
          [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
        })) || [];

      return await prisma.company.findMany({
        where: { userId },
        orderBy, // Apply sorting
      });
    },
    positions: async (
      _: string,
      {
        companyIds,
        sort,
      }: { companyIds: string[]; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
    ) => {
      // Map the sort array into Prisma-compatible orderBy
      const orderBy =
        sort?.map(({ field, direction }) => ({
          [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
        })) || [];

      return await prisma.position.findMany({
        where: { companyId: { in: companyIds } },
        orderBy, // Apply sorting
        include: {
          company: true, // Include company details
          projects: { include: { skillsForProject: { include: { skillForUser: true } } } },
        }, // Include project and skill details
      });
    },
    education: async (
      _: string,
      {
        userId,
        sort,
      }: { userId: string; sort: Array<{ field: string; direction: "ASC" | "DESC" }> },
    ) => {
      // Map the sort array into Prisma-compatible orderBy
      const orderBy =
        sort?.map(({ field, direction }) => ({
          [field]: direction.toLowerCase(), // Prisma expects lowercase for ASC/DESC
        })) || [];

      return await prisma.education.findMany({
        where: { userId },
        orderBy, // Apply sorting
      });
    },
  },

  // Mutation resolvers.
  Mutation: {
    // User-specific mutations.
    addSkillForUser: async (
      _: string,
      {
        userId,
        skillId,
        yearStarted,
        totalYears,
      }: { userId: string; skillId: string; yearStarted: number; totalYears: number },
    ) => {
      return await prisma.skillForUser.create({
        data: {
          userId,
          skillId,
          yearStarted,
          totalYears,
        },
        include: { skill: true }, // Include skill details
      });
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
