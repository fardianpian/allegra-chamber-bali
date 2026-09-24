# Keyword Map — 2026-09 (Journal backlog batch 2)

> Uji coba pertama skill `keyword-research-expansion` (2026-09-24). Tujuan: mengisi
> `docs/JOURNAL-BACKLOG.md` batch 2 setelah batch 1 (item 1–12) habis. Item 13–21 disetujui owner
> 2026-09-24 (status `todo`); pertanyaan owner di § 6 sudah dijawab — lihat CLAUDE.md "Service facts".

## 1. Ringkasan Strategis

- **Objective:** awareness → inquiry dari pasangan internasional (AU/UK/US/SG) dan wedding planner
  untuk live piano & string ensemble di Bali. Riset hanya dalam EN (demand ID hampir nol, lihat
  `docs/SEO-STRATEGY.md`), dengan satu pengecualian dari GSC (lihat § 6).
- **Sumber data (semuanya gratis, diambil 2026-09-24):**
  - Google Search Console, `sc-domain:allegra.indonesiaistimewastudio.id`, 2026-06-24 → 2026-09-23
    (45 baris query×page — situs masih muda, data tipis).
  - Google Autocomplete (`gl=au`, `hl=en`) untuk 58 seed.
  - SERP top-6 via Firecrawl untuk 10 cluster kandidat (query ke-11 kena rate limit → cluster
    "sunset ceremony" belum tervalidasi).
  - Tidak ada angka volume/KD di laporan ini — DataForSEO tidak lagi dipakai. Angka Juli di
    `docs/COMPETITOR-CONTENT-RESEARCH.md` tetap berlaku sebagai acuan historis.
- **Diagnosis:** batch 1 sudah menutup cluster momen utama (prelude, processional/recessional,
  cocktail hour, song count) dan tipe venue utama (villa, cliffside, beach, garden, resort).
  Celah yang tersisa: **momen yang belum punya artikel** (signing, first dance, dinner), **jenis
  acara** (vow renewal), **venue chapel/church**, **risiko cuaca**, dan **repertoire per formasi**.

## 2. Keyword Expansion Matrix (ringkas)

| Seed                          | Arah ekspansi     | Kandidat terkuat (autocomplete)                                                                     | Intent hipotesis        | Bukti                     |
| ----------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------- |
| signing of the register music | Context (moment)  | signing of the register songs · …classical music · …songs catholic wedding · …songs instrumental    | Informasional           | AC (10 variasi) + SERP    |
| first dance songs piano       | Context + format  | piano wedding first dance songs · best piano first dance songs                                      | Informasional           | AC + SERP                 |
| string quartet wedding songs  | Format            | …to walk down the aisle · …modern · …classical · …list · string quartet covers of pop songs         | Info/komersial          | AC (10) + SERP            |
| violin wedding songs          | Format            | violin wedding songs walk down aisle · …list · …modern · wedding violin songs for ceremony          | Informasional           | AC (10) + SERP            |
| cello wedding songs           | Format            | cello wedding songs for walking down the aisle · cello wedding processional songs                   | Informasional           | AC (10), SERP belum dicek |
| wedding music timeline        | Outcome           | wedding music timeline template · wedding ceremony music timeline · reception music timeline        | Informasional           | AC + SERP                 |
| wedding dinner music          | Context (moment)  | wedding dinner music ideas · …playlist · …genre · do you play music during wedding dinner           | Informasional           | AC (10) + SERP            |
| vow renewal bali              | Audience/use case | vow renewal bali packages · vow renewal ceremony bali · vow renewal songs · vow renewal music ideas | Komersial/transaksional | AC (10) + SERP            |
| chapel wedding bali           | Context (venue)   | chapel wedding venue bali · catholic church wedding bali · church wedding bali                      | Komersial               | AC (10) + SERP            |
| wedding rain plan             | Problem           | outdoor wedding rain plan · outdoor wedding ceremony rain plan · outdoor wedding rain backup plan   | Informasional           | AC + SERP                 |
| wedding ceremony order        | Question          | …order of entrance · …order of procession · …order of service template                              | Informasional           | AC (10) + SERP            |
| sunset wedding bali           | Context (timing)  | sunset wedding bali · sunset wedding venues · bali wedding ideas                                    | Komersial               | AC saja (SERP kena 429)   |
| wedding musicians bali        | Sinonim           | → autocomplete mengarah ke **wedding band bali**, wedding dj bali, wedding bands bali               | Transaksional           | AC                        |
| elopement bali                | Audience          | bali elopement packages · bali elopement photographer · elopement wedding music                     | Transaksional (planner) | AC                        |
| bali wedding cost             | Intent modifier   | how much does it cost to get married in bali · pianist hourly rate · harpist cost per hour          | Komersial (harga)       | AC                        |

