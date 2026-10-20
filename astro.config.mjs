import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { projects } from "./src/data/projects-thin.mjs";

const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:4321");

export default defineConfig({
  site,
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you/") && !projects.some((slug) => page.endsWith(`/work/${slug}/`)),
    }),
  ],
});
