import { gql } from "@apollo/client";
import { Skill, SkillForUser } from "@prisma/client";

export const GET_SKILLS = gql`
  query getSkills($userId: ID!) {
    skills(userId: $userId) {
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
