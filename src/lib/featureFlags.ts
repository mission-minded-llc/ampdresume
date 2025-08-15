import { getSession } from "@/lib/auth";

type FeatureFlagName = "ai_assist";

const featurePerUser = {
  ai_assist: [
    "missionmiked@gmail.com",
    "md@missionmike.dev",
    "test@ampdresume.com",
  ],
};

/**
 * Check if a feature flag is enabled for the current user.
 *
 * @param {FeatureFlagName} flagName
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledForUser(flagName: FeatureFlagName) {
  const session = await getSession();

  if (!session?.user?.email) return false;

  return featurePerUser[flagName].includes(session.user.email);
}
