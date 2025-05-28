import { Position } from "@ampdresume/theme";

export type PositionGeneric = Omit<Position, "id" | "companyId">;
