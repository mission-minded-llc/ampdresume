import { Session } from "next-auth";

export interface GraphQLContext {
  session: Session | null;
  isAuthenticated: boolean;
  userId: string | undefined;
}
