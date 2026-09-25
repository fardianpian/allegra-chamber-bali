---
name: keyword-research-expansion
description: Riset, perluasan, validasi, clustering, dan pemetaan keyword ke URL situs Allegra Chamber Bali (halaman layanan + artikel /journal), memakai sumber data GRATIS saja (Google Search Console, Google Autocomplete, SERP via Firecrawl). Gunakan saat pengguna minta keyword research, memperluas keyword yang terlalu sempit/luas, analisis intent/SERP, keyword map, cek cannibalization, atau mengisi batch baru docs/JOURNAL-BACKLOG.md. Untuk kalender editorial/pemilihan topik per pillar tanpa riset keyword, lihat content-strategy. Untuk riset keyword YouTube, lihat the-creator-tools:keyword-research.
metadata:
  version: 1.0.0-allegra
---

# Skill: Keyword Research Expansion (versi Allegra Chamber Bali)

## Tujuan

Mengubah satu atau lebih **seed keyword** menjadi sistem keyword yang:

1. Relevan dengan audiens dan tujuan bisnis (inquiry/booking via WhatsApp & form kontak).
2. Terbukti memiliki search intent yang tepat (dicek dari SERP, bukan tebakan).
3. Dikelompokkan tanpa keyword cannibalization terhadap halaman/artikel yang **sudah ada**.
4. Dipetakan ke satu URL nyata di sitemap situs, atau diusulkan sebagai artikel /journal baru.
5. Diprioritaskan berdasarkan potensi business outcome, bukan volume saja.

---

## Sebelum Mulai (wajib)

1. Baca `.agents/product-marketing.md` (konteks bisnis, audiens, positioning). Jangan tanya ulang
   hal yang sudah tercakup di sana.
2. Pahami batasan proyek dari `CLAUDE.md` — yang paling relevan untuk skill ini:
   - **Harga tidak ditampilkan** di situs. Keyword ber-modifier harga (`cost`, `price`, `how much`,
     `harga`) TIDAK boleh dipetakan ke halaman pricing/angka. Petakan ke artikel "faktor biaya"
     (contoh yang sudah ada: `wedding-music-budget-bali`) atau FAQ tanpa angka.
   - **Jangan mengarang** testimonial, statistik, nama venue, atau angka volume.
   - **Aturan "Signature Sound"**: piano sudah termasuk standar di Duo/Trio/String Quartet/Large
     Ensemble — jangan pernah memposisikan formasi sebagai "just a string quartet".
   - **Pasar = EN.** `docs/SEO-STRATEGY.md`: demand pencarian berbahasa Indonesia hampir nol. Riset
     dalam English (pasar AU, UK, US, SG + global). Terjemahan ID dibuat saat publish, bukan hasil
     riset keyword terpisah — kecuali pengguna eksplisit meminta riset pasar ID.
3. Bangun **peta keyword → URL yang sudah ada** sebelum membuat cluster apa pun:

   ```bash
   grep -H "^targetKeyword" src/content/articles/*.md
   grep -n "targetKeyword" docs/JOURNAL-BACKLOG.md
   ls src/pages
   ```

   Setiap kandidat keyword yang intent-nya sama dengan `targetKeyword` yang sudah ada = **bukan
   artikel baru** → catat sebagai "perkuat halaman existing" (tambah section/FAQ/internal link).

### Target URL yang valid

Halaman layanan/konversi: `/`, `/packages`, `/repertoire`, `/for-planners`, `/faq`, `/about`,
`/gallery`, `/contact`. Artikel: `/journal/<slug>` dengan `pillar` salah satu dari 4 enum di
`src/content/config.ts`: `planning`, `piano-repertoire`, `bali-venues`, `for-planners` — jangan
menciptakan pillar ke-5.

Halaman baru di luar itu (mis. halaman lokasi "wedding musicians Ubud", halaman per formasi) hanya
boleh muncul sebagai **usulan yang butuh persetujuan owner** di bagian Gap — jangan dimasukkan ke
backlog. Halaman lokasi massal berisiko jadi doorway pages; rujuk skill `programmatic-seo` /
`site-architecture` bila owner tertarik.

---

## Sumber Data (gratis saja)

Owner tidak lagi memakai DataForSEO (2026-09-24). Jangan panggil tool `dataforseo`. Gunakan:

