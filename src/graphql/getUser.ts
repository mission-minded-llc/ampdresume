import { User } from "@prisma/client";
import { getApolloClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

/**
 * Used to get a user by their slug.
 *
 * @param {string} slug the user slug to get the user by.
 * @returns {User} the user.
 */
export const getUser = async (slug: string): Promise<User> => {
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
          siteDescription
          webThemeName
        }
      }
    `,
    variables: { slug },
  });

  return user;
};
