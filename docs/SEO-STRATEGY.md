# Strategi Keyword SEO — Allegra Chamber Bali

> Sub-dokumen dari `docs/BRIEF.md`. Living document — perbarui setelah setiap audit ulang data
> (disarankan setiap 3–6 bulan, atau begitu GSC punya data nyata pasca-launch).

**Tanggal retrieval data:** 2026-06-18
**Status domain saat ini:** brand baru, domain authority nol, belum ada backlink, belum live.

---

## 1. Metodologi & Sumber Data

Semua angka volume pencarian, keyword difficulty (KD), CPC, dan intent pada dokumen ini diambil
langsung dari **DataForSEO Labs/SERP API** (endpoint `keyword_overview`, `keyword_suggestions`,
`bulk_keyword_difficulty`, `serp_organic_live_advanced`, `serp_competitors`). Tidak ada angka yang
ditebak — keyword tanpa baris data sama sekali ditandai **"no data"**, bukan diasumsikan nol atau
mudah.

**Locale yang diuji** (alasan: pasangan destination wedding internasional + pasar lokal B2B):

| Locale | `location_name` | `language_code` | Mewakili                                                                       |
| ------ | --------------- | --------------- | ------------------------------------------------------------------------------ |
| EN-US  | United States   | en              | Pasangan internasional, gaya pencarian Google paling umum dipakai pelancong AS |
| EN-AU  | Australia       | en              | Segmen terbesar wisatawan/pernikahan destinasi ke Bali secara historis         |
| ID-ID  | Indonesia       | id              | Wedding organizer/vendor lokal, pencarian dari dalam Indonesia                 |

**Keterbatasan tool yang harus diungkap secara transparan:**

- **Apify tidak tersedia** di environment ini (dicek via tool search, nihil). Sebagai gantinya,
  riset kompetitor SERP memakai `dataforseo_labs_google_serp_competitors` +
  `serp_organic_live_advanced` (data ranking organik real-time dari Google), dan ekstraksi struktur
  halaman kompetitor memakai **Firecrawl** (`firecrawl_scrape`) — bukan Apify. Direktori yang
  diminta user (Bridestory, Hello Bali Wedding, Easy Weddings) tidak muncul sebagai ranking organik
  untuk satu pun keyword inti yang diuji, sehingga tidak ada temuan kompetitif darinya untuk
  kategori ini — bukan berarti tidak dicek, tapi memang tidak terindeks untuk niche ini.
- **`keyword_ideas` (clustering kategori) dibuang sebagai metode utama** — hasilnya bercampur
  dengan noise tidak relevan (mis. "wedding drummer", "string puppet", konten Indonesia yang
  tercampur ke locale Australia). Metode yang dipakai sebagai gantinya: `keyword_overview` untuk
  daftar seed yang sudah dikurasi manual, dan `keyword_suggestions` untuk menemukan varian
  long-tail literal dari frasa inti.
- **Catatan penting soal pembacaan angka volume:** DataForSEO mengelompokkan keyword bersinonim ke
  satu `core_keyword` yang sama, dan seringkali mereka **membagi search_volume yang identik**
  antar varian (contoh: "wedding string quartet", "string quartet wedding", dan "string quartet
  for wedding ceremony" semua menunjukkan 2400 di US karena dianggap satu cluster permintaan, bukan
  3 pencarian terpisah). Jangan baca angka ini sebagai traffic per frasa yang berdiri sendiri —
  baca sebagai estimasi permintaan untuk satu _cluster makna_.
- Sebagian keyword memang punya `search_volume` tapi **tidak punya `keyword_difficulty` sama
  sekali** (bukan KD 0) — ini ditandai terpisah di tabel sebagai "no data" pada kolom KD saja.

---

## 2. Pemetaan Intent / Funnel

| Intent                       | Definisi pakai di sini                                                            | Contoh keyword tervalidasi    | Volume (US / AU) | Halaman target                               |
| ---------------------------- | --------------------------------------------------------------------------------- | ----------------------------- | ---------------- | -------------------------------------------- |
| Komersial — siap cari vendor | "musician for wedding", "string quartet for hire"                                 | musician for wedding          | 5400 / 720       | Home, Packages                               |
| Komersial — siap cari vendor | string quartet for hire                                                           | string quartet for hire       | 210 / 50         | Packages                                     |
| Navigasi — lokasi venue      | uluwatu wedding venue, nusa dua wedding venue                                     | uluwatu wedding venue         | 40 / 210         | For-Planners (awareness, bukan target utama) |
| Informasional — riset konsep | string quartet for wedding ceremony, musician for wedding ceremony                | musician for wedding ceremony | 3600 / 210       | Repertoire, FAQ                              |
| Informasional — riset harga  | "how much string quartet wedding cost" (PAA Google, tanpa data volume DataForSEO) | —                             | no data          | FAQ                                          |

Catatan: kolom "intent" pada tabel keyword di bawah diambil dari field `main_intent` API, bukan
asumsi manual.

---

## 3. Cluster Keyword EN (US + AU) — Data Lengkap

### 3.0 Cluster "Wedding Pianist / Piano" — flagship product, opportunity terbaik di seluruh riset

> Ditambahkan setelah owner mengonfirmasi piano adalah produk unggulan Allegra (solo piano +
> opsi upgrade "Piano +" pada Duo/Trio/Quartet). Data di bawah baru, diambil 2026-06-18, locale
> dan metode sama dengan §1.