| Sumber                         | Cara                                                                                                                                                                                                                                                                                    | Untuk tahap                                                        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Google Search Console**      | MCP `google-search-console`, property `sc-domain:allegra.indonesiaistimewastudio.id`. `get_advanced_search_analytics` dimensi `query,page`, 90 hari, sort `impressions`                                                                                                                 | Query nyata, halaman yang sudah dapat impresi, peluang posisi 8–30 |
| **Google Autocomplete**        | `curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=<au/gb/us>&q=<seed>"` — endpoint tidak resmi: beri jeda ≥1 detik antar-request, jangan ratusan request sekaligus                                                                                    | Tahap 3–4 (ekspansi, istilah yang benar-benar diketik)             |
| **SERP top-10**                | `firecrawl_search` (`sources: ["web"]`, `limit` 5–10) — keyless, ada batas kredit, pakai hanya untuk cluster kandidat prioritas                                                                                                                                                         | Tahap 5–6 (intent & format pemenang, ada/tidaknya vendor Bali)     |
| **Google Keyword Planner API** | `npm run gkp -- --name <run> --seeds "a, b"` (maks 20 seed; `--mode metrics --seeds-file` untuk validasi daftar persis). Output `docs/data/gkp-<YYYY-MM>-<run>.csv` + `.meta.json`. Gratis, butuh kredensial `GOOGLE_ADS_*` di `.env` — kalau belum ada, minta owner ekspor CSV dari UI | Menaikkan skor Demand evidence                                     |
| **Opsional, dijalankan owner** | Ekspor CSV Google Keyword Planner dari UI atau Bing Webmaster Tools Keyword Research                                                                                                                                                                                                    | Menaikkan skor Demand evidence                                     |

Data DataForSEO lama di `docs/COMPETITOR-CONTENT-RESEARCH.md` (Juli 2026) boleh dikutip sebagai
acuan historis — selalu sebut tanggalnya.

---

## Prinsip Operasional

- Jangan menganggap keyword bervolume tinggi sebagai keyword terbaik.
- Utamakan **relevansi bisnis** dan **intent beli** di atas traffic potensial.
- Perluas hanya satu variabel pada setiap iterasi, lalu validasi perubahan intent.
- Bedakan keyword yang mirip secara kata dengan keyword yang sama secara intent.
- Satu halaman menargetkan satu intent utama dan satu cluster.
- Gunakan bahasa yang benar-benar dipakai audiens (cek autocomplete: mis. orang mengetik
  `wedding band bali`, belum tentu `wedding musicians bali`).

---

## Workflow

### Tahap 1 — Definisikan Search Job

```text
Seed keyword:
Search job:
Likely audience: (pasangan internasional / wedding planner / venue)
Likely business value:
Primary intent hypothesis:
```

### Tahap 2 — Pecah Keyword Menjadi Komponen

Layanan/topik · Format (solo piano, duo, string quartet, large ensemble) · Audiens (couple, planner)
· Masalah · Outcome · Konteks (moment: prelude/processional/signing/recessional/cocktail; venue:
villa/cliffside/beach/resort) · Lokasi (Bali, Uluwatu, Ubud, Canggu, Seminyak, Nusa Dua) · Modifier
intent.

### Tahap 3 — Ekspansi Tujuh Arah

1. Sinonim/istilah alternatif
2. Problem/pain point
3. Outcome
4. Audience/use case
5. Context/modifier
6. Intent modifier — info: `how`, `what`, `ideas`, `list`; komersial: `best`, `vs`, `cost`;
   transaksional: `hire`, `book`, `near me`
7. Question variants

Jalankan autocomplete untuk seed + tiap modifier penting. Output minimum: 10–15 kandidat per seed
(niche ini sempit).

### Tahap 4 — Ekspansi Bertingkat

| Lapisan        | Contoh                                     |
| -------------- | ------------------------------------------ |
| Exact / narrow | `string quartet for villa wedding uluwatu` |
| Mid-tail       | `wedding string quartet bali`              |
| Broad topical  | `wedding recessional songs`                |

Terlalu sempit → hapus satu pembatas. Terlalu luas → tambah satu pembatas. Cek ulang intent tiap iterasi.

### Tahap 5 — Validasi (GSC + SERP)

- GSC: apakah query/variasinya sudah punya impresi? Halaman mana yang mendapatkannya? Kalau halaman
  yang salah yang mendapat impresi → catat sebagai sinyal cannibalization/mis-mapping.
- SERP: format top-10 (listicle, vendor page, directory, Reddit, video), ada vendor Bali atau
  tidak, ada PAA/featured snippet atau tidak.
- **Jangan menulis angka volume/KD tanpa sumber.** Tulis "tidak tersedia" bila tidak ada.

### Tahap 6 — Klasifikasi Intent (berdasarkan SERP)

| Intent        | Aset yang tepat di situs ini                                                       |
| ------------- | ---------------------------------------------------------------------------------- |
| Informasional | Artikel /journal                                                                   |
| Komersial     | Artikel perbandingan/panduan + `/packages` / `/repertoire` sebagai langkah berikut |
| Transaksional | `/packages`, `/contact`, `/for-planners` — BUKAN artikel baru                      |
| Navigasional  | Homepage                                                                           |

SERP campuran → pisahkan cluster atau catat bahwa keyword tidak cocok untuk satu halaman.

### Tahap 7 — Cluster & Anti-Cannibalization

