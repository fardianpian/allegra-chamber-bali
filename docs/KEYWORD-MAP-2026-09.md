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
Demand maks 3 di putaran ini (belum ada impresi GSC atau ekspor Keyword Planner untuk cluster baru). **Skor ulang dengan data Keyword Planner ada di § 8.3.**

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

## 8. Hasil Google Keyword Planner (ekspor owner, 2026-09-24)

### 8.1 Data

- 6 run "Discover new keywords" (Run A–F dari § 7.2) → **3.362 keyword unik**, periode Sep 2025 –
  Agu 2026. Disimpan sebagai UTF-8 di `docs/data/gkp-2026-09-{a-vendor,b-cost,c-repertoire,d-moments,e-venues,f-event-types}.csv`.
- Akun tanpa kampanye aktif → ekspor hanya memberi bucket `50 / 500 / 5000 / 50000`. Dibaca sebagai
  rentang **10–100 / 100–1K / 1K–10K / 10K–100K** per bulan. Kolom tren bulanan kosong (tidak ada
  data musiman).
- **Lokasi run tidak tercatat di file ekspor.** Ada keyword berbahasa Indonesia (`villa di bali untuk
wedding`, `wedding organizer bali` 1K–10K, `harga wedding chapel di bali`) — kemungkinan Indonesia
  ikut masuk lokasi. Angka keyword bertopik Bali bisa terangkat oleh pencari domestik. Perlu
  konfirmasi owner (§ 8.5).
- Daftar validasi § 7.3 **belum dijalankan** → sebagian besar `targetKeyword` artikel live belum
  punya angka (mis. `how many songs for wedding ceremony`, `wedding band vs dj`,
  `wedding music timeline`, `outdoor wedding rain plan`).

### 8.2 Temuan utama

1. **Demand "musisi + Bali" sangat kecil.** `wedding entertainment bali` 10–100, `wedding band bali`
   10–100, `string quartet bali` tanpa data. Orang tidak mencari vendor musik Bali lewat Google dalam
   jumlah berarti → traffic organik harus datang dari **topik repertoire/momen global** dan **topik
   perencanaan venue Bali**, lalu diarahkan ke `/packages` dan WhatsApp.
2. **Cluster momen upacara adalah pasar terbesar.** 18 keyword di 10K–100K, semuanya
   processional/recessional/bridal entrance (kompetisi Rendah). Ditambah 107 keyword 1K–10K di Run D
   (`walking down the aisle songs`, `bride entrance songs`, `wedding exit songs`,
   `wedding prelude music`). Semua itu dilayani artikel **existing**
   `wedding-processional-recessional-songs` dan `wedding-prelude-music` → prioritas #1 adalah
   memperkuat keduanya, bukan menulis artikel baru.
3. **Repertoire per instrumen: 1K–10K.** `piano wedding songs`, `violin wedding songs`,
   `instrumental wedding songs`, `wedding piano music`, `piano songs for wedding ceremony`.
   Kompetisi Rendah semuanya.
4. **Vendor generik (non-Bali) 1K–10K**: `wedding string quartet`, `wedding pianist`,
   `wedding ceremony musicians`, `string quartet for wedding ceremony`. Pencarinya kebanyakan
   mencari vendor lokal di negaranya → nilai konversi rendah untuk Allegra. Tetap berguna sebagai
   secondary di `/packages` dan `wedding-pianist-bali`.
5. **Biaya**: `cost of band for wedding` 1K–10K; `string quartet wedding cost`,
   `wedding pianist cost`, `violinist for wedding cost`, `cost of pianist for wedding`,
   `wedding in bali cost` masing-masing 100–1K. Top-of-page bid tertinggi di seluruh data (hingga
   ±Rp100–145rb) = intent komersial kuat. Tetap dipetakan ke `wedding-music-budget-bali` (faktor
   biaya, **tanpa angka**).
6. **Venue Bali 1K–10K**: `bali wedding venues`, `bali wedding locations`,
   `wedding reception bali`, `bali wedding places`. SERP-nya meminta daftar venue — bukan ranah
   situs musisi. Variasi area 100–1K (`uluwatu wedding venues`, `ubud wedding`,
   `beach wedding bali`, `bali villa wedding`, `bali chapel wedding`) cocok sebagai **secondary**
   di artikel venue existing.
