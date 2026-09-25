# Journal Article Backlog

> Dibaca oleh `.claude/skills/journal-article-publisher/SKILL.md` di awal tiap run terjadwal.
> Ini satu-satunya memori routine antar-run — tiap run mulai fresh tanpa ingatan sesi sebelumnya.
>
> **Cara pakai (instruksi untuk routine):**
>
> 1. Scan tabel Status dari atas ke bawah. Item "berikutnya" = baris `status: todo` dengan `#`
>    terkecil.
> 2. Kalau tidak ada baris `todo`, kirim Slack "Backlog selesai, tidak ada yang perlu dipublish
>    run ini" lalu stop — ini sukses, bukan gagal.
> 3. Sebelum drafting, pastikan `src/content/articles/<slug>.md` BELUM ada untuk slug item itu.
>    Kalau sudah ada, sesuatu tidak konsisten — set status `blocked`, commit+push perubahan status
>    itu sendiri (tanpa isi artikel), alert Slack untuk review manual. Jangan menebak dan menimpa.
> 4. Status hanya boleh berubah ke `done` DALAM COMMIT YANG SAMA dengan penambahan file artikel
>    EN+ID — jangan pernah update status terpisah dari konten. Ini yang membuat file ini self-
>    healing: kalau sebuah run gagal sebelum commit, baris tetap `todo` dan run berikutnya otomatis
>    mengulang item yang sama tanpa perlu retry-counter terpisah.
> 5. Isi kolom `publishedDate` saat status menjadi `done` (tanggal commit, bukan tanggal merge PR).
> 6. Status `proposed` = usulan dari riset keyword (`docs/KEYWORD-MAP-*.md`) yang BELUM disetujui
>    owner. Routine mengabaikannya sama seperti `done` — jangan pernah mengeksekusi atau mengubah
>    baris `proposed`. Hanya owner yang mengubah `proposed` → `todo`.

## Status

| #   | status   | slug                                    | pillar           | title (working)                                                              | publishedDate |
| --- | -------- | --------------------------------------- | ---------------- | ---------------------------------------------------------------------------- | ------------- |
| 1   | done     | intimate-wedding-music-bali             | planning         | Music for an Intimate Wedding in Bali — Allegra Chamber Bali                 | 2026-08-30    |
| 2   | done     | custom-wedding-music-arrangement        | piano-repertoire | How a Custom Wedding Music Arrangement Is Made — Allegra Chamber Bali        | 2026-08-31    |
| 3   | done     | balinese-wedding-ceremony-music         | bali-venues      | Live Music for a Balinese-Influenced Wedding Ceremony — Allegra Chamber Bali | 2026-09-04    |
| 4   | done     | tech-rider-live-wedding-music           | for-planners     | Tech Rider Basics for Live Wedding Music — Allegra Chamber Bali              | 2026-09-07    |
| 5   | done     | wedding-ceremony-song-count             | planning         | How Many Songs for a Wedding Ceremony? — Allegra Chamber Bali                | 2026-09-09    |
| 6   | done     | cocktail-hour-wedding-piano-music       | piano-repertoire | Cocktail Hour Piano Music for Weddings — Allegra Chamber Bali                | 2026-09-11    |
| 7   | done     | villa-wedding-live-music-bali           | bali-venues      | Live Music for a Private Villa Wedding in Bali — Allegra Chamber Bali        | 2026-09-14    |
| 8   | done     | why-planners-recommend-live-music-bali  | for-planners     | Why Planners Recommend Live Music for Bali Ceremonies — Allegra Chamber Bali | 2026-09-16    |
| 9   | done     | when-to-book-wedding-musicians-bali     | planning         | When to Book Live Wedding Musicians in Bali — Allegra Chamber Bali           | 2026-09-18    |
| 10  | done     | classical-vs-contemporary-wedding-music | piano-repertoire | Classical or Contemporary Wedding Ceremony Music — Allegra Chamber Bali      | 2026-09-21    |
| 11  | done     | resort-ballroom-wedding-live-music-bali | bali-venues      | Live Music for a Resort or Ballroom Wedding in Bali — Allegra Chamber Bali   | 2026-09-23    |
| 12  | done     | live-music-vendor-coordination-bali     | for-planners     | Coordinating Live Music With Your Other Vendors — Allegra Chamber Bali       | 2026-09-25    |
| 13  | todo     | vow-renewal-live-music-bali             | planning         | Live Music for a Vow Renewal in Bali — Allegra Chamber Bali                  |               |
| 14  | todo     | violin-wedding-songs                    | piano-repertoire | Violin Wedding Songs for Every Ceremony Moment — Allegra Chamber Bali        |               |
| 15  | todo     | chapel-wedding-music-bali               | bali-venues      | Live Music for a Chapel Wedding in Bali — Allegra Chamber Bali               |               |
| 16  | todo     | outdoor-wedding-rain-plan-live-music    | for-planners     | A Rain Plan for Live Music at an Outdoor Wedding — Allegra Chamber Bali      |               |
| 17  | todo     | signing-of-the-register-music           | piano-repertoire | Music for Signing the Register — Allegra Chamber Bali                        |               |
| 18  | todo     | wedding-music-timeline                  | planning         | Your Wedding Music Timeline, Moment by Moment — Allegra Chamber Bali         |               |
| 19  | todo     | piano-first-dance-songs                 | piano-repertoire | Piano First Dance Songs for Your Wedding — Allegra Chamber Bali              |               |
| 20  | todo     | wedding-reception-dinner-music          | planning         | Live Music for Your Wedding Reception Dinner — Allegra Chamber Bali          |               |
| 21  | todo     | string-quartet-wedding-songs            | piano-repertoire | String Quartet Wedding Songs, Classical to Modern — Allegra Chamber Bali     |               |
| 22  | proposed | instrumental-wedding-songs              | piano-repertoire | Instrumental Wedding Songs for Your Ceremony — Allegra Chamber Bali          |               |
| 23  | proposed | ubud-wedding-live-music                 | bali-venues      | Live Music for an Ubud Wedding — Allegra Chamber Bali                        |               |
| 24  | proposed | classical-wedding-ceremony-music        | piano-repertoire | Classical Music for Your Wedding Ceremony — Allegra Chamber Bali             |               |
| 25  | proposed | cello-wedding-music                     | piano-repertoire | Cello Wedding Music for the Aisle and Beyond — Allegra Chamber Bali          |               |

## Item Details

### Item 1 — intimate-wedding-music-bali (planning)

