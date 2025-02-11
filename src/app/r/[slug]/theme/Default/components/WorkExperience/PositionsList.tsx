"use client";

import { CompanyWithPositionsWithProjectsWithSkills } from "@/graphql/getCompanies";
import { PositionSingle } from "./PositionSingle";

export const PositionsList = ({
  company,
}: {
  company: CompanyWithPositionsWithProjectsWithSkills;
}) =>
  company?.positions?.map((position) => (
    <PositionSingle
      key={`position-single-${position.id}`}
      position={position}
      company={company}
      showDates={company?.positions?.length ? company.positions.length > 1 : false}
    />
  ));
