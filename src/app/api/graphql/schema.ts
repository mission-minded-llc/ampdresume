import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import gql from "graphql-tag";

const prisma = new PrismaClient();

// Define type definitions
const typeDefs = gql`
  type Query {
    user(slug: String!): User!
    skillsForUser(userId: ID!): [SkillForUser!]!
    companies(userId: ID!, sort: [SortInput!]): [Company!]!
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

  input SortInput {
    field: String!
    direction: SortDirection!
  }

  enum SortDirection {
    ASC
    DESC
  }
`;

// Define resolvers
const resolvers = {
  Query: {
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
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
