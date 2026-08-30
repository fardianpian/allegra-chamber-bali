---
purpose: Writing guide + content pillars + skill-delegation pipeline for /journal articles
generated: 2026-06-21
applies_to: src/content/articles/*.md (the `articles` content collection, src/content/config.ts)
---

# Journal Article Guidelines — SEO / GEO / AEO

> Read this before drafting, editing, or planning any `/journal` article. It does not replace
> `.claude/brand-voice-guidelines.md` — that file still owns tone/vocabulary/Approved Copy and
> wins on any voice question. This file owns: which pillar an article belongs to, how to
> structure it for SEO + GEO + AEO, and which skill to delegate each production step to.

## What SEO / GEO / AEO mean here

- **SEO** (Search Engine Optimization) — ranking in classic Google search. Driven by keyword
  targeting, title/meta tags, header structure, internal linking.
- **GEO** (Generative Engine Optimization) — getting cited/summarized by AI chat tools (ChatGPT,
  Perplexity, Claude). Driven by clear definitional statements, structured content, and content
  an LLM can lift a clean answer from without misquoting.
- **AEO** (Answer Engine Optimization) — winning featured snippets / voice answers / "People Also
  Ask" boxes. Driven by direct, self-contained Q&A pairs matched to real search questions.

All three reward the same underlying habit: **answer the question directly and early, then
support it** — so one article structure serves all three, it's not three separate drafts.

## Content Pillars (pick exactly one per article — don't invent a 5th ad hoc)

The `pillar` field in each article's frontmatter must be one of these 4 (enforced by the zod
schema in `src/content/config.ts`). Adding a pillar requires updating both that schema and this
file together.

| Pillar (enum value) | Label                         | Audience / intent                                                                         | Status                                            |
| ------------------- | ----------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `planning`          | Wedding Music Planning        | Top-of-funnel couples comparing options (live music vs. DJ, how many songs, when to book) | No article yet                                    |
| `piano-repertoire`  | Piano & Repertoire            | Piano-specific searches + song/repertoire choice — **best validated keyword opportunity** | 1 live: "Wedding Pianist in Bali: What to Expect" |
| `bali-venues`       | Bali Ceremony & Venue Guides  | Location/venue-specific informational + local SEO (cliffside, beach, garden, chapel)      | No article yet                                    |
| `for-planners`      | For Wedding Planners & Venues | B2B logistics — reliability-over-romance tone, feeds `/for-planners` and outreach         | No article yet                                    |

### Pillar 1 — Wedding Music Planning (`planning`)

Topic ideas: "Live Music or a DJ for Your Bali Wedding Ceremony?" · "How Many Songs Do You Need
for a Ceremony?" · "When to Book Live Wedding Musicians in Bali" · "Outdoor Ceremony Music: What
Cliffside, Beach, and Garden Venues Need."
Keyword anchors (from `docs/SEO-STRATEGY.md`): "musician for wedding ceremony" (head term, US vol
5400), "musician for wedding" (US vol 5400), "string quartet for hire" (US vol 210).

### Pillar 2 — Piano & Repertoire (`piano-repertoire`)

Topic ideas: "Best Piano Songs for a Wedding Ceremony" · "Solo Piano or Piano + Strings: Which
Fits Your Venue" · "How to Choose a First-Dance Song for a Custom Arrangement."
Keyword anchors: "wedding pianist" (KD 1, US vol 720 — **the single best opportunity in
SEO-STRATEGY.md §3.0**, already used), "wedding piano player," "piano wedding ceremony."

### Pillar 3 — Bali Ceremony & Venue Guides (`bali-venues`)

Topic ideas: "Live Music for a Cliffside Wedding in Uluwatu" · "Garden Wedding Ceremony Music in
Bali" · "Beach Wedding Music: Sound & Equipment Considerations."
Keyword anchors: "uluwatu wedding venue" (navigational), plus general local-SEO value from
sensory, Bali-specific detail (brand voice Hard Rule #7). Use only real, confirmed venue _types_
— never name a specific venue/property without the owner confirming a performance there
(CLAUDE.md Work Rule #9).

### Pillar 4 — For Wedding Planners & Venues (`for-planners`)

Topic ideas: "Tech Rider Basics for Live Chamber Music at Weddings" · "What to Ask a Live Music
Vendor Before You Book Them" · "Working With a Live Ensemble: A Logistics Guide for Bali Wedding
Planners."
Tone: pull from the "For Planners & Venues (B2B)" channel profile in
`.claude/brand-voice-guidelines.md` — reliability over romance, lead with logistics. Internally
link to `/for-planners`. This pillar directly supports B2B outreach work (see
`docs/MARKETING-SPRINT-2026-06.md`).

## Article structure (serves SEO + GEO + AEO at once)

1. **H1** — from frontmatter `heading`, a _separate field from_ `title`. `title` is the
   `<title>`/meta tag only and keeps the `— Allegra Chamber Bali` suffix; `heading` is the
   on-page H1 (also reused for the breadcrumb name and the `Article` JSON-LD `headline`) and
   never includes the brand suffix. (2026-06-21 audit found the first article reusing `title`
   for `<h1>`, which doubled the brand name on-page — don't repeat that.)
2. **Hook (opening paragraph, 40–60 words, no H2 above it)** — every article must open with a
   hook that follows the **Masalah → Penyelesaian → CTA** (Problem → Solution → CTA) formula:
   - **Masalah/Problem** — name the reader's actual question or concern in the first sentence
     (the thing they're actually trying to decide or figure out).
   - **Penyelesaian/Solution** — pivot immediately to how Allegra/this article answers it.
   - **CTA** — close the hook with a forward-pointing line toward the payoff of reading on or the
     decision they'll be able to make (e.g. "...so you can decide which fits your ceremony"). This
     is a soft, content-native nudge inside the sentence — not the literal WhatsApp button, which
     stays template-only per §7 below; don't insert a second real CTA here.
     This formula and the GEO "direct-answer" requirement are the same paragraph doing two jobs —
     write one hook, not a definition-only opening followed by a separate pitch. (Note: the live
     "Wedding Pianist in Bali" article predates this rule and opens with a definition rather than a
     named problem — fine as a precedent for tone, but don't copy its hook structure for new
     articles.)
3. **H2 sections**, each one phrased close to a real question or sub-topic (matches AEO's
   "People Also Ask" pattern). Lead each H2 with a 1–2 sentence direct answer before expanding.
4. **Lists/tables** wherever you're comparing options (formations, venue types, planning steps) —
   structured content extracts cleanly for both AEO snippets and GEO citations.
5. **Internal links** — two directions, both required:
   - _Outbound_ (from the article): link to at least one of `/packages`, `/repertoire`,
     `/for-planners`, or `/contact` (relative path, trailing slash, matching the site's existing
     link convention).
   - _Inbound_ (to the article): add a link from at least one existing, relevant page —
     e.g. the Piano & Repertoire article was missing this until the 2026-06-21 audit added a
     link from `src/content/packages/solo.md`. An article with zero inbound links gets no
     equity from the rest of the site and is only reachable via `/journal` + nav. Do this as
     part of publishing the article, not as a later cleanup task.
6. **FAQ block** (frontmatter `faq` field, 3–5 pairs) — renders on-page under "Frequently Asked"
   **and** as `FAQPage` JSON-LD automatically (see `getArticleJsonLd`/`getFaqJsonLd` usage in
   `src/pages/journal/[slug].astro`). This is the primary AEO mechanism — don't skip it.
7. **CTA** — handled automatically by the page template (WhatsApp CTA + link to Packages). Don't
   duplicate a CTA inside the article body.

## SEO checklist (on-page)

- [ ] `title` (frontmatter, `<title>`/meta only) — close to 50–60 chars before the brand suffix
      (site convention tolerates up to ~65 with the suffix — don't force it shorter at the cost
      of an awkward title); include the target keyword once, naturally.
- [ ] `heading` (frontmatter, separate from `title`) — the actual on-page H1 text, no brand
      suffix. Required field — `astro check` will fail the build if it's missing.
- [ ] `description` (frontmatter, meta description) — **150–160 chars, hard limit, count it
      before committing.** The first article shipped at 189 chars (would truncate in SERP) and
      wasn't caught until the 2026-06-21 audit — don't eyeball this, run
      `python3 -c "print(len(open('path').read()))"` or equivalent on the exact string.
- [ ] `targetKeyword` field filled in — traceability back to `docs/SEO-STRATEGY.md`. If the topic
      isn't in that doc yet, that's fine, just note it's a net-new keyword bet.
- [ ] `ogImage` — set to a real, relevant asset under `/public/images/` if one exists (check
      existing pages' `ogImage` props for reusable assets, e.g. a piano photo for a
      `piano-repertoire` article) rather than leaving it unset and falling back to the generic
      `og-default.jpg`.
- [ ] URL slug = filename = short, hyphenated, includes the target keyword
      (e.g. `wedding-pianist-bali.md` → `/journal/wedding-pianist-bali/`).
- [ ] One H1 only (`heading`, not `title`); H2s for major sections, H3s only if a section
      genuinely needs sub-points.
- [ ] At least one internal link to a conversion page (`/packages`, `/repertoire`,
      `/for-planners`, `/contact`) — and at least one inbound link from an existing page, added
      in the same change (see Article Structure §5 above).

## GEO checklist (citability by AI tools)

- [ ] Hook follows Masalah → Penyelesaian → CTA (Problem → Solution → CTA, see Article Structure
      §2) — not a definition-only opening. Self-contained sentences, no "in this article, we'll
      explore…" framing (also banned by brand voice's AI-cliché rule).
- [ ] Claims are specific and attributable to Allegra's own confirmed facts (formations,
      instrumentation, process) — never vague ("many couples love…") or fabricated (stats,
      awards, named clients) per CLAUDE.md Work Rule #9 and brand voice Hard Rule #1.
- [ ] Comparisons (e.g. solo piano vs. quartet) are presented as neutral, structured trade-offs —
      easy for an LLM to summarize accurately without picking a "wrong" side.
- [ ] Organization identity is consistent — `Article` JSON-LD already sets
      author/publisher = "Allegra Chamber Bali" automatically; don't override it per-article.

## AEO checklist (snippets / voice / PAA)

- [ ] Each FAQ question is phrased the way a person would actually type or ask it (not
      keyword-stuffed).
- [ ] Each FAQ answer is a complete, standalone 1–3 sentence answer — readable with zero
      surrounding context (it will be lifted out of context into a snippet).
- [ ] Before adding a new FAQ pair, check `faqPage.items` in `src/i18n/ui.ts` for one covering
      near-identical ground (e.g. the sitewide FAQ already has "Do you offer a wedding pianist as
      a solo option?", which closely overlaps the first article's "Can I book just a pianist…?").
      Overlap isn't forbidden — the two pages serve different snippet/intent contexts — but don't
      contradict the existing answer, and prefer phrasing the article's version distinctly rather
      than near-duplicating it word-for-word.
- [ ] Headings that pose a question (e.g. "Solo Piano or a String Quartet?") have their answer in
      the first sentence below them, not buried at the end of the section.

## Hard rules (inherited, non-negotiable)

1. Never fabricate prices, stats, testimonials, awards, or venue/property names (CLAUDE.md Work
   Rule #9; brand voice Hard Rule #1). If pricing comes up, redirect to WhatsApp inquiry — see the
   existing FAQ answer in `src/i18n/ui.ts` (`faqPage.items`) for the approved phrasing pattern.
2. Follow `.claude/brand-voice-guidelines.md` vocabulary (Avoid → Prefer table) and tone rules —
   no exclamation marks, no "best in Bali"/"world-class," no AI-cliché openers.
3. Piano is a flagship instrument, not an add-on — never imply "just a string quartet" when piano
   is part of what's being described (brand voice Hard Rule #8).
4. EN is the primary write target. `docs/SEO-STRATEGY.md` confirms ID search demand is near-zero,
   so a genuine ID translation's SEO value is hreflang/UX completeness and trust for
   Indonesian-speaking couples/families, not direct ID-locale search traffic — frame it that way,
   don't invent ID keyword claims it can't support. As of 2026-06-23 (owner request) every article
   has a genuine Indonesian translation at `src/content/articles/id/<slug>.md` (same schema,
   `slug` becomes `id/<slug>`), and `/id/journal/[slug].astro` renders it indexable. For a new
   article, write the `id/<slug>.md` translation as part of publishing — `/id/journal/[slug].astro`
   falls back to the EN body under `noindex` (2026-06-21 audit: `<html lang="id">` declaring
   English content is a real hreflang/language-mismatch issue) only until that translation exists.
   Keep `astro.config.mjs`'s sitemap filter (`translatedJournalSlugs`) in sync — it excludes any
   `/id/journal/<slug>` that doesn't have a translation file yet.

## Skill delegation pipeline

This repo has 45 marketing skills installed (`.claude/skills/`). For Journal article production,
delegate each step to the skill below rather than freelancing the whole article in one pass —
each skill is scoped for that specific step and will apply more rigor than a single end-to-end
draft.

| Step                         | Skill              | What it does here                                                                                                                                                                | Feeds into |
| ---------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1. Topic & keyword selection | `content-strategy` | Picks a specific topic within one of the 4 pillars above, checks it's not already covered, confirms funnel stage (top/mid/bottom)                                                | Step 2     |
| 2. Outline & first draft     | `copywriting`      | Writes the draft following the Article Structure section above + `.claude/brand-voice-guidelines.md`                                                                             | Step 3     |
| 3. GEO/AEO pass              | `ai-seo`           | Tightens the opening paragraph for direct-answer citability, checks FAQ pairs against the AEO checklist, flags anything an LLM could misquote                                    | Step 4     |
| 4. Technical SEO pass        | `seo-audit`        | Checks title/meta length, header hierarchy, internal linking, slug — against the SEO checklist above                                                                             | Step 5     |
| 5. Structured data check     | `schema`           | Confirms the article's `faq` frontmatter will actually render as valid `FAQPage` JSON-LD (via `getArticleJsonLd`/`getFaqJsonLd`) and that `Article`/`BreadcrumbList` are present | Step 6     |
| 6. Final polish              | `copy-editing`     | Tone consistency pass, trims fluff, double-checks the Avoid → Prefer vocabulary table and Hard Rules                                                                             | Publish    |
| 7. Publish                   | — (direct)         | Save as `src/content/articles/<slug>.md`, run `npm run lint && npm run build`, spot-check `/journal/<slug>/`                                                                     | —          |

For a single small fix (typo, one fact correction) on a published article, skip the pipeline and
edit directly — the pipeline is for new articles or substantial rewrites.

## Per-article frontmatter checklist (copy/paste into a new file)

```yaml
---
title: '' # <title>/meta only — ~50-60 chars + " — Allegra Chamber Bali" suffix
heading: '' # on-page H1 / breadcrumb / card heading — NO brand suffix, separate from `title`
description: '' # meta description — 150-160 chars HARD LIMIT, count it before committing
excerpt: '' # short teaser for the /journal listing card
pillar: '' # planning | piano-repertoire | bali-venues | for-planners
targetKeyword: '' # from docs/SEO-STRATEGY.md, or note if it's a net-new bet
pubDate: YYYY-MM-DD
ogImage: '' # path under /public/images/ — reuse a relevant existing asset if one exists
faq:
  - question: ''
    answer: ''
---
```

Don't forget the inbound link (Article Structure §5) and the `noindex` rule for the `/id/`
counterpart (Hard Rule #4) — both are easy to skip since they're outside the article file itself.

## Audit log

- **2026-06-21 — first `seo-audit` pass on "Wedding Pianist in Bali."** Found and fixed: `<h1>`
  duplicating the brand-suffixed `title` (root cause: no separate `heading` field existed yet —
  added one, see Article Structure §1); meta description at 189 chars (trimmed to 152); missing
  inbound link from `packages/solo.md`; `ogImage` left unset (now reuses
  `/images/og-packages-piano.jpg`); `/id/journal/*` declaring `lang="id"` over English content
  with no `noindex` (now set), and still listed in `sitemap-index.xml` despite being noindexed
  (fixed via a `filter` in `astro.config.mjs`'s sitemap integration — exclude any `/id/journal`
  URL). Also added `/journal` to `public/llms.txt` Key pages, which had been missed when the
  feature shipped. None of these were caught by `npm run lint`/`astro check` — they're
  judgment-level SEO issues, not type errors, which is why this checklist
  exists. Re-run `/seo-audit` after every batch of 2-3 new articles, not just once.
- **2026-06-23 — genuine Indonesian translations added for all 5 live articles**, reversing the
  EN-only/noindex default at the owner's request. Each translation lives at
  `src/content/articles/id/<slug>.md` (frontmatter + body fully translated, internal links
  repointed to `/id/...` paths); `src/pages/id/journal/[slug].astro` now renders the translation
  and drops `noindex` when one exists. `/id/journal/index.astro` also dropped `noindex` since its
  listing now shows genuine translated headings/excerpts via `JournalList.astro`. Updated
  `astro.config.mjs`'s sitemap filter to read the `id/` translation folder directly (`fs.readdirSync`)
  rather than blanket-excluding `/id/journal`, so only un-translated slugs stay out of the sitemap.
