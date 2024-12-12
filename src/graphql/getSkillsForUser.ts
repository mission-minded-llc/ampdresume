import { gql } from "@apollo/client";
import { Skill, SkillForUser } from "@prisma/client";

export const GET_SKILLS_FOR_USER = gql`
  query getSkillsForUser($userId: ID!) {
    skillsForUser(userId: $userId) {
      id
      skill {
        id
        name
        icon
      }
      icon
      description
      yearStarted
      totalYears
    }
  }
`;

export interface SkillForUserWithSkill extends SkillForUser {
  skill: Skill;
}
