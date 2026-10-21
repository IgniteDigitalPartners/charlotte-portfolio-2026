export interface Service {
  slug: string;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  includes: string[];
  forYou: string[];
  ways: { packages?: string[]; bespoke: string; retainer?: string };
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "social-media",
    name: "Social media design, content & management",
    short: "Polished graphics, thoughtful content and calm, consistent management.",
    metaTitle: "Social Media Design & Management in Malta | Charlotte Smith",
    metaDescription:
      "On-brand social media graphics, content and management for Malta businesses. Fixed-price design packs from €45, or ongoing monthly support.",
    intro: [
      "Your social channels are often the first place people check before they get in touch. I make sure what they find looks polished, sounds like you and shows up consistently.",
      "Start with a fixed-price design pack if you just need graphics, or let me plan, create and manage your content each month.",
    ],
    includes: [
      "Branded post, carousel and story graphics",
      "Feed templates and editable Canva files",
      "Content pillars and a monthly content plan",
      "Captions written in your brand voice",
      "Scheduling and community management",
      "Social profile audits with clear recommendations",
    ],
    forYou: [
      "You post when you remember, and it shows",
      "Your graphics don't match the quality of your work",
      "You want a feed that looks considered, without doing it yourself",
    ],
    ways: {
      packages: ["starter-social", "social-content", "complete-content", "social-audit"],
      bespoke: "A one-off content shoot plan, launch campaign or full feed refresh.",
      retainer: "Monthly content creation, scheduling and management.",
    },
    faqs: [
      { q: "Do the design packs include captions or posting?", a: "No. The packs cover graphic design only. Copywriting, posting and scheduling are available as separate services or as part of a monthly retainer." },
      { q: "Which platforms do you design for?", a: "Instagram, Facebook and LinkedIn, among others. Each graphic in a pack is designed for one platform size of your choice." },
    ],
  },
  {
    slug: "brand-strategy-identity",
    name: "Brand strategy & identity",
    short: "Positioning, logo, palette and a brand guide your whole team can follow.",
    metaTitle: "Brand Strategy & Logo Design in Malta | Charlotte Smith",
    metaDescription:
      "Brand strategy, logo design and visual identity for businesses in Malta and beyond. Positioning, palettes, typography and practical brand guidelines.",
    intro: [
      "A strong brand makes every other piece of marketing easier. People recognise you, trust you sooner and understand what you stand for.",
      "I start with strategy: who you serve, what makes you different and how you should sound. Then I design the identity that carries it, and document it so it stays consistent.",
    ],
    includes: [
      "Brand positioning and messaging",
      "Logo design and logo variations",
      "Colour palette and typography",
      "Brand guidelines document",
      "Packaging and print direction",
      "Templates for social, documents and presentations",
    ],
    forYou: [
      "You're launching a new business or product",
      "Your brand has grown in pieces and no longer feels joined up",
      "You need guidelines so others can use your brand correctly",
    ],
    ways: {
      bespoke: "Brand identities are quoted to your scope, from a logo refresh to a complete brand system.",
    },
    faqs: [
      { q: "How long does a brand identity take?", a: "It depends on scope. A focused logo and palette project is shorter than a full brand system with guidelines and templates. I give you a clear timeline with your quote." },
      { q: "Will I own the final files?", a: "Yes. You receive the final logo files and brand assets to use across your business." },
    ],
  },
  {
    slug: "marketing-strategy-consultancy",
    name: "Marketing strategy & consultancy",
    short: "A clear plan, the right channels and an experienced eye on what matters.",
    metaTitle: "Marketing Consultant in Malta | Strategy Sessions & Plans | Charlotte Smith",
    metaDescription:
      "Marketing strategy and consultancy from a Malta-based consultant with 9+ years' experience. Book a €95 strategy session or a full marketing plan.",
    intro: [
      "Most businesses don't need more marketing. They need the right marketing, in the right order. I help you decide where to focus and what to stop doing.",
      "Book a single strategy session for a clear action list, or work with me on a full plan with channels, content and measurement.",
    ],
    includes: [
      "Marketing audits and competitor reviews",
      "Positioning and customer journey mapping",
      "Channel plans with priorities and budgets",
      "Content strategy and pillars",
      "KPIs and simple reporting",
      "Ongoing advice as a fractional marketing lead",
    ],
    forYou: [
      "You're doing lots of marketing and not sure what's working",
      "You need a plan before you spend on ads or a new website",
      "You want senior marketing advice without a full-time hire",
    ],
    ways: {
      packages: ["strategy-session", "landing-page-review", "social-audit"],
      bespoke: "A full marketing plan or audit, scoped to your business.",
      retainer: "Monthly consultancy as your part-time marketing lead.",
    },
    faqs: [
      { q: "What happens in a strategy session?", a: "We spend 60 minutes on your goals and current marketing. Afterwards you receive a written summary with prioritised actions." },
      { q: "Do you work with businesses outside Malta?", a: "Yes. I'm based in Malta and work with clients internationally online." },
    ],
  },
  {
    slug: "website-design",
    name: "Website design, optimisation & updates",
    short: "Elegant sites that load fast, read clearly and invite people to get in touch.",
    metaTitle: "Website Design & Website Support in Malta | Charlotte Smith",
    metaDescription:
      "Website design, landing pages, optimisation and updates for Malta businesses. Fixed-price website support from €45 and bespoke website builds.",
    intro: [
      "Your website should do more than look good. It should make it obvious what you offer, build trust quickly and make getting in touch effortless.",
      "I design and build new sites, refresh existing ones and handle the smaller updates that keep a site current.",
    ],
    includes: [
      "New website design and build",
      "Landing pages for campaigns and offers",
      "Updates, fixes and improvements to existing sites",
      "Speed, mobile and accessibility improvements",
      "Clearer messaging and calls to action",
      "On-page SEO foundations",
    ],
    forYou: [
      "Your website feels dated or doesn't reflect your quality",
      "Visitors arrive but don't enquire",
      "You need small changes made quickly and properly",
    ],
    ways: {
      packages: ["website-quick-fix", "website-update", "website-improvement", "landing-page-review"],
      bespoke: "New websites and redesigns, quoted to your pages and features.",
      retainer: "Monthly website care, updates and optimisation.",
    },
    faqs: [
      { q: "Which platforms do you work with?", a: "I work across the popular website platforms and also build custom sites when a project needs more flexibility. Tell me what your site runs on and I'll confirm." },
      { q: "How do the website support packs work?", a: "We agree your task list before you buy, so you know exactly what's covered in your hours." },
    ],
  },
  {
    slug: "seo",
    name: "SEO",
    short: "Structure, content and local search, so the right people find you first.",
    metaTitle: "SEO Services in Malta | Local SEO & Google Business Profile | Charlotte Smith",
    metaDescription:
      "SEO for Malta businesses: technical fixes, on-page optimisation, content and Google Business Profile setup to help local clients find you first.",
    intro: [
      "When someone searches for what you do, you want to be the business they find. Good SEO is a mix of a sound website, useful content and a strong local presence.",
      "I focus on the changes that make the biggest difference for your type of business, and explain them in plain language.",
    ],
    includes: [
      "SEO audits and keyword research",
      "Page titles, descriptions and headings",
      "Technical fixes for speed and indexing",
      "Google Business Profile setup and optimisation",
      "Service and location page content",
      "Monthly progress reporting",
    ],
    forYou: [
      "Competitors appear above you on Google",
      "You rely on referrals and want a steadier flow of enquiries",
      "Your Google Business Profile is incomplete or out of date",
    ],
    ways: {
      bespoke: "A one-off SEO audit and fix list, or a local SEO setup.",
      retainer: "Monthly SEO and content to build visibility over time.",
    },
    faqs: [
      { q: "How long does SEO take to work?", a: "Technical fixes and Google Business Profile improvements can help quickly. Content and rankings usually build over several months." },
      { q: "Can you guarantee a first-page ranking?", a: "No one can honestly guarantee rankings. I focus on the work that gives you the best chance and show you what changes." },
    ],
  },
  {
    slug: "paid-advertising",
    name: "Paid advertising",
    short: "Meta and Google campaigns planned around your budget and your goals.",
    metaTitle: "Paid Advertising in Malta | Meta & Google Ads | Charlotte Smith",
    metaDescription:
      "Meta and Google Ads campaigns for Malta businesses, planned around your budget: audiences, creative, landing pages and clear reporting.",
    intro: [
      "Paid ads can bring in enquiries quickly, or burn through budget just as fast. The difference is a clear goal, the right audience and a landing page that converts.",
      "I plan, set up and manage campaigns, and design the ad creative so it matches your brand.",
    ],
    includes: [
      "Campaign strategy and budget planning",
      "Audience and keyword research",
      "Ad creative and copy",
      "Conversion tracking setup",
      "Landing page recommendations",
      "Optimisation and reporting",
    ],
    forYou: [
      "You want more enquiries in a set period",
      "You've boosted posts without seeing real results",
      "You're launching something and need reach",
    ],
    ways: {
      bespoke: "A campaign setup for a launch or seasonal offer.",
      retainer: "Monthly campaign management and optimisation. Ad spend is paid directly by you to the platform.",
    },
    faqs: [
      { q: "Is ad spend included in your fee?", a: "No. You pay the platform directly for ad spend, so you always control your budget. My fee covers strategy, setup, creative and management." },
      { q: "Which platforms do you run ads on?", a: "Mainly Meta (Facebook and Instagram) and Google, and LinkedIn for B2B campaigns." },
    ],
  },
  {
    slug: "email-marketing-crm",
    name: "Email marketing & CRM",
    short: "Newsletters, automations and a tidy CRM that keeps every lead warm.",
    metaTitle: "Email Marketing & CRM Setup in Malta | Charlotte Smith",
    metaDescription:
      "Email newsletters, automated sequences and CRM setup that keep leads warm and customers coming back. Strategy, design and copy.",
    intro: [
      "Email is the one channel you own. A well-set-up CRM and a few good automations mean no enquiry is forgotten and past clients hear from you at the right time.",
      "I set up the system, design the templates and write the sequences, so it runs quietly in the background.",
    ],
    includes: [
      "CRM setup and pipeline design",
      "Lead capture forms and sign-ups",
      "Welcome and follow-up sequences",
      "Branded newsletter templates",
      "Newsletter planning and copy",
      "List clean-up and reporting",
    ],
    forYou: [
      "Leads slip through the cracks",
      "You have a list but rarely email it",
      "You want follow-ups to happen without remembering",
    ],
    ways: {
      bespoke: "A CRM and email automation setup.",
      retainer: "Monthly newsletters and CRM management.",
    },
    faqs: [
      { q: "Which email and CRM tools do you use?", a: "I work with the tools you already have where possible, or recommend a simple, affordable option for your size of business." },
    ],
  },
  {
    slug: "b2b-lead-generation",
    name: "B2B lead generation",
    short: "Targeted outreach and LinkedIn presence that opens the right conversations.",
    metaTitle: "B2B Lead Generation & LinkedIn Marketing | Charlotte Smith",
    metaDescription:
      "B2B lead generation: target account lists, LinkedIn profile and content, outreach sequences and CRM follow-up. LinkedIn profile refresh from €79.",
    intro: [
      "Good B2B leads come from being visible to the right people and starting the right conversations. That means a credible profile, useful content and well-targeted outreach.",
      "I build the system: who to target, what to say and how to follow up, with everything tracked in your CRM.",
    ],
    includes: [
      "Ideal client profile and target lists",
      "LinkedIn profile optimisation",
      "LinkedIn content plans",
      "Outreach messages and email sequences",
      "Lead tracking in your CRM",
      "Sales materials and one-pagers",
    ],
    forYou: [
      "You sell to other businesses and rely on word of mouth",
      "Your LinkedIn profile doesn't reflect your experience",
      "You want a repeatable way to start new conversations",
    ],
    ways: {
      packages: ["linkedin-refresh", "strategy-session"],
      bespoke: "A lead generation setup with target lists, messaging and sequences.",
      retainer: "Monthly LinkedIn content and outreach support.",
    },
    faqs: [
      { q: "Do you send outreach on my behalf?", a: "I can set up and manage outreach with you, or build the system so your team can run it." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
