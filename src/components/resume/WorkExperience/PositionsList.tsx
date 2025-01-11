"use client";

import { PositionSingle } from "./PositionSingle";
import { PositionWithProjectsGraphql } from "@/graphql/getPositions";

export const PositionsList = ({ positions }: { positions: PositionWithProjectsGraphql[] }) => {
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
