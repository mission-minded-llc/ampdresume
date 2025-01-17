import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/server/schema";

const yoga = createYoga<NextRequest>({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response: Response }, // Map Yoga's Response to the Next.js Response
});

export const GET = async (request: NextRequest) => {
  return yoga(request);
};

export const POST = async (request: NextRequest) => {
  return yoga(request);
};
