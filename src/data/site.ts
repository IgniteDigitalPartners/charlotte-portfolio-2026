export const site = {
  name: "Charlotte Smith",
  title: "Charlotte Smith | Brand & Marketing Consultant",
  description:
    "Brand and marketing consultant with 9+ years in brand strategy, social media, websites, SEO, paid ads, email and CRM. Fixed-price packages, bespoke projects and retainers.",
  email: "charlotte.smith@ignitedigitalpartners.com",
  location: "Worldwide",
  // Google Calendar booking pages. Only shared after payment (confirmation page and welcome email).
  booking: {
    call30: "https://calendar.app.google/azgCL14YFRjgFh116",
    call60: "https://calendar.app.google/QxVDQtkszCBnBpHS8",
  },
  // LinkedIn profile URL: the footer link appears once this is set.
  linkedin: "https://www.linkedin.com/in/charlotte-smith-marketing/",
  // Public Web3Forms access key (safe to expose). Set PUBLIC_WEB3FORMS_KEY in Vercel.
  formKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? "",
  sameAs: [
    "https://www.linkedin.com/in/charlotte-smith-marketing/",
    "https://pro.fiverr.com/sellers/charlyatignite/",
    "https://www.upwork.com/freelancers/charlottesmith211708",
    "https://www.facebook.com/charlotte.smith.digitalmarketing",
  ],
};

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/services/", label: "Services" },
  { href: "/packages/", label: "Packages" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];
