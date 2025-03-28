import flagsmith from "flagsmith/isomorphic";

export const initFlagsmith = () => {
  return flagsmith.init({
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID || "",
    // Optional configuration
    cacheFlags: true,
    enableAnalytics: true,
  });
};
