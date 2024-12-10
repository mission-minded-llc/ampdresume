import { ApolloClient, InMemoryCache } from "@apollo/client";

export function getApolloClient() {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });
}
