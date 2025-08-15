import { Position } from "@/types";

export type PositionGeneric = Omit<Position, "id" | "companyId">;