| Keyword                          | Vol US | KD US                      | Vol AU | KD AU   | Intent        |
| -------------------------------- | ------ | -------------------------- | ------ | ------- | ------------- |
| wedding pianist                  | 720    | **1**                      | 50     | no data | informational |
| wedding piano player             | 720    | no data                    | 50     | no data | commercial    |
| piano wedding ceremony           | 210    | no data                    | —      | no data | informational |
| wedding ceremony pianist         | 210    | no data                    | —      | no data | informational |
| piano for wedding                | 210    | no data                    | 20     | **17**  | informational |
| pianist for wedding ceremony     | 90     | no data                    | 10     | no data | informational |
| piano music for wedding ceremony | 90     | no data                    | 10     | no data | informational |
| hire pianist for wedding         | 30     | **3**                      | 10     | no data | transactional |
| piano and violin wedding         | 20     | no data (HIGH competition) | —      | no data | informational |
| piano trio wedding               | 10     | no data                    | —      | no data | informational |

**Temuan kunci:** "wedding pianist" punya KD **1** di US — bahkan lebih rendah dari head term
musisi terbaik di §3.1. "hire pianist for wedding" KD 3 dengan intent _transactional_ murni
(volume kecil, tapi kualitas niat paling tinggi di seluruh riset ini). Cluster piano ini sekarang
adalah **opportunity terbaik secara KD di seluruh dokumen**, sepadan untuk dijadikan target nyata
di halaman Packages, bukan sekadar footnote di formasi Large Ensemble.

**Yang tidak punya data sama sekali (no data, bukan nol):** piano and string quartet wedding,
piano and cello duo wedding, piano quartet wedding, piano duo wedding, live piano wedding, piano
wedding bali, wedding pianist bali, bali wedding pianist, solo piano wedding, piano accompanist
wedding. Pola ini identik dengan temuan §3.4 (lokasi + layanan) dan §3.2 ("string quartet bali") —
**frasa kombinasi instrumen majemuk ("Piano + Duo/Trio/Quartet") tidak punya permintaan pencarian
terukur sama sekali**. Implikasi langsung: "Piano +" adalah strategi _produk/upsell_ yang valid
dan layak ditulis sebagai copy di halaman Packages (lihat §7, §9), tapi **bukan** target keyword
atau H1 tersendiri — jangan bangun halaman/H1 di sekitar "Piano + Quartet" karena tidak ada
pencari yang mengetik frasa itu.

**ID locale:** seluruh 6 frasa piano berbahasa Indonesia yang diuji (pianis pernikahan, jasa
pianis pernikahan, piano pernikahan bali, pianis bali, sewa pianis pernikahan, live piano
pernikahan) **mengembalikan array kosong total** — bukan sebagian "no data", tapi nol baris untuk
semuanya. Ini memperkuat temuan §8: permintaan pencarian berbahasa Indonesia untuk kategori
vendor musik pernikahan nyaris tidak ada, kini terkonfirmasi berlaku juga untuk piano secara
spesifik. **Re-cek 2026-06-19:** "pianis pernikahan" diuji ulang via `keyword_suggestions`
(bukan `keyword_overview`) — tetap nol baris. Temuan konsisten lintas metode.

### 3.0.1 Update riset 2026-06-19 — perluasan cluster piano (long-tail, "near me", cost-intent)

> Riset lanjutan atas permintaan owner untuk memperdalam fokus kata kunci "piano"/"pianist".
> Sumber: `dataforseo_labs_google_keyword_suggestions` (seed "wedding pianist" & "piano wedding",
> US+AU), `dataforseo_labs_google_related_keywords` (seed "wedding pianist", depth 3, US), dan
> `dataforseo_labs_bulk_keyword_difficulty` untuk shortlist. Seed broad "pianist" (tanpa kata
> "wedding") terbukti **dominan noise** — top volume yang muncul adalah film "The Pianist" (2002),
> "virtual pianist" (software), dan job-seeking content ("pianist salary", "church pianist jobs")
> — dikonfirmasi ulang sebagai metode yang harus dihindari, sesuai catatan §1.

**A. Cluster "hire/near me" (commercial intent, belum ada di §3.0 versi awal):**

| Keyword                  | Vol US | KD US   | Intent     | Catatan                                                  |
| ------------------------ | ------ | ------- | ---------- | -------------------------------------------------------- |
| pianist to hire          | 210    | no data | commercial | dari related_keywords, belum tercatat sebelumnya         |
| wedding pianist near me  | 140    | **6**   | commercial | KD terukur rendah — kandidat kuat                        |
| pianist for hire near me | 110    | no data | commercial | volume cukup, kompetisi MEDIUM                           |
| wedding piano player(s)  | 720    | no data | commercial | satu cluster dengan "wedding pianist" (lihat catatan §1) |
| piano player for wedding | 720    | no data | commercial | sama cluster — pakai sebagai variasi anchor/copy natural |

**B. Cluster cost-intent (volume kecil tapi niat booking sangat jelas):**

| Keyword                                     | Vol US             | KD US   | Intent        |
| ------------------------------------------- | ------------------ | ------- | ------------- |
| wedding pianist rates/prices/price/fee/cost | 90 (masing-masing) | no data | commercial    |
| cost of pianist for wedding                 | 90                 | no data | commercial    |
| how much does a wedding pianist cost        | 40                 | no data | informational |
| hire pianist for wedding                    | 30                 | **3**   | transactional |
| hire a pianist for wedding                  | 30                 | no data | transactional |

