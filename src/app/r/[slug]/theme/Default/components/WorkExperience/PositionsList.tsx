"use client";

import { PositionSingle } from "./PositionSingle";
import { PositionWithSkillsForProjects } from "@/graphql/getPositionsWithSkillsForProjects";

export const PositionsList = ({ positions }: { positions: PositionWithSkillsForProjects[] }) => {
  return (
    <div>
      {positions.map((position) => (
        <PositionSingle
          key={`position-single-${position.id}`}
          position={position}
          showDates={positions.length > 1}
        />
      ))}
    </div>
  );
};
