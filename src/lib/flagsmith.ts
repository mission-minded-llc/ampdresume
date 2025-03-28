import { HasFeatureOptions } from "flagsmith";
import flagsmith from "flagsmith/isomorphic";

export async function checkFeatureFlag(flagName: string, options?: HasFeatureOptions) {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_ENVIRONMENT_ID || "",
  });

  return flagsmith.hasFeature(flagName, options);
}