Satu cluster = satu search job + satu intent + satu content type + satu target URL. Bandingkan
dengan peta keyword → URL dari "Sebelum Mulai". Pisahkan cluster hanya bila intent, audiens, offer,
format SERP, atau CTA berbeda.

### Tahap 8 — Skor Prioritas

Skor 1–5 per faktor:

| Faktor              | Definisi                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Relevansi bisnis    | Kedekatan dengan offer (live piano & string ensemble untuk wedding Bali)                                                                                |
| Intent komersial    | Kedekatan pencari pada inquiry/booking                                                                                                                  |
| Demand evidence     | 5 = impresi GSC nyata · 4 = rentang volume Keyword Planner/Bing (ekspor owner) · 3 = autocomplete + PAA/related · 2 = autocomplete saja · 1 = hipotesis |
| Ranking feasibility | Realistis bersaing melihat SERP (forum/blog kecil di top-10 = mudah; brand media besar = sulit)                                                         |
| Asset readiness     | Kesiapan bukti di situs (repertoire, foto, video piano). Testimonial nyata belum ada → jangan skor tinggi bila cluster butuh social proof               |

```text
Priority score = (Relevansi × 3) + (Intent komersial × 3) + (Demand × 2) + (Feasibility × 2) + (Asset × 1)
```

48–55 sangat tinggi · 38–47 tinggi · 27–37 supporting/eksperimen · <27 backlog.
Untuk batch artikel /journal (tujuan awareness), boleh menurunkan bobot Intent komersial ke ×2 —
sebutkan bila melakukannya.

### Tahap 9 — Map ke Funnel

Discovery (artikel) → Consideration (`/repertoire`, `/packages`, `/faq`) → Conversion (WhatsApp,
`/contact`). Setiap artikel wajib punya internal link ke langkah berikutnya yang logis; CTA
jangan agresif di konten edukasi.

---

## Output Wajib

Simpan hasil lengkap ke `docs/KEYWORD-MAP-YYYY-MM.md` (satu file per putaran riset), dengan struktur:

1. **Ringkasan Strategis** — objective, asumsi, sumber data yang dipakai + tanggal.
2. **Keyword Expansion Matrix** — `| Seed | Arah ekspansi | Kandidat | Intent hipotesis | Sumber bukti |`
3. **Keyword Clusters** — `| Cluster | Primary | Secondary | Search job | Intent | Asset | Target URL | Status (baru / perkuat existing) |`
4. **Prioritas Eksekusi** — `| Priority | Cluster | Score | Alasan | Next action |`
5. **Rekomendasi Konten** — untuk cluster prioritas tinggi.
6. **Gap & Pertanyaan** — data yang belum ada, usulan halaman baru yang butuh persetujuan owner.

### Bila tujuannya mengisi backlog /journal

Tulis cluster yang lolos (artikel baru, bukan "perkuat existing") ke `docs/JOURNAL-BACKLOG.md`
mengikuti format _Item Details_ yang sudah ada (heading, targetKeyword, description seed, excerpt
seed, outline H2, FAQ candidates, outboundLinkTarget, inboundLinkSource, cover image prompt) dengan
**status `proposed`** — routine `journal-article-publisher` hanya mengambil `todo`, jadi owner yang
mengubah `proposed` → `todo` setelah review. Jangan pernah langsung menulis `todo`.

Saat menulis heading/outline, ikuti `.claude/brand-voice-guidelines.md` (vocabulary Avoid → Prefer).
FAQ yang butuh fakta proses nyata yang belum dikonfirmasi owner → tandai `[confirm real process]`.

---

## Quality-Control Checklist

- [ ] Tidak ada angka volume, KD, trend, atau ranking tanpa sumber yang disebut.
- [ ] Tidak ada tool DataForSEO yang dipanggil.
- [ ] Setiap cluster punya satu target URL yang ada di sitemap (atau ditandai usulan ke owner).
- [ ] Tidak ada artikel baru yang intent-nya sama dengan `targetKeyword` existing.
- [ ] Keyword transaksional tidak dipetakan ke artikel /journal.
- [ ] Keyword harga tidak dipetakan ke halaman berangka harga.
- [ ] Tidak ada pillar di luar 4 enum.
- [ ] Piano tidak diposisikan sebagai add-on.
- [ ] Item backlog baru berstatus `proposed`, bukan `todo`.

## Anti-Patterns

- Mengumpulkan ratusan keyword tanpa intent, cluster, atau action plan.
- Menargetkan satu keyword per halaman secara mekanis / halaman terpisah untuk sinonim identik.
- Membuat artikel tutorial untuk query yang SERP-nya jelas meminta vendor.
- Memakai terjemahan literal untuk pasar internasional.
- Menganggap autocomplete sebagai bukti pasti volume atau konversi.
- Mengabaikan query nyata dari Search Console.
