import { site } from "./site";

export interface BriefField {
  name: string;
  label: string;
  type: "text" | "textarea" | "url" | "select";
  required?: boolean;
  help?: string;
  options?: string[];
}

export type Group = "social" | "essentials" | "website" | "focused" | "calls" | "bundles" | "monthly";

export interface Package {
  id: string;
  name: string;
  price: number; // EUR
  group: Group;
  headline: string;
  includes: string[];
  delivery: string;
  revisions: string;
  /** What the client fills in at checkout so the work can start */
  brief?: BriefField[];
  /** Bundles: the packages included (their briefs are asked at checkout) */
  bundle?: { ids: string[]; saves: number };
  /** Calls: booked and paid on Calendly instead of the cart (a URL) */
  calendly?: string;
  /** Monthly plans are arranged by enquiry, not bought in the cart */
  monthly?: boolean;
}

const assets: BriefField = { name: "assets", label: "Link to your brand files", type: "url", help: "A Google Drive or Dropbox link with your logo, fonts, colours and any images. Leave blank if you don't have these yet." };
const sizes = ["Square post (1080 × 1080)", "Portrait post (1080 × 1350)", "Story or reel cover (1080 × 1920)", "Mixed, I'll explain below"];
const socialBrief: BriefField[] = [
  { name: "platforms", label: "Which platforms are the graphics for?", type: "text", required: true, help: "For example Instagram, Facebook, LinkedIn." },
  { name: "size", label: "Graphic size", type: "select", required: true, options: sizes },
  { name: "content", label: "What should the graphics say or show?", type: "textarea", required: true, help: "Paste your copy, or describe the topics, offers or messages for each graphic." },
  assets,
  { name: "style", label: "Style notes", type: "textarea", help: "Accounts or designs you like, colours to use or avoid." },
];
const websiteBrief: BriefField[] = [
  { name: "website", label: "Website address", type: "url", required: true },
  { name: "platform", label: "Website platform", type: "text", required: true, help: "For example WordPress, Wix, Shopify or Squarespace." },
  { name: "tasks", label: "Your task list", type: "textarea", required: true, help: "List the changes you'd like, in order of priority. If they need more time than your pack covers, I'll tell you before starting." },
  { name: "access", label: "How will you give me access?", type: "select", required: true, options: ["I'll add you as an editor or collaborator", "I'm not sure, please advise"], help: "Please never share passwords in this form." },
];

export const groups = {
  social: {
    name: "Social design",
    intro: "Polished, on-brand graphics for your feed.",
    youProvide: "Your copy, images and brand assets (logo, colours, fonts).",
    notes: "Each graphic is designed in one platform size. Posting, scheduling, copywriting and paid advertising are separate services.",
  },
  essentials: {
    name: "Essential marketing",
    intro: "The foundations every business needs, set up properly.",
    youProvide: "Your business details and any brand files you already have.",
    notes: "Everything is set up in your own accounts, so you keep full ownership.",
  },
  website: {
    name: "Website support",
    intro: "Updates, fixes and improvements to your existing website.",
    youProvide: "Editor access to your website, plus any text or images for the changes.",
    notes: "Send your task list at checkout. If it needs more time than your pack covers, I'll tell you before starting.",
  },
  focused: {
    name: "Focused services",
    intro: "Expert eyes on one thing that matters, with clear next steps.",
    youProvide: "Links to the profile or page, and a few lines on your goals.",
    notes: "Recommendations are delivered in writing so you can act on them straight away.",
  },
  calls: {
    name: "Calls",
    intro: "Time with me, one to one, on the questions that matter to you.",
    youProvide: "A few lines on what you'd like to cover.",
    notes: "Choose a time and pay in one step through Calendly. Clients buying any package can add a free 30-minute welcome call at checkout.",
  },
  bundles: {
    name: "Bundles",
    intro: "Popular packages together, for less than buying them separately.",
    youProvide: "The details for each package in the bundle, asked at checkout.",
    notes: "Each part of the bundle is delivered to its usual timeframe.",
  },
  monthly: {
    name: "Monthly support",
    intro: "Consistent, on-brand content every month.",
    youProvide: "Your topics, offers and brand files at the start of each month.",
    notes: "Monthly plans start with a short call. You can cancel anytime.",
  },
} as const;