AC = Google Autocomplete. Seed tanpa hasil autocomplete (sinyal demand sangat rendah): `rehearsal
dinner bali`, `proposal bali violin`, `acoustic band bali wedding`, `wedding violinist bali`,
`live music bali wedding`, `rainy season wedding bali`, `wedding day timeline bali`,
`wedding music cue sheet`.

## 3. Keyword Clusters

| Cluster                 | Primary                            | Secondary                                                               | Intent         | Target URL                                                   | Status              |
| ----------------------- | ---------------------------------- | ----------------------------------------------------------------------- | -------------- | ------------------------------------------------------------ | ------------------- |
| Vow renewal             | vow renewal bali                   | vow renewal ceremony bali, vow renewal songs, vow renewal music ideas   | Komersial      | `/journal/vow-renewal-live-music-bali`                       | Baru (item 13)      |
| String quartet songs    | string quartet wedding songs       | …to walk down the aisle, …modern, string quartet covers of pop songs    | Info/komersial | `/journal/string-quartet-wedding-songs`                      | Baru (item 14)      |
| Chapel / church         | chapel wedding bali                | church wedding bali, catholic church wedding bali                       | Komersial      | `/journal/chapel-wedding-music-bali`                         | Baru (item 15)      |
| Rain plan               | outdoor wedding rain plan          | outdoor wedding ceremony rain plan, rain backup plan                    | Informasional  | `/journal/outdoor-wedding-rain-plan-live-music`              | Baru (item 16)      |
| Signing                 | signing of the register songs      | …music, …classical, …catholic wedding, …instrumental                    | Informasional  | `/journal/signing-of-the-register-music`                     | Baru (item 17)      |
| Music timeline          | wedding music timeline             | wedding ceremony music timeline, …template, reception music timeline    | Informasional  | `/journal/wedding-music-timeline`                            | Baru (item 18)      |
| First dance piano       | piano first dance songs            | piano wedding first dance songs, best piano first dance songs           | Informasional  | `/journal/piano-first-dance-songs`                           | Baru (item 19)      |
| Dinner music            | wedding dinner music               | …ideas, …genre, do you play music during wedding dinner                 | Informasional  | `/journal/wedding-reception-dinner-music`                    | Baru (item 20)      |
| Violin songs            | violin wedding songs               | violin wedding songs walk down aisle, wedding violin songs for ceremony | Informasional  | `/journal/violin-wedding-songs`                              | Baru (item 21)      |
| Exit / entrance / aisle | wedding recessional songs          | wedding exit songs, bride entrance songs, walking down the aisle songs  | Informasional  | `/journal/wedding-processional-recessional-songs` (existing) | Perkuat existing    |
| Order of entrance       | wedding ceremony order of entrance | order of procession, order of service                                   | Informasional  | `/journal/wedding-processional-recessional-songs` (existing) | Perkuat existing    |
| Elopement               | elopement bali                     | elopement wedding music                                                 | Transaksional  | `/journal/intimate-wedding-music-bali` (existing)            | Perkuat existing    |
| Cost                    | bali wedding cost                  | how much to get married in bali, pianist hourly rate                    | Komersial      | `/journal/wedding-music-budget-bali` (existing, tanpa angka) | Perkuat existing    |
| Vendor search           | wedding band bali                  | wedding entertainment bali, wedding bands bali, pianist bali            | Transaksional  | `/packages`, `/` (bukan artikel)                             | Perkuat existing    |
| Sunset ceremony         | sunset wedding bali                | sunset wedding venues                                                   | Komersial      | —                                                            | Tunda (belum valid) |

