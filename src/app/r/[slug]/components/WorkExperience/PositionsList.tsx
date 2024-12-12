"use client";

import { PositionWithProjects } from "@/graphql/getPositions";
import { PositionSingle } from "./PositionSingle";

export const PositionsList = ({ positions }: { positions: PositionWithProjects[] }) => {
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