**C. Sinyal pasar internasional baru:** "wedding pianist singapore" muncul di hasil suggestion
(KD **39** — kompetisi nyata, bukan no-data seperti kota lain) dan beberapa kota Australia
(Sydney, Melbourne, vol 10 masing-masing, AU locale). Singapore adalah pasar sumber wisatawan
destination-wedding yang relevan secara geografis untuk Bali, tapi KD 39 terlalu tinggi untuk
dikejar sebagai keyword halaman saat domain authority masih nol — **catat sebagai sinyal
audience, bukan target SEO v1**.

**D. Noise besar yang harus dihindari (volume tinggi, intent tidak relevan):** cluster "wedding
songs/sheet music for piano" (mis. "wedding songs piano", "piano wedding march sheet music") —
vol 590–1000/bulan, tapi intent-nya pemain piano amatir mencari partitur untuk dimainkan sendiri,
**bukan** orang yang mencari vendor untuk disewa. Jangan menargetkan cluster ini meski volumenya
terlihat menarik — sudah dikonfirmasi via field `search_intent_info` (mayoritas informational/
transactional-ke-sheet-music, bukan transactional-ke-booking).

**Implikasi terhadap §4 (prioritas):** tambahkan "wedding pianist near me" (KD 6) dan "hire
pianist for wedding" (KD 3, sudah ada) ke baris "kejar dulu" — keduanya layak jadi secondary
keyword FAQ/Packages. "pianist to hire" dan "pianist for hire near me" (no data KD, volume
sedang) masuk kategori "coba, evaluasi via GSC" bukan "kejar pasti" karena KD belum terukur.

### 3.1 Cluster "Wedding Musician / Ceremony Musician" — prioritas tertinggi

| Keyword                        | Vol US | KD US | Vol AU | KD AU   | Intent        |
| ------------------------------ | ------ | ----- | ------ | ------- | ------------- |
| musician for wedding           | 5400   | 13    | 720    | 1       | commercial    |
| wedding musician               | 5400   | 15    | 720    | 20      | commercial    |
| musician for wedding reception | 4400   | 19    | 170    | 8       | commercial    |
| musician for wedding ceremony  | 3600   | 4     | 210    | 7       | informational |
| wedding ceremony musician      | 2400   | 5     | 90     | no data | informational |
| hire musician for wedding      | 70     | 7     | 10     | **52**  | commercial    |

**Temuan kunci:** cluster ini punya volume jauh lebih besar daripada "string quartet" dan KD
jauh lebih rendah pada frasa inti (KD 1–5 di AU/US untuk "musician for wedding ceremony"). Ini
sebaiknya menjadi keyword _kepala_ (head term) utama Allegra, bukan "string quartet" seperti
asumsi awal — string quartet jadi modifier/differentiator, bukan head term.
**"hire musician for wedding" di AU punya KD 52 — DEFER**, kompetisinya HIGH, tidak sepadan untuk
domain baru.

### 3.2 Cluster "String Quartet" — differentiator sekunder

| Keyword                             | Vol US      | KD US   | Vol AU      | KD AU   | Intent        |
| ----------------------------------- | ----------- | ------- | ----------- | ------- | ------------- |
| wedding string quartet              | 2400        | 14      | 140         | no data | informational |
| string quartet for wedding          | 2400        | 1       | 140         | no data | informational |
| string quartet wedding              | 2400        | no data | 140         | 8       | informational |
| string quartet for wedding ceremony | 2400        | no data | 140         | 12      | informational |
| string quartet wedding ceremony     | 2400        | no data | 140         | 11      | informational |
| string quartet for weddings         | 2400        | 11      | 140         | 6       | informational |
| string quartet weddings             | 1900        | 12      | —           | no data | informational |
| wedding ceremony string quartet     | 1900        | no data | —           | no data | informational |
| string quartet for hire             | 210         | no data | 50          | 6       | commercial    |
| string trio wedding                 | 260         | no data | 20          | no data | informational |
| string duo wedding                  | 90          | no data | 10          | no data | informational |
| string quartet bali                 | **no data** | —       | **no data** | —       | —             |

**Temuan kunci:** "string quartet for hire" adalah satu-satunya frasa di cluster ini dengan intent
_commercial_ murni dan KD rendah (6 di AU) — cocok untuk halaman Packages. Sisanya bersifat
_informational_ (orang cari referensi/lagu, bukan langsung booking) — cocok untuk konten
Repertoire/FAQ, bukan halaman jualan utama. **"string quartet bali" tidak punya data sama sekali
di kedua locale** — frasa ini terlalu niche untuk diandalkan sebagai target SEO; brand awareness
("Allegra Chamber Bali") harus dibangun lewat cara lain (Instagram, referral planner), bukan
search volume murni.

### 3.3 Cluster Lokasi/Venue Bali (intent vendor lain — venue & planner, bukan musisi)

| Keyword                  | Vol US | KD US   | Vol AU | KD AU                          | Intent        |
| ------------------------ | ------ | ------- | ------ | ------------------------------ | ------------- |
| bali wedding             | 880    | no data | 1300   | 5                              | informational |
| bali wedding venue       | 480    | no data | 880    | no data                        | navigational  |
| wedding venue bali       | 480    | 7       | 880    | no data                        | commercial    |
| wedding place in bali    | 880    | 8       | —      | no data                        | commercial    |
| destination wedding bali | 170    | no data | 140    | 17                             | commercial    |
| elopement bali           | 170    | no data | 260    | no data                        | commercial    |
| wedding organizer bali   | 260    | 7       | 210    | 14                             | commercial    |
| wedding planner bali     | 260    | 6       | 210    | 11                             | commercial    |
| bali wedding packages    | 320    | no data | 1000   | no data (**HIGH** competition) | commercial    |
| small wedding bali       | 10     | no data | 30     | **39**                         | commercial    |
| intimate wedding bali    | 10     | no data | 20     | no data (**HIGH** competition) | commercial    |
| elopement package bali   | 10     | no data | 20     | no data (**HIGH** competition) | commercial    |