export const packages: Package[] = [
  {
    id: "starter-social", brief: socialBrief, name: "Starter Social Pack", price: 45, group: "social",
    headline: "5 graphics to lift your feed",
    includes: ["5 custom social graphics", "One platform size per graphic", "Designed to your brand"],
    delivery: "3 business days", revisions: "1 revision",
  },
  {
    id: "social-content", brief: socialBrief, name: "Social Content Pack", price: 85, group: "social",
    headline: "10 graphics and a feed template",
    includes: ["10 custom social graphics", "One platform size per graphic", "Feed template included"],
    delivery: "5 business days", revisions: "2 revisions",
  },
  {
    id: "complete-content", brief: socialBrief, name: "Complete Content Pack", price: 165, group: "social",
    headline: "20 graphics with editable Canva files",
    includes: ["20 custom social graphics", "One platform size per graphic", "Feed template included", "Editable Canva source files"],
    delivery: "7 business days", revisions: "3 revisions",
  },
  {
    id: "google-business-profile", name: "Google Business Profile Setup", price: 75, group: "essentials",
    headline: "Be found on Google Search and Maps",
    includes: ["Profile set up or optimised", "Categories, services and description", "Hours, booking link and contact details", "Photo guidance"],
    delivery: "3 business days", revisions: "1 revision",
    brief: [
      { name: "details", label: "Business name, address or service area", type: "textarea", required: true },
      { name: "services", label: "The services or products you offer", type: "textarea", required: true },
      { name: "contact", label: "Phone, website and opening hours", type: "textarea", required: true },
      { name: "existing", label: "Do you already have a Google Business Profile?", type: "select", required: true, options: ["Yes", "No", "Not sure"] },
    ],
  },
  {
    id: "social-profile-setup", name: "Social Profile Setup", price: 95, group: "essentials",
    headline: "Two profiles that look polished from day one",
    includes: ["Up to 2 social profiles", "Bio written for you", "Profile and cover graphics", "Highlight covers"],
    delivery: "3 business days", revisions: "1 revision",
    brief: [
      { name: "platforms", label: "Which profiles? (up to 2)", type: "text", required: true, help: "For example Instagram and Facebook." },
      { name: "handles", label: "Profile links or handles, if they exist", type: "textarea" },
      { name: "about", label: "Tell me about your business", type: "textarea", required: true, help: "What you offer, who it's for and what makes you different." },
      assets,
    ],
  },
  {
    id: "email-newsletter-setup", name: "Email Newsletter Setup", price: 145, group: "essentials",
    headline: "Everything ready to start emailing your customers",
    includes: ["MailerLite or Mailchimp account set up", "Branded email template", "Signup form for your website", "Welcome email written and set up"],
    delivery: "5 business days", revisions: "1 revision",
    brief: [
      { name: "platform", label: "Email platform", type: "select", required: true, options: ["MailerLite", "Mailchimp", "No preference, please advise"] },
      { name: "website", label: "Your website address", type: "url" },
      { name: "about", label: "What will your newsletter be about?", type: "textarea", required: true },
      { name: "sender", label: "Email address to send from", type: "text", required: true },
      assets,
    ],
  },
  {
    id: "brand-starter-kit", name: "Brand Starter Kit", price: 195, group: "essentials",
    headline: "A simple, polished identity to build on",
    includes: ["2 logo concepts", "Colour palette", "Font pairing", "One-page brand guide"],
    delivery: "7 business days", revisions: "2 revisions",
    brief: [
      { name: "business", label: "Business name and what you do", type: "textarea", required: true },
      { name: "audience", label: "Who are your ideal customers?", type: "text", required: true },
      { name: "words", label: "Three words to describe how your brand should feel", type: "text", required: true },
      { name: "inspiration", label: "Brands or styles you admire", type: "textarea" },
      { name: "colours", label: "Colours you love or want to avoid", type: "text" },
    ],
  },
  {
    id: "website-quick-fix", brief: websiteBrief, name: "Quick Fix", price: 45, group: "website",
    headline: "Up to 1 hour of website edits",
    includes: ["Up to 1 hour of work", "Task list sent at checkout"],
    delivery: "Confirmed after I review your list", revisions: "Within the agreed hours",
  },
  {
    id: "website-update", brief: websiteBrief, name: "Update Pack", price: 105, group: "website",
    headline: "Up to 3 hours of website updates",
    includes: ["Up to 3 hours of work", "Task list sent at checkout"],
    delivery: "Confirmed after I review your list", revisions: "Within the agreed hours",
  },
  {
    id: "website-improvement", brief: websiteBrief, name: "Improvement Pack", price: 210, group: "website",
    headline: "Up to 6 hours of website improvements",
    includes: ["Up to 6 hours of work", "Task list sent at checkout"],
    delivery: "Confirmed after I review your list", revisions: "Within the agreed hours",
  },
  {
    id: "social-audit", brief: [
      { name: "profile", label: "Link to the profile", type: "url", required: true },
      { name: "goals", label: "What would you like the profile to achieve?", type: "textarea", required: true },
      { name: "audience", label: "Who are your ideal customers?", type: "text" },
    ], name: "Social Profile Audit", price: 49, group: "focused",
    headline: "Review of one social profile",
    includes: ["Review of one profile", "5 prioritised recommendations"],
    delivery: "Written recommendations", revisions: "Not applicable",
  },
  {
    id: "linkedin-refresh", brief: [
      { name: "profile", label: "Your LinkedIn profile link", type: "url", required: true },
      { name: "audience", label: "Who do you want to attract?", type: "text", required: true, help: "For example clients, recruiters or partners in a particular sector." },
      { name: "highlights", label: "Experience and results to highlight", type: "textarea", required: true },
      { name: "tone", label: "Tone you'd like", type: "select", options: ["Warm and approachable", "Polished and authoritative", "Bold and confident", "No preference"] },
    ], name: "LinkedIn Profile Refresh", price: 79, group: "focused",
    headline: "Headline and About section rewritten",
    includes: ["New headline", "New About section"],
    delivery: "Written copy, ready to paste", revisions: "1 revision",
  },
  {
    id: "marketing-call", calendly: site.booking.marketingCall, name: "Marketing Call", price: 45, group: "calls",
    headline: "30 minutes on the question that matters most",
    includes: ["30-minute video call", "Honest advice and clear next steps"],
    delivery: "Booked at a time that suits you", revisions: "Not applicable",
    brief: [
      { name: "topic", label: "What would you like to talk about?", type: "textarea", required: true },
      { name: "links", label: "Your website and social links", type: "textarea" },
    ],
  },
  {
    id: "strategy-session", calendly: site.booking.strategySession, brief: [
      { name: "focus", label: "What would you like to focus on?", type: "textarea", required: true },
      { name: "links", label: "Your website and social links", type: "textarea" },
    ], name: "Strategy Session", price: 95, group: "calls",
    headline: "60 minutes with a written action summary",
    includes: ["60-minute video call", "Written action summary"],
    delivery: "Booked at a time that suits you", revisions: "Not applicable",
  },
  {
    id: "landing-page-review", brief: [
      { name: "page", label: "Link to the page", type: "url", required: true },
      { name: "goal", label: "What should visitors do on this page?", type: "text", required: true },
      { name: "audience", label: "Who is the page for?", type: "text" },
    ], name: "Landing Page Review", price: 125, group: "focused",
    headline: "Messaging, layout and call-to-action review",
    includes: ["Review of one page", "Prioritised messaging, layout and call-to-action recommendations"],
    delivery: "Written recommendations", revisions: "Not applicable",
  },
  {
    id: "local-visibility-bundle", name: "Local Visibility Bundle", price: 149, group: "bundles",
    headline: "Google profile, social audit and fresh graphics",
    includes: ["Google Business Profile Setup", "Social Profile Audit", "Starter Social Pack (5 graphics)"],
    delivery: "Each part to its usual timeframe", revisions: "As per each package",
    bundle: { ids: ["google-business-profile", "social-audit", "starter-social"], saves: 20 },
  },
  {
    id: "launch-bundle", name: "Launch Bundle", price: 299, group: "bundles",
    headline: "Brand, profiles and your first posts",
    includes: ["Brand Starter Kit", "Social Profile Setup", "Starter Social Pack (5 graphics)"],
    delivery: "Each part to its usual timeframe", revisions: "As per each package",
    bundle: { ids: ["brand-starter-kit", "social-profile-setup", "starter-social"], saves: 36 },
  },
  {
    id: "monthly-social-essentials", name: "Monthly Social Essentials", price: 195, group: "monthly",
    headline: "12 branded posts with captions, every month",
    includes: ["12 branded posts a month", "Captions written for you", "Monthly content calendar", "Cancel anytime"],
    delivery: "Calendar agreed each month", revisions: "1 round per month",
    monthly: true,
  },
];

export const getPackage = (id: string) => packages.find((p) => p.id === id);
export const euro = (n: number) => `€${n}`;
/** Does this cart qualify for a free welcome call? (any package that isn't itself a call) */
export const earnsWelcomeCall = (items: Package[]) => items.some((p) => !p.calendly);
/** Packages booked and paid on Calendly: never in the cart or checkout */
export const bookedOnCalendly = (p: Package) => Boolean(p.calendly);
/** Packages that can be bought instantly in the cart */
export const buyable = (p: Package) => !p.monthly && !p.calendly;
/** The brief sections a package needs at checkout (bundles ask for each part) */
export const briefSections = (p: Package): { id: string; name: string; fields: BriefField[] }[] =>
  p.bundle
    ? p.bundle.ids.map((id) => getPackage(id)!).map((x) => ({ id: `${p.id}--${x.id}`, name: `${p.name}: ${x.name}`, fields: x.brief ?? [] }))
    : [{ id: p.id, name: p.name, fields: p.brief ?? [] }];
