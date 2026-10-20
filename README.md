# Charlotte Smith website

Personal brand site for Charlotte Smith, brand & marketing consultant in Malta. Built with Astro, hosted on Vercel.

## Edit content
- Projects: `src/data/projects.ts` (set `thin: false` and remove the slug from `src/data/projects-thin.mjs` once a project has images)
- Services: `src/data/services.ts`
- Packages and prices: `src/data/packages.ts` (add `paypalUrl` to switch a package to live PayPal checkout)
- Portfolio image URLs: `src/data/media-sources.json` (downloaded and optimised at build time)

## Environment variables (Vercel)
- `PUBLIC_WEB3FORMS_KEY`: Web3Forms access key. Without it, forms show as not connected.
- `SITE_URL`: the final domain, e.g. `https://charlottesmith.mt` (optional until a domain is added).

## Commands
`npm run dev` · `npm run build` · `npm run preview`
