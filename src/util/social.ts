import { Social } from "@/types";
import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";

export const getSocialMediaPlatformByHostname = (hostname: string) => {
  for (const [key, value] of Object.entries(SOCIAL_MEDIA_PLATFORMS)) {
    if (key === hostname) {
      return value;
    }
  }

  return SOCIAL_MEDIA_PLATFORMS.website;
};

export const getSocialMediaPlatformByPlatformName = (platform: string) => {
  for (const [, value] of Object.entries(SOCIAL_MEDIA_PLATFORMS)) {
    if (value.name.toLowerCase() === platform.toLowerCase()) {
      return value;
    }
  }

  return SOCIAL_MEDIA_PLATFORMS.website;
};

export const getSocialPlatformHomepage = (platform: string) => {
  if (platform === "website") return "https://www.example.com";

  const urlFormat = getSocialMediaPlatformByPlatformName(platform).urlFormat;
  if (!urlFormat) return "https://www.example.com";

  try {
    return new URL(urlFormat.replace("{username}", "")).origin;
  } catch {
    return "https://www.example.com";
  }
};

export const generateSocialUrl = (social: Social) => {
  if (social.platform === "website") return social.ref;
  if (/^https?:\/\//i.test(social.ref)) return social.ref;

  const socialPlatformdetails = getSocialMediaPlatformByPlatformName(social.platform);
  const socialUrl = socialPlatformdetails.urlFormat?.replace("{username}", social.ref);

  if (!socialUrl) return social.ref;

  return socialUrl;
};

export const getSocialIcon = (social: Social) =>
  getSocialMediaPlatformByPlatformName(social.platform).icon;
