import { Position } from "@openresume/theme";

export type PositionGeneric = Omit<Position, "id" | "companyId">;
