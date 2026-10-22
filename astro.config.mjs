import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { projects } from "./src/data/projects-thin.mjs";

const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:4321");

export default defineConfig({
  site,
  trailingSlash: "always",
  // Pages stay static; only the /api/ checkout routes run on the server.
  adapter: vercel(),
  build: { format: "directory", inlineStylesheets: "auto" },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you/") && !page.includes("/checkout/") && !page.includes("/order-confirmed/") && !projects.some((slug) => page.endsWith(`/work/${slug}/`)),
    }),
  ],
});
