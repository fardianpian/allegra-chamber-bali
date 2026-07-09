# Product Marketing Context

_Last updated: 2026-06-20_

> **Applicability Notes (read before using the other 44 skills on this repo)**
>
> - This is a one-time-booking, local wedding-services business (live ensemble bookings), not a
>   SaaS product with accounts/subscriptions. Several of the 45 installed skills assume SaaS
>   mechanics and are **low priority / not applicable** here: `paywalls` (in-app upgrade
>   screens), `onboarding` (post-signup activation), `signup` (registration flow),
>   `churn-prevention` (subscription cancel flows), `revops` (lead routing/MQL-SQL), `aso`
>   (App Store optimization — no app exists). Don't over-invest session time wiring these up
>   for Allegra.
> - `emails` and `sms` assume an ESP/SMS platform or CRM. **None is wired up yet** —
>   WhatsApp deep-link (`PUBLIC_WHATSAPP_NUMBER`) is the only live comms channel. Treat any
>   email/SMS-sequence output from those skills as a draft to park, not implementation-ready
>   work, until an ESP/CRM exists.
> - The remaining ~39 skills (copywriting, cro, schema, ai-seo, content-strategy, seo-audit,
>   social, analytics, site-architecture, public-relations, directory-submissions,
>   competitor-profiling, competitors, customer-research, marketing-plan, marketing-ideas,
>   offers, pricing, sales-enablement, cold-email, referrals, co-marketing, prospecting,
>   launch, programmatic-seo, etc.) are stack-agnostic and apply normally.

## Product Overview

**One-liner:** Allegra Chamber Bali — live chamber/piano & string ensemble for weddings in Bali.
**What it does:** Performs live chamber music (piano & strings) at weddings across Bali —
ceremony, cocktail hour, reception — in 5 fixed formations, with arrangements built around the
couple's own songs. Sub-brand of Indonesia Istimewa Studio.
**Product category:** Live wedding music/entertainment vendor (chamber ensemble), Bali
destination-wedding market.
**Product type:** Local service business (live performance booking) — not SaaS, marketplace, or
e-commerce.
**Business model:** Per-booking service fee (formation + likely travel fee). **Pricing figures
not yet defined — confirm with owner** (intentionally hidden site-wide until real numbers
exist, per locked decision in `CLAUDE.md`).

## Target Audience

**Target companies:** N/A in the B2C sense. B2B-adjacent buyers: wedding planning agencies,
hotel/villa venues, event organizers operating in Bali.
**Decision-makers:** (a) Couples themselves (mostly international, destination wedding) for
direct bookings; (b) wedding planners / venue coordinators booking on a couple's behalf.
**Primary use case:** Live music for the ceremony/reception of a Bali wedding, wanting something
more intimate and elevated than a DJ or a generic cover band.
**Jobs to be done** (inferred from brand positioning, not verbatim customer research):

- Hire musicians who adapt in real time to ceremony pacing (Intimate)
- Get music that won't feel dated in photos/video years later (Timeless)
- Have a custom arrangement of the couple's own song performed live, e.g. first dance
  (Unforgettable)

**Use cases:** Cliffside ceremony (Uluwatu), beach ceremony, garden ceremony, chapel ceremony,
cocktail hour, full string quartet reception.

## Personas

| Persona                                    | Cares about                                                       | Challenge                                                        | Value we promise                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Couple (international destination wedding) | Intimacy, timelessness, customization of their song               | Distinguishing live chamber music from generic wedding bands/DJs | An unforgettable, refined, real-time live performance arranged around their story |
| Wedding planner / venue coordinator        | Reliability, logistics (tech rider, stage plan) over romance copy | Vetting a vendor who won't cause day-of problems                 | Professional, predictable execution                                               |

Named/detailed personas (e.g. specific demographics, backstory): **Not yet defined — confirm
with owner.**

## Problems & Pain Points

**Core problem** (inferred, not verbatim): Couples want their ceremony/reception to feel
personal and high-end, not generic — they're choosing between DJ-only, a generic cover band, or
a proper live ensemble.
**Why alternatives fall short** (inferred from the brand voice "avoid" vocabulary):

- Generic bands/DJs read as interchangeable, not specific to the couple
- Can feel like a "package deal" rather than something arranged around their story

**What it costs them:** Not yet defined — confirm with owner.
**Emotional tension:** Not yet defined — confirm with owner.

## Competitive Landscape

**Direct:** Not yet defined — confirm with owner.
**Secondary:** Not yet defined — confirm with owner.
**Indirect:** Not yet defined — confirm with owner.

No competitor names, vendor comparisons, or market-positioning-vs-named-competitor research
exists anywhere in this repo's docs. Do not invent Bali wedding-vendor competitor names.

