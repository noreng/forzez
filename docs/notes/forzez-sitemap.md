# Forzez — site structure (draft, 2026-11-14)

**Decided 2026-11-14:** Articles is the one essay section (Lab and the planned Notes fold into it, interactive or not). The menu uses plain names: **Studio**, not Seriez.
Built: `/articles` with shelves, `/articles/equilibrium` (moved from `/lab/equilibrium`), the menu Elements · Articles,
a single hero button on the home page. The rest is still a draft. Reconciles `forzez-site-models.md` (catalogue: lines × formats, 2026-10-26),
the z-word rule in `forzez-puns-and-logo.md`, `forzez-films.md`, the wallpaper ideas in `forzez-generative-plan.md`,
the wheel and cable sketches (`wheel-sketches-session.md`, `docs/elements/cable-plates.md`) with what is built
(`/`, `/elements`, `/lab/equilibrium`, `/design`). Inspiration notes from abakcus.com and Bauhaus Posters are at the end.

## Four kinds of thing

| Kind | What it is | Reads like | Examples |
| --- | --- | --- | --- |
| **Editions** | book-like series: fixed order, numbered, proof and Q.E.D. | a book | *The Elements of Statics* (Books I–V, side plates), later *The Beauty of Trusses* |
| **Articles** | stand-alone interactive essays: one story, sliders, live numbers | a magazine piece | equilibrium of forces, the bicycle wheel, the hanging rope, the spider web, the Pantheon |
| **Studio** | generative art: a recipe (Forze Code) with many outputs | a gallery | Series 01: Arches, Sheet No. 017 |
| **Films** | authored, numbered films that run as code | a film list | Forzez Films No. 001, "13 minutes of ink in 30 seconds" |

Editions and Articles never mix: an Edition page is a plate with a proof; an Article is a story you play with.
They link both ways: an article ends with "the theorems behind it" (plates), a plate offers "play with it" (the article).
The same subject can live in both. The bicycle wheel is a side plate (still figure, proof, Q.E.D.) **and** an article
(load and prestress sliders, spoke-tension chart, the wagon wheel next to it).

### What the new material becomes

| Material | Becomes |
| --- | --- |
| `/lab/equilibrium` | the first article (`/articles/equilibrium`) |
| Wheel widget 01–03 (bicycle, joint, wagon wheel) | article: *The bicycle wheel* |
| Wheel widget 04–07 (half-wheel bridge, spider web, spoked roof, Pantheon) | articles, or one article *Rings and spokes* with the ring/spoke/hub table as its spine; side plates in Elements |
| Wheel widget 08 (Cremona) | Elements IV.V (already a plate) |
| Wheel widget 09 (chain, pole, rays) | Elements V.I interactive plate ("drag the pole") |
| Cable "form and force" series (4 steps) | article: *The hanging rope* |
| Cable drafts A–E | Elements plates (Book V or side plates, placement open in `cable-plates.md`) |
| net1/net2 generator | Studio: *Make your own* (the tool behind the pieces), not an article |

## Sections and URLs

| Section | URL | Exists |
| --- | --- | --- |
| Home | `/` | yes |
| Editions | `/elements`, `/elements/v-3` (later `/beauty-of-trusses`) | Elements yes |
| Articles | `/articles`, `/articles/bicycle-wheel` | one (as `/lab/equilibrium`) |
| Studio | `/studio`, `/studio/arches`, `/studio/017`, `/studio/make` | no |
| Films | `/films`, `/films/001` | no |
| Wallpapers | `/wallpapers` (a filtered view of Studio pieces and plates) | no |
| About | `/about` ("Meet the Workforzez") | no |
| Newsletter | `/newsletter` (issues archive) | no |
| Shop | `/shop`, only after demand (roadmap guardrail) | no |
| Code | `/c/<recipe>`: any Forze Code opens its piece | no |

A Studio piece has many outputs from one recipe: the live still, wallpaper sizes (phone, desktop, 4K), a film
when it has one, and later Print and Original. So wallpapers and MP4 downloads are blocks on piece, plate and film pages,
not content of their own. `/wallpapers` exists only as a gathering page (and a search landing: "truss wallpaper 4K").

## Menu