7. **Keyword planner/agency** (`bali wedding packages`, `bali wedding agency`,
   `wedding organizer bali` 1K–10K) = intent mencari WO, bukan musisi. Relevan untuk strategi
   kemitraan `/for-planners`, bukan konten.

### 8.3 Skor ulang backlog batch 2 (Demand 3 → 4 bila ada rentang Keyword Planner)

| #   | Cluster (primary)             | Rentang GKP | Rel | Int | Dem | Fea | Ast | Skor lama | Skor baru |
| --- | ----------------------------- | ----------- | --- | --- | --- | --- | --- | --------: | --------: |
| 13  | vow renewal bali              | 10–100      | 5   | 4   | 4   | 4   | 3   |        44 |        46 |
| 15  | chapel wedding bali           | 100–1K      | 5   | 4   | 4   | 3   | 3   |        42 |        44 |
| 16  | outdoor wedding rain plan     | belum dicek | 5   | 3   | 3   | 4   | 5   |        43 |        43 |
| 14  | string quartet wedding songs  | 100–1K      | 5   | 3   | 4   | 3   | 4   |        40 |        42 |
| 17  | signing of the register songs | 100–1K      | 5   | 2   | 4   | 4   | 4   |        39 |        41 |
| 19  | piano first dance songs       | 10–100      | 5   | 2   | 4   | 4   | 4   |        39 |        41 |
| 18  | wedding music timeline        | belum dicek | 5   | 2   | 3   | 3   | 4   |        37 |        37 |
| 20  | wedding dinner music          | 100–1K      | 4   | 2   | 4   | 3   | 3   |        33 |        35 |
| 21  | violin wedding songs          | **1K–10K**  | 4   | 2   | 4   | 3   | 3   |        33 |        35 |

Rumus skill menilai **bukti** demand, bukan besarnya volume — jadi item 21 tetap di bawah walau
volumenya terbesar di batch ini. Catatan untuk owner: bila tujuan jangka pendek adalah traffic,
item 21 layak dimajukan (dan `piano first dance songs` 10–100 bisa diperluas ke
`piano wedding songs` 1K–10K — lihat § 8.4). Urutan backlog **tidak** diubah tanpa persetujuan owner.

### 8.4 Rekomendasi aksi

**A. Perkuat existing (dampak terbesar, tanpa artikel baru):**

| Halaman                                           | Tambahkan secondary / section                                                                                                                           | Rentang GKP      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `/journal/wedding-processional-recessional-songs` | bridal processional songs, wedding party processional songs, bride entrance songs, walking down the aisle songs, wedding exit songs, upbeat recessional | 10K–100K, 1K–10K |
| `/journal/wedding-prelude-music`                  | prelude songs for wedding ceremony, prelude song for wedding (+ definisi "Prelude adalah…" di versi ID, § 6)                                            | 1K–10K           |
| `/journal/wedding-ceremony-piano-music`           | piano wedding songs, wedding piano music, piano songs for wedding ceremony, wedding march piano                                                         | 1K–10K, 100–1K   |
| `/journal/wedding-pianist-bali` + `/packages`     | wedding pianist, piano player for wedding, pianist for hire                                                                                             | 1K–10K, 100–1K   |
| `/journal/string-quartet-bali-wedding`            | wedding string quartet, string quartet for wedding ceremony, string quartet wedding music                                                               | 1K–10K, 100–1K   |
| `/journal/wedding-music-budget-bali`              | string quartet wedding cost, wedding pianist cost, violinist for wedding cost, wedding in bali cost (faktor biaya, tanpa angka)                         | 100–1K           |
| `/journal/cliffside-wedding-uluwatu`              | uluwatu wedding venues, bali wedding venues uluwatu                                                                                                     | 100–1K           |
| `/journal/beach-wedding-music-bali`               | beach wedding bali, beachfront wedding bali                                                                                                             | 100–1K           |
| `/journal/villa-wedding-live-music-bali`          | bali villa wedding, bali wedding villas                                                                                                                 | 100–1K           |

