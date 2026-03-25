/**
 * This is the GraphQL API endpoint for the application.
 * @see https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nextjs
 */
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/server/schema";
import { authOptions } from "@/lib/auth";

function graphqlCorsOrigins(): string[] {
  if (process.env.NODE_ENV !== "production") {
    return ["http://localhost:3000"];
  }
  const origins = new Set<string>();
  const add = (raw: string | undefined) => {
    if (!raw?.trim()) return;
    const u = raw.trim().replace(/\/$/, "");
    if (u.startsWith("http://") || u.startsWith("https://")) {
      origins.add(u);
      return;
    }
    origins.add(`https://${u.replace(/^https?:\/\//, "")}`);
  };
  add(process.env.NEXTAUTH_URL);
  add("https://ampdresume.com");
  add("https://test.ampdresume.com"); // staging (see README)
  // Preview and production deployments (NODE_ENV is "production" on Vercel previews)
  add(process.env.VERCEL_URL);
  add(process.env.VERCEL_BRANCH_URL);
  return [...origins];
}

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

  // Add some basic security measures to prevent CORS issues.
  cors: {
    origin: graphqlCorsOrigins(),
    credentials: true,
  },
});

export const GET = async (request: NextRequest) => {
  return yoga(request);
};

export const POST = async (request: NextRequest) => {
  return yoga(request);
};
