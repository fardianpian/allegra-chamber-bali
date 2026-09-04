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

## Status

| #   | status | slug                                    | pillar           | title (working)                                                              | publishedDate |
| --- | ------ | --------------------------------------- | ---------------- | ---------------------------------------------------------------------------- | ------------- |
| 1   | done   | intimate-wedding-music-bali             | planning         | Music for an Intimate Wedding in Bali — Allegra Chamber Bali                 | 2026-08-30    |
| 2   | done   | custom-wedding-music-arrangement        | piano-repertoire | How a Custom Wedding Music Arrangement Is Made — Allegra Chamber Bali        | 2026-08-31    |
| 3   | done   | balinese-wedding-ceremony-music         | bali-venues      | Live Music for a Balinese-Influenced Wedding Ceremony — Allegra Chamber Bali | 2026-09-04    |
| 4   | todo   | tech-rider-live-wedding-music           | for-planners     | Tech Rider Basics for Live Wedding Music — Allegra Chamber Bali              |               |
| 5   | todo   | wedding-ceremony-song-count             | planning         | How Many Songs for a Wedding Ceremony? — Allegra Chamber Bali                |               |
| 6   | todo   | cocktail-hour-wedding-piano-music       | piano-repertoire | Cocktail Hour Piano Music for Weddings — Allegra Chamber Bali                |               |
| 7   | todo   | villa-wedding-live-music-bali           | bali-venues      | Live Music for a Private Villa Wedding in Bali — Allegra Chamber Bali        |               |
| 8   | todo   | why-planners-recommend-live-music-bali  | for-planners     | Why Planners Recommend Live Music for Bali Ceremonies — Allegra Chamber Bali |               |
| 9   | todo   | when-to-book-wedding-musicians-bali     | planning         | When to Book Live Wedding Musicians in Bali — Allegra Chamber Bali           |               |
| 10  | todo   | classical-vs-contemporary-wedding-music | piano-repertoire | Classical or Contemporary Wedding Ceremony Music — Allegra Chamber Bali      |               |
| 11  | todo   | resort-ballroom-wedding-live-music-bali | bali-venues      | Live Music for a Resort or Ballroom Wedding in Bali — Allegra Chamber Bali   |               |
| 12  | todo   | live-music-vendor-coordination-bali     | for-planners     | Coordinating Live Music With Your Other Vendors — Allegra Chamber Bali       |               |

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

<!-- cover image pending — run manually: node scripts/generate-cover-image.mjs custom-wedding-music-arrangement "handwritten sheet music on a wooden table, a pencil and a single rose resting on top, soft natural light" -->

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

<!-- cover image pending — run manually: node scripts/generate-cover-image.mjs balinese-wedding-ceremony-music "a single frangipani flower resting across violin strings, soft daylight, minimal background" -->

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

### Item 7 — villa-wedding-live-music-bali (bali-venues)

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