## 4. Prioritas Eksekusi

Rumus default skill: `Relevansi×3 + Intent komersial×3 + Demand×2 + Feasibility×2 + Asset×1`.
Demand maks 3 di putaran ini (belum ada impresi GSC atau ekspor Keyword Planner untuk cluster baru).

| #   | Cluster              | Rel | Int | Dem | Fea | Ast | Score | Alasan singkat                                                                                  |
| --- | -------------------- | --- | --- | --- | --- | --- | ----: | ----------------------------------------------------------------------------------------------- |
| 13  | Vow renewal          | 5   | 4   | 3   | 4   | 3   |    44 | SERP = paket planner + grup FB; tidak ada halaman yang membahas musiknya. Intent Bali-lokal     |
| 16  | Rain plan            | 5   | 3   | 3   | 4   | 5   |    43 | Blog vendor kecil ranking di top-3; fakta rain plan sudah dikonfirmasi owner (2026-09-14)       |
| 15  | Chapel / church      | 5   | 4   | 3   | 3   | 3   |    42 | SERP = planner/venue/Tripadvisor; sudut musik belum digarap siapa pun                           |
| 14  | String quartet songs | 5   | 3   | 3   | 3   | 4   |    40 | Listicle agency + Spotify; halaman repertoire vendor ikut ranking → peluang untuk `/repertoire` |
| 17  | Signing              | 5   | 2   | 3   | 4   | 4   |    39 | SERP lemah (Spotify, Hitched UK, FB, Reddit); momen sudah disebut di situs                      |
| 19  | First dance piano    | 5   | 2   | 3   | 4   | 4   |    39 | Piano = flagship; SERP = Spotify, Skoove, YouTube, Reddit                                       |
| 18  | Music timeline       | 5   | 2   | 3   | 3   | 4   |    37 | The Knot/WeddingWire di atas, tapi ada blog kecil + Pinterest                                   |
| 20  | Dinner music         | 4   | 2   | 3   | 3   | 3   |    33 | Supporting; dominan playlist DJ. Large Ensemble mencantumkan "gala dinners"                     |
| 21  | Violin songs         | 4   | 2   | 3   | 3   | 3   |    33 | Supporting; The Knot di #3. Masuk sebagai eksperimen                                            |

Urutan nomor backlog (13–21) disusun untuk **rotasi pillar** (planning → piano-repertoire →
bali-venues → for-planners → …) seperti batch 1, bukan murni berdasarkan skor. Semua di atas 32.

## 5. Rekomendasi Konten

Brief per artikel (heading, outline H2, FAQ, internal link, cover prompt) ditulis langsung di
`docs/JOURNAL-BACKLOG.md` item 13–21, supaya routine `journal-article-publisher` bisa
mengeksekusinya tanpa langkah tambahan.

## 6. Gap, Quick Wins & Pertanyaan untuk Owner

**Quick wins dari GSC (bukan artikel baru):**

1. **`prelude adalah` — 21 impresi, posisi ~10** di `/id/journal/wedding-prelude-music/`, plus
   `prelude artinya`, `preludium adalah`, `apa itu prelude` (total ±31 impresi). Ini query ID
   informasional/definisi — satu-satunya demand ID nyata yang terlihat. Tambahkan kalimat definisi
   langsung di paragraf pembuka versi ID ("Prelude adalah…") agar naik ke halaman 1 / featured
   snippet.
2. **`how many songs … wedding ceremony` (9 variasi, posisi 22–43)** → artikel
   `wedding-ceremony-song-count` sudah dapat impresi tapi di halaman 3–5. Perkuat jawaban langsung
   di paragraf pertama + FAQ.
3. **`prelude music wedding` / `wedding prelude songs` (posisi ~46–50)** → tambah daftar lagu yang
   lebih konkret di `wedding-prelude-music`.