**Temuan kunci:** volume di sini lebih tinggi dari kategori musisi, tapi intent-nya milik kategori
vendor berbeda (venue, wedding planner/organizer) — bukan target konversi langsung Allegra.
Sebaiknya dipakai sebagai konteks/awareness di `/for-planners` dan FAQ, **bukan** dikejar sebagai
keyword utama halaman layanan musik. "bali wedding packages" dan "small wedding bali" punya sinyal
kompetisi HIGH/KD tinggi — **DEFER**, terlalu mahal untuk domain authority nol.

### 3.4 Modifier Lokasi Area Bali (sesuai permintaan: Uluwatu, Ubud, Nusa Dua, Canggu, Seminyak)

| Keyword                                           | Vol US              | KD US   | Vol AU              | KD AU                          | Intent       |
| ------------------------------------------------- | ------------------- | ------- | ------------------- | ------------------------------ | ------------ |
| uluwatu wedding venue                             | 40                  | no data | 210                 | 5                              | navigational |
| nusa dua wedding venue                            | 20                  | 10      | 40                  | 5                              | navigational |
| ubud wedding venue                                | 20                  | no data | 30                  | no data                        | navigational |
| canggu wedding venue                              | 10                  | no data | 20                  | no data                        | navigational |
| seminyak wedding venue                            | 10                  | no data | 20                  | no data (**HIGH** competition) | navigational |
| string quartet uluwatu / ubud / canggu / seminyak | **no data (semua)** | —       | **no data (semua)** | —                              | —            |

**Temuan kunci paling penting di seksi ini:** menggabungkan nama area Bali dengan layanan musik
("string quartet uluwatu", dst.) **tidak menghasilkan data sama sekali** di kedua locale — ini
bukan strategi long-tail yang didukung data riil, melepas dari asumsi umum SEO lokal "kombinasikan
layanan + lokasi". Volume yang ada hanya pada frasa **"[area] wedding venue"** murni (intent
navigasi ke venue spesifik, bukan ke vendor musik) — dengan Uluwatu yang paling signifikan di AU
(210/bulan). Implikasi: halaman per-area "String Quartet di Uluwatu" tidak punya basis permintaan
pencarian nyata; area Bali sebaiknya disebut sebagai _konteks_ dalam copy (mis. testimoni venue,
galeri per-venue), bukan sebagai H1/judul halaman tersendiri.

---

## 4. Prioritas Berbasis Data — Kejar Dulu vs. Tunda

**Kejar dulu (KD rendah, volume relevan, sesuai kategori vendor musik):**

| Keyword                       | Vol (US/AU) | KD (US/AU)  | Alasan                                                         |
| ----------------------------- | ----------- | ----------- | -------------------------------------------------------------- |
| wedding pianist               | 720 / 50    | 1 / no data | KD 1 — terendah di seluruh dokumen, lebih rendah dari §3.1–3.2 |
| hire pianist for wedding      | 30 / 10     | 3 / no data | KD 3, intent transactional murni — kualitas niat tertinggi     |
| musician for wedding ceremony | 3600 / 210  | 4 / 7       | volume tinggi, KD rendah di kedua locale                       |
| wedding ceremony musician     | 2400 / 90   | 5 / no data | KD rendah, volume substansial                                  |
| string quartet for hire       | 210 / 50    | no data / 6 | satu-satunya frasa quartet ber-intent commercial murni         |
| string quartet for wedding    | 2400 / 140  | 1 / no data | KD 1 di US — praktis tanpa kompetisi                           |
| wedding planner bali          | 260 / 210   | 6 / 11      | KD rendah, relevan untuk `/for-planners`                       |
| wedding organizer bali        | 260 / 210   | 7 / 14      | sama, plus satu-satunya sinyal ID yang berarti                 |

**Tunda (KD tinggi atau kompetisi HIGH — tidak sepadan untuk domain authority nol):**

| Keyword                                                                 | KD / Kompetisi                    | Alasan tunda                                                      |
| ----------------------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| hire musician for wedding (AU)                                          | KD 52                             | terlalu kompetitif untuk head term di domain baru                 |
| small wedding bali (AU)                                                 | KD 39                             | kompetisi tinggi, volume kecil (30) — rasio usaha:hasil buruk     |
| bali wedding packages                                                   | kompetisi HIGH (AU)               | dikuasai wedding planner/aggregator besar, bukan kategori Allegra |
| paket pernikahan bali (ID)                                              | KD 46                             | satu-satunya frasa ID dengan KD terukur, dan tinggi — tunda       |
| seminyak wedding venue / intimate wedding bali / elopement package bali | kompetisi HIGH meski volume kecil | rasio usaha:hasil buruk untuk volume di bawah 20/bulan            |

---

## 5. Analisis Kompetitor

Diambil dari `serp_organic_live_advanced` (Google US, real-time) untuk "wedding string quartet
bali", "bali wedding violinist", dan `serp_competitors` untuk cluster "string quartet for hire",
diperkuat scraping struktur halaman via Firecrawl.

### Kompetitor yang teridentifikasi nyata (bukan dugaan):

