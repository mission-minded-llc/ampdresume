import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mutationDefs } from "./mutations/mutationDefs";
import { mutationResolvers } from "./mutations/mutationResolvers";
import { queryDefs } from "./queryDefs";
import { queryResolvers } from "./queryResolvers";
import { types } from "./types";

/**
 * Before data can be queried or mutated, we need to define the schema.
 * This is done by combining the types, queries, and mutations into a single schema.
 * The types represent the data structure, the queries represent the data retrieval,
 * and the mutations represent the data manipulation/updates.
 */
const typeDefs = gql`
  ${types}
  ${queryDefs}
  ${mutationDefs}
`;

/**
 * The resolvers handle the actual data retrieval and manipulation.
 */
const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
