import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";
import { Social } from "openresume-theme";

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

export const generateSocialUrl = (social: Social) => {
  if (social.platform === "website") return social.ref;

  const socialPlatformdetails = getSocialMediaPlatformByPlatformName(social.platform);
  const socialUrl = socialPlatformdetails.urlFormat?.replace("{username}", social.ref);

  if (!socialUrl) return social.ref;

  return socialUrl;
};

export const getSocialIcon = (social: Social) =>
  getSocialMediaPlatformByPlatformName(social.platform).icon;
