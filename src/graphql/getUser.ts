import { gql } from "@apollo/client";

export const GET_USER = gql`
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
`;
