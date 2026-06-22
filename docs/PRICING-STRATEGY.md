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
