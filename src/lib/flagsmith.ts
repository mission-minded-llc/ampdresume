import { HasFeatureOptions } from "flagsmith";
import flagsmith from "flagsmith/isomorphic";
import { getSession } from "@/lib/auth";

/**
 * Check if a feature flag is enabled, and return its associated
 * value.
 *
 * @param {string} flagName
 * @param {HasFeatureOptions} options
 * @returns {Promise<{ enabled: boolean, value: string }>}
 */
export async function checkFeatureFlag(flagName: string, options?: HasFeatureOptions) {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID || "",
  });

  const value = flagsmith.getValue(flagName);
  const enabled = flagsmith.hasFeature(flagName, options);

  return { enabled, value };
}

/**
 * Check if a feature flag is enabled for the current user.
 *
 * @param {string} flagName
 * @returns {Promise<boolean>}
 */
export async function isFeatureEnabledForUser(flagName: string) {
  const { enabled, value: emailListJson } = await checkFeatureFlag(flagName);

  if (!enabled) return false;

  const emailList = JSON.parse(emailListJson as string);

  if (!Array.isArray(emailList)) return false;

  const session = await getSession();

  if (!emailList.includes(session?.user?.email)) return false;

  return true;
}
