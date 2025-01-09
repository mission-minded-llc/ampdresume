import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
}
