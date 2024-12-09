import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define type definitions
const typeDefs = `
  type Query {
    users: [User!]!
    skillsForUser(userId: ID!): [SkillForUser!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    displayEmail: String
    location: String
    title: String
  }

  type SkillsForUser {
    skillsForUser: [SkillForUser!]
  }

  type SkillForUser {
    id: ID!
    icon: String
    skill: Skill!
  }

  type Skill {
    id: ID!
    name: String!
    icon: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    skillsForUser: async (_: string, { userId }: { userId: string }) => {
      return await prisma.skillForUser.findMany({
        where: { userId },
        include: { skill: true }, // Include skill details
      });
    },
  },
};

// Create the schema
export const schema = makeExecutableSchema({ typeDefs, resolvers });