| Kompetitor                                                                    | Bentuk                                                                               | Kelemahan struktural yang terlihat                                                                                                                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Moira Ensembles** (@moira.ensembles, Denpasar)                              | Instagram saja, tidak ada website                                                    | Posisi formasi sama dengan Allegra (Quartet/Trio/Duo/Solo), 2.2K follower, tapi nol kontrol on-page SEO — semua traffic-nya bergantung pada Instagram algorithm, bukan Google |
| **Baliyostring** (@baliyostring)                                              | Instagram saja                                                                       | Sama — tanpa website berarti tanpa title tag, meta, sitemap, atau halaman yang bisa di-rank Google secara independen                                                          |
| **Bali Wedding Solutions** (baliweddingsolutions.com/music)                   | Wedding planner, musik 1 dari banyak layanan (Gamelan, Rindik, Band, DJ, Quartet)    | Topical authority terdilusi — 1 paragraf generik per jenis musik, tidak ada halaman musik khusus yang dalam                                                                   |
| **Magical Bali Wedding** (magicalbaliwedding.com/vendors/live-ceremony-music) | Wedding planner, halaman vendor tipis                                                | Hanya 1 paragraf + 1 foto + 3 bullet "What We Offer", tanpa breakdown formasi, tanpa harga, tanpa repertoire — sangat mudah dikalahkan dengan konten lebih dalam              |
| **Bali Entertainment Agency** (balientertainmentagency.com/bali-violinists)   | Agency multi-kategori                                                                | Kategori "violinist" hanya satu dari banyak kategori entertainment, bukan spesialis                                                                                           |
| **Adinda Laksmi** (sites.google.com/view/baliviolinist)                       | Solo violinist, Google Sites                                                         | Website sangat minim (1 halaman Google Sites gratis), tapi tetap rank #1 untuk "bali wedding violinist" — menunjukkan bar SEO di niche ini rendah                             |
| **Anna Edelweiss / santoriniviolinist.com**                                   | Solo violinist internasional (basis Santorini, menyasar Bali sebagai pasar sekunder) | Landing page tunggal "/bali-wedding-violinist" — strategi 1 halaman per kota, tidak ada kedalaman konten lain                                                                 |

### Kompetitor piano-spesifik baru (ditemukan 2026-06-19, via SERP real-time untuk "wedding pianist bali" / "piano wedding bali")

| Kompetitor                                                               | Bentuk                                              | Posisi SERP                                                     | Kelemahan struktural                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bali Entertainment Agency** — `/hire-a-pianist-for-a-wedding-in-bali/` | Halaman piano khusus wedding, agency multi-kategori | #6 untuk "wedding pianist bali" (US SERP)                       | H1+H2 lengkap ("Why Hire a Pianist", "Choosing the Right Pianist", dst.), tapi **tanpa formasi/paket terstruktur**, tanpa repertoire, tanpa kredensial musisi bernama — model "agency yang mem-booking freelancer", bukan ensemble dengan identitas |
| **Bali Entertainment Agency** — `/bali-pianists/`                        | Halaman kategori "pianists" generik                 | #8 untuk "piano wedding bali"                                   | Sama — copy generik "diverse talent pool", tidak spesifik wedding, tidak ada nama musisi/foto asli yang terverifikasi                                                                                                                               |
| **Bridestory** — listing "Rose Mystica" (Harp, Piano, Cello Trio)        | Marketplace vendor listing                          | #5 untuk "piano wedding bali"                                   | Harga publik (IDR 4.000.000–26.000.000) tapi tanpa halaman/struktur SEO sendiri — bergantung sepenuhnya pada algoritma marketplace Bridestory                                                                                                       |
| **Magical Bali Wedding** — `/vendors/live-ceremony-music/`               | Wedding planner, halaman vendor tipis               | #8 untuk "wedding pianist bali", #10 untuk "piano wedding bali" | Tetap 1 paragraf generik yang menyebut piano sebagai 1 dari 5 instrumen — sudah dicatat di tabel utama di atas, dikonfirmasi masih belum diperdalam                                                                                                 |

**Mengapa ini penting:** temuan ini merevisi Gap #2 di bawah — bukan "tidak ada kompetitor yang
menargetkan cluster piano", melainkan **ada satu kompetitor (Bali Entertainment Agency) yang
sudah membuat halaman piano khusus dan berhasil masuk page 1** untuk kedua query Bali+piano yang
diuji. Namun halamannya tetap generik (model agency, tanpa nama ensemble/musisi, tanpa
breakdown formasi, tanpa repertoire) — gap diferensiasi Allegra (ensemble bernama, struktur
multi-halaman, kredensial konservatori) tetap valid dan bisa langsung dipakai untuk
mengungguli kualitas konten, hanya targetnya kini lebih konkret: kalahkan dua halaman spesifik
ini di SERP, bukan sekadar "tidak ada yang menargetkan."

### Gap yang bisa direbut Allegra

1. **Tidak ada kompetitor dengan website terstruktur penuh** (multi-halaman: packages,
   repertoire, gallery, FAQ, contact dengan JSON-LD) — semua kompetitor adalah Instagram-only,
   halaman vendor 1 paragraf di situs planner lain, halaman agency generik tanpa identitas
   ensemble (lihat tabel piano-spesifik di atas), atau Google Sites gratis. Struktur Astro
   multi-halaman Allegra (5 formasi terpisah, daftar repertoire lengkap, galeri per-venue) sudah
   secara struktural lebih dalam daripada semua kompetitor yang ditemukan.
2. **Satu kompetitor (Bali Entertainment Agency) sudah menargetkan piano+Bali secara spesifik**
   dan rank page-1 — bukan lagi "ruang kosong", tapi halamannya dangkal (model agency generik,
   tanpa nama ensemble, tanpa formasi/repertoire). Allegra unggul lewat kedalaman konten dan
   identitas brand yang jelas, bukan lewat keunikan ide.
