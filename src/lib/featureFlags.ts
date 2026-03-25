import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type FeatureFlagName = "ai_assist";

/**
 * Check if a feature flag is enabled for the current user.
 *
 * @param {FeatureFlagName} flagName
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledForUser(flagName: FeatureFlagName) {
  const session = await getSession();

  if (!session?.user?.id) return false;

  const row = await prisma.feature.findUnique({
    where: {
      userId_name: {
        userId: session.user.id,
        name: flagName,
      },
    },
  });

  return row?.enabled === true;
}