## Differentiation

**Key differentiators:**

- Live, real-time adapting performance (Intimate)
- Piano as a flagship instrument across every formation, not an add-on (Signature Sound rule —
  piano holds the harmony and rhythm, violin and cello carry the melody)
- Conservatory-trained musicians
- Custom arrangements of the couple's own song (Unforgettable)
- 5 fixed formations from Solo to Large Ensemble (Large Ensemble starts from 8 musicians —
  strings + piano, expandable e.g. to 4 violins/2 violas/2 cellos/double bass/piano — revised
  2026-07-09, see CLAUDE.md) — a clear, curated range without ad-hoc customization risk

**How we do it differently:** Arranged around the couple's story rather than a generic
repertoire-only booking; bilingual (EN/ID) service for both international and local couples.
**Why that's better:** Matches the Intimate/Timeless/Unforgettable promise instead of a
one-size-fits-all band booking.
**Why customers choose us:** Not yet defined — confirm with owner (no win/loss or sales
conversation history documented yet).

## Objections

| Objection                            | Response                             |
| ------------------------------------ | ------------------------------------ |
| Not yet defined — confirm with owner | Not yet defined — confirm with owner |

_Inferred-only candidate (not confirmed):_ pricing-related hesitation, since pricing is
intentionally hidden site-wide — flagged as speculative only.

**Anti-persona** (inferred, not confirmed): Couples wanting a DJ-only or budget/"affordable"
framing — directly conflicts with the "avoid: cheap/affordable/budget" rule and the
refined-luxury positioning.

## Switching Dynamics

**Push:** Not yet defined — confirm with owner.
**Pull:** The Intimate / Timeless / Unforgettable positioning (documented brand essence).
**Habit:** Not yet defined — confirm with owner.
**Anxiety:** Not yet defined — confirm with owner.

## Customer Language

**How they describe the problem:** Not yet defined — confirm with owner.
**How they describe us:** Not yet defined — confirm with owner.
**Words to use:** live, chamber, ensemble, piano & strings, string quartet, refined, intimate,
timeless, unforgettable, conservatory-trained, curated, arranged around your story,
processional, first dance, vow exchange, ceremony, cocktail hour, reception, cliffside, beach,
garden, chapel, Uluwatu, Ubud, Nusa Dua, Canggu, Seminyak (+ Indonesian equivalents in
`.claude/brand-voice-guidelines.md`).
**Words to avoid:** band, gig, cheap/affordable/budget, package deal, epic/vibes/viral,
world-class/best-in-Bali, DJ-vs-live hype, AI-cliché openers ("in today's fast-paced world,"
"delve into," "di era digital saat ini").

**Glossary:**

| Term           | Meaning                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------------------- |
| Formation      | One of the 5 fixed lineups: Solo (Violin/Cello/Piano), Duo, Trio, String Quartet, Large Ensemble                     |
| Piano +        | Piano-upgrade upsell sellable on Duo/Trio/Quartet                                                                    |
| Large Ensemble | Starts from 8 musicians (strings + piano), expandable on request — piano stays in the default/first-presented lineup |

## Brand Voice

**Tone:** Refined editorial, warm & personal, quietly credible, effortless & calm, sensory and
Bali-specific.
**Style:** Direct address (you/your, never "clients"/"users"); facts-first, no exclamation
marks, no empty superlatives; one CTA per page, phrased simply.
**Personality:** Intimate, timeless, unforgettable, refined, quietly credible.

Full tone/vocabulary/channel rules + approved copy blocks live in
`.claude/brand-voice-guidelines.md` — read that file before writing any user-facing copy; this
section is a summary only.

## Proof Points

**Metrics:** Not yet defined — confirm with owner.
**Customers:** Not yet defined — confirm with owner.
**Testimonials:** Not yet defined — confirm with owner (`src/content/testimonials/` currently
holds only placeholder/example entries, no real client testimonials).

**Value themes:**

| Theme         | Proof                                |
| ------------- | ------------------------------------ |
| Intimate      | Not yet defined — confirm with owner |
| Timeless      | Not yet defined — confirm with owner |
| Unforgettable | Not yet defined — confirm with owner |

_Asset availability (not a proof point):_ one piano-player photo/video usage permission is
already secured from a real performance.

## Goals

**Business goal:** Not yet defined — confirm with owner (no documented bookings/revenue target).
**Conversion action:** Initiate a WhatsApp inquiry via the "Check Your Date" primary CTA
(documented approved copy + the stack's WhatsApp-deep-link primary CTA).
**Current metrics:** Not yet defined — confirm with owner (no analytics/GA4 setup referenced
anywhere in the repo yet).
