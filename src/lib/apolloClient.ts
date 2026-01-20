import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let apolloClient: ApolloClient | null = null;

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      }),
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
}
