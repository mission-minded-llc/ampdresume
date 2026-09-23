export type OnboardingStepKind = "modal" | "spotlight" | "demo" | "page";

export type OnboardingPlacement =
  "right-start" | "right" | "bottom-start" | "bottom" | "left-start" | "top-start";

export type OnboardingStepId =
  | "welcome"
  | "menu"
  | "edit-resume"
  | "skills-demo"
  | "experience-demo"
  | "themes"
  | "tools"
  | "import"
  | "import-location"
  | "tips";

export type OnboardingStep = {
  id: OnboardingStepId;
  kind: OnboardingStepKind;
  title: string;
  body: string;
  target?: string;
  placement?: OnboardingPlacement;
  openNav?: boolean;
  skipWhenImported?: boolean;
  primaryLabel: string;
  secondaryLabel?: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    kind: "modal",
    title: "Welcome to Amp'd Resume",
    body: "Let's walk through where everything lives, try the editors with sample data, then import a PDF if you already have a resume.",
    primaryLabel: "Start tour",
    secondaryLabel: "Skip tutorial",
  },
  {
    id: "menu",
    kind: "spotlight",
    title: "Your main menu",
    body: "This button opens the app menu. Click or tap it anytime to edit your resume, import a PDF, or view your live page.",
    target: "nav-menu-button",
    placement: "right-start",
    primaryLabel: "Next",
  },
  {
    id: "edit-resume",
    kind: "spotlight",
    title: "Edit Resume",
    body: "Profile, skills, work experience, featured projects, education, and certifications all live in this section. Start with your profile URL so people can find you.",
    target: "edit-resume-section",
    placement: "right-start",
    openNav: true,
    primaryLabel: "Next",
  },
  {
    id: "skills-demo",
    kind: "demo",
    title: "Skills",
    body: "Search the catalog, add years of experience, then click a skill to tell the story behind it. Skills with extra detail get a green outline — reviewers can open them on your live resume.",
    primaryLabel: "Next",
  },
  {
    id: "experience-demo",
    kind: "demo",
    title: "Work experience",
    body: "History is nested: company → role → projects. Projects are the bullet points. Use the editor for a short write-up so curious readers can expand them.",
    primaryLabel: "Next",
  },
  {
    id: "themes",
    kind: "demo",
    title: "Theme and PDF theme",
    body: "Your live resume and downloadable PDF have separate looks. Preview a theme, then Save.",
    primaryLabel: "Next",
  },
  {
    id: "tools",
    kind: "spotlight",
    title: "Tools",
    body: "Import PDF pulls in an existing resume as a starting point. AI Assist is here too when it is enabled for your account.",
    target: "import-pdf",
    placement: "right",
    openNav: true,
    primaryLabel: "Import a PDF",
  },
  {
    id: "import",
    kind: "page",
    title: "Start from a PDF",
    body: "Upload a PDF and we'll extract profile, skills, jobs, and education for you to review. You can skip this and add everything by hand.",
    target: "import-page",
    placement: "right-start",
    primaryLabel: "Skip for now",
  },
  {
    id: "import-location",
    kind: "spotlight",
    title: "Import anytime",
    body: "You can run PDF import later from Tools → Import PDF in this menu.",
    target: "import-pdf",
    placement: "right",
    openNav: true,
    skipWhenImported: true,
    primaryLabel: "Next",
  },
  {
    id: "tips",
    kind: "modal",
    title: "Tips for a stronger resume",
    body: "A few habits that make Amp'd Resume work best — then you're ready to build.",
    primaryLabel: "Done",
  },
];
