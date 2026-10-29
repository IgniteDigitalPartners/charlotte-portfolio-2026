# By Charlotte Smith content engine

Automated social content for the **By Charlotte Smith** Metricool brand (blogId `7336333`, timezone Europe/Malta).
Everything auto-publishes. A weekly scheduled task checks the next 14 days and fills gaps.

## Daily cadence (every network gets its own post, no mirroring)

| Network | Format | Time (Malta) | Days |
|---|---|---|---|
| Instagram @by.charlottesmith | Story (image) | 09:00 | daily |
| Instagram | Post (single or carousel, 1080x1350) | 12:30 | daily |
| Instagram | Reel (motion text MP4 + cover) | 19:00 | daily |
| Facebook page | Post, or Reel about 1 in 4 | 10:00 | daily |
| LinkedIn company page | Post (carousels go out as a PDF document) | 08:30 | Mon to Fri |
| Google Business Profile | Publication with image (1200x900) | 11:00 | Mon, Wed, Fri |
| TikTok @charlymalta1 | Story-style branded video via tiktok_v2.py (progress bars, CS monogram, caption boxes, Charlotte's photo or a work image, end card) | 20:30 | daily |

## Content mix
Rotate: services (websites, logos and brand guides, branded Canva templates, Google Business Profile setup,
90-day marketing plans, Monthly Social Essentials at EUR 195/month cancel anytime, free welcome call),
educational tips, holidays, awareness days and months, and the digital marketing calendar
(Black Friday 27 Nov 2026, Cyber Monday 30 Nov, Small Business Saturday, Christmas shopping, January planning).

## Voice rules
- Charlotte's voice: warm, direct, first person, plain English, British spelling.
- Never use em dashes or en dashes.
- Experience is "10+ years" / "more than ten years".
- No invented statistics or client results.
- CTAs: bycharlottesmith.com, hello@bycharlottesmith.com, "link in bio", "send me a message".
- Instagram 8 to 14 hashtags; LinkedIn 3 to 5; Facebook 2 to 4; GBP none (keywords in text, under 1500 chars).
- TikTok is personal in voice (lowercase, mum-of-four-running-a-business humour, never name or show the children) but branded in look: render with `python3 tiktok_v2.py <date>` and set its PLAN theme/image per date (alternate noir/ivory; mix brand/charlotte_cut.png with brand/work_*.png).

## Look
Noir (#111) and ivory (#F5F0E7) with champagne gold (#C9A45F), Lora headings, Inter body,
metal-gold CS monogram. render.py handles all templates.

## How to run a batch
1. Edit `content.py` with the new dates (same structure).
2. `python3 render.py` (or one date at a time in parallel: `python3 render.py 2026-11-13`), then rebuild manifest.
3. Copy `out/*.jpg out/*.mp4` to `public/social/<batch>/`, commit, push to main, wait for the Vercel deploy.
4. `python3 payloads.py <batch>` then call Metricool createScheduledPost for each entry in calls.json.
5. Re-check with getScheduledPosts that every day and network above is covered.
