// Charlotte Smith Portfolio 2026 — Data Layer
// Design: Cinematic Dark Luxury | Palette: Obsidian · Copper · Cream

export interface CaseStudy {
  slug: string;
  number: string;
  client: string;
  tagline: string;
  category: string;
  period: string;
  scope: string;
  description: string;
  heroImage: string;
  websiteUrl?: string;
  color: string; // accent colour for this case study card
  tags: string[];
  brief: string;
  deliverables: { title: string; description: string }[];
  outcomes?: { metric: string; label: string }[];
  nextSlug?: string;
  nextClient?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "idp",
    number: "01",
    client: "Ignite Digital Partners",
    tagline: "A communication systems consultancy, built from scratch.",
    category: "Founding Brand System & Go-To-Market",
    period: "Oct 2024 — Present",
    scope: "Brand, methodology, GTM, content engine",
    description:
      "Founded IDP as a Canadian B2B marketing firm building communication systems that compound credibility. The Ecosystem, the Ignition Loop, and the brand world that carries them.",
    heroImage: "/manus-storage/case_idp_f070a858.png",
    websiteUrl: "https://ignitedigitalpartners.com",
    color: "#C87941",
    tags: ["Brand Strategy", "GTM", "Content Engine", "Identity"],
    brief:
      "Most B2B organisations inherit a marketing function assembled in pieces. IDP was founded to replace episodic campaigns with infrastructure. Not louder communication — better communication, built to compound.",
    deliverables: [
      { title: "The Ecosystem Framework", description: "Customer journey: Awareness, Engagement, Consideration, Advocacy. The 'what' of the system." },
      { title: "The Ignition Loop", description: "Internal engine: Clarity, Activation, Growth, Insight. Loops back continuously instead of resetting." },
      { title: "Visual Identity System", description: "Obsidian and copper palette. Flame mark. Liquid-metal hero aesthetic. Built to read as institutional from first impression." },
      { title: "13-Slide Brand Guidelines", description: "Complete brand book built in PowerPoint. Logo rules, palette, typography, hero library, voice and tone." },
      { title: "Service Architecture", description: "Spark Session intake, the Ecosystem deliverable suite, operating environments segmentation." },
      { title: "Content & Intelligence Engine", description: "Ignite IQ, the Intelligence Hub, and a LinkedIn-led content programme that compounds authority." },
    ],
    outcomes: [
      { metric: "13pp", label: "Brand Book" },
      { metric: "15pp", label: "Proposal Template" },
      { metric: "4×", label: "Content Pillars" },
    ],
    nextSlug: "gcg",
    nextClient: "General Copper Gold Corp.",
  },
  {
    slug: "gcg",
    number: "02",
    client: "General Copper Gold Corp.",
    tagline: "A 14-slide investor deck built for the capital markets.",
    category: "Capital Markets Deck · TSX-V",
    period: "2025",
    scope: "Brand system, investor deck, web delivery",
    description:
      "Brand system, investor presentation, and cinematic HTML deck for a TSX-V listed gold exploration company operating in Namibia.",
    heroImage: "/manus-storage/case_gcg_e7afca63.png",
    websiteUrl: "https://orocoresourcecorp.com/",
    color: "#C1A24F",
    tags: ["Investor Relations", "Brand System", "Capital Markets", "TSX-V"],
    brief:
      "GCG had the geology. The challenge was building the capital narrative around it and delivering it in a format that would survive the scrutiny of TSX-V investors. Zero margin for amateur design.",
    deliverables: [
      { title: "Complete Brand System", description: "Charcoal, Copper, Gold palette. Montserrat Bold display. Full 15-page brand guidelines deck." },
      { title: "14-Slide Investor Deck", description: "Standalone HTML file, cinematic canvas visuals, right-to-left horizontal slide transitions, no external dependencies." },
      { title: "Geological Cross-Section", description: "Custom SVG of the gold system at depth, with draw-on animation showing the structural trap and mineralised zones." },
      { title: "Belt Map & Jurisdiction Panel", description: "District-context map with adjacent properties, plus Namibia investment-grade jurisdiction explainer." },
      { title: "Four-Phase Work Programme", description: "Visual timeline mapping the exploration plan against capital milestones." },
      { title: "Brand Collateral", description: "Letterhead, social media templates, LinkedIn banner. Full brand-deployment kit beyond the deck itself." },
    ],
    outcomes: [
      { metric: "15pp", label: "Brand Book" },
      { metric: "14", label: "Investor Slides" },
      { metric: "6+", label: "Collateral Pieces" },
    ],
    nextSlug: "ezsy",
    nextClient: "Ezsy Webs",
  },
  {
    slug: "ezsy",
    number: "03",
    client: "Ezsy Webs",
    tagline: "An AI-powered website demo platform for agencies, shipped solo.",
    category: "SaaS Product & Brand",
    period: "2025",
    scope: "Product, brand, marketing, automation",
    description:
      "Product, brand, and automation stack for a B2B SaaS shipped end-to-end. URL-to-redesign pipeline for agencies closing more pitches.",
    heroImage: "/manus-storage/case_ezsy_1bbe582d.png",
    websiteUrl: "https://ezsywebs.com",
    color: "#2563EB",
    tags: ["SaaS", "Product Launch", "Automation", "Brand Identity"],
    brief:
      "Agencies pitch website redesigns every day. The demo stage is where deals stall. Ezsy Webs solves exactly that: paste a URL, get a fully rendered modern redesign within minutes.",
    deliverables: [
      { title: "The Product Itself", description: "Demo platform shipped on Lovable. URL-to-redesign pipeline. Tiered output: Homepage Refresh, Core Growth, Authority Build." },
      { title: "Complete Brand Identity", description: "11-slide brand guidelines deck. Navy and electric blue palette. Montserrat typography." },
      { title: "Marketing Site & Copy", description: "ezsywebs.com. Full positioning, three pricing tiers, agency-facing messaging, conversion path." },
      { title: "Automation Backend", description: "Make.com workflows. Supabase database. Resend transactional email. Stripe billing. End-to-end integrated." },
      { title: "Content Engine", description: "n8n + Notion + Buffer + Claude API. LinkedIn and Instagram posting on a defined cadence with zero daily input." },
      { title: "Pricing & Go-To-Market", description: "Three productised tiers. Agency-targeted positioning. Platform-discovery effect drove early signups." },
    ],
    outcomes: [
      { metric: "11pp", label: "Brand Book" },
      { metric: "3×", label: "Pricing Tiers" },
      { metric: "7+", label: "Tools Integrated" },
    ],
    nextSlug: "multi-client",
    nextClient: "Client Portfolio",
  },
  {
    slug: "multi-client",
    number: "04",
    client: "Multi-Client Portfolio",
    tagline: "Five brands, one operating system.",
    category: "Brand & Growth · 5 Brands · 4 Sectors",
    period: "2024 — 2026",
    scope: "Brand, content, growth, IR",
    description:
      "Brand and growth work across Vertui, Roc-Kon, Elev8 AI, and LUMA. Different sectors, one operating system.",
    heroImage: "/manus-storage/case_multi-client_93f27b77.png",
    websiteUrl: undefined,
    color: "#C87941",
    tags: ["Brand Strategy", "Growth Marketing", "Multi-Sector", "Lead Gen"],
    brief:
      "Working across five distinct companies in two years sharpened one thing above all: a repeatable operating system for marketing engagements. The discipline transfers. What changes is the language, the design accent, and the commercial benchmark.",
    deliverables: [
      { title: "Vertui Horticulture", description: "Full brand transformation, Amazon launch, packaging, paid media. Translated a complex service offer into a clear, conversion-ready narrative." },
      { title: "Roc-Kon Concrete", description: "SEO, lead generation, social media, CRM automation. LinkedIn content strategy and carousel design for technical buyers." },
      { title: "Elev8 AI Solutions", description: "Brand positioning, marketing site framework, AI-led automation architecture. Defined the firm's category and acquisition motion." },
      { title: "LUMA", description: "Brand identity, content design, and consumer-facing positioning. Visual system from logo through to social rollout." },
      { title: "Quest Critical Metals", description: "Rebrand, investor awareness, website, social rollout for a critical metals exploration company." },
      { title: "Oroco Resource Corp", description: "3-month digital marketing strategy and investor communications for a TSX-listed resource company." },
    ],
    outcomes: [
      { metric: "5+", label: "Brands Served" },
      { metric: "4", label: "Sectors" },
      { metric: "1", label: "Operating System" },
    ],
    nextSlug: "social",
    nextClient: "Always-On Content Engine",
  },
  {
    slug: "social",
    number: "05",
    client: "Always-On Content Engine",
    tagline: "An 8-week content engine built to compound credibility.",
    category: "Social Campaigns · LinkedIn-Led",
    period: "2025 — 2026",
    scope: "Strategy, design, motion, copy",
    description:
      "Four content pillars. Branded carousels, motion assets, daily rhythm. Built for B2B leadership LinkedIn readers.",
    heroImage: "/manus-storage/case_social_c4072867.png",
    websiteUrl: undefined,
    color: "#C87941",
    tags: ["Content Strategy", "LinkedIn", "Social Media", "B2B"],
    brief:
      "LinkedIn for B2B leadership audiences is a craft. Most social marketers treat it like B2C. The tone is wrong, the visual language is wrong, the cadence is wrong. IDP's content engine had to land with executives who can spot generic content in seconds.",
    deliverables: [
      { title: "Systems & Strategy Pillar", description: "The signature pillar. Communication systems, narrative architecture, infrastructure thinking. The IDP point of view, made shareable." },
      { title: "Brand & Credibility Pillar", description: "Positioning, narrative, brand systems. Aimed at leadership teams who understand that visibility without structure is noise." },
      { title: "AI & Automation Pillar", description: "How AI workflows compress communication processes, content production, and intelligence loops. The differentiator pillar." },
      { title: "Tips & Education Pillar", description: "Quick, useful, shareable. Tactical posts that broaden reach and pull new audience into the upper pillars over time." },
      { title: "8-Week Campaign Architecture", description: "Full content campaign spanning eight weeks, four pillars, three channels, branded throughout." },
      { title: "Motion Assets", description: "Animated motion video assets aligned to IDP visual identity. Used for high-priority pillar posts." },
    ],
    outcomes: [
      { metric: "8wks", label: "Campaign" },
      { metric: "4", label: "Content Pillars" },
      { metric: "3", label: "Channels" },
    ],
    nextSlug: "brand-systems",
    nextClient: "Brand Systems Practice",
  },
  {
    slug: "brand-systems",
    number: "06",
    client: "Brand Systems Practice",
    tagline: "End-to-end brand systems for founders and listed companies.",
    category: "Identity Design · Ongoing Practice",
    period: "Ongoing",
    scope: "Brand books, palettes, typography, guidelines",
    description:
      "From positioning to typography to deployed templates. The full stack. Three complete brand systems across B2B, mining, and SaaS.",
    heroImage: "/manus-storage/case_brand-systems_4fbb7bd8.png",
    websiteUrl: undefined,
    color: "#C87941",
    tags: ["Brand Identity", "Design Systems", "Typography", "Guidelines"],
    brief:
      "Most brand guidelines decks die in someone's Downloads folder. The systems I build are designed to be used by sales teams, designers, founders, and external partners. A brand system is an operating manual, not a decoration.",
    deliverables: [
      { title: "IDP Brand System", description: "Obsidian and copper. The flame mark. Liquid-metal hero aesthetic. 13-page brand book for the Ecosystem framework." },
      { title: "GCG Brand System", description: "Charcoal, copper, gold. Montserrat Bold. 15-page brand system for a TSX-V listed exploration company." },
      { title: "Ezsy Webs Brand System", description: "Navy and electric blue. Montserrat throughout. 11-page brand system for a product-led B2B SaaS." },
      { title: "Positioning Charter", description: "Category, audience, proof points, voice. The strategic ground the visual system stands on." },
      { title: "Logo System", description: "Primary mark, secondary marks, lock-ups, clear space, minimum sizes, what not to do." },
      { title: "Application Library", description: "Worked examples across investor deck, social, web, email, print. Shows the system in deployment." },
    ],
    outcomes: [
      { metric: "3", label: "Complete Systems" },
      { metric: "39pp", label: "Total Brand Book Pages" },
      { metric: "4+", label: "Tools Mastered" },
    ],
    nextSlug: "idp",
    nextClient: "Ignite Digital Partners",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const stats = [
  { value: "9+", label: "Years Senior Marketing" },
  { value: "5", label: "Sectors Served" },
  { value: "3", label: "Continents Delivered In" },
  { value: "15+", label: "Brands Built" },
];

export const capabilities = [
  { roman: "i.", title: "Brand Strategy", detail: "Positioning, narrative architecture, brand books, naming, voice systems." },
  { roman: "ii.", title: "Investor Relations", detail: "Decks, ecosystem build, capital markets storytelling, listed-company comms." },
  { roman: "iii.", title: "Performance Marketing", detail: "Funnel design, paid acquisition, lead generation, conversion optimisation." },
  { roman: "iv.", title: "Content & Editorial", detail: "LinkedIn-led content engines, long-form thought leadership, branded carousels." },
  { roman: "v.", title: "Visual Design", detail: "Hands-on in Canva, PowerPoint, Photoshop, Illustrator. Decks, posts, marks." },
  { roman: "vi.", title: "AI & Automation", detail: "n8n, Notion, Claude API. Content pipelines, IR workflows, agency tooling." },
  { roman: "vii.", title: "Web & Product", detail: "Sites, landing pages, SaaS shipped on Lovable, Make, Supabase, Stripe." },
  { roman: "viii.", title: "Team & Operations", detail: "Agency leadership, vendor management, process design, client ownership." },
];

export const experience = [
  {
    period: "Jan 2026 — Present",
    title: "Executive Partner",
    company: "Ignite Digital Partners",
    note: "Founder",
    url: "https://ignitedigitalpartners.com",
  },
  {
    period: "Oct 2024 — Jan 2026",
    title: "Chief Marketing Officer",
    company: "Ignite Digital Partners",
    note: "",
    url: "https://ignitedigitalpartners.com",
  },
  {
    period: "2024",
    title: "Director & Marketing Lead",
    company: "MaltaMove.com",
    note: "",
    url: undefined,
  },
  {
    period: "Jun 2021 — Sep 2024",
    title: "Senior Marketing",
    company: "Moovly",
    note: "SaaS · Video Tech",
    url: "https://www.moovly.com",
  },
  {
    period: "2017 — 2021",
    title: "Marketing & Brand",
    company: "Earlier Roles",
    note: "B2B · Tech · Agency",
    url: undefined,
  },
];

export const operatingEnvironments = [
  { title: "Natural Resources", detail: "Listed companies, exploration, capital raises." },
  { title: "Industrial & Trade", detail: "Lean communication teams, complex stakeholders." },
  { title: "Growth-Stage & Corporate", detail: "B2B SaaS, scale-ups, credibility-building." },
  { title: "Capital Markets & IR", detail: "TSX, TSX-V, and ASX-listed clients." },
  { title: "Hospitality & Lifestyle", detail: "Consumer-facing brand and growth." },
];
