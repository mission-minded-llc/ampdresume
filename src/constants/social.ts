export const SOCIAL_MEDIA_PLATFORMS = {
  "x.com": {
    name: "X",
    // regex to extract a username from the url:
    // https://x.com/username
    regex: /(?:https?:\/\/)?(?:www\.)?x\.com\/([^/?#]+)/,
    urlFormat: "https://x.com/{username}",
    icon: "ri:twitter-x-fill",
  },
  "linkedin.com": {
    name: "LinkedIn",
    // regex to extract a username from the url:
    // https://www.linkedin.com/in/username
    regex: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^/?#]+)/,
    urlFormat: "https://www.linkedin.com/in/{username}",
    icon: "devicon:linkedin",
  },
  "github.com": {
    name: "GitHub",
    // regex to extract a username from the url:
    // https://github.com/username
    regex: /(?:https?:\/\/)?(?:www\.)?github\.com\/([^/?#]+)/,
    urlFormat: "https://github.com/{username}",
    icon: "mdi:github",
  },
  "facebook.com": {
    name: "Facebook",
    // regex to extract a username from the url:
    // https://www.facebook.com/username
    regex: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/([^/?#]+)/,
    urlFormat: "https://www.facebook.com/{username}",
    icon: "devicon:facebook",
  },
  "instagram.com": {
    name: "Instagram",
    // regex to extract a username from the url:
    // https://www.instagram.com/username
    regex: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/?#]+)/,
    urlFormat: "https://www.instagram.com/{username}",
    icon: "skill-icons:instagram",
  },
  "youtube.com": {
    name: "YouTube",
    // regex to extract a username from the url:
    // https://www.youtube.com/@username
    regex: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([^/?#]+)/,
    urlFormat: "https://www.youtube.com/@{username}",
    icon: "logos:youtube-icon",
  },
  "tiktok.com": {
    name: "TikTok",
    // regex to extract a username from the url:
    // https://www.tiktok.com/@username
    regex: /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([^/?#]+)/,
    urlFormat: "https://www.tiktok.com/@{username}",
    icon: "logos:tiktok-icon",
  },
  "twitch.tv": {
    name: "Twitch",
    // regex to extract a username from the url:
    // https://www.twitch.tv/username
    regex: /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([^/?#]+)/,
    urlFormat: "https://www.twitch.tv/{username}",
    icon: "logos:twitch",
  },
  "snapchat.com": {
    name: "Snapchat",
    // regex to extract a username from the url:
    // https://www.snapchat.com/add/username
    regex: /(?:https?:\/\/)?(?:www\.)?snapchat\.com\/add\/([^/?#]+)/,
    urlFormat: "https://www.snapchat.com/add/{username}",
    icon: "simple-icons:snapchat",
  },
  "reddit.com": {
    name: "Reddit",
    // regex to extract a username from the url:
    // https://www.reddit.com/user/username
    regex: /(?:https?:\/\/)?(?:www\.)?reddit\.com\/user\/([^/?#]+)/,
    urlFormat: "https://www.reddit.com/user/{username}",
    icon: "logos:reddit-icon",
  },
  "whatsapp.com": {
    name: "WhatsApp",
    // regex to extract a username from the url:
    // https://wa.me/username
    regex: /(?:https?:\/\/)?(?:www\.)?wa\.me\/([^/?#]+)/,
    urlFormat: "https://wa.me/{username}",
    icon: "logos:whatsapp-icon",
  },
  "telegram.com": {
    name: "Telegram",
    // regex to extract a username from the url:
    // https://t.me/username
    regex: /(?:https?:\/\/)?(?:www\.)?t\.me\/([^/?#]+)/,
    urlFormat: "https://t.me/{username}",
    icon: "logos:telegram",
  },
  "signal.com": {
    name: "Signal",
    // regex to extract a username from the url:
    // https://signal.org/username
    regex: /(?:https?:\/\/)?(?:www\.)?signal\.org\/([^/?#]+)/,
    urlFormat: "https://signal.org/{username}",
    icon: "simple-icons:signal",
  },
  "medium.com": {
    name: "Medium",
    // regex to extract a username from the url:
    // https://medium.com/@username
    regex: /(?:https?:\/\/)?(?:www\.)?medium\.com\/@([^/?#]+)/,
    urlFormat: "https://medium.com/@{username}",
    icon: "ant-design:medium-outlined",
  },

  // Default.
  website: {
    name: "Website",
    regex: null,
    urlFormat: null,
    icon: "streamline:web",
  },
};