**Perkuat existing (bukan artikel baru — menghindari cannibalization):**

- `wedding-processional-recessional-songs`: tambahkan istilah "exit songs", "bride entrance",
  "walking down the aisle" dan satu section "order of entrance".
- `intimate-wedding-music-bali`: tambah section singkat untuk elopement.
- `/packages` dan homepage: autocomplete menunjukkan orang mengetik **"wedding band bali"**, bukan
  "wedding musicians bali". Brand voice melarang menyebut diri "band" — pertimbangkan satu kalimat
  yang menangkap istilah itu tanpa mengadopsinya (mis. "not a wedding band, a live chamber
  ensemble"). Butuh keputusan owner.

**Pertanyaan untuk owner:**

1. Apakah Allegra menerima **vow renewal** (item 13)? Asumsi: ya, karena formatnya sama dengan
   upacara. Kalau tidak, hapus item 13.
2. Apakah ensemble pernah/bersedia tampil di **chapel dan gereja Katolik** (item 15, 17)? Gereja
   sering punya aturan musik liturgi sendiri — FAQ item 15 butuh jawaban nyata.
3. Apakah Allegra memainkan set **reception dinner** untuk formasi selain Large Ensemble (item 20)?
4. Mau menjalankan **Google Keyword Planner** (gratis via akun Google Ads) untuk 9 primary keyword
   di atas? Ekspor CSV-nya akan menaikkan skor Demand dari 3 → 4 dan mungkin mengubah urutan.

**Belum tercakup / putaran berikutnya:**

- Pillar **bali-venues** dan **for-planners** masih tipis di batch ini (masing-masing 1 item).
  Seed tambahan untuk putaran berikutnya: area (Nusa Dua, Ubud, Canggu), "sunset ceremony"
  (validasi SERP ulang), dan topik B2B planner (repertoire sheet, stage plot).
- Cluster `cello wedding songs` punya autocomplete kuat — belum dicek SERP-nya.

## 7. Seed untuk Google Keyword Planner (menjawab pertanyaan owner #4)

> Disusun 2026-09-24 dari GSC (2026-06-24 → 2026-09-23), Google Autocomplete (`gl=au`, 30 seed
> baru) dan cluster di § 3. Tujuan: owner menjalankan Keyword Planner → ekspor CSV → skor Demand
> cluster naik dari 3 ke 4 dan urutan prioritas bisa dikoreksi dengan rentang volume nyata.

### 7.1 Setelan Keyword Planner

- **Lokasi:** Australia, United Kingdom, United States, Singapore (satu run gabungan). Opsional:
  run kedua khusus Australia untuk membandingkan pasar terdekat.
- **Bahasa:** English · **Jaringan:** Google · **Rentang:** 12 bulan terakhir (lihat musiman).
- Akun tanpa kampanye aktif hanya menampilkan **rentang** volume (mis. 100–1K) — cukup untuk skor
  Demand 4. Jangan buat/aktifkan kampanye berbayar hanya demi angka pasti.
- Ekspor: **Download keyword ideas → CSV**, simpan ke `docs/data/gkp-2026-09-<nama-run>.csv`.

### 7.2 "Discover new keywords" — 6 run, maks. 10 seed per run

**Run A — Vendor / transaksional** (target: `/`, `/packages`, `/for-planners`)

```text
wedding string quartet, wedding pianist, string quartet bali, wedding entertainment bali, wedding ceremony musicians, hire string quartet for wedding, hire pianist for wedding, piano and violin wedding, wedding string trio, live wedding music
```

**Run B — Biaya** (target: `/journal/wedding-music-budget-bali`, tanpa angka di situs)

```text
string quartet wedding cost, wedding pianist cost, wedding musician cost, string quartet cost per hour, how much do wedding pianists charge, destination wedding bali cost, how much does it cost to get married in bali
```

**Run C — Repertoire per formasi** (pillar `piano-repertoire`, `/repertoire`)

```text
piano wedding songs, string quartet wedding songs, violin wedding songs, cello wedding songs, piano and cello wedding songs, piano and violin wedding songs, classical music for wedding ceremony, instrumental wedding songs, string quartet pop covers, piano first dance songs
```

**Run D — Momen upacara & resepsi** (pillar `planning` / `piano-repertoire`)

```text
wedding processional songs, wedding recessional songs, wedding prelude music, signing of the register songs, cocktail hour music, wedding dinner music, bride entrance songs, wedding exit songs, wedding ceremony order of entrance, wedding music timeline
```

**Run E — Area & venue Bali** (pillar `bali-venues`)

```text
uluwatu wedding venues, canggu wedding venues, seminyak wedding venues, nusa dua wedding venues, ubud wedding, bali wedding venues, beach wedding bali, uluwatu wedding chapel, bali villa wedding, sunset wedding ceremony
```

**Run F — Jenis acara & audiens** (pillar `for-planners` / `bali-venues`)

```text
destination wedding bali, bali elopement, vow renewal bali, bali wedding planner, chapel wedding bali, church wedding bali, intimate wedding bali, indian destination wedding bali, proposal violinist, bali wedding packages
```

Tambahan: tab **"Start with a website"** → masukkan `allegra.indonesiaistimewastudio.id` (seluruh
situs) untuk melihat keyword yang Google anggap relevan dengan konten kita.

### 7.3 "Get search volume and forecasts" — validasi keyword yang sudah dipakai

Tempel satu blok ini (targetKeyword artikel live + primary backlog 13–21 + query GSC nyata):

```text
wedding pianist
piano wedding ceremony
wedding prelude music
wedding processional songs
wedding recessional songs
cocktail hour wedding music
how many songs for wedding ceremony
wedding band vs dj
string quartet bali wedding
villa wedding live music bali
live music cliffside wedding uluwatu
beach wedding music
garden wedding ceremony
resort wedding live music bali
intimate wedding music bali
balinese wedding ceremony music
custom wedding music arrangement
classical vs contemporary wedding music
how to budget for wedding music
when to book wedding musicians
musician for wedding ceremony
tech rider live wedding music
wedding venue live music requirements
vow renewal bali
string quartet wedding songs
chapel wedding bali
outdoor wedding rain plan
signing of the register songs
wedding music timeline
piano first dance songs
wedding dinner music
violin wedding songs
piano music for wedding cocktail hour
piano player for wedding ceremony
what is a wedding prelude
```

### 7.4 Jebakan saat membaca hasil

- **"wedding band bali" jangan dipakai sebagai seed.** Autocomplete-nya bercampur dengan cincin
  (`wedding ring bali`, `difference between wedding ring and band`) — volume di Keyword Planner
  akan tercemar intent perhiasan. Pakai `wedding entertainment bali` / `wedding string quartet`.
- Buang ide yang jelas di luar pasar: nama kota AS/UK (`… charlotte`, `… raleigh`), `hindi`,
  `mp3 download`, `sheet music`, `near me` (lokasi pencari bukan Bali).
- Kolom **"Top of page bid"** tinggi = sinyal intent komersial, bukan alasan memasang iklan.
- Keyword biaya (Run B) tetap dipetakan ke artikel faktor biaya — situs tidak menampilkan harga.
- Seed tanpa autocomplete sama sekali (`wedding pianist bali`, `live music wedding bali`,
  `wedding music ubud`, `gala dinner entertainment bali`, `corporate event music bali`) kemungkinan
  besar muncul sebagai "—" / 0–10 di Keyword Planner; itu wajar untuk niche ini.

### 7.5 Opsional — pasar Indonesia

GSC menunjukkan satu-satunya demand ID nyata bersifat definisi (`prelude adalah` 21 impresi,
`prelude artinya`, `apa itu prelude`, `preludium adalah`). Bila ingin dicek: lokasi Indonesia,
bahasa Indonesian, seed `prelude adalah, apa itu prelude, musik pernikahan, pemain piano
pernikahan, string quartet pernikahan`. Hasilnya untuk memperkuat artikel `/id/` existing, bukan
membuat artikel ID terpisah.
