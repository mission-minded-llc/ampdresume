import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/server/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const yoga = createYoga<NextRequest>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response: Response }, // Map Yoga's Response to the Next.js Response
  context: async () => {
    const session = await getServerSession(authOptions);
    return {
      session,
      isAuthenticated: Boolean(session?.user?.id),
      userId: session?.user?.id,
    };
  },
  // Add some basic security measures
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.NEXTAUTH_URL || "https://ampdresume.com"]
        : ["http://localhost:3000"],
    credentials: true,
  },
});

export const GET = async (request: NextRequest) => {
  return yoga(request);
};

export const POST = async (request: NextRequest) => {
  return yoga(request);
};
