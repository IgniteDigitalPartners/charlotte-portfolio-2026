export const site = {
  name: "Charlotte Smith",
  title: "Charlotte Smith | Brand & Marketing Consultant",
  description:
    "Brand and marketing consultant with 10+ years in brand strategy, social media, websites, SEO, paid ads, email and CRM. Fixed-price packages, bespoke projects and retainers.",
  email: "hello@bycharlottesmith.com",
  location: "Worldwide",
  // Google Calendar booking pages. Only shared after payment (confirmation page and welcome email).
  booking: {
    call30: "https://calendar.app.google/azgCL14YFRjgFh116",
    call60: "https://calendar.app.google/QxVDQtkszCBnBpHS8",
  },
  // LinkedIn profile URL: the footer link appears once this is set.
  linkedin: "https://www.linkedin.com/in/bycharlottesmith/",
  // Online Stripe checkout. Also needs the Stripe keys + webhook secret in Vercel; until then
  // clients can still order by brief and receive a payment link by email.
  checkoutOpen: true,
  // Legal details shown on the Terms and Privacy pages and in receipts. Lines without a value are hidden.
  legal: {
    tradingName: "Charlotte Smith",
    vatNumber: "MT27209704",
    address: "Apt 4 Villa Eugenie, Triq Dun Gejtanu Mannarino, Birkirkara BKR 9085, Malta",
    country: "Malta",
  },
  sameAs: [
    "https://www.linkedin.com/in/bycharlottesmith/",
    "https://pro.fiverr.com/sellers/charlyatignite/",
    "https://www.upwork.com/freelancers/bycharlottesmith",
    "https://www.facebook.com/bycharlottesmith.marketing/",
  ],
};

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/packages/", label: "Packages" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];