**B. Kandidat artikel baru (belum masuk backlog — butuh persetujuan owner):**

| Kandidat                                                                       | Pillar           | Rentang GKP                           | Catatan anti-cannibalization                                                                                            |
| ------------------------------------------------------------------------------ | ---------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| instrumental wedding songs (+ wedding instrumental music, bridal instrumental) | piano-repertoire | 1K–10K                                | Belum ada targetKeyword ini. Beda intent dari item 14/21 (lintas instrumen, bukan per formasi)                          |
| classical music for wedding ceremony (+ classical wedding entrance music)      | piano-repertoire | 100–1K                                | Cek tumpang tindih dengan `classical-vs-contemporary` — itu perbandingan gaya, ini daftar lagu                          |
| ubud wedding (live music for Ubud jungle/rice-field weddings)                  | bali-venues      | 100–1K                                | Area tanpa artikel. Hanya layak bila isinya benar-benar spesifik (akustik outdoor, kelembapan, akses) — hindari doorway |
| cello wedding songs                                                            | piano-repertoire | 10–100 (+ cello wedding music 100–1K) | Supporting. Bisa digabung ke item 14 sebagai section                                                                    |

### 8.5 Pertanyaan untuk owner

1. Lokasi apa yang dipilih saat menjalankan Keyword Planner — apakah Indonesia ikut? (menentukan
   seberapa besar angka keyword Bali mencerminkan pasangan internasional).
2. Mau jalankan daftar § 7.3 (Get search volume and forecasts) supaya `targetKeyword` artikel live
   dan item 16/18 punya angka?
3. Setuju item 21 (`violin wedding songs`) dimajukan dan kandidat § 8.4 B ditulis ke
   `docs/JOURNAL-BACKLOG.md` sebagai `proposed`?

### 8.6 Keputusan owner (2026-09-24)

- **Item 14 ↔ 21 ditukar** di `docs/JOURNAL-BACKLOG.md` (sesama pillar `piano-repertoire`, jadi
  rotasi pillar tetap): `violin-wedding-songs` sekarang **#14**, `string-quartet-wedding-songs`
  sekarang **#21**. Nomor item di § 3, § 4 dan § 8.3 di atas mencatat urutan sebelum penukaran.
- Kandidat § 8.4 B ditulis ke backlog sebagai **item 22–25 berstatus `proposed`**:
  `instrumental-wedding-songs`, `ubud-wedding-live-music`, `classical-wedding-ceremony-music`,
  `cello-wedding-music`. Owner mengubah `proposed` → `todo` setelah review.

## 9. Peluang traffic & lead per bagian situs (2026-09-24)

> Menggabungkan data Keyword Planner (§ 8) dengan GSC per halaman (2026-06-24 → 2026-09-23) dan
> pengecekan halaman live (title, H1/H2, CTA, schema). Situs masih muda: ±31 klik organik dalam 90
> hari, 17 di antaranya ke homepage. Angka CTR per halaman di bawah 60 impresi belum bermakna
> statistik — dipakai sebagai petunjuk, bukan kesimpulan.

### 9.1 Kondisi per halaman

