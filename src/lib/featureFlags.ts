import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type FeatureFlagName = "ai_assist" | "onboarding_pending";

/**
 * Check if a feature flag is enabled for the current user.
 *
 * @param {FeatureFlagName} flagName
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledForUser(flagName: FeatureFlagName) {
  const session = await getSession();

  if (!session?.user?.id) return false;

  return isFeatureEnabledForUserId(session.user.id, flagName);
}

/**
 * Check if a feature flag is enabled for a specific user id.
 *
 * @param {string} userId
 * @param {FeatureFlagName} flagName
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledForUserId(userId: string, flagName: FeatureFlagName) {
  const row = await prisma.feature.findUnique({
    where: {
      userId_name: {
        userId,
        name: flagName,
      },
    },
  });

  return row?.enabled === true;
}

/**
 * Create or update a feature flag for a user. Uses the session user when
 * `userId` is omitted.
 *
 * @param {FeatureFlagName} flagName
 * @param {boolean} enabled
 * @param {string} [userId]
 * @returns {Promise<boolean>} true when the row was written
 */
export async function setFeatureEnabledForUser(
  flagName: FeatureFlagName,
  enabled: boolean,
  userId?: string,
) {
  const id = userId ?? (await getSession())?.user?.id;

  if (!id) return false;

  await prisma.feature.upsert({
    where: {
      userId_name: {
        userId: id,
        name: flagName,
      },
    },
    create: {
      userId: id,
      name: flagName,
      enabled,
    },
    update: {
      enabled,
    },
  });

  return true;
}
