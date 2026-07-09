# Allegra Chamber Bali — Pricing Strategy (Draft, Internal Only)

> **Status: DRAFT recommendation, not yet owner-approved.** This document exists to unblock
> internal B2B sales conversations (wedding planners, venues) that need _some_ number to
> respond with. It is **not** the real-figures pricing the owner has been waiting for to lift
> the site-wide pricing hide (see `CLAUDE.md` § Confirmed decisions and § Open questions) — the
> per-musician base rate below is a researched estimate, not Allegra's actual cost structure.
> **Do not publish this on the live site.** Do not quote a client a number from this doc without
> the owner's sign-off first.

## 1. Why this document exists

No pricing research or price list existed anywhere in this repo before this document (confirmed
2026-06-23 — `docs/`, `.agents/product-marketing.md`, and the Notion-derived files contain zero
competitor names or price figures). The owner needs a defensible starting number for B2B
outreach (wedding planners/venues) _now_, even before final real-cost figures are locked in.
This is that starting point — built from real competitor/market research, not invented.

## 2. Competitive & market research (sources below)

### 2.1 Direct Bali competitors

| Vendor                                        | Formations offered                                                        | Pricing model           | Public price?                                       |
| --------------------------------------------- | ------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------- |
| **Moira Ensembles** (Bali)                    | Solo / Duo / Trio / Quartet / Quintet+ — near-identical lineup to Allegra | Bills by 45-min session | **No** — quote-only via WhatsApp/Bridestory inquiry |
| **Allegro Bali String Quartet**               | String quartet/trio                                                       | —                       | No public pricing found                             |
| Bali Wedding Solutions (agency, multi-vendor) | String quartet/trio as one of several entertainment options               | Custom quote            | No public pricing found                             |

**Key finding:** every direct Bali chamber-ensemble competitor hides pricing and sells via
quote/inquiry — nobody in this specific niche publishes a rate card. This validates the owner's
quote-based, WhatsApp-first sales motion; it does **not** mean Allegra should have no internal
number — it means the number stays off the public site (already the locked decision) while
still existing for B2B quoting.

### 2.2 Bali wedding-budget context (what couples are already spending)

- Bali wedding budgets run **USD 5,000–20,000** (intimate/elopement), **USD 20,000–60,000**
  (mid-range, the most common international-couple tier), **USD 60,000–150,000** (premium), and
  **USD 150,000+** (luxury) — [Luxima Wedding Bali Budget Guide, 2027].
- Within that, the generic "live music" line item spans **USD 500 (solo acoustic) to USD 5,000+
  (full band)**; DJ packages run USD 800–2,500 — [same source]. This is the broad entertainment
  category, not chamber-ensemble-specific, but sets the outer bounds.
- One real, itemized Bali wedding budget (Reddit r/BigBudgetBrides) lists **"Live band:
  USD 1,550"** as a single line item in an otherwise mid-range-budget wedding.

### 2.3 Regional/global chamber-ensemble benchmarks (context only — see §2.4 for the actual anchor)

| Market                                                                | Source                                                                         | Quartet price                                                                                                                                                                             | Notes                                                                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| US (general, small-to-mid market)                                     | LIV Entertainment Group                                                        | **USD 500–3,000**                                                                                                                                                                         | Low end = ceremony-only/newer quartets; mid = ceremony+cocktail; high = elite/iconic-venue          |
| US (small-market, itemized rate card)                                 | St. Cloud String Quartet                                                       | Ceremony **$875** → +Cocktail **$1,215** → +Dinner **$1,555** (Trio/Duo scaled down ~0.77x/0.54x)                                                                                         | Best public example of segment-based package structure                                              |
| Hong Kong                                                             | Gig Heaven (aggregator, 104 quartets)                                          | **HKD 705–24,730** (≈USD 90–3,170), average **HKD 5,537** (≈USD 710)                                                                                                                      | Wide range = budget-to-elite spread in one market                                                   |
| **Singapore** (closest comparable luxury/destination-adjacent market) | **Meraki String Quartet** — only SG quartet with published transparent pricing | **SGD 1,999 / 2hr**, **SGD 2,599 / 3hr**, **SGD 3,199 / 4hr** (≈USD 1,480 / 1,925 / 2,370). Build-your-own: **$300/musician first hour + $100/musician per addl. 30 min + $99 admin fee** | Most useful single international data point — premium positioning, per-musician transparent formula |
| US (solo pianist, small-market)                                       | pianojenny.com                                                                 | **$300** ceremony OR cocktail, **$400** for both                                                                                                                                          | Useful for the "bundling ≠ 2x price" pattern, not a luxury benchmark                                |

