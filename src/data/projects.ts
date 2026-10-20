import manifest from "./media-manifest.json";

export type Media = { src: string; width: number; height: number };
const m = (id: string): Media => (manifest as Record<string, Media>)[id];

export interface Project {
  slug: string;
  client: string;
  category: string;
  services: string[]; // service slugs
  summary: string;
  period?: string;
  website?: { url: string; label: string };
  cover?: { media: Media; alt: string };
  tone: "blush" | "espresso" | "linen";
  brief: string[];
  role: string;
  delivered: { title: string; text: string }[];
  facts?: { value: string; label: string }[];
  gallery?: { media: Media; caption: string }[];
  /** true while a project page is waiting for images and fuller detail: hidden from search engines */
  thin?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "dar-il-fwieha",
    client: "Dar il-Fwieħa",
    category: "Brand identity · Logo · Packaging direction",
    services: ["brand-strategy-identity"],
    summary: "A brand identity, logo and packaging direction for Dar il-Fwieħa.",
    tone: "blush",
    brief: [
      "I created the brand identity for Dar il-Fwieħa, from the logo through to the direction for its packaging.",
    ],
    role: "Brand identity designer",
    delivered: [
      { title: "Brand identity", text: "The overall look and feel, palette and typography for the brand." },
      { title: "Logo", text: "The primary logo design." },
      { title: "Packaging direction", text: "Visual direction for how the brand is applied to packaging." },
    ],
    thin: true,
    featured: true,
  },
  {
    slug: "flooring-to-go",
    client: "Flooring To Go",
    category: "Website design & build",
    services: ["website-design"],
    summary: "Website design and build for Flooring To Go.",
    tone: "linen",
    brief: ["I designed and built the Flooring To Go website, from page structure and visual design through to the finished build."],
    role: "Website designer and builder",
    delivered: [
      { title: "Website design", text: "Page layouts, visual design and structure." },
      { title: "Website build", text: "The site built and set up, ready to publish." },
    ],
    thin: true,
    featured: true,
  },
  {
    slug: "moovly",
    client: "Moovly",
    category: "Marketing · Social media · Business development",
    services: ["social-media", "marketing-strategy-consultancy", "b2b-lead-generation"],
    summary: "Senior marketing at a SaaS video creation platform: demand generation, social, content and brand campaigns.",
    period: "Jun 2021 to Sep 2024",
    website: { url: "https://www.moovly.com", label: "moovly.com" },
    tone: "espresso",
    brief: [
      "Moovly is a SaaS platform for creating videos online. As a senior member of the marketing team, I worked across the channels that bring in and develop new business.",
    ],
    role: "Senior marketing",
    delivered: [
      { title: "Marketing", text: "Demand generation and brand campaigns for a SaaS product." },
      { title: "Social media", text: "Social content and campaign activity across the brand's channels." },
      { title: "Business development", text: "Supporting new business and growth activity." },
    ],
    thin: true,
    featured: true,
  },
  {
    slug: "general-copper-gold",
    client: "General Copper Gold Corp.",
    category: "Brand system · Investor presentation · Social templates",
    services: ["brand-strategy-identity", "social-media"],
    summary: "A premium brand system, investor presentation and social templates for a TSX-V listed exploration company.",
    period: "2025",
    website: { url: "https://www.generalcoppergold.com", label: "generalcoppergold.com" },
    cover: { media: m("gcg-website"), alt: "The General Copper Gold website homepage" },
    tone: "espresso",
    brief: [
      "General Copper Gold had the geology. The challenge was building the story around it for the capital markets, in a format that would hold up to the scrutiny of TSX-V investors.",
      "The brand needed to feel premium, engineered and unmistakable: a resource company that earns institutional attention.",
    ],
    role: "Brand strategist and designer",
    delivered: [
      { title: "Complete brand system", text: "A charcoal, deep copper and gold palette with Montserrat display type, documented in a 17-page brand guidelines deck covering logo use, colour, typography and applications." },
      { title: "Investor social templates", text: "A branded template series for investor updates on X, with a copper and gold treatment." },
      { title: "Investor presentation", text: "A presentation built to carry the company's story to investors." },
      { title: "Geological cross-section", text: "A custom illustration of the gold system at depth, showing the structural trap and mineralised zones." },
      { title: "Belt map and jurisdiction panel", text: "A district map with neighbouring properties and an explainer on Namibia as an investment jurisdiction." },
      { title: "Brand collateral", text: "Letterhead, social templates and a LinkedIn banner: a full kit for capital markets use." },
    ],
    facts: [
      { value: "17", label: "Page brand book" },
      { value: "6", label: "Brand deliverables" },
    ],
    gallery: [
      { media: m("gcg-brand-cover"), caption: "Brand standards: cover" },
      { media: m("gcg-colour-type"), caption: "Brand standards: colour and typography" },
      { media: m("gcg-logo-usage"), caption: "Brand standards: logo usage" },
      { media: m("gcg-social"), caption: "Investor social template for X" },
    ],
    featured: true,
  },
  {
    slug: "ezsy-webs",
    client: "Ezsy Webs",
    category: "SaaS product · Brand · Marketing site",
    services: ["brand-strategy-identity", "website-design", "email-marketing-crm"],
    summary: "Product, brand and marketing for a B2B SaaS that turns a website address into a redesign demo for agencies.",
    period: "2025",
    website: { url: "https://ezsywebs.com", label: "ezsywebs.com" },
    cover: { media: m("ezsy-website"), alt: "The Ezsy Webs website homepage" },
    tone: "linen",
    brief: [
      "Agencies pitch website redesigns every day, and the demo stage is where deals stall. Ezsy Webs solves that: paste a web address and get a fully rendered modern redesign within minutes.",
      "The brand had to feel credible, modern and trustworthy from day one, so agencies could put it in front of their own clients.",
    ],
    role: "Product, brand and marketing lead",
    delivered: [
      { title: "The product", text: "A demo platform with a URL-to-redesign pipeline and three output tiers." },
      { title: "Brand identity", text: "An 11-slide brand guidelines deck with a navy and bright blue palette, Montserrat typography and an orbit logo mark." },
      { title: "Marketing site and copy", text: "ezsywebs.com: positioning, three pricing tiers, agency-facing messaging and a clear conversion path." },
      { title: "Automation and CRM", text: "Make.com workflows, a Supabase database, Resend transactional email and Stripe billing, working as one system." },
      { title: "Content engine", text: "An automated LinkedIn and Instagram posting workflow using n8n, Notion and Buffer." },
      { title: "Pricing and go-to-market", text: "Three productised tiers with positioning aimed at agencies." },
    ],
    facts: [
      { value: "11", label: "Page brand book" },
      { value: "3", label: "Pricing tiers" },
    ],
    gallery: [
      { media: m("ezsy-brand-cover"), caption: "Brand guidelines: cover" },
      { media: m("ezsy-identity"), caption: "Brand guidelines: visual identity" },
    ],
    featured: true,
  },
  {
    slug: "vertui",
    client: "Vertui",
    category: "Marketing strategy · Website",
    services: ["marketing-strategy-consultancy", "website-design"],
    summary: "A full B2C marketing proposal, channel plan and growth roadmap for a horticulture brand.",
    website: { url: "https://vertui.com", label: "vertui.com" },
    cover: { media: m("vertui-website"), alt: "The Vertui website homepage" },
    tone: "linen",
    brief: ["Vertui is a horticulture brand. The work set out how the brand should reach and grow its customer base, channel by channel."],
    role: "Marketing strategist",
    delivered: [
      { title: "B2C marketing proposal", text: "A complete marketing ecosystem proposal for the brand." },
      { title: "Channel plan", text: "Which channels to use, what each one is for and how they connect." },
      { title: "Content strategy and roadmap", text: "Content direction and a growth roadmap, presented in the brand's teal and lime identity." },
    ],
    gallery: [
      { media: m("vertui-proposal"), caption: "Marketing proposal: cover" },
      { media: m("vertui-strategy"), caption: "Marketing proposal: strategy overview" },
      { media: m("vertui-channels"), caption: "Marketing proposal: channel plan" },
    ],
  },
  {
    slug: "roc-kon-concrete",
    client: "Roc-Kon Concrete",
    category: "Social media strategy · Website",
    services: ["social-media", "marketing-strategy-consultancy", "website-design"],
    summary: "A social media and marketing strategy to revive the brand of a concrete services company.",
    website: { url: "https://roc-kon-revive.vercel.app", label: "roc-kon-revive.vercel.app" },
    cover: { media: m("rockon-website"), alt: "The Roc-Kon Concrete website" },
    tone: "blush",
    brief: ["Roc-Kon Concrete needed its brand revived and a clear plan for how to show up on social media."],
    role: "Marketing and social media strategist",
    delivered: [
      { title: "Social media strategy plan", text: "Objectives, content pillars and a platform-by-platform strategy." },
      { title: "Marketing ecosystem", text: "An overview of how every channel works together." },
      { title: "Website", text: "A refreshed website for the brand." },
    ],
    gallery: [
      { media: m("rockon-plan"), caption: "Social media strategy plan: cover" },
      { media: m("rockon-objectives"), caption: "Strategy objectives" },
      { media: m("rockon-platforms"), caption: "Platform strategy" },
      { media: m("rockon-ecosystem"), caption: "Complete marketing ecosystem" },
    ],
  },
  {
    slug: "elev8-prospectorai",
    client: "Elev8 ProspectorAI",
    category: "Brand positioning · Social content · Automation",
    services: ["social-media", "b2b-lead-generation", "brand-strategy-identity"],
    summary: "Brand positioning, a social content series and automation planning for a lead enrichment platform.",
    cover: { media: m("elev8-identity"), alt: "Elev8 ProspectorAI brand identity" },
    tone: "espresso",
    brief: ["Elev8 ProspectorAI is a lead enrichment platform. It needed clear positioning and social content that explained its value to B2B buyers."],
    role: "Brand and content strategist",
    delivered: [
      { title: "Brand positioning", text: "How the product is described and who it is for." },
      { title: "Social content series", text: "A run of branded LinkedIn posts about lead enrichment." },
      { title: "Automation architecture", text: "A plan for AI-led automation behind the marketing." },
    ],
    gallery: [
      { media: m("elev8-post"), caption: "LinkedIn post: lead enrichment" },
      { media: m("elev8-series"), caption: "Social content series" },
    ],
  },
  {
    slug: "quest-critical-metals",
    client: "Quest Critical Metals",
    category: "Rebrand · Investor awareness · Website · Social",
    services: ["brand-strategy-identity", "website-design", "social-media"],
    summary: "A rebrand, investor awareness programme, website and social rollout for a critical metals exploration company.",
    tone: "linen",
    brief: ["Quest Critical Metals needed a refreshed brand and a stronger presence with investors."],
    role: "Brand and marketing lead",
    delivered: [
      { title: "Rebrand", text: "A refreshed identity for the company." },
      { title: "Investor awareness", text: "Communications aimed at the investor audience." },
      { title: "Website and social rollout", text: "The new brand applied to the website and social channels." },
    ],
    thin: true,
  },
  {
    slug: "oroco-resource-corp",
    client: "Oroco Resource Corp",
    category: "Digital marketing strategy · Investor communications",
    services: ["marketing-strategy-consultancy"],
    summary: "A three-month digital marketing strategy and investor communications for a TSX-listed resource company.",
    tone: "blush",
    brief: ["Oroco Resource Corp needed a focused digital marketing plan and clear communications for its investors."],
    role: "Marketing strategist",
    delivered: [
      { title: "Three-month strategy", text: "A digital marketing plan covering channels, content and timing." },
      { title: "Investor communications", text: "Messaging and materials for the company's investor audience." },
    ],
    thin: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
