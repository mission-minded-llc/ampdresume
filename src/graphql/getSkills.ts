import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
  query getSkills {
    skills {
      id
      name
      icon
    }
  }
`;