<!-- cover image added manually 2026-08-30 (public/images/og-intimate-wedding-music-bali.jpg) after the routine's own attempt failed on a fresh sandbox missing node_modules -- see SKILL.md Step 0 fix -->

- **heading:** Music for an Intimate Wedding in Bali: Solo, Duo, or Trio
- **targetKeyword:** intimate wedding music bali
- **description seed:** Choosing live music for a small or intimate Bali wedding — how Solo, Duo,
  and Trio formations sound different, and which fits an intimate guest list. (rewrite to exactly
  150-160 chars when drafting — count it, don't eyeball it)
- **excerpt seed:** For a small guest list, sound matters as much as size — how Solo, Duo, and Trio
  formations compare for an intimate Bali ceremony.
- **outline (H2s):**
  1. What Counts as an "Intimate" Wedding, Musically?
  2. Solo: One Instrument, Full Focus
  3. Duo: Violin + Cello + Piano — Fuller Sound, Still Small
  4. Trio: Adding Viola for More Depth
  5. How Room and Guest Size Should Guide Your Choice, Not Just Budget
  6. Can You Upgrade the Formation Later If Plans Change?
- **FAQ candidates:**
  1. Q: What's the smallest formation Allegra offers? A: Solo — one musician on violin, cello, or
     piano.
  2. Q: Is piano included in Duo and Trio, or is it extra? A: Included as standard — Duo is
     violin + cello + piano, Trio adds viola. Not a paid add-on.
  3. Q: Does a smaller formation mean less sound for an outdoor venue? A: [draft against real
     formation/sound facts, don't fabricate a volume claim]
  4. Q: Can we start with Solo and add musicians later? A: [confirm against actual booking
     flexibility before answering — don't assume]
- **outboundLinkTarget:** `/packages/`
- **inboundLinkSource:** `src/content/packages/solo.md` (HTML `<a>` tag convention, matches its
  existing link to `wedding-pianist-bali`)
- **differentiation note:** Primary subject is Solo/Duo/Trio, NOT the quartet — don't overlap with
  `string-quartet-bali-wedding.md`, whose primary subject is the quartet (smaller formations only
  appear there as a comparison point).
- **cover image prompt:** "a single cellist in silhouette, playing in a lush tropical garden at
  dusk, warm golden light" (single-subject — avoid multi-figure ensemble close-ups)

### Item 2 — custom-wedding-music-arrangement (piano-repertoire)

- **heading:** From Song Request to Custom Arrangement: How Your Ceremony Music Gets Made
- **targetKeyword:** custom wedding music arrangement
- **description seed:** How a song request becomes a custom ceremony arrangement — what to send,
  how formation shapes the sound, and what to expect before your wedding day.
- **excerpt seed:** Your favorite song doesn't exist as sheet music for a string quartet — here's
  how a request becomes a custom arrangement for your ceremony.
- **outline (H2s):**
  1. Why Most Wedding Song Requests Need a Custom Arrangement
  2. What to Send When You Request a Song
  3. How the Arrangement Changes by Formation
  4. How Long Custom Arrangement Takes, and When to Request It
  5. Can Any Song Be Arranged for a Chamber Ensemble?
- **FAQ candidates:**
  1. Q: Can Allegra play any song we want at our ceremony? A: [most songs, with realistic caveats
     — don't overpromise]
  2. Q: Do we need to provide sheet music? A: [confirm actual intake process before answering]
  3. Q: How far in advance should we request a custom arrangement? A: [confirm real lead time]
  4. Q: Does a custom arrangement cost more? A: redirect to WhatsApp inquiry, matching the
     approved pricing-FAQ phrasing pattern already in `src/i18n/ui.ts` (`faqPage.items`)
- **outboundLinkTarget:** `/repertoire/` and `/contact/`
- **inboundLinkSource:** `src/content/articles/wedding-pianist-bali.md` (Markdown link, natural
  spot: where it discusses repertoire flexibility)
- **cover image prompt:** "handwritten sheet music on a wooden table, a pencil and a single rose
  resting on top, soft natural light" (flatlay, object only)

### Item 3 — balinese-wedding-ceremony-music (bali-venues)

- **heading:** Blending Traditions: Live Chamber Music for a Balinese-Influenced Wedding Ceremony
- **targetKeyword:** balinese wedding ceremony music
- **description seed:** How live Western chamber music fits alongside Balinese ceremonial elements
  for couples blending both traditions into their Bali wedding day.
- **excerpt seed:** Many couples marrying in Bali want to honor local traditions alongside a
  Western-style ceremony — how live music fits into that balance.
- **outline (H2s):**
  1. Why Couples Blend Balinese Elements Into a Destination Wedding
  2. Where Western Ceremony Music Typically Fits Around Adat Elements
  3. Working With Your Planner to Sequence Both Traditions
  4. What Allegra Provides (and What We Leave to Local Specialists)
  5. Questions to Ask When Planning a Blended Ceremony
- **FAQ candidates:**
  1. Q: Can live chamber music be part of a ceremony that also includes Balinese traditions? A:
     yes, sequenced around the adat elements — coordinate timing with your planner.
  2. Q: Does Allegra perform traditional Balinese music? A: **No** — Allegra performs Western
     chamber/piano repertoire. For traditional elements, your planner can coordinate local
     musicians/specialists.
  3. Q: How do we sequence Western and Balinese elements in one ceremony? A: [general guidance,
     defer specifics to planner]
  4. Q: Who should we loop in to plan a blended ceremony? A: your wedding planner, primarily.
- **outboundLinkTarget:** `/for-planners/`
- **inboundLinkSource:** `src/content/articles/live-music-bali-wedding-guide.md`
- **MANDATORY drafting note:** Do NOT claim Allegra performs or has expertise in Balinese ritual
  music. Be explicit that Allegra's role is the Western chamber/piano portion only; defer adat
  specifics to the couple's planner/local officiant. Avoid language that exoticizes the culture —
  treat it factually and respectfully, no romanticized/othering framing.
- **cover image prompt:** "a single frangipani flower resting across violin strings, soft
  daylight, minimal background" (object only — do NOT depict people or specific ritual objects;
  avoid any imagery that could misrepresent a specific ceremony/practice)

### Item 4 — tech-rider-live-wedding-music (for-planners)

- **heading:** Tech Rider Basics for Live Chamber Music at Weddings
- **targetKeyword:** tech rider live wedding music
- **description seed:** The technical specs a wedding planner or venue needs to know before
  hosting a live chamber ensemble — power, space, and setup requirements.
- **excerpt seed:** Power outlets, floor space, load-in timing — the technical specifics planners
  and venues need before hosting a live ensemble.
- **outline (H2s):**
  1. What's Actually in a Tech Rider for a Chamber Ensemble (vs. a Band or DJ)
  2. Power Requirements by Formation Size
  3. Space and Floor Requirements for Setup
  4. Load-In Timing and Access
  5. What Happens When a Venue Can't Meet a Requirement
- **FAQ candidates:**
  1. Q: Does a string quartet need more power than a solo pianist? A: [confirm real spec before
     answering — don't invent wattage numbers]
  2. Q: How much space does Allegra need to set up? A: [confirm real spec]
  3. Q: How early do musicians need venue access? A: [confirm real lead time]
  4. Q: What if our venue has restrictions we didn't know about? A: [contact us ahead of time to
     work it out]
- **outboundLinkTarget:** `/for-planners/` and `/contact/`
- **inboundLinkSource:** `src/content/articles/live-music-vendor-questions.md`
- **differentiation note:** The existing article is a broad pre-booking vetting checklist where
  "tech rider" is one bullet among several. This article is the dedicated deep-dive on that one
  bullet — real specs, not a repeat of the checklist. Cross-link both directions.
- **cover image prompt:** "a coiled XLR cable resting neatly beside a music stand, studio lighting,
  minimal composition" (technical object flatlay)
- **cover image done** (2026-09-08) — routine's initial `generate-cover-image.mjs` attempt on
  2026-09-07 failed (`Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN`, credentials not
  provisioned in that sandbox); generated manually the next session and wired into both EN/ID
  frontmatter as `ogImage: '/images/og-tech-rider-live-wedding-music.jpg'`.

### Item 5 — wedding-ceremony-song-count (planning)

- **heading:** How Many Songs Do You Need for a Wedding Ceremony?
- **targetKeyword:** how many songs for wedding ceremony
- **description seed:** How many pieces of music a wedding ceremony actually needs, from guest
  arrival to recessional, and how that shapes your booking length and budget.
- **excerpt seed:** A practical breakdown of how many songs a ceremony needs, from prelude to
  recessional, so you know what to ask for when you book.
- **outline (H2s):**
  1. What Counts as "Ceremony Music"?
  2. How Long Is a Typical Ceremony, and What Does That Mean for Song Count?
  3. Do You Need a Different Song for Each Moment, or Can Music Repeat?
  4. How Formation Size Changes How Much Music You Need
  5. What Happens If Your Ceremony Runs Long or Short?
- **FAQ candidates:**
  1. Q: How many songs does a wedding ceremony need? A: [give a real practical range grounded in
     prelude/processional/recessional structure]
  2. Q: Can the same song play for both processional and recessional? A: [confirm real practice]
  3. Q: Does a longer ceremony cost more? A: redirect toward `wedding-music-budget-bali` /
     WhatsApp inquiry pattern.
  4. Q: Who decides how many songs to prepare — us or the musicians? A: [confirm real process]
- **outboundLinkTarget:** `/packages/`, plus internal links to `wedding-music-budget-bali` and
  `wedding-processional-recessional-songs`
- **inboundLinkSource:** `src/content/articles/wedding-ceremony-piano-music.md`
- **cover image prompt:** "a single sheet of music with a violin resting on top, warm side
  lighting" (single object)
- **cover image done** (2026-09-11) — routine's initial `generate-cover-image.mjs` attempt on
  2026-09-09 failed (`Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN`, credentials not
  provisioned in that sandbox); generated manually the next session and wired into both EN/ID
  frontmatter as `ogImage: '/images/og-wedding-ceremony-song-count.jpg'`.

### Item 6 — cocktail-hour-wedding-piano-music (piano-repertoire)

- **heading:** Cocktail Hour Piano Music: What to Play After "I Do"
- **targetKeyword:** cocktail hour wedding music
- **description seed:** What changes musically once your ceremony ends and cocktail hour begins —
  mood, volume, and repertoire choices for the reception's first stretch.
- **excerpt seed:** The mood shifts the moment guests move to cocktails — what changes in the
  music, and how to plan for it alongside your ceremony booking.
- **outline (H2s):**
  1. How Cocktail Hour Music Differs From Ceremony Music
  2. Does the Same Formation Continue, or Does the Sound Change?
  3. Repertoire That Works for a Relaxed, Conversational Setting
  4. Can You Book Ceremony and Cocktail Hour Together?
  5. What to Tell Us About Your Cocktail Hour Setup
- **FAQ candidates:**
  1. Q: Is cocktail hour music included with ceremony booking, or separate? A: [confirm real
     package structure before answering]
  2. Q: Does the music get louder or more upbeat for cocktail hour? A: [confirm real approach]
  3. Q: Can we request different songs for cocktail hour than the ceremony? A: yes.
  4. Q: How long does a typical cocktail hour set run? A: [confirm real typical duration]
- **outboundLinkTarget:** `/packages/` and `/repertoire/`
- **inboundLinkSource:** `src/content/articles/wedding-band-vs-dj.md` (already discusses "each
  part of your day" — natural anchor point)
- **cover image prompt:** "champagne glasses beside a string instrument case, soft golden hour
  light" (object still-life)
- **cover image done** (2026-09-11) — routine's initial `generate-cover-image.mjs` attempt on
  2026-09-11 failed (`Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN`, credentials not
  provisioned in that sandbox); generated manually the same session and wired into both EN/ID
  frontmatter as `ogImage: '/images/og-cocktail-hour-wedding-piano-music.jpg'`.

### Item 7 — villa-wedding-live-music-bali (bali-venues)

<!-- cover image pending — CLOUDFLARE_ACCOUNT_ID/CLOUDFLARE_API_TOKEN not provisioned in this run's
     sandbox (2026-09-14). Run manually: node scripts/generate-cover-image.mjs
     villa-wedding-live-music-bali "a single grand piano on an open-air villa terrace overlooking
     tropical greenery, natural daylight" -- then add the printed ogImage path to both the EN and
     ID frontmatter. -->

- **heading:** Live Music for a Private Villa Wedding in Bali
- **targetKeyword:** villa wedding live music bali
- **description seed:** What to plan for live ceremony music at a private villa wedding in Bali —
  space, power access, and how villa acoustics differ from a resort venue.
- **excerpt seed:** Private villas are one of Bali's most popular wedding settings — what their
  layout means for live music placement and sound.
- **outline (H2s):**
  1. Why Private Villas Are a Common Bali Wedding Setting
  2. Typical Villa Layouts and Where Musicians Usually Set Up
  3. Power and Space Considerations Specific to Villas
  4. How Formation Choice Interacts With Villa Guest Capacity
  5. What to Confirm With Your Villa Before Booking Musicians
- **FAQ candidates:**
  1. Q: Do private villas usually have power access for musicians? A: [general guidance, confirm
     case-by-case]
  2. Q: Can live music work at a small villa wedding? A: yes — pairs well with Solo/Duo formations.
  3. Q: Does a villa wedding need amplification? A: [confirm real guidance, depends on layout]
  4. Q: What should we ask our villa about hosting live music? A: [power access, shaded setup
     area, noise consideration for neighboring villas]
- **outboundLinkTarget:** `/for-planners/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/wedding-venue-live-music-bali.md` (general venue
  checklist → this is the villa-specific deep dive)
- **cover image prompt:** "a single grand piano on an open-air villa terrace overlooking tropical
  greenery, natural daylight" (single-subject)

### Item 8 — why-planners-recommend-live-music-bali (for-planners)

<!-- cover image pending — CLOUDFLARE_ACCOUNT_ID/CLOUDFLARE_API_TOKEN not provisioned in this run's
     sandbox (2026-09-16). Run manually: node scripts/generate-cover-image.mjs
     why-planners-recommend-live-music-bali "a violin bow resting across an open wedding planner's
     notebook and timeline sheet, desk lighting" -- then add the printed ogImage path to both the
     EN and ID frontmatter. -->

- **heading:** Why Bali Wedding Planners Recommend Live Music Over a DJ for the Ceremony
- **targetKeyword:** live music vs dj wedding planner
- **description seed:** Why experienced Bali wedding planners often recommend live chamber music
  over a DJ for the ceremony portion, and how to explain that to couples.
- **excerpt seed:** When a couple asks "can't we just use a DJ," here's the reasoning planners
  lean on to recommend live music for the ceremony specifically.
- **outline (H2s):**
  1. The Question Planners Hear Most: "Do We Really Need Live Music?"
  2. Where a DJ Works Well, and Where Live Music Has the Edge (Ceremony Specifically)
  3. Reliability and Outdoor Sound — What Planners Are Actually Weighing
  4. How to Frame This for Budget-Conscious Couples
  5. What This Means for How You Brief Us
- **FAQ candidates:**
  1. Q: Is live music harder to coordinate than a DJ? A: [honest, balanced answer — not a sales
     pitch]
  2. Q: Can a DJ handle the ceremony and live music handle cocktail hour? A: [confirm this is a
     real, supported combination before answering]
  3. Q: What's the practical difference planners point to? A: [factual, no fabricated survey/stat
     claims — ground in real trade-offs like outdoor reliability, no beat-matching needs, etc.]
  4. Q: How should I introduce live music as an option to my couples? A: [practical framing tips]
- **outboundLinkTarget:** `/for-planners/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/vendor-partnership-logistics-bali.md`
- **cover image prompt:** "a violin bow resting across an open wedding planner's notebook and
  timeline sheet, desk lighting" (object)

### Item 9 — when-to-book-wedding-musicians-bali (planning)

<!-- cover image pending — CLOUDFLARE_ACCOUNT_ID/CLOUDFLARE_API_TOKEN not provisioned in this run's
     sandbox (2026-09-18). Run manually: node scripts/generate-cover-image.mjs
     when-to-book-wedding-musicians-bali "a desk flatlay with an open calendar, a cello bow, and a
     wedding invitation card, warm light" -- then add the printed ogImage path to both the EN and
     ID frontmatter. -->

- **heading:** When to Book Live Wedding Musicians in Bali
- **targetKeyword:** when to book wedding musicians
- **description seed:** When to lock in live wedding musicians for a Bali wedding — typical
  booking windows, peak-season timing, and what happens if you're booking last-minute.
- **excerpt seed:** How far ahead to book live ceremony music in Bali, and what your options look
  like if your date is already close.
- **outline (H2s):**
  1. How Far in Advance Should You Book?
  2. Why Peak Wedding Season in Bali Changes the Timeline
  3. What Happens If You're Booking Last-Minute?
  4. What Information You Need Ready Before You Reach Out
  5. Does Booking Early Affect Repertoire or Custom Arrangement Choices?
- **FAQ candidates:**
  1. Q: How far in advance should I book live wedding music in Bali? A: [confirm real typical
     window]
  2. Q: Is it too late to book if my wedding is close? A: [reach out anyway, redirect to contact]
  3. Q: Does booking early get better formation availability? A: [confirm real answer]
  4. Q: What do I need to know before I request a quote? A: date, venue, guest count, formation
     preference if any
- **outboundLinkTarget:** `/contact/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/live-music-bali-wedding-guide.md`
- **cover image prompt:** "a desk flatlay with an open calendar, a cello bow, and a wedding
  invitation card, warm light" (object flatlay)

### Item 10 — classical-vs-contemporary-wedding-music (piano-repertoire)

<!-- cover image pending — CLOUDFLARE_ACCOUNT_ID/CLOUDFLARE_API_TOKEN not provisioned in this run's
     sandbox (2026-09-21). Run manually: node scripts/generate-cover-image.mjs
     classical-vs-contemporary-wedding-music "piano keys half in warm light, half in soft shadow,
     minimalist composition" -- then add the printed ogImage path to both the EN and ID
     frontmatter. -->

- **heading:** Classical or Contemporary: Choosing the Right Style for Your Ceremony Music
- **targetKeyword:** classical vs contemporary wedding music
- **description seed:** How to choose between classical and contemporary songs for your wedding
  ceremony, and why most couples end up mixing both across the day.
- **excerpt seed:** Classical pieces, movie themes, or a favorite pop song reimagined for strings
  and piano — how to choose a style that fits your ceremony.
- **outline (H2s):**
  1. What "Classical" and "Contemporary" Actually Mean for a Chamber Ensemble
  2. When Classical Pieces Fit Best
  3. When Contemporary Arrangements Fit Best
  4. Why Most Ceremonies Mix Both Across Prelude, Processional, and Recessional
  5. How to Tell Us What You're Picturing If You're Not Sure
- **FAQ candidates:**
  1. Q: Do you only play classical music? A: no — repertoire spans classical and contemporary
     arrangements.
  2. Q: Can pop songs be arranged for a string quartet or piano? A: yes, see the custom
     arrangement article (link to Item 2).
  3. Q: Is contemporary music appropriate for a formal ceremony? A: [balanced, factual answer —
     avoid "most requested style" claims with no real data behind them]
- **outboundLinkTarget:** `/repertoire/`
- **inboundLinkSource:** `src/content/articles/wedding-ceremony-piano-music.md`
- **cover image prompt:** "piano keys half in warm light, half in soft shadow, minimalist
  composition" (object, minimal)

### Item 11 — resort-ballroom-wedding-live-music-bali (bali-venues)

- **heading:** Live Music for a Resort or Ballroom Wedding in Bali
- **targetKeyword:** resort wedding live music bali
- **description seed:** How indoor resort and ballroom acoustics change live wedding music
  planning in Bali, from sound reflection to formation placement.
- **excerpt seed:** Indoor acoustics behave differently from an open-air ceremony — what a resort
  or ballroom setting means for sound and setup.
- **outline (H2s):**
  1. How Indoor Acoustics Differ From Bali's Outdoor Ceremony Spaces
  2. Where a Chamber Ensemble Typically Sets Up in a Ballroom
  3. Does an Indoor Venue Need Amplification?
  4. Coordinating With Resort Event Teams and In-House AV
  5. What This Means for Formation and Repertoire Choices
- **FAQ candidates:**
  1. Q: Does indoor acoustics mean the music sounds different? A: [factual acoustics answer]
  2. Q: Do resorts usually have their own sound systems we can use? A: [confirm real practice,
     don't assume]
  3. Q: Can live chamber music work in a large ballroom? A: yes.
  4. Q: Who coordinates with the resort's event team — us or you? A: [confirm real process]
- **outboundLinkTarget:** `/for-planners/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/vendor-partnership-logistics-bali.md`
- **cover image prompt:** "a string instrument leaning against a ballroom chair, a chandelier
  softly blurred in the background, warm indoor lighting" (single object focus)
- **cover image pending — jalankan manual:** `node scripts/generate-cover-image.mjs
resort-ballroom-wedding-live-music-bali "a string instrument leaning against a ballroom chair, a
chandelier softly blurred in the background, warm indoor lighting"` (2026-09-23 run: failed,
  `CLOUDFLARE_ACCOUNT_ID`/`CLOUDFLARE_API_TOKEN` not provisioned in this sandbox — `ogImage` left
  unset in both EN and ID frontmatter)

### Item 12 — live-music-vendor-coordination-bali (for-planners)

- **heading:** How Live Music Coordinates With Your Other Wedding Day Vendors
- **targetKeyword:** wedding vendor coordination live music
- **description seed:** How live ceremony music coordinates with your photographer, officiant, and
  MC on the wedding day, and what planners should brief in advance.
- **excerpt seed:** Live music doesn't operate in isolation on the wedding day — how it lines up
  with your photographer, officiant, and MC.
- **outline (H2s):**
  1. Why Cross-Vendor Timing Matters More for Live Music Than a Playlist
  2. Working With the Photographer and Videographer
  3. Working With the Officiant
  4. Handoff to MC or DJ at Cocktail Hour
  5. What to Include in Your Vendor Briefing Document
- **FAQ candidates:**
  1. Q: Does live music need to coordinate with the photographer? A: yes — quiet-moment cues,
     audio needs.
  2. Q: Who gives the cue to start the processional — the officiant or the musicians? A: [confirm
     real process]
  3. Q: How does handoff to a DJ or MC work after the ceremony? A: [confirm real process]
  4. Q: Should live music be included in the master wedding-day timeline? A: yes.
- **outboundLinkTarget:** `/for-planners/` and `/contact/`
- **inboundLinkSource:** `src/content/articles/tech-rider-live-wedding-music.md` (Item 4 — natural
  pairing, publish this link addition only after Item 4 exists) and/or
  `src/content/articles/live-music-vendor-questions.md`
- **cover image prompt:** "a pocket watch resting on a folded string quartet score, soft
  side-lighting" (timing/coordination metaphor, object only)

<!-- Batch 2 (item 13–21) — sumber: docs/KEYWORD-MAP-2026-09.md (riset keyword gratis 2026-09-24:
GSC + Google Autocomplete + SERP Firecrawl). Disetujui owner 2026-09-24 → `todo`. -->

### Item 13 — vow-renewal-live-music-bali (planning)

<!-- Owner confirmed 2026-09-24: Allegra accepts vow renewals. -->

- **heading:** Live Music for a Vow Renewal in Bali
- **targetKeyword:** vow renewal bali
- **description seed:** How live piano and strings shape a vow renewal in Bali — choosing a
  formation, picking songs with years of meaning behind them, and planning the ceremony flow.
- **excerpt seed:** A vow renewal carries years of shared history. Here's how live music can hold
  that moment in Bali.
- **outline (H2s):**
  1. How a Vow Renewal Ceremony Differs From a Wedding, Musically
  2. Choosing a Formation for a Small or Family-Only Renewal
  3. Songs That Mean Something After Years Together (incl. re-arranging your original wedding song)
  4. Planning the Ceremony Flow: Entrance, Vows, Exit
  5. Vow Renewals at a Villa, Beach, or Cliffside in Bali
- **FAQ candidates:**
  1. Q: Can we have live music for a vow renewal in Bali? A: yes — any formation, same as a
     wedding ceremony.
  2. Q: Can you play the song from our original wedding? A: yes — custom arrangements are included
     in every booking.
  3. Q: What formation suits a vow renewal for just the two of us? A: Solo or Duo; piano stays in
     the lineup.
  4. Q: How far ahead should we book? A: link to when-to-book article.
- **outboundLinkTarget:** `/packages/` and `/contact/`
- **inboundLinkSource:** `src/content/articles/intimate-wedding-music-bali.md` and
  `src/content/articles/custom-wedding-music-arrangement.md`
- **cover image prompt:** "two gold wedding rings resting on an open piano score beside a
  frangipani flower, warm afternoon light" (object only)

### Item 14 — violin-wedding-songs (piano-repertoire)

- **heading:** Violin Wedding Songs for Every Ceremony Moment
- **targetKeyword:** violin wedding songs
- **description seed:** Violin wedding songs for the aisle, signing, and recessional — classical
  standards, modern covers, and when to pair violin with piano.
- **excerpt seed:** Violin leads the melody in many ceremony favourites. Song ideas for each
  moment, solo or with piano.
- **outline (H2s):**
  1. Why Violin Carries a Ceremony Melody
  2. Classical Violin Pieces for the Aisle
  3. Modern Songs Arranged for Violin
  4. Solo Violin or Violin With Piano
  5. Choosing Songs by Ceremony Moment
- **FAQ candidates:**
  1. Q: Can a solo violinist play our whole ceremony? A: yes — Solo formation; mention piano duo
     option.
  2. Q: What are popular violin songs to walk down the aisle? A: from `/repertoire` only.
  3. Q: Can violin play pop songs? A: yes, arranged.
  4. Q: Does a solo violin need amplification outdoors? A: Allegra doesn't bring a PA/sound
     system — when amplification is needed it comes from the venue's or planner's sound provider
     (owner-confirmed 2026-09-14); share the tech rider in advance.
- **outboundLinkTarget:** `/repertoire/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/wedding-processional-recessional-songs.md`
- **cover image prompt:** "a violin and bow resting on an open score on a garden chair, frangipani
  petals, morning light" (object only)

### Item 15 — chapel-wedding-music-bali (bali-venues)

<!-- Owner confirmed 2026-09-24: church/chapel music is adapted to each church's own rules —
no single fixed policy; don't state specific liturgical rules as fact. Jangan sebut nama
chapel/venue spesifik sebagai tempat Allegra pernah tampil kecuali dikonfirmasi. -->

- **heading:** Live Music for a Chapel Wedding in Bali
- **targetKeyword:** chapel wedding bali
- **description seed:** Planning live music for a chapel or church wedding in Bali — acoustics,
  space for the ensemble, liturgical music rules, and which formation fits.
- **excerpt seed:** Chapels change how live music sounds and where musicians can stand. What to
  plan for a Bali chapel ceremony.
- **outline (H2s):**
  1. How Chapel Acoustics Shape Live Piano and Strings
  2. Where the Musicians Stand in a Small Chapel
  3. Church and Catholic Ceremonies: Music Rules to Ask About Early
  4. Choosing a Formation for Chapel Size
  5. Moving From Chapel Ceremony to Reception
- **FAQ candidates:**
  1. Q: Do we need amplification in a chapel? A: usually not for acoustic piano and strings in a
     small chapel; Allegra doesn't bring a PA — venue/planner sound provider if needed.
  2. Q: Can you play in a Catholic church ceremony in Bali? A: yes — the repertoire is adapted to each
     church's own music guidelines, confirmed with the church/planner in advance.
  3. Q: Is there a piano in the chapel? A: [confirm — venue piano vs. bringing a digital piano]
  4. Q: Which formation fits a small chapel? A: Solo/Duo/Trio depending on space.
- **outboundLinkTarget:** `/packages/` and `/for-planners/`
- **inboundLinkSource:** `src/content/articles/live-music-bali-wedding-guide.md` (its "Outdoor
  Venue Logistics … Chapel" section)
- **cover image prompt:** "an empty white chapel aisle with a cello on a stand near the altar,
  ocean light through glass walls" (no people)

### Item 16 — outdoor-wedding-rain-plan-live-music (for-planners)

- **heading:** A Rain Plan for Live Music at an Outdoor Wedding
- **targetKeyword:** outdoor wedding rain plan
- **description seed:** How to plan for rain when live musicians play an outdoor Bali ceremony —
  sheltered spots, instrument safety, timing calls, and what to agree with the venue in advance.
- **excerpt seed:** Piano and strings can't play in the rain. What planners should agree before the
  day so the music continues safely.
- **outline (H2s):**
  1. Why Live Instruments Need Their Own Rain Plan
  2. Choosing a Covered Spot With the Venue in Advance
  3. Who Makes the Weather Call, and When
  4. Heat, Humidity, and Wind: The Other Weather Risks
  5. What to Put in the Rain Plan Section of Your Run Sheet
- **FAQ candidates:**
  1. Q: What happens if it rains during an outdoor ceremony? A: reuse approved FAQ wording —
     musicians move to a covered spot agreed in advance; safety of musicians and instruments first.
  2. Q: Can string instruments be played outdoors in humidity? A: [confirm real practice]
  3. Q: Who decides to move the ceremony? A: [confirm — planner/venue with musicians]
  4. Q: Does a rain plan change the formation? A: [confirm]
- **outboundLinkTarget:** `/for-planners/` and `/faq/`
- **inboundLinkSource:** `src/content/articles/tech-rider-live-wedding-music.md` and
  `src/content/articles/beach-wedding-music-bali.md`
- **cover image prompt:** "a cello case under a covered bale pavilion with rain falling on tropical
  leaves outside, soft grey light" (object only)

### Item 17 — signing-of-the-register-music (piano-repertoire)

- **heading:** Music for Signing the Register
- **targetKeyword:** signing of the register songs
- **description seed:** Choosing music for signing the register at your wedding — how long the
  moment lasts, classical and modern song ideas, and why live musicians suit it.
- **excerpt seed:** The signing is a quiet pause in the ceremony. How to choose music that fills it
  without rushing it.
- **outline (H2s):**
  1. What Happens During the Signing, and How Long It Takes
  2. Classical Pieces for Signing the Register
  3. Modern Songs Arranged for Piano and Strings
  4. Why Live Music Handles an Unpredictable Length Better
  5. How the Signing Fits Between Vows and Recessional
- **FAQ candidates:**
  1. Q: How many songs do we need for the signing? A: usually one or two; link song-count article.
  2. Q: Can musicians stretch a piece if the signing runs long? A: yes — reuse approved FAQ wording
     about extending/shortening live.
  3. Q: Is signing music different in a church ceremony? A: it can be — music is adapted to
     each church's own guidelines.
  4. Q: Can the signing song be one of our own? A: yes, custom arrangements included.
- **outboundLinkTarget:** `/repertoire/`
- **inboundLinkSource:** `src/content/articles/wedding-ceremony-song-count.md` and
  `src/content/articles/wedding-processional-recessional-songs.md`
- **cover image prompt:** "a fountain pen resting on an open wedding register beside a small
  bouquet and sheet music, warm light" (object only)

### Item 18 — wedding-music-timeline (planning)

- **heading:** Your Wedding Music Timeline, Moment by Moment
- **targetKeyword:** wedding music timeline
- **description seed:** A wedding music timeline from guest arrival to the last song — prelude,
  processional, signing, recessional, cocktail hour, and reception, with timing for each.
- **excerpt seed:** Every musical moment of the wedding day in order, and how long each one
  usually runs.
- **outline (H2s):**
  1. Ceremony: Prelude, Processional, Signing, Recessional
  2. Cocktail Hour
  3. Reception: Entrance, Dinner, First Dance
  4. How Long Each Moment Usually Runs
  5. Building Your Timeline With Your Planner and Musicians
- **FAQ candidates:**
  1. Q: How much ceremony music do we need? A: reuse approved FAQ wording — most ceremonies need
     15–20 minutes across prelude, processional, signing, recessional.
  2. Q: When should we finalise our music timeline? A: [confirm real lead time]
  3. Q: Can one formation cover both ceremony and reception? A: [confirm]
  4. Q: Who keeps the musicians on schedule on the day? A: planner/coordinator cues.
- **outboundLinkTarget:** `/packages/` and `/contact/`
- **inboundLinkSource:** `src/content/articles/live-music-bali-wedding-guide.md` (hub) — hati-hati
  overlap dengan `wedding-ceremony-song-count` (itu = berapa lagu; ini = urutan & durasi sepanjang
  hari). Link dua arah.
- **cover image prompt:** "a handwritten wedding day timeline card beside a violin bow and a
  vintage wristwatch, warm light" (object only)

### Item 19 — piano-first-dance-songs (piano-repertoire)

- **heading:** Piano First Dance Songs for Your Wedding
- **targetKeyword:** piano first dance songs
- **description seed:** First dance songs that sound beautiful on live piano — romantic classics,
  modern covers, and how a custom arrangement fits your song to the moment.
- **excerpt seed:** Live piano gives a first dance room to breathe. Song ideas and how arranging
  your own song works.
- **outline (H2s):**
  1. Why Live Piano Suits a First Dance
  2. Romantic Classics on Piano
  3. Modern Songs Arranged for Piano
  4. Adding Strings to Your First Dance
  5. Arranging Your Own Song and Setting the Length
- **FAQ candidates:**
  1. Q: Can you play our first dance song on piano? A: yes — custom arrangements included in every
     booking.
  2. Q: Can the first dance be shortened? A: yes, arranged to the length you want.
  3. Q: Solo piano or piano with strings? A: link wedding-pianist-bali.
  4. Q: How early should we send our song? A: early — arrangements need lead time.
- **outboundLinkTarget:** `/repertoire/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/wedding-pianist-bali.md` and
  `src/content/articles/custom-wedding-music-arrangement.md`
- **cover image prompt:** "a grand piano under warm string lights on an empty reception floor,
  evening" (no people)

### Item 20 — wedding-reception-dinner-music (planning)

<!-- Owner confirmed 2026-09-24: any formation can play a dinner set, per client request. -->

- **heading:** Live Music for Your Wedding Reception Dinner
- **targetKeyword:** wedding dinner music
- **description seed:** Planning live music for your wedding reception dinner — volume guests can
  talk over, song ideas, set length, and how dinner music flows into the first dance.
- **excerpt seed:** Dinner music should let guests talk while still feeling like part of the
  celebration. How to plan it.
- **outline (H2s):**
  1. What Dinner Music Should Do (and Shouldn't)
  2. Keeping the Volume Right for Conversation
  3. Song Ideas for a Dinner Set
  4. How Long a Dinner Set Runs
  5. From Dinner to First Dance
- **FAQ candidates:**
  1. Q: Do you play music during the wedding dinner? A: yes — any formation, chosen to suit
     the couple's request and the room.
  2. Q: Will guests be able to talk over live music? A: yes — chamber music is played at
     conversational volume.
  3. Q: Can dinner music be different from ceremony music? A: yes.
  4. Q: Do we need a sound system for dinner? A: Allegra doesn't bring a PA — venue/planner sound
     provider if needed.
- **outboundLinkTarget:** `/packages/`
- **inboundLinkSource:** `src/content/articles/cocktail-hour-wedding-piano-music.md` (bedakan:
  cocktail hour ≠ dinner) and `src/content/articles/resort-ballroom-wedding-live-music-bali.md`
- **cover image prompt:** "a candlelit long reception table with a cello resting nearby, tropical
  garden at dusk" (no people)

### Item 21 — string-quartet-wedding-songs (piano-repertoire)

- **heading:** String Quartet Wedding Songs, From Classical to Modern
- **targetKeyword:** string quartet wedding songs
- **description seed:** String quartet wedding songs for every ceremony moment — classical
  favourites, modern pop covers, and how piano changes the sound of a quartet.
- **excerpt seed:** Classical standards and modern covers for a string quartet wedding, grouped by
  the ceremony moment they fit best.
- **outline (H2s):**
  1. Classical Pieces That Work for String Quartet
  2. Modern and Pop Songs Arranged for Strings
  3. Songs by Moment: Prelude, Aisle, Signing, Recessional
  4. How Piano Changes a String Quartet's Sound
  5. Requesting a Song That Isn't on the List
- **FAQ candidates:**
  1. Q: Can a string quartet play pop songs at a wedding? A: yes — arranged for strings and piano.
  2. Q: What classical pieces are most popular for a string quartet wedding? A: list from
     `/repertoire` only — don't invent titles not in the repertoire data.
  3. Q: Does your string quartet include piano? A: yes, piano is standard in our String Quartet
     (5 musicians).
  4. Q: Can we request our own song? A: yes, custom arrangements included.
- **outboundLinkTarget:** `/repertoire/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/string-quartet-bali-wedding.md` (different intent:
  that one = formation/booking, this one = song list — link both ways, don't merge)
- **cover image prompt:** "a violin, viola, and cello resting on chairs in a semicircle beside a
  grand piano, soft window light" (object only)

### Item 22 — instrumental-wedding-songs (piano-repertoire)

<!-- proposed 2026-09-24 from docs/KEYWORD-MAP-2026-09.md § 8 (Keyword Planner: instrumental wedding
songs 1K–10K, wedding instrumental music 1K–10K, bridal instrumental music 1K–10K). Angle = songs
WITH lyrics played without vocals, across instruments — distinct from item 14 (violin), item 21
(string quartet) and wedding-processional-recessional-songs (moment-led). -->

- **heading:** Instrumental Wedding Songs: Your Favourite Songs Without the Vocals
- **targetKeyword:** instrumental wedding songs
- **description seed:** Instrumental wedding songs for the ceremony — pop, film, and classical
  pieces played live on piano and strings, and how your own song becomes an instrumental.
- **excerpt seed:** Many couples want a song they love, just without the vocals. How instrumental
  versions work for each ceremony moment.
- **outline (H2s):**
  1. Why Instrumental Versions Suit a Ceremony
  2. Pop and Film Songs, Arranged Without Vocals
  3. Classical Instrumental Standards
  4. Piano, Strings, or Both: How the Sound Changes
  5. Turning Your Own Song Into an Instrumental
- **FAQ candidates:**
  1. Q: Can any song be played as an instrumental? A: yes — custom arrangements of the couple's
     songs are included in every booking (owner-confirmed 2026-09-14).
  2. Q: Which instrumental songs are popular for walking down the aisle? A: titles from
     `/repertoire` only — don't invent titles not in the repertoire data.
  3. Q: Does an instrumental version need a singer? A: no — piano or violin carries the melody.
     Whether a vocalist can be added: [confirm real process]
  4. Q: Which formation suits instrumental versions best? A: describe by formation; piano is
     standard in Duo/Trio/String Quartet.
- **outboundLinkTarget:** `/repertoire/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/wedding-processional-recessional-songs.md`
- **cover image prompt:** "a grand piano lid open beside a violin on a chair, printed song sheets on
  the music stand, soft evening light" (object only)

### Item 23 — ubud-wedding-live-music (bali-venues)

<!-- proposed 2026-09-24 from docs/KEYWORD-MAP-2026-09.md § 8 (Keyword Planner: ubud wedding
100–1K, bali ubud wedding 100–1K). First area without a /journal article. Doorway-page risk: only
publish if the body is genuinely Ubud-specific (outdoor jungle/rice-field acoustics, humidity,
access & load-in, rain) — not a copy of the villa/cliffside articles with the place name swapped.
Do NOT name specific Ubud venues as places Allegra has performed (CLAUDE.md rule 9). -->

- **heading:** Live Music for an Ubud Wedding: Jungle, Rice Field, and Riverside Settings
- **targetKeyword:** ubud wedding
- **description seed:** Planning live music for an Ubud wedding — how jungle, rice-field, and
  riverside settings shape the sound, the formation, and the day's logistics.
- **excerpt seed:** Ubud's green, open-air settings shape how live music sounds. What to plan for
  before choosing a formation.
- **outline (H2s):**
  1. How Ubud's Open-Air Settings Shape the Sound
  2. Choosing a Formation for a Jungle or Rice-Field Ceremony
  3. Humidity, Shade, and Caring for the Instruments
  4. Access, Load-In, and Timing on the Day
  5. A Rain Plan for an Ubud Ceremony
- **FAQ candidates:**
  1. Q: Do you perform at weddings in Ubud? A: [confirm real process — travel area / travel fee
     wording, no prices]
  2. Q: Does humidity affect the instruments? A: [confirm real process]
  3. Q: What happens if it rains? A: musicians and instruments move to a covered, sheltered spot
     agreed in advance with the planner/venue; safety first (owner-confirmed 2026-09-14).
  4. Q: Do we need a sound system outdoors? A: Allegra doesn't bring a PA — the venue's or planner's
     sound provider handles amplification when needed (owner-confirmed 2026-09-14).
- **outboundLinkTarget:** `/packages/` and `/for-planners/`
- **inboundLinkSource:** `src/content/articles/villa-wedding-live-music-bali.md`
- **cover image prompt:** "a cello resting against a carved stone wall beside green rice terraces,
  morning mist, frangipani petals" (object only)

### Item 24 — classical-wedding-ceremony-music (piano-repertoire)

<!-- proposed 2026-09-24 from docs/KEYWORD-MAP-2026-09.md § 8 (Keyword Planner: classical music for
wedding ceremony 100–1K, classical wedding entrance music 100–1K, classical music for wedding
recessional 100–1K). Anti-cannibalization: classical-vs-contemporary-wedding-music (item 10) = a
style comparison; this = a classical piece list by ceremony moment. Link both ways, don't repeat
item 10's comparison sections. -->

- **heading:** Classical Music for Your Wedding Ceremony, Moment by Moment
- **targetKeyword:** classical music for wedding ceremony
- **description seed:** Classical music for your wedding ceremony — pieces for the prelude, aisle,
  signing, and recessional, played live on piano and strings in Bali.
- **excerpt seed:** Classical pieces that suit each part of the ceremony, and how piano and strings
  bring them to an outdoor setting.
- **outline (H2s):**
  1. Classical Pieces for the Prelude
  2. Classical Processional Music
  3. Music for the Vows and the Signing
  4. Classical Recessional Pieces
  5. Pairing Classical Pieces With One Modern Song
- **FAQ candidates:**
  1. Q: What is the most popular classical piece for walking down the aisle? A: from
     `/repertoire` only — don't invent titles not in the repertoire data.
  2. Q: Can we mix classical and modern songs? A: yes — link item 10 for the full comparison.
  3. Q: Does classical music need a full string quartet? A: no — Solo, Duo, and Trio also work;
     piano is standard in Duo/Trio/String Quartet.
  4. Q: Can a church or chapel restrict classical pieces? A: music is adapted to each church's own
     rules (owner-confirmed 2026-09-24) — don't state specific rules as fact.
- **outboundLinkTarget:** `/repertoire/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/classical-vs-contemporary-wedding-music.md`
- **cover image prompt:** "an open classical score on a piano music stand, a violin bow laid
  across it, warm candlelight" (object only)

### Item 25 — cello-wedding-music (piano-repertoire)

<!-- proposed 2026-09-24 from docs/KEYWORD-MAP-2026-09.md § 8 (Keyword Planner: cello wedding music
100–1K, cello wedding songs 10–100). Supporting item. Alternative for the owner: instead of a
standalone article, fold it into item 21 (string-quartet-wedding-songs) as one H2 section. -->

- **heading:** Cello Wedding Music for the Aisle and Beyond
- **targetKeyword:** cello wedding music
- **description seed:** Cello wedding music for the aisle, signing, and recessional — solo cello,
  cello with piano, and songs that suit the cello's warm, low voice.
- **excerpt seed:** The cello's low, warm voice suits quieter ceremony moments. Song ideas, solo or
  paired with piano and violin.
- **outline (H2s):**
  1. What the Cello Brings to a Ceremony
  2. Cello Songs for Walking Down the Aisle
  3. Solo Cello, or Cello With Piano and Violin
  4. Cello for the Signing and Recessional
  5. Requesting Your Own Song on Cello
- **FAQ candidates:**
  1. Q: Can a solo cellist play our ceremony? A: yes — cello is a Solo formation option; mention
     the Duo (violin + cello + piano) as the next step up.
  2. Q: What are popular cello songs to walk down the aisle? A: from `/repertoire` only.
  3. Q: Can the cello play pop songs? A: yes — custom arrangements included.
  4. Q: Does a solo cello need amplification outdoors? A: Allegra doesn't bring a PA — venue's or
     planner's sound provider (owner-confirmed 2026-09-14).
- **outboundLinkTarget:** `/repertoire/` and `/packages/`
- **inboundLinkSource:** `src/content/articles/string-quartet-bali-wedding.md`
- **cover image prompt:** "a cello and bow leaning against a white chair on a garden lawn, soft
  late-afternoon light" (object only)