Plain names; the z stays in titles and copy ("Meet the Workforzez", "Hold your forzez", "Feel the Forzez"),
at most one per screen. A section enters the menu once it has something in it.

| Stage | Menu |
| --- | --- |
| Now | Elements · Articles |
| Bicycle wheel + first films | Elements · Articles · Films |
| Series 01 | Elements · Articles · Studio · Films |
| Later | the same, About and Newsletter on the right (Abakcus-style split), Shop when it opens |

- "Elements" while there is one edition; "Editions" with the second book.
- Phone: logo left, menu button next to the theme switch, the menu opens as a plain list.
- Footer: Wallpapers · Newsletter · About · Design system · Powered by Truzme.

## Section index pages (after Abakcus' archive)

- Title, one italic line, then honest counts in `font-data`: "52 plates · 5 books · 0 ads", "6 articles · 3 shelves".
- **Shelves** instead of tags or filters. Articles: *Balance*, *Cables and chains*, *Wheels and rings*, *Arches and domes*,
  *Trusses*. Each shelf is a numbered row with its count, like the Elements contents.
- Every entry has a one-sentence hook that is interesting on its own ("The hub doesn't hang from the top spokes. It stands on the bottom ones.").

## Article page

1. Breadcrumb kicker (Articles · Wheels and rings), title, italic lede with a rule.
2. A row of three or four computed numbers (36 spokes · 1000 N each · 5.73 kN in the rim). Real, from the model.
3. Scroll story with the interactive figure (the `/lab/equilibrium` pattern).
4. "Model limits" box where the model is simplified (the wheel note's Gaussian load, 2D only).
5. The theorems behind it (Elements plates), related articles, newsletter.

## Home, in order

1. Hero: the claim, one button (the flagship of the moment: Elements now, Series 01 later), the hero drawing.
2. Manifesto and colour key.
3. One block per section, Abakcus-style: heading, one line, three entries, "all articles →". Elements, Articles, then Films and Studio as they arrive.
4. Wallpaper of the week (one piece, three sizes), once Studio exists.
5. Newsletter, with the issue count once there are issues.

## Inspiration

### abakcus.com — take
- One calm claim on top, then one band per content type, each with a heading, one line and "view all".
- Menu split: content types on the left (Articles, Books, Videos), smaller things on the right.
- The archive page: big title, italic lede, honest counts ("104 pieces, 7 shelves, 0 paywalls"), shelves as a numbered contents list.
- Article page: kicker breadcrumb, italic lede with a rule, a row of four facts, then the long read; interactive parts inside the article (a finder, tick-off lists).
- Newsletter as a named, numbered thing ("Beyond Euclid", issue #238), placed mid-page and on every article.
- 404 that guesses from the address and offers the likely page. Our 404 could do the same from the slug.
- Every card's one-line hook is itself interesting. Abakcus already covers Byrne, which makes Ali the first press contact (site-models).

### abakcus.com — avoid
- Uppercase letter-spaced labels and pastel cards (against our anti-slop rules).
- Gadget and affiliate shelves: off-brand for us.

### Bauhaus Posters (about page) — take
- About as a manifesto: "Why we exist", then **what we choose / what we refuse**. Ours: we choose structures the solver designs, real numbers, one colour per meaning; we refuse drawn-on decoration, faked forces, discounts on Originals.
- **The making, step by step** as a numbered list. Ours: recipe → solve → check (Σ = 0) → plot (pen, paper, passes) → number and sign. The credibility page for Prints and Originals, later.
- A row of honest numbers. Ours can be the physics: plates written, members solved, worst equilibrium residual. Never order counts we don't have.
- Print-and-frame near the buyer (POD) and the paper/ink/frame spec, for the shop later.

### Bauhaus Posters — avoid
- Discount banners and permanent promotions, cookie walls, superlatives ("sublime", "museum grade" as decoration).
- An anonymous "team of artists": our edge is the named engineer and the family plotting.
- "We publish little, by choice" is good, but only say it when it's true.

## Open questions

- Shelves for Articles: the five above, or by structure type only.
- Piece URL: Sheet No. canonical, recipe as `/c/<recipe>`.
- Wallpaper sizes, and whether a wallpaper carries a title block.