3. **Tidak ada kompetitor dengan breakdown formasi + harga yang jelas** (meski Allegra masih
   `TODO` untuk harga riil per CLAUDE.md §9) — begitu harga diisi, halaman Packages Allegra akan
   menjadi salah satu yang paling lengkap di niche ini.
4. **"string quartet for hire" (intent commercial, KD rendah)** belum dimiliki kompetitor manapun
   secara spesifik untuk Bali — peluang langsung untuk halaman Packages.

---

## 6. Checklist Penempatan On-Page

Per halaman, urutan penempatan keyword primary → secondary, mengikuti pola yang sudah divalidasi
data di atas:

| Elemen               | Aturan                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title tag            | Primary keyword di depan, brand di belakang — pola `{Primary Keyword} — Allegra Chamber Bali`, maks ~60 karakter                                                             |
| H1                   | Sama tema dengan title, tidak harus identik kata-per-kata (hindari duplikasi sempurna)                                                                                       |
| 100 kata pertama     | Sebutkan primary keyword + minimal 1 secondary secara natural, bukan keyword stuffing                                                                                        |
| URL slug             | Sudah statis sesuai sitemap (`/packages`, `/repertoire`, dst.) — tidak perlu diubah, tapi H2 dalam halaman harus memuat keyword sekunder                                     |
| Meta description     | Primary keyword + 1 secondary + CTA singkat, maks ~155 karakter                                                                                                              |
| H2                   | Setiap H2 memuat 1 secondary keyword berbeda agar halaman menutupi seluruh cluster tanpa duplikasi internal                                                                  |
| Alt text gambar      | Deskriptif + keyword sekunder bila relevan secara natural (mis. "string quartet performing at cliffside ceremony, Bali") — jangan paksa keyword ke gambar yang tidak relevan |
| Internal anchor text | Link antar-halaman pakai frasa keyword target halaman tujuan, bukan "klik di sini"                                                                                           |

---

## 7. Pemetaan Primary + Secondary Keyword per Halaman

Prinsip: setiap cluster keyword hanya dipegang **satu** halaman untuk hindari kanibalisasi.
Cluster informational (string quartet umum) dipisah dari cluster commercial (musician for wedding
ceremony, string quartet for hire).

| Halaman          | Primary                                                                                                                                                 | Secondary (2–4)                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Home**         | musician for wedding                                                                                                                                    | wedding musician, live chamber music bali, string quartet for hire                                                    |
| **Packages**     | string quartet for hire                                                                                                                                 | musician for wedding ceremony, wedding ensemble packages, string trio wedding, **wedding pianist** (KD 1, lihat §3.0) |
| **Repertoire**   | string quartet for wedding ceremony                                                                                                                     | wedding ceremony musician, classical wedding songs, string quartet wedding ceremony                                   |
| **Gallery**      | wedding ceremony musician                                                                                                                               | bali wedding venue (kontekstual, bukan navigasi langsung), live wedding performance bali                              |
| **About**        | chamber ensemble bali                                                                                                                                   | conservatory trained musicians, wedding string quartet                                                                |
| **For-Planners** | wedding planner bali                                                                                                                                    | wedding organizer bali, vendor partnership bali, destination wedding bali                                             |
| **FAQ**          | string quartet for wedding cost (informational, _no data_ DataForSEO — disusun dari PAA Google, tandai sebagai estimasi pasar umum bukan Bali-spesifik) | musician for wedding reception, how long string quartet wedding                                                       |
| **Contact**      | musician for wedding bali (brand+intent gabungan, _no data_ terukur — dipakai untuk intent navigasi brand, bukan target volume)                         | check date availability, wedding inquiry bali                                                                         |

**Catatan kanibalisasi yang harus dijaga:** "string quartet for wedding ceremony" (Repertoire) vs.
"musician for wedding ceremony" (Home/Packages) sengaja dipisah meski mirip secara semantik —
Home/Packages pegang varian _commercial_ ("musician for/hire"), Repertoire pegang varian
_informational_ (riset lagu/konsep). Jangan duplikasi H1 yang sama di kedua halaman.

