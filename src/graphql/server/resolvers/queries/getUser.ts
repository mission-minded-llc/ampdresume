import { filterUserData } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { GraphQLContext } from "@/types/graphql";

export const getUser = async (_: string, { slug }: { slug: string }, context: GraphQLContext) => {
  const user = await prisma.user.findUnique({
    where: { slug },
  });

  return filterUserData(user, context);
};