| Halaman                                           | GSC 90 hari (impresi · posisi · klik) | Temuan                                                                                                                                 |
| ------------------------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                               | 157 · 7,2 · 17                        | Sehat. Target "wedding musicians … Bali" bervolume kecil (§ 8.2) — jangan dikejar lebih jauh                                           |
| `/packages`                                       | 81 · 9,0 · 3                          | Title sudah memuat `wedding pianist` + `string quartet` (1K–10K). Form + 12 link WhatsApp                                              |
| `/repertoire`                                     | 44 · 8,8 · 0                          | **Tidak ada satu pun H2/H3** — lagu hanya kartu + filter JS. **53× teks "Sample coming soon"** (semua `audioSample` masih TODO)        |
| `/journal/wedding-ceremony-piano-music`           | 67 · 9,4 · 0                          | Sudah di halaman 1 tapi 0 klik → title/meta belum memuat `piano wedding songs` / `wedding piano music` (1K–10K)                        |
| `/journal/wedding-processional-recessional-songs` | 48 · 25,6 · 0                         | Melayani cluster 10K–100K dengan **1.068 kata dan 6 H2**. Belum ada section order of entrance, bridal party, wedding march, exit songs |
| `/journal/wedding-prelude-music`                  | 53 · 35,1 · 0 (ID: 55 · 9,2)          | `wedding prelude music` 1K–10K; versi ID dekat halaman 1 untuk `prelude adalah` (§ 6)                                                  |
| `/journal/wedding-music-budget-bali`              | 43 · 9,3 · 0                          | Keyword biaya punya bid tertinggi di data (§ 8.2 #5) — halaman 1 tapi 0 klik                                                           |
| `/for-planners`                                   | 58 · 8,3 · 0                          | Ada form + unduhan planner. Demand pencarian planner kecil — kanal utamanya outreach, bukan SEO (§ 9.4)                                |
| `/privacy`                                        | 52 · 5,1 · 0                          | Impresi terbuang ke halaman non-komersial; tidak perlu aksi selain memastikan internal link utama tidak mengarah ke sana               |

Tracking lead sudah ada: `whatsapp_click` (dengan `cta_location`), `generate_lead` di `/thank-you`,
dan `formation_finder_result`. Testimonial masih disembunyikan (belum ada kutipan nyata).

### 9.2 Traffic — urutan dampak

1. **Perluas `wedding-processional-recessional-songs`** (cluster terbesar di seluruh data). Tambah H2:
   _Songs to Walk Down the Aisle To_ (1K–10K), _Bridal Party Processional Songs_ (10K–100K),
   _Order of Entrance for the Ceremony_ (±10 variasi 100–1K: `order of entrance wedding ceremony`,
   `order of walking down the aisle`, `order of recessional wedding`), _The Wedding March and Its
   Alternatives_ (`wedding march songs` 1K–10K, `non traditional wedding march` 100–1K), _Upbeat
   Recessional and Exit Songs_ (`wedding exit songs`, `upbeat recessional songs` 1K–10K). Judul lagu
   hanya dari `/repertoire`. Tambah FAQ baru ke `faq` frontmatter (FAQPage JSON-LD).
2. **Beri struktur ke `/repertoire`**: H2 per momen (Processional, Signing, Recessional, Cocktail
   Hour, Reception) yang ter-render di HTML (bukan hanya filter JS), 1–2 kalimat pengantar per
   momen, dan sembunyikan label "Sample coming soon" sampai sampel ada. Halaman ini sudah di posisi
   ~9; heading yang cocok dengan `wedding processional songs` / `classical music for wedding
ceremony` / `wedding piano music` memberi Google konteks yang sekarang tidak ada.
3. **Tulis ulang title + meta `wedding-ceremony-piano-music`** untuk `piano wedding songs` /
   `wedding piano music` (1K–10K) dan tambah section _Piano Wedding March_ (`wedding march piano`,
   `piano wedding march songs` 1K–10K). Halaman 1 dengan 0 klik = masalah CTR, bukan ranking.
4. **`wedding-music-budget-bali`**: tambah H2 _What Affects the Cost of a String Quartet or Wedding
   Pianist_ + FAQ `How much does a wedding string quartet cost in Bali?` dijawab dengan faktor biaya
   dan ajakan minta quote — **tanpa angka** (aturan harga CLAUDE.md). Keyword: `string quartet
wedding cost`, `wedding pianist cost`, `violinist for wedding cost` (masing-masing 100–1K).
5. **Kandidat artikel baru — reception grand entrance**: `bride and groom entrance songs`,
   `bridal party entrance songs`, `bridal party intro ideas` (masing-masing 1K–10K). Momen resepsi
   yang belum punya artikel; sudut: lagu entrance dimainkan live oleh ensemble. Belum ditulis ke
   backlog — butuh persetujuan owner.
6. **Yang tidak disarankan (berdasarkan data):** halaman per lagu (mis. `/repertoire/canon-in-d`) —
   kombinasi judul lagu + wedding hanya 10–100 per keyword di Keyword Planner; dan halaman lokasi
   massal "wedding musicians <area>" — demand musisi + Bali sangat kecil.

### 9.3 Lead — konversi dari traffic yang sudah ada

1. **Sampel audio** untuk 5–10 lagu yang paling dicari (Canon in D, Wedding March, Bridal Chorus,
   A Thousand Years, Perfect — semuanya muncul di data Keyword Planner). Pasangan memilih musisi
   lewat telinga; 53 label "Sample coming soon" melemahkan halaman yang paling dekat ke keputusan.
   Butuh rekaman dari owner.
2. **Lead magnet "Ceremony Music Planner"** (lembar kerja lagu per momen + urutan masuk upacara),
   dibangun dari demand `order of entrance` dan `processional song ideas` / `list of wedding
processional songs` (100–1K). Belum ada ESP, jadi: form Web3Forms singkat (nama, email, tanggal,
   venue opsional) → `/thank-you` dengan tautan unduh → `generate_lead` dengan `form_type` baru.
   Tiap unduhan = kontak dengan tanggal pernikahan. Ditawarkan di artikel processional, prelude,
   song count, dan `/repertoire`.
3. **CTA kontekstual di tengah artikel** (sekarang hanya blok penutup "Have a date in mind?"):
   setelah daftar lagu, satu baris "Want to hear this played live? Ask for a sample on WhatsApp"
   memakai `WhatsAppCTA` dengan `cta_location` khusus agar bisa diukur di GA4.
4. **Testimonial**: form `/share-your-story` sudah ada; 3 kutipan nyata cukup untuk menyalakan
   kembali section Testimonials di homepage dan `/packages`.
5. **GA4**: jadikan `whatsapp_click` dan `generate_lead` sebagai key event, lalu buat laporan per
   `cta_location` untuk melihat halaman mana yang menghasilkan lead. Butuh login GA4 owner.

### 9.4 Kanal di luar SEO (dibaca dari data yang sama)

- Pasangan mencari **WO/planner** dan **venue**, bukan musisi: `wedding organizer bali`,
  `bali wedding packages`, `bali wedding agency`, `bali wedding venues` (masing-masing 1K–10K) vs
  `wedding entertainment bali` (10–100). Lead Allegra paling realistis datang **lewat planner dan
  venue** — outreach ke WO/venue yang meranking keyword tersebut untuk jadi preferred vendor
  (skill `prospecting` + `cold-email`), dengan `/for-planners` + unduhan tech rider sebagai
  landasan.
- **Google Ads search tidak disarankan saat ini**: keyword bermodifier Bali untuk musisi hanya
  10–100/bulan; keyword generik (`wedding string quartet`) didominasi pencari yang ingin vendor lokal
  di negaranya sendiri.

## 10. Peluang SEO / GEO / AEO lanjutan dari data Keyword Planner (2026-09-25)

> Analisis ulang 6 CSV `docs/data/gkp-2026-09-*.csv` (3.362 keyword unik), di-cluster per tema
> dengan volume dijumlah memakai nilai bucket (50 / 500 / 5000 / 50000). Dicocokkan dengan GSC
> query × page (2026-06-25 → 2026-09-24) dan SERP Firecrawl untuk dua keputusan. Yang sudah
> dikerjakan dari § 9 (perluasan artikel processional, H2 per momen di `/repertoire`, retarget
> artikel piano, lead magnet Ceremony Music Planner) tidak diulang di sini. Owner menyetujui semua
> aksi di bawah pada 2026-09-25, **kecuali** topik pernikahan India (`indian wedding planner bali`
> dkk.) — tidak dikejar.

### 10.1 Cluster tema (jumlah nilai bucket)

| Cluster                                    | Keyword | Jumlah bucket | Status di situs (2026-09-25)                                         |
| ------------------------------------------ | ------: | ------------: | -------------------------------------------------------------------- |
| Processional / walk down the aisle         |   1.067 |      ±862.000 | Dilayani `wedding-processional-recessional-songs`                    |
| Recessional / exit                         |     527 |      ±437.000 | Hanya 1 H2 di artikel processional → **artikel baru, item 19**       |
| Reception entrance (couple & bridal party) |     275 |      ±236.000 | Belum ada → **artikel baru, item 26**                                |
| Instrumental                               |     300 |       ±54.000 | Item 22 (`proposed`)                                                 |
| Piano                                      |     197 |       ±51.000 | Artikel piano (sudah di-retarget § 9)                                |
| String quartet                             |     150 |       ±24.000 | `string-quartet-bali-wedding` + item 21                              |
| Biaya (cost / price / how much)            |     109 |       ±23.000 | `wedding-music-budget-bali` → **diperluas § 10.3**                   |
| Violin                                     |     119 |       ±23.000 | Item 14                                                              |
| Pop / modern / non-traditional             |     183 |       ±22.000 | → **section baru di `custom-wedding-music-arrangement`**             |
| Gereja / Katolik / Kristen                 |     133 |       ±17.000 | → **diperluas ke item 15** (`chapel-wedding-music-bali`)             |
| Signing of the register                    |      67 |       ±13.000 | Item 17                                                              |
| Cocktail hour                              |      74 |        ±8.900 | `cocktail-hour-wedding-piano-music` → **judul di-retarget**          |
| Classical                                  |      65 |        ±7.300 | → **section baru di `classical-vs-contemporary`** (item 24 `merged`) |
| Cello                                      |      36 |        ±2.250 | → H2 di item 21 (item 25 `merged`)                                   |
| First dance                                |       2 |          ±100 | Item 19 lama → dipindah ke item 27 `deferred`                        |

### 10.2 Bukti untuk dua keputusan utama

- **Recessional dipisah** — SERP `wedding recessional songs` (Firecrawl 2026-09-25): The Knot,
  Brides, Paperlust, Tuscan Oaks, Mike Staff semuanya halaman **khusus recessional**; tidak ada
  yang menggabungkan dengan processional. Artikel gabungan kita memakai title yang dipimpin
  "Processional", jadi hampir mustahil bersaing untuk cluster ±437K ini.
- **Reception entrance** — SERP `bride and groom entrance songs reception` didominasi The Knot,
  Brides, dan blog DJ (lagu pop upbeat). Sudut Allegra: lagu pop yang sama dimainkan live oleh piano
  dan strings (aransemen custom sudah termasuk). Fit konversi lebih rendah dibanding momen upacara,
  tapi volumenya terbesar ketiga di seluruh data.
- **Temuan SERP tambahan:** playlist **Spotify** ada di posisi #1 di kedua SERP, dan Reddit
  `r/weddingplanning` masuk top 3 — lihat § 10.5.

### 10.3 Yang dikerjakan 2026-09-25 (EN + ID)

| File                                      | Perubahan                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/llms.txt`                         | **Fakta salah diperbaiki**: Large Ensemble tertulis "string quartet + piano + double bass" dan masih menyebut upgrade "Piano +" (keduanya sudah diganti sejak 2026-07-09). Ditambah daftar 5 formasi + jumlah musisi, service facts (aransemen termasuk, balasan 24 jam, tanpa PA, rain plan, vow renewal, musik gereja), dan daftar semua artikel Journal per kelompok |
| `live-music-bali-wedding-guide`           | Title/H1/description/hook → `wedding ceremony musicians` (1K–10K, competition index 7 — terendah di antara keyword vendor 1K+). `targetKeyword` lama (`musician for wedding ceremony`) tidak ada di data GKP                                                                                                                                                            |
| `wedding-music-budget-bali`               | Title/H1 → "Live Wedding Music Cost in Bali"; `targetKeyword` → `string quartet wedding cost`; H2 baru _What Affects the Cost of a Wedding String Quartet or Pianist?_ + tabel pembanding quote (piano termasuk, aransemen tidak ditagih terpisah, tanpa sound system); FAQ baru soal biaya — **tanpa angka**                                                           |
| `cocktail-hour-wedding-piano-music`       | Title/description → `wedding cocktail hour music`; H1 tetap menyebut piano                                                                                                                                                                                                                                                                                              |
| `id/wedding-prelude-music`                | Title → "Prelude Adalah: Musik Sebelum Upacara Pernikahan". Alasan: `prelude adalah` = query dengan impresi terbanyak di GSC situs (21 impresi, posisi 10,1, 0 klik) + `prelude artinya`, `apa itu prelude`                                                                                                                                                             |
| `wedding-ceremony-song-count`             | Hook answer-first: kalimat pertama langsung menyebut "empat hingga enam lagu" beserta rinciannya. GSC: ±10 variasi "how many songs…" di posisi 22–43                                                                                                                                                                                                                    |
| `custom-wedding-music-arrangement`        | H2 baru _Pop Songs on Strings and Piano_ + FAQ Vitamin String Quartet (3 keyword VSQ-wedding 100–1K, kompetisi 0; `pop songs to walk down the aisle` 100–1K). VSQ hanya disebut sebagai referensi gaya                                                                                                                                                                  |
| `classical-vs-contemporary-wedding-music` | H2 baru _Classical Music for a Wedding Ceremony, Moment by Moment_ (tabel per momen, judul hanya dari `/repertoire`) + FAQ `What classical music is played at a wedding ceremony?`. Menggantikan item 24 agar tidak kanibal                                                                                                                                             |
| `docs/JOURNAL-BACKLOG.md`                 | #19 = `wedding-recessional-songs` (`todo`); #26 `reception-entrance-songs` (`todo`); #27 `piano-first-dance-songs` (`deferred`); #24 dan #25 `merged`; item 15 ditambah H2 musik gereja/Katolik; item 21 ditambah H2 cello; status baru `deferred`/`merged` didokumentasikan di header (instruksi #7)                                                                   |

Koreksi atas analisis sebelumnya: dugaan bahwa JSON-LD `Article.headline` memakai `title` (dengan
suffix brand) **keliru** — `[slug].astro` sudah mengoper `heading` sebagai `title` ke
`getArticleJsonLd`. Tidak ada perubahan.

### 10.4 Follow-up manual (bukan tugas routine)

1. **Setelah item 19 publish:** ringkas H2 _Recessional and Wedding Exit Songs_ di
   `wedding-processional-recessional-songs` (EN + ID) jadi 2–3 kalimat + link ke artikel
   recessional, lalu fokuskan title/description ke processional. Tanpa langkah ini dua halaman
   bersaing untuk `wedding recessional songs`.
2. **`llms.txt` tidak diperbarui otomatis** oleh routine `journal-article-publisher`. Tambahkan
   artikel baru ke daftar Journal-nya secara berkala (atau tambahkan langkah itu ke SKILL.md).
3. **Repertoire recessional tipis** — hanya 4 judul `moment: recessional` di
   `src/content/repertoire/`. Item 19 hanya boleh memakai judul dari `/repertoire`, jadi menambah
   2–4 judul recessional upbeat yang memang dimainkan Allegra akan memperkuat artikel itu (butuh
   daftar dari owner).
4. Description di bawah 150 karakter (sudah ada sebelumnya, tidak disentuh):
   `id/beach-wedding-music-bali` (146), `id/cliffside-wedding-uluwatu` (147),
   `id/wedding-band-vs-dj` (134), `id/wedding-venue-live-music-bali` (140).

### 10.5 Aksi owner (di luar situs / butuh data owner)

- **Playlist Spotify publik atas nama Allegra** per momen (Processional, Recessional, Reception
  Entrance — versi piano & strings), judulnya memakai keyword, deskripsinya menaut ke artikel
  terkait. Spotify menempati #1 di dua SERP yang dicek; ini juga sumber yang sering dikutip jawaban
  AI.
- **Author `Person` di Article JSON-LD** (musisi / music director sungguhan) untuk E-E-A-T. Butuh
  nama + persetujuan owner. Saat ini guideline artikel menetapkan author = Organization, jadi
  guideline itu juga perlu diubah bila owner setuju.
- **Keterlibatan di `r/weddingplanning`** (Reddit top 3 untuk recessional dan reception entrance) —
  menjawab pertanyaan, bukan promosi; selaras dengan `docs/COMMUNITY-MARKETING-PLAN.md`.
- **Sampel audio** untuk judul yang paling dicari (§ 9.3 #1) tetap menjadi pengungkit konversi
  terbesar di `/repertoire`.
