import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { publicResumeDataCacheTag } from "@/lib/publicResumeDataCacheTag";

let apolloClient: ApolloClient | null = null;

/** Tags resume-by-slug GraphQL fetches for Next.js Data Cache so `revalidateTag` can purge them. */
const resumeSlugFetchTagLink = new ApolloLink((operation, forward) => {
  if (typeof window === "undefined") {
    const slug = operation.variables?.slug;
    if (typeof slug === "string" && slug.length > 0) {
      const prev = operation.getContext();
      const tag = publicResumeDataCacheTag(slug);
      operation.setContext({
        ...prev,
        fetchOptions: {
          ...prev.fetchOptions,
          next: {
            ...prev.fetchOptions?.next,
            tags: [...(prev.fetchOptions?.next?.tags ?? []), tag],
          },
        },
      });
    }
  }
  return forward(operation);
});

/**
 * Server-side rendering happens inside the same container that serves
 * `/api/graphql`, so when `INTERNAL_GRAPHQL_ENDPOINT` is set those queries stay on
 * the loopback interface instead of leaving the network and coming back in
 * through the public domain. The browser always uses the public endpoint.
 */
function getGraphQLEndpoint() {
  if (typeof window === "undefined" && process.env.INTERNAL_GRAPHQL_ENDPOINT) {
    return process.env.INTERNAL_GRAPHQL_ENDPOINT;
  }

  return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
}

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: ApolloLink.from([
        resumeSlugFetchTagLink,
        new HttpLink({
          uri: getGraphQLEndpoint(),
        }),
      ]),
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
}
