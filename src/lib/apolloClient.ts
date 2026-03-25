import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { publicResumeDataCacheTag } from "@/lib/publicResumeDataCacheTag";

let apolloClient: ApolloClient | null = null;

/** Tags resume-by-slug GraphQL fetches for Next.js Data Cache so `revalidateTag` can purge them on Vercel. */
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

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: ApolloLink.from([
        resumeSlugFetchTagLink,
        new HttpLink({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        }),
      ]),
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
}