**Takeaway:** a professional wedding string quartet internationally typically runs
**USD ~700–3,000 per booking** depending on duration and market tier, with Singapore's premium,
transparently-priced competitor landing at **USD 1,480–2,370** for 2–4 hours. **This
international band is a ceiling/sales-story reference, not Allegra's pricing anchor** — see §2.4
and §3 for why the actual recommendation in §4 is calibrated to Bali, not Singapore/HK/US.

### 2.4 Bali marketplace data (Bridestory — added 2026-06-23, the primary pricing anchor)

Bridestory (Indonesia's largest wedding-vendor marketplace) lists actual sale prices for
chamber/acoustic formations from a real Bali vendor, **SugarCoustic** (categorized "Wedding
Band," offers Duo/Trio/Quartet formations — same structural category as Allegra, lower
prestige/positioning):

| Vendor              | Package       | Listed price (IDR)                        | Notes                                                                                                                     |
| ------------------- | ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| SugarCoustic (Bali) | Trio Acoustic | **IDR 3,250,000** (discounted: 3,087,500) | Bridestory Store SKU; page metadata dated 2020 — **stale, treat as a 2020 floor, not current**                            |
| SugarCoustic (Bali) | Quartet Band  | **IDR 4,250,000** (discounted: 4,037,500) | Same caveat — 2020 listing, "Best Price"/Deals-tier (i.e. the cheapest tier in the market, not representative mid-market) |

No duration/segment breakdown is published for either SKU — likely a single-booking/single-set
price, not a multi-segment (ceremony+cocktail+dinner) package. Other Bali entertainment vendors
on Bridestory (Joshua Setiawan Entertainment, LOVA, Venus, Bali Jazz, etc.) only show a `$`/`$$`/
`$$$` relative price-tier badge, not actual IDR figures — Joshua Setiawan's own pricelist tab
explicitly says "kami akan mengirimkan pricelist kami" (we'll send our pricelist on request) —
confirming, again, that quote-on-request is the market norm in Bali, not published numbers.

**Why this is the anchor, not §2.3:** Singapore/HK/US benchmarks describe what chamber ensembles
cost in _wealthy-nation_ markets — useful as a ceiling/value-story reference ("Singapore-caliber
quality, Bali pricing"), but a poor pricing _anchor_ for what Allegra should actually charge in
IDR. The Bridestory data, even stale and budget-tier, is real evidence of the local market floor.
Cross-checked against the broader, more current Luxima Bali budget guide (§2.2: "live music...
USD 500 for a solo acoustic performer" as the floor for ceremony+reception coverage), §4's matrix
is anchored to **Bali market reality**, positioned a deliberate premium above SugarCoustic's
budget-tier floor (Allegra is a specialist conservatory-trained chamber ensemble, not a generic
cover band) but well below the Singapore/HK/US figures.

## 3. Positioning recommendation

Allegra's brand voice explicitly avoids "cheap/affordable/budget" framing and positions as
refined luxury — but the audience paying the bill (couples and the planners/venues quoting on
their behalf) transacts in Bali, in IDR, against real local vendor pricing (§2.4), not against a
Singapore or US invoice. Pricing as if Allegra operates in Singapore would price the brand out
of its own market; pricing at SugarCoustic's stale, budget-tier Bridestory floor would
contradict the refined-luxury positioning entirely.

**Recommendation: anchor to Bali market reality (§2.4), priced at a deliberate premium above the
local generic-wedding-band floor to read as specialist/refined, not cheap — keep the
Singapore/HK/US figures (§2.3) only as a _sales-conversation_ reference point.**
_"Singapore-caliber chamber ensemble, Bali pricing"_ remains a true, usable comparison even
though it is no longer the pricing anchor itself.

## 4. Recommended pricing model (IDR, Bali-anchored)

Hand-anchored to the Bali evidence in §2.4 (SugarCoustic/Bridestory floor + Luxima's Bali budget
guide), rather than derived from one rigid linear per-musician formula — a strict per-musician
formula made Solo come out cheaper than Luxima's own documented Bali floor for a solo act, which
isn't credible, so Solo is anchored directly to that floor and the larger formations are priced
as a deliberate step above the SugarCoustic floor. **All numbers below are estimates pending the
owner's real musician day-rates — treat the matrix as a starting point, not validated final
pricing.**

- **Full Package is the anchor** for each formation; Ceremony/Cocktail/Dinner-only prices are
  derived as roughly 45–56% of the Full Package figure (the same bundle-discount shape every
  researched competitor uses), then rounded to clean numbers.
- **Currency:** IDR is primary — it's the actual transaction currency for a Bali-based business.
  A USD-equivalent can be quoted on request for international clients (~IDR 16,300 = USD 1,
  illustrative — verify the live rate before quoting USD; don't print a stale conversion).
- **Travel fee by Bali zone:** not yet defined — see `CLAUDE.md` § Open questions. Add as a
  separate line once the owner sets zone tiers; do not fold a guessed number into the prices below.

### 4.1 Price matrix by event segment × formation (IDR, estimate)

Assumed performance durations: Ceremony ≈ 1 hr · Cocktail ≈ 1 hr · Dinner ≈ 1.5 hr · Full
Package ≈ 3.5 hr continuous (one booking — not three segments stacked).

| Formation                                                   | Ceremony only | Cocktail only | Dinner only   | **Full Package** (Ceremony + Cocktail + Dinner) |
| ----------------------------------------------------------- | ------------- | ------------- | ------------- | ----------------------------------------------- |
| Solo (Violin/Cello/Piano)                                   | Rp 3,500,000  | Rp 3,500,000  | Rp 4,500,000  | **Rp 8,000,000** (≈USD 490)                     |
| Duo                                                         | Rp 5,000,000  | Rp 5,000,000  | Rp 6,000,000  | **Rp 11,000,000** (≈USD 675)                    |
| Trio                                                        | Rp 6,500,000  | Rp 6,500,000  | Rp 8,000,000  | **Rp 14,000,000** (≈USD 860)                    |
| String Quartet                                              | Rp 8,000,000  | Rp 8,000,000  | Rp 10,000,000 | **Rp 18,000,000** (≈USD 1,105)                  |
| Large Ensemble (quartet + piano + double bass, 6 musicians) | Rp 12,000,000 | Rp 12,000,000 | Rp 14,500,000 | **Rp 26,000,000** (≈USD 1,595)                  |

Sanity checks against §2.4 research: Solo's Full Package (Rp 8,000,000 ≈ USD 490) lands almost
exactly on Luxima's documented USD 500 Bali floor for a solo act covering ceremony+reception.
Trio and Quartet sit at roughly 2.5–3x SugarCoustic's stale, budget-tier 2020 Bridestory price —
a believable specialist premium over a generic local cover band, not a Singapore-level price
(Quartet here is ~57% of Meraki Singapore's comparable 3hr package). Full Package is priced as
**one continuous booking**, which is why it comes out ~30% below the sum of booking the same
three segments separately (e.g. Quartet: Rp 8,000,000 + 8,000,000 + 10,000,000 = Rp 26,000,000
separately vs. **Rp 18,000,000** as a Full Package).

### 4.2 Piano + upsell (Duo/Trio/Quartet add-on)

Per CLAUDE.md, "Piano +" is sold as on-page upsell copy, not a separate formation/keyword. Sized
to roughly match the Duo→Trio / Trio→Quartet step in §4.1 (i.e. the real cost of one more
musician on stage):

| Segment                  | Piano+ add-on price |
| ------------------------ | ------------------- |
| Ceremony / Cocktail only | **+Rp 1,500,000**   |
| Dinner only              | **+Rp 2,000,000**   |
| Full Package             | **+Rp 3,500,000**   |

(Large Ensemble already includes piano by default — no Piano+ add-on needed there.)

## 5. What's still open before this becomes real pricing

1. **Real musician day-rates** — the matrix above is anchored to real Bali marketplace evidence
   (§2.4), but is still an estimate, not Allegra's actual musician fees. Owner must validate or
   replace.
2. **Travel fee per Bali zone** — explicitly still TBC per `CLAUDE.md`; don't invent a number.
3. **Deposit policy** — also still TBC per `CLAUDE.md` § Open questions.
4. **Owner sign-off** — once 1–3 are resolved, decide whether/when to lift the site-wide pricing
   hide (currently intentional, locked decision) vs. keep this as B2B-quote-only material
   indefinitely (which is what every direct Bali competitor researched here actually does).

## 6. Sources

- LIV Entertainment Group, "Cost of a String Quartet for a Wedding 2026" — liventgroup.com/cost-of-string-quartet-for-wedding/
- St. Cloud String Quartet rate card — saintcloudstringquartet.com/Rates.html
- Gig Heaven, "String Quartets for Hire in Hong Kong" — gigheaven.com/search/string-quartets/hong-kong.html
- Meraki String Quartet (Singapore) pricing plans — merakistringquartet.com/pricing-plans.html
- Luxima Wedding, "Bali Wedding Budget Guide: Real Costs for 2027" — luximawedding.com/bali-wedding-budget-guide/
- Reddit r/BigBudgetBrides, "Our Bali wedding budget breakdown"
- Moira Ensembles vendor profile — bridestory.com/moira-ensembles
- Bali Wedding Solutions, music page — baliweddingsolutions.com/music/
- pianojenny.com, "How Much Money Should Wedding Ceremony Musicians Charge?"
- Bridestory, Bali Entertainment (Music) vendor directory — bridestory.com/indonesia/bali/entertainment-music
- SugarCoustic (Bali) Bridestory Store listings — bridestory.com/store/quartet-band-6a74, bridestory.com/store/trio-acoustic-3f1b
- Joshua Setiawan Entertainment (Bali) Bridestory profile — bridestory.com/joshua-setiawan-entertainment

_Research conducted 2026-06-23 via Firecrawl web search/scrape. All figures current as of that
date; re-verify before relying on this for a live quote._

## 7. 2026-07-09 Revision — Piano Bundled by Default, No Full Package, 10-Piece Large Ensemble

**Status: still DRAFT, still not owner-approved on the actual figures** — this revision changes the
_structure_ of the pricing (owner-directed, see below) and re-derives §4's numbers accordingly. It
does not resolve §5's open items (real musician day-rates, travel fee, deposit policy) — those
remain outstanding.

### 7.1 What changed (owner direction, 2026-07-09)

1. **Full Package removed** — `docs/Allegra-Chamber-Bali-Pricing.html` no longer offers a bundled
   ceremony+cocktail+dinner package; only the three individual segments (Ceremony / Cocktail /
   Dinner) are priced.
2. **Large Ensemble redefined from 6 to 10 musicians, default composition**: 4 violins, 2 violas,
   2 cellos, 1 double bass, 1 piano. Additional musicians beyond 10 are billed per musician on
   request. This directly changes CLAUDE.md's 2026-06-18 "confirmed decision" of quartet + piano +
   double bass (6 musicians) — see §7.4, not yet reconciled site-wide.
3. **Piano is now bundled as standard (not a paid upsell) into Duo, Trio, and String Quartet**, in
   addition to Large Ensemble which already included it. This retires the old "Piano + Upgrade"
   add-on for those three formations — its price delta is folded into the new base price instead
   (see §7.3). Solo is unaffected (piano was already one of the three Solo instrument choices).

### 7.2 New competitor research (2026-07-09, international-client angle)

Prior research (§2) covered generic Bali market + Singapore/HK/US benchmarks. This pass
specifically targeted vendors serving **international/destination-wedding clients** in Bali.
Conducted via live web search (WebSearch/firecrawl); every fact below is source-linked.

- **New Bali vendors found:** Bossamusika (bossamusika.com) — luxury live-music agency naming
  Alila Uluwatu and Four Seasons Jimbaran Bay as resort associations, quote-only, no public
  pricing. Silaen Music (silaenmusic.com) — Bali wedding band with an optional violin/cello
  add-on, no public pricing. A Hong Kong wedding blog documents Moira Ensembles (string quartet)
  performing at an actual Six Senses Uluwatu wedding alongside Silaen Music — real confirmation a
  Bali chamber-ensemble vendor has served a five-star international resort, but no price disclosed
  (theweddingcohk.com/old-world-elegance-at-six-senses-bali).
- **Resort-bundled precedent:** Alila Uluwatu's own wedding packages (via baliweddingsolutions.com)
  include "Trio musicians to accompany the ceremony procession" as a standard inclusion at every
  package tier — evidence international-facing Bali resorts already expect/bundle live chamber
  music, not that it's an optional extra.
- **Piano-bundled-by-default market check:** only one precedent found anywhere — Dario Music
  (Jakarta, Bridestory) bundles 1 vocalist + 4 strings + 1 piano + sound system as a single
  package line item. No Bali-based string quartet/chamber vendor found bundles piano by default;
  everywhere else (Meraki Singapore, Riverside Ensembles AU, Vivace Live US) piano is quote-only/
  optional-add. **Conclusion: piano-included-as-standard remains a genuine, rare differentiator
  for Allegra in the Bali market**, not something to hide — it's defensible as a value story, not
  just a cost increase.
- **Large-ensemble scaling comps:** Bali pop-band-plus-strings acts (baliweddingprices.com) price
  a 10-piece at ~US$1,750 and a 12-piece at ~US$2,000 (Djampiro & String Section / Mini Orchestra)
  — not classical chamber ensembles, but a useful sanity ceiling: Allegra's new 10-piece Large
  Ensemble (Rp 18,000,000 Ceremony/Cocktail ≈ USD 1,100, Rp 22,500,000 Dinner ≈ USD 1,380) sits
  believably under/near that band's full-event price for a single segment, appropriate for a
  higher-prestige classical formation without over-pricing past the local ceiling.
- **No Bali vendor publishes a per-extra-musician rate.** International comps do (Meraki
  Singapore's $300/musician-first-hour formula, reconfirmed; Sienna Quartet US ~$237/musician/hr
  octet-vs-quartet delta) — these validate that per-musician scaling pricing is a normal industry
  pattern, but none are Bali-anchored, so §7.3's rate is derived internally (below), not copied.
- **Terms/technical-rider patterns found:** UK/US quartets typically bill overtime per 30 min
  (£120/Sienna ~$280) and are unplugged-by-default (amplification arranged separately); no
  Bali-specific overtime or technical-rider figures exist publicly anywhere. No vendor, Bali or
  international, was found publishing an explicit acoustic-vs-electric-piano policy — this is a
  real gap, and Allegra publishing one (see the pricing sheet's "Good to Know" section) is ahead of
  the market, not behind it.

Full source list: bossamusika.com/wedding-live-music-bali, silaenmusic.com,
theweddingcohk.com/old-world-elegance-at-six-senses-bali, baliweddingsolutions.com/alila-uluwatu,
baliweddingsolutions.com/music, bridestory.com/dario-music, merakistringquartet.com/pricing-plans,
riversideensembles.com.au/price-guide, vivacelive.com/weddings,
baliweddingprices.com/best-live-wedding-bands-in-bali, siennaquartet.com/pricing,
theweddingstringquartet.com/terms-and-conditions.

### 7.3 New pricing derivation — per-musician formula

Re-deriving from §4.1's existing anchors rather than inventing new figures: the old string-only
progression (Solo→Duo→Trio→Quartet) already implied a consistent **~Rp 1,500,000 per additional
musician** for Ceremony/Cocktail and **~Rp 1,500,000–2,000,000** for Dinner — and the old "Piano +"
add-on (+Rp 1,500,000 Ceremony/Cocktail, +Rp 2,000,000 Dinner) matched that same per-musician rate
almost exactly. That consistency is the basis for this revision: **piano bundling and Large
Ensemble scaling both reuse the identical, already-established per-musician rate** rather than
introducing new numbers.

| Formation      | Musicians (piano incl.)              | Ceremony Only | Cocktail Only | Dinner Only   | Derivation                                |
| -------------- | ------------------------------------ | ------------- | ------------- | ------------- | ----------------------------------------- |
| Solo           | 1                                    | Rp 3,500,000  | Rp 3,500,000  | Rp 4,500,000  | Unchanged from §4.1                       |
| Duo            | 3 (violin, cello, piano)             | Rp 6,500,000  | Rp 6,500,000  | Rp 8,000,000  | Old Duo + old Piano+ delta                |
| Trio           | 4 (+viola)                           | Rp 8,000,000  | Rp 8,000,000  | Rp 10,000,000 | Old Trio + old Piano+ delta               |
| String Quartet | 5 (+2nd violin)                      | Rp 9,500,000  | Rp 9,500,000  | Rp 12,000,000 | Old Quartet + old Piano+ delta            |
| Large Ensemble | 10 (4 vln, 2 vla, 2 vc, bass, piano) | Rp 18,000,000 | Rp 18,000,000 | Rp 22,500,000 | Old 6-piece Large + 4 × per-musician rate |

**Sanity check:** Duo+piano (3 musicians) lands exactly on old Trio's price (3 musicians,
no piano) — Rp 6,500,000 both. Trio+piano (4 musicians) lands exactly on old Quartet's price (4
musicians) — Rp 8,000,000 both. Same-headcount formations converging on the same price, regardless
of whether the extra voice is a string or piano, is the internal consistency check that makes this
formula defensible as "the same rate for every additional performer," not an arbitrary piano
surcharge.

**Additional musicians beyond Large Ensemble's default 10:** priced at the same rate —
**+Rp 1,500,000/musician** (Ceremony/Cocktail), **+Rp 2,000,000/musician** (Dinner) — published on
the client-facing pricing sheet as "Scaling Up the Large Ensemble."

**Still not real cost data.** This is a transparent, internally-consistent re-derivation of
§4.1's existing (already-flagged-draft) anchors — it is not sourced from Allegra's actual musician
day-rates, which remain unknown (§5, item 1, still open).

### 7.4 Reconciled site-wide (2026-07-09, same session)

Owner confirmed (via AskUserQuestion) that the new formation/piano structure should propagate
beyond the pricing doc, not stay doc-only. Updated the same day: `CLAUDE.md` Confirmed decisions
(Large Ensemble composition + Piano+ → piano-included-standard), `.claude/brand-voice-guidelines.md`
Signature Sound section, `src/i18n/ui.ts` (EN+ID — formation taglines/blurbs, sitewide FAQ), all 4
`src/content/packages/*.md` formation files, and 12 `/journal` article files (6 EN + their 6 ID
translations) that had substantial "Piano +" upgrade copy — including
`string-quartet-bali-wedding.md`'s dedicated "Piano + String Quartet" section, rewritten as "Why
Piano Comes Standard." Care was taken to keep the _generic_ musical definition of "string quartet"
(2 violins, viola, cello) factually correct in FAQ/AEO content — Allegra's piano-bundling is stated
as a booking-specific fact layered on top of that definition, not a redefinition of the term
itself. `npm run lint && npm run build` clean after every batch (0 errors).

## 8. 2026-07-09 Revision (same day, second pass) — Final Pricing, Flat Scaling Rate

Owner reviewed the restructured pricing sheet and requested a second round of changes, applied
directly to `docs/Allegra-Chamber-Bali-Pricing.html` (not yet reflected back into §4's matrix
below — treat this section as the current source of truth for those specific fields):

1. **Pricing is now stated as final, not indicative.** The header ("Indicative pricing as of July
   2026" → "Final pricing as of July 2026"), the intro lede, and the footer CTA were all reworded
   to drop "planning reference" / "confirm an exact quote" framing — the figures in the table are
   what a couple is quoted, subject only to date availability. (Deposit/travel-fee bullets still
   say "confirmed with your quote" — left as-is, not explicitly flagged by the owner in this pass.)
2. **Large Ensemble overage rate simplified to a flat Rp 2,500,000 per musician, per session** —
   replaces the old differentiated rate (+Rp 1,500,000 Ceremony/Cocktail, +Rp 2,000,000 Dinner)
   derived in §7.3. This is an owner-supplied real number, not a re-derived estimate like the rest
   of this document — treat it as more authoritative than the §7.3 formula it replaces.
3. **Electric piano amplification explicitly excluded**, clarified as falling under "sound system"
   (which Allegra already didn't provide) rather than something bundled with the piano itself. The
   piano/acoustic-piano bullet and the sound-system bullet were both reworded so the two no longer
   contradict each other (previously implied the piano came pre-amplified).
4. **USD-equivalent-on-request bullet removed entirely** (owner direction, no reason recorded).

**Still open:** deposit %, travel-fee amounts by zone, and overtime rate remain unset — the Rp
2,500,000/musician scaling rate is the only owner-confirmed real figure to date; everything else
Rp-denominated in this document is still the researched/derived estimate from §7.3, pending the
owner's real cost figures per §5.

## 9. 2026-07-09 Revision (same day, third pass) — Gap/Clarity Audit

Owner asked for a 2026-relevance + gap/confusion audit of the pricing sheet. Live web checks
(current, not from the 2026-06-23/07-09 research batches): USD/IDR spot rate is **~Rp 18,100/USD**
(xe.com, exchange-rates.org, checked 2026-07-09) — the ~16,300 figure used earlier in this doc for
illustrative USD conversions is stale; re-derive from ~18,100 if a USD reference is ever needed
again. Also checked a Bridestory listing (Archipelagio Music, Bali) showing a 4-piece string
quartet + 2000W sound system at **IDR 18,000,000** — but the listing's own metadata dates it to
**2020** and the product is marked "Not Available," so it's not current-market evidence, only a
weak historical signal (a 2020, no-piano, PA-bundled quartet already priced at what Allegra's 2026
Large Ensemble Ceremony/Cocktail tier charges) worth keeping in mind, not acting on.

Six gaps were identified; five were fixed directly in `docs/Allegra-Chamber-Bali-Pricing.html`
(owner explicitly deferred the sixth, multi-session bundling, as a business decision, not a copy
gap):

1. **"Final pricing" contradicted the travel-fee/deposit/overtime bullets**, which still said
   "confirmed with your quote" — reads as though the price isn't actually final. Fixed: the
   "final" bullet now explicitly scopes itself to formation+coverage price and points to
   travel/deposit/overtime as separate; those three bullets dropped "quote" language in favor of
   "confirmed separately once we know your venue/booking details."
2. _(Skipped — Full Package removal / no multi-segment discount is a business decision, not a
   copy gap. Still worth the owner's attention: most real weddings book more than one segment.)_
3. **The flat Rp 2,500,000/musician Large Ensemble scaling rate is ~39% above the base 10-piece
   lineup's implied per-musician cost for Ceremony/Cocktail** (Rp 18,000,000 ÷ 10 = Rp 1,800,000)
   and only ~11% above Dinner's implied per-musician cost (Rp 22,500,000 ÷ 10 = Rp 2,250,000) —
   defensible (last-minute/custom scaling costing more than the standard lineup is normal), but
   unexplained. Fixed: added "arranged individually for your event" / "a flat, on-request rate
   across all coverage types" / "reflecting custom arrangement" to the callout and the Good to
   Know bullet — framing only, no new numeric claim.
4. **Wording mismatch**: the "Scaling Up" callout said "additional **string** musicians" but the
   Good to Know bullet just said "additional musicians," which could read as covering a 2nd
   piano/bass at the same rate. Fixed: Good to Know bullet now also says "additional string
   musicians."
5. **Ceremony (≈45 min) and Cocktail (≈1 hr) are priced identically per formation** with no stated
   reason — inherited from the original §4.1 design, not introduced this session, but flagged
   since the owner asked specifically for confusion points. Fixed: added a Good to Know bullet
   explaining a shorter Ceremony needs the same setup/travel/precision-timing overhead as a full
   Cocktail hour.
6. _(Not a copy fix)_ Reiterated to the owner that every Rp figure in the pricing table except the
   flat scaling rate is still the researched/derived estimate from §7.3, not Allegra's real cost
   data — internally consistent and market-plausible, but not independently validated against
   actual musician day-rates.

**Same-day follow-up (owner review pass 4):** owner removed the standalone travel-fee bullet from
`docs/Allegra-Chamber-Bali-Pricing.html` entirely (reason not recorded — travel fee itself is
still an open item per `CLAUDE.md` § Open questions, this only removed the doc's mention of it).
The "final pricing" bullet's "Travel fee, deposit, and overtime (see below)" pointer was trimmed to
just "Deposit and overtime" so it no longer references a bullet that's been removed.

## 10. 2026-07-09 Revision (same day, fifth pass) — Real Musician Honor Data + Cocktail Price Fix

**First real cost input from the owner** (all prior Rp figures in this document were
researched/derived estimates, explicitly flagged as such — this is the first genuine correction).
Delivered outside this doc as a chat report/artifact (an internal financial audit, not published
anywhere in the repo) before this file was updated.

### 10.1 Real musician honor (owner-supplied 2026-07-09)

Flat rate per musician, per session — **not** differentiated by instrument (no separate
piano/double-bass premium, unlike this document's earlier estimates in §9's predecessor draft):

| Session  | Honor per musician |
| -------- | ------------------ |
| Ceremony | Rp 1,000,000       |
| Cocktail | Rp 1,500,000       |
| Dinner   | Rp 1,500,000       |

Applying this (headcount × rate) against the live price table found gross margins were healthy
almost everywhere (Ceremony 44–71%, Dinner 33–67% across all formations) — **except Cocktail**,
which shares Dinner's higher honor rate (Rp 1,500,000/musician) but was priced identically to the
cheaper Ceremony segment. That mismatch made Cocktail the thinnest-margin segment in every
formation, most acutely for **Large Ensemble (net margin ~1.7% after an assumed 15% management
allocation) and String Quartet (~6%)** — both flagged as needing a price correction; Solo (~42%),
Duo (~16%), and Trio (~10%) were left alone as still adequately healthy.

### 10.2 Owner decision: raise Cocktail Only for String Quartet and Large Ensemble

Owner asked whether raising price was viable given Allegra is a **new brand but with experienced
musicians** — reasoning agreed: brand newness is an awareness/trust problem (addressed by
portfolio, credentials, testimonials — see [[project_testimonial_form]]), not a price-ceiling
problem, and this specific fix carries unusually low risk because (a) pricing is never published
publicly — every quote is personal, so there's no visible "old price" being walked back, (b) the
increase is narrow (2 of 5 formations, one segment only) and small in absolute terms relative to
booking value, and (c) it corrects an internal inconsistency (Cocktail = Ceremony price despite
Dinner-level staffing cost) rather than asserting new "premium brand" pricing power. Owner approved
with the instruction to raise only what needed it, by a small amount, within the previously
recommended Rp 500,000–1,000,000 range.

**Applied: +Rp 1,000,000 to Cocktail Only, top of the recommended range, for both flagged
formations** — a uniform, round-number, easy-to-explain adjustment:

| Formation      | Cocktail Only (was) | Cocktail Only (now) | Net margin (was → now, @ 15% mgmt) |
| -------------- | ------------------- | ------------------- | ---------------------------------- |
| String Quartet | Rp 9,500,000        | Rp 10,500,000       | ~6% → ~14%                         |
| Large Ensemble | Rp 18,000,000       | Rp 19,000,000       | ~1.7% → ~6%                        |

Solo, Duo, Trio, and every formation's Ceremony/Dinner price are **unchanged**. This also means
Ceremony and Cocktail are no longer priced identically for these two formations — the "Good to
Know" bullet explaining Ceremony=Cocktail parity was updated to scope that claim to Solo/Duo/Trio
only, with a client-facing (not internal-margin) rationale for why String Quartet/Large Ensemble
now differ: added coordination for a larger ensemble in a mingling/background setting.

### 10.3 Still open

The 15% management allocation and any target net-margin figure remain the author's assumption, not
owner-confirmed — §10.1's honor data only replaces the _musician-cost_ side of the model. Large
Ensemble Cocktail's margin, while no longer critical, is still the thinnest segment in the table
(~6%) — worth another look once real management-overhead figures are available.
