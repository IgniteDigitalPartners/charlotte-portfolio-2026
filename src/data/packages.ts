export interface Package {
  id: string;
  name: string;
  price: number; // EUR
  group: "social" | "wix" | "focused";
  headline: string;
  includes: string[];
  delivery: string;
  revisions: string;
  /** Real PayPal payment link. Leave empty until supplied: checkout then shows as unavailable. */
  paypalUrl?: string;
}

export const groups = {
  social: {
    name: "Social design",
    intro: "Polished, on-brand graphics for your feed.",
    youProvide: "Your copy, images and brand assets (logo, colours, fonts).",
    notes: "Each graphic is designed in one platform size. Posting, scheduling, copywriting and paid advertising are separate services.",
  },
  wix: {
    name: "Wix support",
    intro: "Updates, fixes and improvements to your Wix website.",
    youProvide: "Access to your Wix site as a contributor, plus any text or images for the changes.",
    notes: "We agree your task list before you buy, so you know exactly what your hours cover.",
  },
  focused: {
    name: "Focused services",
    intro: "Expert eyes on one thing that matters, with clear next steps.",
    youProvide: "Links to the profile or page, and a few lines on your goals.",
    notes: "Recommendations are delivered in writing so you can act on them straight away.",
  },
} as const;

export const packages: Package[] = [
  {
    id: "starter-social", name: "Starter Social Pack", price: 45, group: "social",
    headline: "5 graphics to lift your feed",
    includes: ["5 custom social graphics", "One platform size per graphic", "Designed to your brand"],
    delivery: "3 business days", revisions: "1 revision",
  },
  {
    id: "social-content", name: "Social Content Pack", price: 85, group: "social",
    headline: "10 graphics and a feed template",
    includes: ["10 custom social graphics", "One platform size per graphic", "Feed template included"],
    delivery: "5 business days", revisions: "2 revisions",
  },
  {
    id: "complete-content", name: "Complete Content Pack", price: 165, group: "social",
    headline: "20 graphics with editable Canva files",
    includes: ["20 custom social graphics", "One platform size per graphic", "Feed template included", "Editable Canva source files"],
    delivery: "7 business days", revisions: "3 revisions",
  },
  {
    id: "wix-quick-fix", name: "Quick Fix", price: 45, group: "wix",
    headline: "Up to 1 hour of Wix edits",
    includes: ["Up to 1 hour of work", "Task list agreed before purchase"],
    delivery: "Agreed with your task list", revisions: "Within the agreed hours",
  },
  {
    id: "wix-update", name: "Update Pack", price: 105, group: "wix",
    headline: "Up to 3 hours of Wix updates",
    includes: ["Up to 3 hours of work", "Task list agreed before purchase"],
    delivery: "Agreed with your task list", revisions: "Within the agreed hours",
  },
  {
    id: "wix-improvement", name: "Improvement Pack", price: 210, group: "wix",
    headline: "Up to 6 hours of Wix improvements",
    includes: ["Up to 6 hours of work", "Task list agreed before purchase"],
    delivery: "Agreed with your task list", revisions: "Within the agreed hours",
  },
  {
    id: "social-audit", name: "Social Profile Audit", price: 49, group: "focused",
    headline: "Review of one social profile",
    includes: ["Review of one profile", "5 prioritised recommendations"],
    delivery: "Written recommendations", revisions: "Not applicable",
  },
  {
    id: "linkedin-refresh", name: "LinkedIn Profile Refresh", price: 79, group: "focused",
    headline: "Headline and About section rewritten",
    includes: ["New headline", "New About section"],
    delivery: "Written copy, ready to paste", revisions: "1 revision",
  },
  {
    id: "strategy-session", name: "Strategy Session", price: 95, group: "focused",
    headline: "60 minutes with a written action summary",
    includes: ["60-minute consultation", "Written action summary"],
    delivery: "Booked at a time that suits you", revisions: "Not applicable",
  },
  {
    id: "landing-page-review", name: "Landing Page Review", price: 125, group: "focused",
    headline: "Messaging, layout and call-to-action review",
    includes: ["Review of one page", "Prioritised messaging, layout and call-to-action recommendations"],
    delivery: "Written recommendations", revisions: "Not applicable",
  },
];

export const getPackage = (id: string) => packages.find((p) => p.id === id);
export const euro = (n: number) => `€${n}`;
