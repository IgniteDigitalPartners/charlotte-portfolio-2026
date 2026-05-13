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
  brandColors: { name: string; hex: string }[];
  tags: string[];
  brief: string;
  deliverables: { title: string; description: string }[];
  outcomes?: { metric: string; label: string }[];
  canvaGallery?: { url: string; caption: string }[];
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
    heroImage: "/manus-storage/idp_proposal_p1_b07cab7d.png",
    websiteUrl: "https://ignitedigitalpartners.com",
    color: "#FF6B00",
    brandColors: [
      { name: "Ignite Orange", hex: "#FF6B00" },
      { name: "Teal", hex: "#0097A7" },
      { name: "Obsidian", hex: "#1A1A2E" },
      { name: "Cream", hex: "#FAFAFA" },
    ],
    tags: ["Brand Strategy", "GTM", "Content Engine", "Identity"],
    brief:
      "Most B2B organisations inherit a marketing function assembled in pieces. IDP was founded to replace episodic campaigns with infrastructure. Not louder communication — better communication, built to compound.",
    deliverables: [
      { title: "The Ecosystem Framework", description: "Customer journey: Awareness, Engagement, Consideration, Advocacy. The 'what' of the system." },
      { title: "The Ignition Loop", description: "Internal engine: Clarity, Activation, Growth, Insight. Loops back continuously instead of resetting." },
      { title: "Visual Identity System", description: "Obsidian and copper palette. Flame mark. Liquid-metal hero aesthetic. Built to read as institutional from first impression." },
      { title: "13-Slide Brand Guidelines", description: "Complete brand book built in Canva. Logo rules, palette, typography, hero library, voice and tone." },
      { title: "Service Architecture", description: "Spark Session intake, the Ecosystem deliverable suite, operating environments segmentation." },
      { title: "Content & Intelligence Engine", description: "Ignite IQ, the Intelligence Hub, and a LinkedIn-led content programme that compounds authority." },
    ],
    outcomes: [
      { metric: "13pp", label: "Brand Book" },
      { metric: "15pp", label: "Proposal Template" },
      { metric: "4×", label: "Content Pillars" },
    ],
    canvaGallery: [
      { url: "/manus-storage/idp_proposal_p1_b07cab7d.png", caption: "Comprehensive Marketing Proposal Template — Cover" },
      { url: "/manus-storage/idp_proposal_p2_013d1037.png", caption: "IDP Proposal — Executive Summary Page" },
      { url: "/manus-storage/idp_proposal_p3_c4bdc49b.png", caption: "IDP Proposal — Services Overview" },
    ],
    nextSlug: "gcg",
    nextClient: "General Copper Gold Corp.",
  },
  {
    slug: "gcg",
    number: "02",
    client: "General Copper Gold Corp.",
    tagline: "A premium brand system built for the capital markets.",
    category: "Capital Markets Brand · TSX-V",
    period: "2025",
    scope: "Brand system, investor deck, social templates",
    description:
      "Complete brand system, investor presentation, and social media templates for a TSX-V listed gold exploration company. Premium, engineered, unmistakable.",
    heroImage: "/manus-storage/gcg_brand_p1_5c0e65c5.png",
    websiteUrl: "https://generalcoppergold.com",
    color: "#B87333",
    brandColors: [
      { name: "Copper", hex: "#B87333" },
      { name: "Gold", hex: "#C9A84C" },
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "White", hex: "#FFFFFF" },
    ],
    tags: ["Investor Relations", "Brand System", "Capital Markets", "TSX-V"],
    brief:
      "GCG had the geology. The challenge was building the capital narrative around it and delivering it in a format that would survive the scrutiny of TSX-V investors. Zero margin for amateur design. The brand needed to feel premium, engineered, and unmistakable.",
    deliverables: [
      { title: "Complete Brand System", description: "Charcoal, Copper, Gold palette. Montserrat Bold display. Full 17-page brand guidelines deck built in Canva." },
      { title: "Investor Social Templates", description: "X (Twitter) investor social template series. Branded for capital markets distribution." },
      { title: "Brand Standards Deck", description: "17-slide brand guidelines covering logo usage, colour system, typography, and application examples." },
      { title: "Geological Cross-Section", description: "Custom SVG of the gold system at depth, with draw-on animation showing the structural trap and mineralised zones." },
      { title: "Belt Map & Jurisdiction Panel", description: "District-context map with adjacent properties, plus Namibia investment-grade jurisdiction explainer." },
      { title: "Brand Collateral", description: "Letterhead, social media templates, LinkedIn banner. Full brand-deployment kit." },
    ],
    outcomes: [
      { metric: "17pp", label: "Brand Book" },
      { metric: "14", label: "Investor Slides" },
      { metric: "6+", label: "Collateral Pieces" },
    ],
    canvaGallery: [
      { url: "/manus-storage/gcg_brand_p1_5c0e65c5.png", caption: "GCG Brand Standards — Cover: Premium, Engineered, Unmistakable" },
      { url: "/manus-storage/gcg_brand_p2_a717f1b1.png", caption: "GCG Brand Standards — Colour System & Typography" },
      { url: "/manus-storage/gcg_brand_p3_2c90e31b.png", caption: "GCG Brand Standards — Logo Usage Rules" },
      { url: "/manus-storage/gcg_social_p1_578437da.png", caption: "GCG X (Twitter) Investor Social Template" },
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
    heroImage: "/manus-storage/ezsy_brand_p1_81529f18.png",
    websiteUrl: "https://ezsywebs.com",
    color: "#1565C0",
    brandColors: [
      { name: "Navy", hex: "#1A237E" },
      { name: "Electric Blue", hex: "#2196F3" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Dark", hex: "#0D0D0D" },
    ],
    tags: ["SaaS", "Product Launch", "Automation", "Brand Identity"],
    brief:
      "Agencies pitch website redesigns every day. The demo stage is where deals stall. Ezsy Webs solves exactly that: paste a URL, get a fully rendered modern redesign within minutes. The brand had to feel credible, tech-forward, and instantly trustworthy.",
    deliverables: [
      { title: "The Product Itself", description: "Demo platform shipped on Lovable. URL-to-redesign pipeline. Tiered output: Homepage Refresh, Core Growth, Authority Build." },
      { title: "Complete Brand Identity", description: "11-slide brand guidelines deck in Canva. Navy and electric blue palette. Montserrat typography. Planet/orbit logo mark." },
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
    canvaGallery: [
      { url: "/manus-storage/ezsy_brand_p1_81529f18.png", caption: "Ezsy Webs Brand Guidelines — Cover: Refresh Your Website" },
      { url: "/manus-storage/ezsy_brand_p2_013d1037.png", caption: "Ezsy Webs Brand Guidelines — Visual Identity System" },
    ],
    nextSlug: "multi-client",
    nextClient: "Client Portfolio",
  },
  {
    slug: "multi-client",
    number: "04",
    client: "Multi-Client Portfolio",
    tagline: "Six brands, one operating system.",
    category: "Brand & Growth · 6 Brands · 4 Sectors",
    period: "2024 — 2026",
    scope: "Brand, content, growth, IR",
    description:
      "Brand and growth work across Vertui, Roc-Kon Concrete, Elev8 ProspectorAI, Quest Critical Metals, Oroco Resource Corp, and Moovly. Different sectors, one operating system.",
    heroImage: "/manus-storage/vertui_proposal_p1_474d7a87.png",
    websiteUrl: undefined,
    color: "#4CAF50",
    brandColors: [
      { name: "Vertui Green", hex: "#4CAF50" },
      { name: "Roc-Kon Pink", hex: "#E91E8C" },
      { name: "Elev8 Teal", hex: "#00695C" },
      { name: "Elev8 Gold", hex: "#FFA000" },
    ],
    tags: ["Brand Strategy", "Growth Marketing", "Multi-Sector", "Lead Gen"],
    brief:
      "Working across six distinct companies in two years sharpened one thing above all: a repeatable operating system for marketing engagements. The discipline transfers. What changes is the language, the design accent, and the commercial benchmark.",
    deliverables: [
      { title: "Vertui Horticulture", description: "Full B2C ecosystem proposal, Amazon launch strategy, packaging direction, paid media plan. Translated a complex product range into a clear, conversion-ready narrative." },
      { title: "Roc-Kon Concrete", description: "Complete marketing ecosystem overview, social media strategy, SEO, lead generation, CRM automation. LinkedIn content strategy and carousel design for technical buyers." },
      { title: "Elev8 ProspectorAI", description: "Brand positioning, social media content series, AI-led automation architecture. Social posts for the ProspectorAI lead enrichment platform." },
      { title: "Quest Critical Metals", description: "Rebrand, investor awareness, website, social rollout for a critical metals exploration company." },
      { title: "Oroco Resource Corp", description: "3-month digital marketing strategy and investor communications for a TSX-listed resource company." },
      { title: "Moovly", description: "Senior marketing role at a SaaS video creation platform. Demand generation, content, and brand campaigns." },
    ],
    outcomes: [
      { metric: "6+", label: "Brands Served" },
      { metric: "4", label: "Sectors" },
      { metric: "1", label: "Operating System" },
    ],
    canvaGallery: [
      { url: "/manus-storage/vertui_proposal_p1_474d7a87.png", caption: "Vertui Marketing B2C Ecosystem — Full Proposal Cover" },
      { url: "/manus-storage/vertui_proposal_p2_9bd90aad.png", caption: "Vertui Marketing Ecosystem — Strategy Overview" },
      { url: "/manus-storage/vertui_proposal_p3_124b2eff.png", caption: "Vertui Marketing Ecosystem — Channel Plan" },
      { url: "/manus-storage/rockon_strategy_p1_45c79cb0.png", caption: "Roc-Kon Concrete Social Media & Strategy Plan — Cover" },
      { url: "/manus-storage/rockon_strategy_p2_45c79cb0.png", caption: "Roc-Kon Concrete — Strategy Objectives" },
      { url: "/manus-storage/rockon_ecosystem_p1_9a793393.png", caption: "Roc-Kon Complete Marketing Ecosystem — Overview" },
      { url: "/manus-storage/elev8_social_p1_93979f1b.png", caption: "Elev8 ProspectorAI — Brand Identity" },
      { url: "/manus-storage/elev8_social_p2_7c3fbfd1.png", caption: "Elev8 ProspectorAI — Lead Enrichment Social Post" },
      { url: "/manus-storage/elev8_social_p3_d39bd89c.png", caption: "Elev8 ProspectorAI — Social Content Series" },
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
    heroImage: "/manus-storage/rockon_strategy_p3_866e5a05.png",
    websiteUrl: undefined,
    color: "#E91E8C",
    brandColors: [
      { name: "Ignite Orange", hex: "#FF6B00" },
      { name: "Roc-Kon Pink", hex: "#E91E8C" },
      { name: "Elev8 Teal", hex: "#00695C" },
      { name: "Obsidian", hex: "#1A1A2E" },
    ],
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
    canvaGallery: [
      { url: "/manus-storage/rockon_strategy_p1_45c79cb0.png", caption: "Roc-Kon Concrete — Social Media Strategy Plan" },
      { url: "/manus-storage/rockon_strategy_p2_45c79cb0.png", caption: "Roc-Kon Concrete — Content Objectives" },
      { url: "/manus-storage/rockon_strategy_p3_866e5a05.png", caption: "Roc-Kon Concrete — Platform Strategy" },
      { url: "/manus-storage/elev8_social_p2_7c3fbfd1.png", caption: "Elev8 ProspectorAI — LinkedIn Social Post" },
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
    heroImage: "/manus-storage/gcg_brand_p2_a717f1b1.png",
    websiteUrl: undefined,
    color: "#B87333",
    brandColors: [
      { name: "IDP Orange", hex: "#FF6B00" },
      { name: "GCG Copper", hex: "#B87333" },
      { name: "Ezsy Navy", hex: "#1A237E" },
      { name: "Ezsy Blue", hex: "#2196F3" },
    ],
    tags: ["Brand Identity", "Design Systems", "Typography", "Guidelines"],
    brief:
      "Most brand guidelines decks die in someone's Downloads folder. The systems I build are designed to be used by sales teams, designers, founders, and external partners. A brand system is an operating manual, not a decoration.",
    deliverables: [
      { title: "IDP Brand System", description: "Obsidian and copper. The flame mark. Liquid-metal hero aesthetic. 13-page brand book for the Ecosystem framework." },
      { title: "GCG Brand System", description: "Charcoal, copper, gold. Montserrat Bold. 17-page brand system for a TSX-V listed exploration company." },
      { title: "Ezsy Webs Brand System", description: "Navy and electric blue. Montserrat throughout. 11-page brand system for a product-led B2B SaaS." },
      { title: "Colour System Architecture", description: "Primary, secondary, and neutral palettes. Contrast ratios. Dark and light mode application rules." },
      { title: "Typography System", description: "Display, body, and caption hierarchy. Web-safe and brand-font pairings. Size scale and line-height rules." },
      { title: "Logo System", description: "Primary mark, secondary marks, lock-ups, clear space, minimum sizes, what not to do." },
      { title: "Application Library", description: "Worked examples across investor deck, social, web, email, print. Shows the system in deployment." },
    ],
    outcomes: [
      { metric: "3", label: "Complete Systems" },
      { metric: "41pp", label: "Total Brand Book Pages" },
      { metric: "4+", label: "Tools Mastered" },
    ],
    canvaGallery: [
      { url: "/manus-storage/gcg_brand_p1_5c0e65c5.png", caption: "GCG Brand System — Cover: Premium, Engineered, Unmistakable" },
      { url: "/manus-storage/gcg_brand_p2_a717f1b1.png", caption: "GCG Brand System — Colour & Typography" },
      { url: "/manus-storage/gcg_brand_p3_2c90e31b.png", caption: "GCG Brand System — Logo Standards" },
      { url: "/manus-storage/ezsy_brand_p1_81529f18.png", caption: "Ezsy Webs Brand System — Cover" },
      { url: "/manus-storage/ezsy_brand_p2_013d1037.png", caption: "Ezsy Webs Brand System — Visual Identity" },
      { url: "/manus-storage/idp_proposal_p1_b07cab7d.png", caption: "IDP Proposal Template — Branded System in Action" },
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
