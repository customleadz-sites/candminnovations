# C&M Innovations — Website (v1, built 2026-09-10)

Static marketing site for **C&M Innovations, LLC**, a residential general contractor in Dardanelle/Russellville, AR. Plain HTML/CSS/JS, no build step. Deploys to Vercel with clean URLs (links have no `.html`).

**Build type:** Local Service → **type B service website** (organic + word of mouth, NOT an ads landing page). Built to `Website Structure/seo-launch-audit.md`. Gold standard reference: North Shade Lawn.

**Design:** white header (matches the logo's white circle background — Kennedy's call), charcoal/cream/rust body in the Nebo Earth Works color family (client asked for that). Fonts: **Antonio 700** (headlines, uppercase — Anton's multi-weight sibling, a hair lighter than Anton; Kennedy found Anton too thick and 600 too thin. Loaded as a 500..700 range so `--display-weight` can be any value in between) + **Barlow Condensed** (labels/nav/buttons) + **Barlow** (body) — the same type system as Nebo Earth Works, which Madison said she liked. Header wordmark only: **Bodoni Moda 500**, spaced, for the whole "C&M Innovations" name, matching the logo monogram (Kennedy, 2026-09-17). v1 originally shipped with a serif (Bodoni Moda) and Kennedy killed it as AI-looking; do not bring back italic serif display type. Signature motif = the slash from the logo (eyebrow labels, list bullets, the giant "/" in the orange CTA band — drawn as a skewed bar, not a glyph). Buttons are Nebo-style (Kennedy + client liked them): solid = notched bottom-left corner + arrow; outline = same notched silhouette as a frame with the cut corner left open; call buttons get a phone icon automatically via `[href^="tel:"]`.

## Pages
| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Home — photo hero (form removed 2026-09-15, CTA → /contact), 4 service tiles, why-us, promise (trust), process, recent work, reviews container, service area, FAQ |
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
1. **Form is NOT wired.** The contact-page form posts to Web3Forms but the key is the placeholder `YOUR_WEB3FORMS_KEY` (in `contact.html`; the home page no longer has a form). Until it's replaced, submitting shows the thank-you page but sends nothing. Get a key at web3forms.com for **candminnovations24@gmail.com** (the key email goes to that inbox, so Madison has to forward it — or set it up on a Kennedy-controlled email and forward). Then submit one real test.
2. **Reviews:** none provided. Home has an honest "Ask us for references" container instead. Swap in real quotes when they come. Never invent any.
3. **Google Business Profile link + Facebook links** — not provided. Add to footer + the `sameAs` array in the JSON-LD once known.
4. **Owners = Carter & Madison Henson** (photo `images/work/couple.webp`, from `../assets/photos/couple.jpeg`; on the About page with their Facebook welcome text, added 2026-09-17). Still unknown: which of them is the "General Contractor" vs "Operations Manager" phone.
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
Double-click **`Preview Site.command`** in this folder. It starts a local server that behaves exactly like Vercel (clean URLs, 404 page) and opens http://localhost:8765/ in your browser. Close the Terminal window to stop it. (It runs `tools/localpreview/serve.py`; the `.command` file is gitignored.)

## Deploy
Repo **customleadz-sites/candminnovations** → Vercel project **candminnovations** (root = this `site/` folder). Read the git-deploy skill before pushing (author email, tokens). `.gitignore` excludes `../info` and `../google-ads` — only stage files inside `site/`.

## Ideas folder
`../ideas/` has two screenshots Kennedy saved (service tiles idea, favorite-photos showcase). Deliberately NOT used in v1 — Kennedy wanted to see the build first.
