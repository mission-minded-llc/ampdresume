import { User } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

export const getUser = async (slug: string) => {
  const client = getApolloClient();

  const {
    data: { user },
  } = await client.query<{ user: User }>({
    query: gql`
      query getUser($slug: String!) {
        user(slug: $slug) {
          id
          name
          email
          displayEmail
          location
          title
          siteImage
          siteTitle
        }
      }
    `,
    variables: { slug },
  });

  return user;
};
