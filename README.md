# C&M Innovations — Website (v1, built 2026-09-10)

Static marketing site for **C&M Innovations, LLC**, a residential general contractor in Dardanelle/Russellville, AR. Plain HTML/CSS/JS, no build step. Deploys to Vercel with clean URLs (links have no `.html`).

**Build type:** Local Service → **type B service website** (organic + word of mouth, NOT an ads landing page). Built to `Website Structure/seo-launch-audit.md`. Gold standard reference: North Shade Lawn.

**Design:** white header (matches the logo's white circle background — Kennedy's call), charcoal/cream/rust body in the Nebo Earth Works color family (client asked for that). Fonts: **Bodoni Moda** (matches the C/M serif monogram) + **Jost** (matches the spaced "INNOVATIONS" wordmark). Signature motif = the slash from the logo (eyebrow labels, list bullets, the giant "/" in the orange CTA band).

## Pages
| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Home — hero w/ short form, 4 service tiles, why-us, promise (trust), process, recent work, reviews container, service area, FAQ |
| `services.html` | `/services` | Hub |
| `custom-homes.html` `new-construction.html` `framing.html` `remodels-additions.html` | one page per service, 600+ words each, cost factors, photos, FAQ (with FAQ schema) |
| `projects.html` | `/projects` | 10 groups of real job photos, lightbox |
| `about.html` | `/about` | Story in their words, promises, how we work, two phone contacts |
| `contact.html` | `/contact` | Full lead form + details + map |
| `blog.html` + 3 `blog-*.html` | starter posts (hiring questions / custom-home process / custom vs plans) |
| `thank-you.html` | `/thank-you` | Form redirect target (noindex) — needed for conversion tracking later |
| `404.html` `privacy.html` `sitemap.xml` `robots.txt` `vercel.json` | plumbing |

Header/footer are copied into every page (no includes). If you change the nav or footer, change it in all 16 files (find-and-replace works — they're identical).

## ⚠️ Not done yet / needs the client
1. **Form is NOT wired.** Both forms post to Web3Forms but the key is the placeholder `YOUR_WEB3FORMS_KEY` (in `index.html` and `contact.html`). Until it's replaced, submitting shows the thank-you page but sends nothing. Get a key at web3forms.com for **candminnovations24@gmail.com** (the key email goes to that inbox, so Madison has to forward it — or set it up on a Kennedy-controlled email and forward). Then submit one real test.
2. **Reviews:** none provided. Home has an honest "Ask us for references" container instead. Swap in real quotes when they come. Never invent any.
3. **Google Business Profile link + Facebook links** — not provided. Add to footer + the `sameAs` array in the JSON-LD once known.
4. **Names for the About page.** We only know "General Contractor" and "Operations Manager" phone roles. Ask who Madison is, who the C and M are, and get a team photo.
5. **Project locations/stories.** Every project group says "River Valley, AR". Ask Madison for the town and one line per house ("built for a family of five outside Dover…") — big SEO win.
6. **Years in business / project count** — blank on intake, so nothing is claimed. Add when known.
7. **Payment structure.** The site talks about trust and finishing the job but does NOT promise a payment schedule. If they bill per completed phase, saying so would be a killer trust point — confirm first.
8. **"Also on the list" services** (pole barns, garages, built-ins) are inferred from photos + "etc." in the intake. Confirm.
9. **Google Analytics** — none installed yet.
10. **Domain:** `candminnovations.com` currently points to a dead Wix setup (Wix "ConnectYourDomain" error). All canonicals/sitemap/schema already use `https://www.candminnovations.com`. Until DNS is cut over, the SEO audit will flag that (expected). Need registrar login.

## Claims we ARE allowed to make (from intake)
Licensed AND insured · free estimates · site visit + consultation for custom builds · residential · Dardanelle/Russellville · ~100-mile radius · Mon–Fri 7–5 · the two phones + email above. Nothing else is claimed.

## Photos
- Originals: `../assets/raw/` (HEIC) · converted JPGs: `../assets/photos/` · logo: `../assets/logo.png`
- Web versions: `images/work/*.webp` (full ≤1800px, q70–78) + `*-sm.webp` thumbnails (≤800px). Hero images also have `-mobile.webp`.
- `images/logo.webp` (original white circle, used in header), `images/logo-mark.png` / `logo-mark-light.png` (white knocked out — ink and cream versions; cream is in the footer).
- Mapping of IMG numbers → names is in the git history of this README's first commit / `../info/client-brief.md` photo inventory.

## Preview locally
Double-clicking `index.html` works for the home page, but internal links have no `.html` so they'll 404 from `file://`. Run a server instead:
```
cd site && python3 -m http.server 8765
```
then open http://localhost:8765/ (links still need `.html` locally — Vercel's cleanUrls handles it in production).

## Deploy
Repo **customleadz-sites/candminnovations** → Vercel project **candminnovations** (root = this `site/` folder). Read the git-deploy skill before pushing (author email, tokens). `.gitignore` excludes `../info` and `../google-ads` — only stage files inside `site/`.

## Ideas folder
`../ideas/` has two screenshots Kennedy saved (service tiles idea, favorite-photos showcase). Deliberately NOT used in v1 — Kennedy wanted to see the build first.