**Piano — Packages memegang cluster ini sendirian, tidak dipecah ke halaman lain:** "wedding
pianist" dan "hire pianist for wedding" (§3.0) jadi secondary keyword khusus blok Solo di halaman
Packages — bukan H1 tersendiri, dan bukan keyword untuk Home (Home tetap pegang "musician for
wedding" sebagai cluster terluas). "Piano +" (upsell ke Duo/Trio/Quartet) sama sekali bukan target
keyword (lihat §3.0 — nol data untuk semua frasa kombinasi) — hanya body copy di blok masing-masing
formasi.

---

## 8. Cluster Keyword Bilingual (EN vs ID) — Volume Independen

EN dan ID **tidak** diperlakukan sebagai pasangan terjemahan literal — volume dicari independen
per bahasa karena perilaku pencari berbeda. Dihubungkan lewat hreflang (`BaseLayout.astro`), bukan
lewat asumsi terjemahan 1:1.

### EN (ringkasan, lihat tabel lengkap §3)

Cluster besar dengan banyak sub-varian bervolume nyata: musician for wedding ceremony, wedding
musician, string quartet for hire/wedding, plus modifier area Bali (Uluwatu dominan di AU).

### ID — temuan kritis, harus membentuk strategi halaman `/id/`

| Keyword                      | Vol                     | KD      | Bahasa terdeteksi                                                   | Catatan                                                                    |
| ---------------------------- | ----------------------- | ------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| wedding organizer bali       | 880                     | 9       | **en** (terdeteksi sebagai frasa Inggris meski di locale Indonesia) | volume tertinggi di ID locale, tapi secara linguistik bukan kata Indonesia |
| wedding planner bali         | 880                     | 11      | **en**                                                              | sama — pencari di Indonesia tetap mengetik frasa Inggris                   |
| pernikahan bali              | 390                     | no data | id (genuine)                                                        | satu-satunya frasa benar-benar berbahasa Indonesia dengan volume berarti   |
| pernikahan di bali           | 110                     | no data | flagged "it" (anomali deteksi bahasa, perlakukan dengan hati-hati)  | volume kecil, makna sama dengan "pernikahan bali"                          |
| wedding organizer di bali    | 50                      | 9       | flagged "it" (anomali)                                              | volume sangat kecil                                                        |
| paket pernikahan bali        | 10                      | **46**  | id                                                                  | volume sangat kecil, KD tinggi — TUNDA                                     |
| biaya wedding organizer bali | **no data sama sekali** | —       | —                                                                   | tidak ada volume terukur                                                   |
| jasa musik pernikahan bali   | **no data sama sekali** | —       | —                                                                   | —                                                                          |
| musisi pernikahan bali       | **no data sama sekali** | —       | —                                                                   | —                                                                          |
| sewa musisi pernikahan       | **no data sama sekali** | —       | —                                                                   | —                                                                          |
| string quartet pernikahan    | **no data sama sekali** | —       | —                                                                   | —                                                                          |
| vendor pernikahan bali       | **no data sama sekali** | —       | —                                                                   | —                                                                          |
| musik live pernikahan        | **no data sama sekali** | —       | —                                                                   | —                                                                          |

**Implikasi strategis (penting):** frasa Indonesia yang secara literal berarti "musisi pernikahan"
/ "jasa musik pernikahan" / "sewa musisi pernikahan" **tidak punya permintaan pencarian terukur
sama sekali** — bukan rendah, tapi nol baris data. Bahkan pencari yang berlokasi di Indonesia
cenderung mengetik dalam bahasa Inggris untuk kategori vendor pernikahan (wedding organizer/
planner). Artinya: halaman `/id/` **tidak boleh dibangun dengan ekspektasi traffic organik
langsung** dari pencarian kategori musik berbahasa Indonesia — perannya adalah kelengkapan
UX/hreflang dan kepercayaan bagi pasangan/keluarga Indonesia yang sudah menemukan situs lewat versi
EN, bukan mesin akuisisi pencarian primer.

---

## 9. Checklist Eksekusi — v1 Build vs. Evaluasi Pasca-Launch

### Implementasikan sekarang (v1 build, sebelum go-live)

Berdasarkan audit `src/i18n/ui.ts` saat ini, title/meta inner-page **belum mengandung satu pun
keyword tervalidasi** — hanya brand name. Contoh konkret yang harus diubah:

| Halaman              | Title saat ini                                  | Title yang direkomendasikan                                                                                                                               |
| -------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Packages             | `Formations & Packages — Allegra Chamber Bali`  | `String Quartet for Hire — Wedding Ensemble Packages — Allegra Chamber Bali`                                                                              |
| Packages — blok Solo | _(belum ada H2 spesifik per formasi)_           | H2 blok Solo sebaiknya memuat "wedding pianist" (mis. "Solo Strings or Wedding Pianist") agar cluster KD 1 di §3.0 tertangkap tanpa bikin halaman/H1 baru |
| Repertoire           | `Our Full Repertoire — Allegra Chamber Bali`    | `Wedding Ceremony Music & Repertoire — Allegra Chamber Bali`                                                                                              |
| Gallery              | `Full Gallery — Allegra Chamber Bali`           | `Live Wedding Performances in Bali — Gallery — Allegra Chamber Bali`                                                                                      |
| About                | `Our Story — Allegra Chamber Bali`              | `Conservatory-Trained Wedding Musicians in Bali — Allegra Chamber Bali`                                                                                   |
| Contact              | `Tell Us About Your Day — Allegra Chamber Bali` | (boleh tetap branded/navigasi — halaman contact tidak butuh head term, biarkan fokus konversi)                                                            |

Homepage title (`Allegra Chamber Bali — Live Chamber Music for Bali Weddings`) sudah relatif baik
namun belum memuat cluster bervolume tertinggi ("musician for wedding") — pertimbangkan revisi ke
arah `Wedding Musicians & String Quartet for Hire in Bali — Allegra Chamber Bali` saat copy
direvisi bersama owner.

- Terapkan tabel §7 (primary+secondary per halaman) ke title/H1/meta description/H2 setiap halaman
  yang sudah dibangun (Home, Packages, Repertoire, Gallery, About, Contact) dan dua halaman yang
  belum dibangun (`/for-planners`, `/faq`, per `docs/PROGRESS.md`).
- `/faq` — susun pertanyaan di sekitar PAA Google yang muncul saat riset (biaya, durasi, trio vs
  quartet) digabung dengan FAQPage JSON-LD per CLAUDE.md §5.
- Alt text gambar Gallery — pakai pola "{moment/venue type} ceremony with live string ensemble,
  Bali" begitu foto asli tersedia (placeholder belum perlu alt text spekulatif).
- Internal linking: Home → Packages pakai anchor "string quartet for hire", Home → Repertoire pakai
  anchor "wedding ceremony music", sesuai §7.
- Piano (§3.0): tulis "wedding pianist" / "hire pianist for wedding" secara natural di copy blok
  Solo halaman Packages (sudah ada body copy piano di `src/content/packages/solo.md`, tinggal
  dipastikan title/H2 halaman Packages ikut menyebutnya saat title/meta direvisi). "Piano +" tetap
  murni body copy upsell di blok Duo/Trio/Quartet (sudah ditulis) — jangan jadikan H2, jangan
  jadikan anchor internal link, karena §3.0 mengonfirmasi nol permintaan pencarian untuk frasa
  kombinasi itu.
- **Status audit 2026-06-19 — sebagian sudah jalan, satu gap konkret tersisa:** `packagesPage.title`
  dan `.description` di `src/i18n/ui.ts` (baris ~80–82) **sudah** memuat "wedding pianist" — ini
  sudah sesuai rekomendasi. **Gap yang masih terbuka:** tagline formation-card Solo di homepage
  (`src/i18n/ui.ts` baris ~43, field `home.formations.items[0].tagline`) masih berbunyi
  `'Violin, Cello, or Piano'` — belum literal "Wedding Pianist". Rekomendasi: ubah jadi
  `'Violin, Cello, or Wedding Pianist'` agar varian KD-1 tertangkap di tempat pertama calon
  pasangan membaca formasi (homepage), bukan hanya di title/meta Packages. Terapkan paralel di
  blok ID (`'Biola, Cello, atau Piano'` → tetap pertimbangkan equivalent ID, ingat §8: tidak ada
  volume pencarian ID untuk piano, jadi perubahan ini murni untuk konsistensi UX, bukan SEO ID).
- **Kompetitor piano baru (lihat §5):** Bali Entertainment Agency rank page-1 untuk "wedding
  pianist bali" dan "piano wedding bali" dengan halaman generik tanpa nama ensemble/repertoire.
  Begitu foto/bio musisi piano asli tersedia dari owner, prioritaskan menyebut nama/kredensial
  pianis di blok Solo (About atau Packages) — kredensial bernama adalah satu hal yang halaman
  agency tersebut tidak punya dan tidak bisa ditiru tanpa identitas brand.

### Evaluasi pasca-launch via Google Search Console (jangan diputuskan sekarang, butuh data nyata)

- Apakah cluster "musician for wedding ceremony" benar-benar mengonversi lebih baik daripada
  "wedding string quartet" seperti diprediksi data pre-launch, atau sebaliknya.
- Apakah halaman `/id/` mendapat impression organik sama sekali — mengingat temuan §8 bahwa
  permintaan ID-language untuk kategori ini nyaris nol, GSC akan mengonfirmasi apakah halaman ini
  murni UX/hreflang atau ternyata ada ekor panjang yang tidak tertangkap DataForSEO.
  Beri evaluasi minimal 90 hari setelah indexing sebelum menyimpulkan.
  Konsultasikan dengan owner sebelum awal evaluasi.
- Apakah query area Bali (Uluwatu, Nusa Dua, dst.) yang sebelumnya tidak punya data DataForSEO
  ternyata muncul di GSC sebagai impression nyata (DataForSEO punya threshold minimum volume yang
  bisa melewatkan ekor sangat panjang yang tetap berharga).
- Re-audit KD dan volume cluster utama setiap 3–6 bulan — DataForSEO `search_volume_trend` pada
  beberapa keyword inti (mis. "bali wedding" turun 19% YoY di kedua locale per data 2026-06-18)
  menunjukkan pasar ini bergerak, bukan statis.

---

## Ringkasan Eksekutif

1. **Head term utama bukan "string quartet" — melainkan "musician for wedding ceremony"** (KD
   4–7, volume 210–3600 tergantung locale/frasa). String quartet jadi differentiator sekunder.
2. **Lokasi Bali sebagai modifier layanan musik ("string quartet uluwatu", dst.) tidak punya
   permintaan pencarian terukur sama sekali** — strategi long-tail lokasi+layanan klasik tidak
   didukung data di niche ini. Nama area dipakai sebagai konteks konten, bukan target keyword H1.
3. **Permintaan pencarian bahasa Indonesia untuk kategori vendor musik pernikahan nyaris nol** —
   bahkan pencari berlokasi Indonesia mengetik dalam bahasa Inggris untuk kategori wedding
   organizer/planner. Halaman `/id/` adalah investasi UX/kepercayaan, bukan mesin traffic organik.
4. **Tidak ada kompetitor dengan website terstruktur penuh di niche string quartet Bali** — semua
   kompetitor nyata adalah profil Instagram, halaman vendor 1 paragraf di situs planner lain, atau
   halaman Google Sites gratis. Struktur multi-halaman Allegra yang sudah dibangun (Packages,
   Repertoire, Gallery dengan JSON-LD) secara struktural sudah melampaui standar SEO niche ini —
   yang tertinggal hanyalah isi title/H1/meta yang belum diarahkan ke cluster keyword tervalidasi
   di atas.
5. **"wedding pianist" (KD 1, US vol 720) adalah opportunity KD terbaik di seluruh riset ini** —
   lebih rendah dari "musician for wedding ceremony" (KD 4) maupun "string quartet for wedding"
   (KD 1 tapi volume jauh lebih tinggi sehingga realistis lebih kompetitif). Karena piano adalah
   produk unggulan Allegra (per konfirmasi owner), cluster ini layak masuk sebagai secondary
   keyword nyata di blok Solo halaman Packages — bukan sekadar catatan kaki. Sebaliknya, "Piano +"
   (kombinasi piano dengan Duo/Trio/Quartet/Large Ensemble) **tidak punya permintaan pencarian sama
   sekali** di EN maupun ID — ini murni strategi upsell on-page, bukan target SEO.
