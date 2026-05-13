// Charlotte Smith Portfolio 2026, Data Layer
// Design: Cinematic Dark Luxury | Palette: Obsidian · Copper · Cream
// Brand assets: Real IDP logos, hero images, live site screenshots, Canva design pages

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
  liveScreenshot?: string; // real live website screenshot
  nextSlug?: string;
  nextClient?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "idp",
    number: "01",
    client: "Ignite Digital Partners",
    tagline: "Communication systems that build credibility, built from the ground up.",
    category: "Founding Brand System & Go-To-Market",
    period: "Oct 2024 to Present",
    scope: "Brand identity, methodology, website, GTM, content engine",
    description:
      "Co-founded and built IDP, a Canadian B2B marketing firm that replaces episodic campaigns with communication infrastructure. Designed the brand, the Ignition Loop methodology, the Ecosystem framework, and the full go-to-market system.",
    heroImage: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/hero-liquid-metal.jpg",
    liveScreenshot: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_home.png",
    websiteUrl: "https://www.ignitedigitalpartners.com",
    color: "#E8650A",
    brandColors: [
      { name: "Ignite Orange", hex: "#E8650A" },
      { name: "Copper", hex: "#C87941" },
      { name: "Obsidian", hex: "#0A0A0A" },
      { name: "Cream", hex: "#F2EFEA" },
    ],
    tags: ["Co-Founder", "Brand Strategy", "Methodology Design", "GTM", "Content Engine"],
    brief:
      "Most B2B operators in capital-intensive sectors inherit a marketing function assembled in pieces, a website built one year, a CRM the next, an agency for a campaign, an analyst for a quarter. Together they produce a fragmented signal that erodes credibility with investors, partners, and customers. IDP was founded to build the alternative: communication systems that replace episodic campaigns with infrastructure that builds over time.",
    deliverables: [
      {
        title: "The Ignition Loop Methodology",
        description: "A four-phase continuous intelligence system: Clarity, Activation, Growth, Insight. Each phase feeds measurable intelligence into the next, creating a cycle that strengthens with every iteration. Month 1: Baseline and Clarity. Month 2: System Activation. Months 3 6: Growth and Optimisation. Ongoing: Intelligence and Refinement.",
      },
      {
        title: "The Ecosystem Framework",
        description: "The customer journey architecture: Awareness, Engagement, Consideration, Advocacy. Every stage measured, optimised, and connected to the next. The Confidence Funnel maps KPIs at each stage including Reach, Time on Site, Lead Quality, Win Rate, NPS, and Retention.",
      },
      {
        title: "Visual Identity System",
        description: "Deep obsidian backgrounds, Ignite Orange (#E8650A) as the primary action colour, liquid-metal and flame hero aesthetics. The flame mark reads as institutional and premium from first impression. Full brand guidelines deck built in Canva with Montserrat + Open Sans typography.",
      },
      {
        title: "Full Website Build",
        description: "ignitedigitalpartners.com: a React-based site with animated Ignition Loop diagram, interactive Confidence Funnel, Ecosystem node map, and Intelligence Hub. Built to convert B2B founders and capital-markets operators.",
      },
      {
        title: "Service Architecture",
        description: "Spark Session intake process, the Ecosystem deliverable suite, and three operating environments: Natural Resources, Industrial and Trade, Growth-Stage and Corporate. Each environment has its own messaging framework.",
      },
      {
        title: "Content and Intelligence Engine",
        description: "Ignite IQ intelligence layer, the Intelligence Hub content platform, and a LinkedIn-led content programme structured around four pillars: System Thinking, Capital Confidence, Operator Intelligence, and Market Commentary.",
      },
    ],
    outcomes: [
      { metric: "4", label: "Ignition Loop Phases" },
      { metric: "4", label: "Confidence Funnel Stages" },
      { metric: "3", label: "Operating Environments" },
    ],
    canvaGallery: [
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_home.png", caption: "ignitedigitalpartners.com: Communication Systems That Build Credibility" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_ecosystem.png", caption: "The Ecosystem Page: How Attention Becomes Advocacy" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/hero-ignition-loop.jpg", caption: "The Ignition Loop: Four-Phase Methodology Visual" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/hero-network-nodes.jpg", caption: "IDP Network Intelligence: Brand Visual Identity" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_proposal_p1.png", caption: "IDP Canva Proposal Template: Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_proposal_p2.png", caption: "IDP Proposal: Executive Summary" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_proposal_p3.png", caption: "IDP Proposal: Services and Methodology" },
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
    heroImage: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_site.png",
    liveScreenshot: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_site.png",
    websiteUrl: "https://www.generalcoppergold.com",
    color: "#B06838",
    brandColors: [
      { name: "Copper", hex: "#B06838" },
      { name: "Gold", hex: "#B09048" },
      { name: "Charcoal Black", hex: "#202028" },
      { name: "Off-White", hex: "#F8F5F0" },
    ],
    tags: ["Investor Relations", "Brand System", "Capital Markets", "TSX-V"],
    brief:
      "GCG had the geology. The challenge was building the capital narrative around it and delivering it in a format that would survive the scrutiny of TSX-V investors. Zero margin for amateur design. The brand needed to feel premium, engineered, and unmistakable. A resource company that commands institutional attention.",
    deliverables: [
      { title: "Complete Brand System", description: "Charcoal Black (#202028), Deep Copper (#683018), Gold (#B09048) palette. Montserrat Bold display. Full 17-page brand guidelines deck built in Canva covering logo usage, colour system, typography, and application examples." },
      { title: "Investor Social Templates", description: "X (Twitter) investor social template series. Branded for capital markets distribution with copper-gold gradient treatment and Montserrat typography." },
      { title: "Brand Standards Deck", description: "17-slide brand guidelines covering logo usage, colour system, typography, and application examples. Designed to be used by sales teams, designers, and external partners." },
      { title: "Geological Cross-Section", description: "Custom SVG of the gold system at depth, with draw-on animation showing the structural trap and mineralised zones." },
      { title: "Belt Map & Jurisdiction Panel", description: "District-context map with adjacent properties, plus Namibia investment-grade jurisdiction explainer." },
      { title: "Brand Collateral", description: "Letterhead, social media templates, LinkedIn banner. Full brand-deployment kit for capital markets use." },
    ],
    outcomes: [
      { metric: "17pp", label: "Brand Book" },
      { metric: "14", label: "Investor Slides" },
      { metric: "6+", label: "Collateral Pieces" },
    ],
    canvaGallery: [
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_site.png", caption: "generalcoppergold.com: Live Website" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_brand_p1.png", caption: "GCG Brand Standards: Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_brand_p2.png", caption: "GCG Brand Standards: Colour System and Typography" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_brand_p3.png", caption: "GCG Brand Standards: Logo Usage Rules" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_social_p1.png", caption: "GCG X (Twitter) Investor Social Template" },
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
    heroImage: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_site.png",
    liveScreenshot: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_site.png",
    websiteUrl: "https://ezsywebs.com",
    color: "#2563EB",
    brandColors: [
      { name: "Brand Blue", hex: "#2563EB" },
      { name: "Deep Navy", hex: "#071236" },
      { name: "Navy Blue", hex: "#0D2257" },
      { name: "Steel Blue", hex: "#5B6FA6" },
    ],
    tags: ["SaaS", "Product Launch", "Automation", "Brand Identity"],
    brief:
      "Agencies pitch website redesigns every day. The demo stage is where deals stall. Ezsy Webs solves exactly that: paste a URL, get a fully rendered modern redesign within minutes. The brand had to feel credible, tech-forward, and instantly trustworthy. A product that agencies could put in front of clients on day one.",
    deliverables: [
      { title: "The Product Itself", description: "Demo platform shipped on Lovable. URL-to-redesign pipeline. Tiered output: Homepage Refresh, Core Growth, Authority Build." },
      { title: "Complete Brand Identity", description: "11-slide brand guidelines deck in Canva. Navy (#071236) and Brand Blue (#2563EB) palette. Montserrat typography throughout. Planet/orbit logo mark." },
      { title: "Marketing Site & Copy", description: "ezsywebs.com: full positioning, three pricing tiers, agency-facing messaging, conversion path." },
      { title: "Automation Backend", description: "Make.com workflows. Supabase database. Resend transactional email. Stripe billing. End-to-end integrated stack." },
      { title: "Content Engine", description: "n8n + Notion + Buffer + Claude API. LinkedIn and Instagram posting on a defined cadence with zero daily input." },
      { title: "Pricing & Go-To-Market", description: "Three productised tiers. Agency-targeted positioning. Platform-discovery effect drove early signups." },
    ],
    outcomes: [
      { metric: "11pp", label: "Brand Book" },
      { metric: "3×", label: "Pricing Tiers" },
      { metric: "7+", label: "Tools Integrated" },
    ],
    canvaGallery: [
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_site.png", caption: "ezsywebs.com: Live Website" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_brand_p1.png", caption: "Ezsy Webs Brand Guidelines: Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_brand_p2.png", caption: "Ezsy Webs Brand Guidelines: Visual Identity System" },
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
    period: "2024 to 2026",
    scope: "Brand, content, growth, IR",
    description:
      "Brand and growth work across Vertui, Roc-Kon Concrete, Elev8 ProspectorAI, Quest Critical Metals, Oroco Resource Corp, and Moovly. Different sectors, one operating system.",
    heroImage: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/vertui_site.png",
    liveScreenshot: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/vertui_site.png",
    websiteUrl: undefined,
    color: "#2AA8A0",
    brandColors: [
      { name: "Vertui Teal", hex: "#2AA8A0" },
      { name: "Roc-Kon Pink", hex: "#E91E8C" },
      { name: "Elev8 Teal", hex: "#00695C" },
      { name: "Elev8 Gold", hex: "#FFA000" },
    ],
    tags: ["Brand Strategy", "Growth Marketing", "Multi-Sector", "Lead Gen"],
    brief:
      "Working across six distinct companies in two years sharpened one thing above all: a repeatable operating system for marketing engagements. The discipline transfers. What changes is the language, the design accent, and the commercial benchmark.",
    deliverables: [
      { title: "Vertui Horticulture", description: "Full B2C marketing ecosystem proposal. Teal-to-lime-green brand identity. Channel plan, content strategy, and growth roadmap for a horticulture brand." },
      { title: "Roc-Kon Concrete", description: "Complete social media and marketing strategy plan. Content pillars, platform strategy, and brand revival for a concrete services company." },
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
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/vertui_site.png", caption: "vertui.com: Live Website" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/vertui_proposal_p1.png", caption: "Vertui Marketing B2C Ecosystem: Full Proposal Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/vertui_proposal_p2.png", caption: "Vertui Marketing Ecosystem: Strategy Overview" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/vertui_proposal_p3.png", caption: "Vertui Marketing Ecosystem: Channel Plan" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_site.png", caption: "roc-kon-revive.vercel.app: Live Website" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_strategy_p1.png", caption: "Roc-Kon Concrete Social Media Strategy Plan: Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_strategy_p2.png", caption: "Roc-Kon Concrete: Strategy Objectives" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_ecosystem_p1.png", caption: "Roc-Kon Complete Marketing Ecosystem: Overview" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/elev8_social_p1.png", caption: "Elev8 ProspectorAI: Brand Identity" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/elev8_social_p2.png", caption: "Elev8 ProspectorAI: Lead Enrichment Social Post" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/elev8_social_p3.png", caption: "Elev8 ProspectorAI: Social Content Series" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/project_overview_1.png", caption: "Project Overview: Client Strategy Slide" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/project_overview_2.png", caption: "Project Overview: Campaign Architecture" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/project_overview_3.png", caption: "Project Overview: Results and Outcomes" },
    ],
    nextSlug: "social",
    nextClient: "Always-On Content Engine",
  },
  {
    slug: "social",
    number: "05",
    client: "Always-On Content Engine",
    tagline: "An 8-week content engine built to build credibility over time.",
    category: "Social Campaigns · LinkedIn-Led",
    period: "2025 to 2026",
    scope: "Strategy, design, motion, copy",
    description:
      "Four content pillars. Branded carousels, motion assets, consistent rhythm. Built for B2B leadership audiences on LinkedIn.",
    heroImage: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/fire-particles.jpg",
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
      "LinkedIn for B2B leadership audiences is a craft. Most social marketers treat it like B2C. The tone is wrong, the visual language is wrong, the cadence is wrong. IDP's content engine had to land with executives who can spot generic content in seconds. The goal was a system that runs without daily input and builds credibility over time.",
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
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_strategy_p1.png", caption: "Roc-Kon Concrete: Social Media Strategy Plan" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_strategy_p2.png", caption: "Roc-Kon Concrete: Content Objectives" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/rockon_strategy_p3.png", caption: "Roc-Kon Concrete: Platform Strategy" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/elev8_social_p2.png", caption: "Elev8 ProspectorAI: LinkedIn Social Post" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/elev8_social_p3.png", caption: "Elev8 ProspectorAI: Social Content Series" },
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
    heroImage: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/hero-network-nodes.jpg",
    websiteUrl: undefined,
    color: "#B06838",
    brandColors: [
      { name: "IDP Orange", hex: "#E8650A" },
      { name: "GCG Copper", hex: "#B06838" },
      { name: "Ezsy Navy", hex: "#071236" },
      { name: "Ezsy Blue", hex: "#2563EB" },
    ],
    tags: ["Brand Identity", "Design Systems", "Typography", "Guidelines"],
    brief:
      "Most brand guidelines decks die in someone's Downloads folder. The systems I build are designed to be used by sales teams, designers, founders, and external partners. A brand system is an operating manual, not a decoration. Three complete systems built across B2B marketing, capital markets mining, and B2B SaaS.",
    deliverables: [
      { title: "IDP Brand System", description: "Obsidian and copper. The flame mark. Liquid-metal hero aesthetic. Montserrat + Open Sans typography. 13-page brand book for the Ecosystem framework." },
      { title: "GCG Brand System", description: "Charcoal Black (#202028), Copper (#B06838), Gold (#B09048). Montserrat Bold. 17-page brand system for a TSX-V listed exploration company." },
      { title: "Ezsy Webs Brand System", description: "Deep Navy (#071236) and Brand Blue (#2563EB). Montserrat throughout. 11-page brand system for a product-led B2B SaaS." },
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
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_brand_p1.png", caption: "GCG Brand System: Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_brand_p2.png", caption: "GCG Brand System: Colour and Typography" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/gcg_brand_p3.png", caption: "GCG Brand System: Logo Standards" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_brand_p1.png", caption: "Ezsy Webs Brand System: Cover" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/ezsy_brand_p2.png", caption: "Ezsy Webs Brand System: Visual Identity" },
      { url: "https://raw.githubusercontent.com/IgniteDigitalPartners/charlotte-portfolio-2026/main/public/assets/idp_proposal_p1.png", caption: "IDP Proposal Template: Branded System in Action" },
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
    period: "Jan 2026 to Present",
    title: "Executive Partner",
    company: "Ignite Digital Partners",
    note: "Founder",
    url: "https://ignitedigitalpartners.com",
  },
  {
    period: "Oct 2024 to Jan 2026",
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
    period: "Jun 2021 to Sep 2024",
    title: "Senior Marketing",
    company: "Moovly",
    note: "SaaS · Video Tech",
    url: "https://www.moovly.com",
  },
  {
    period: "2017 to 2021",
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
