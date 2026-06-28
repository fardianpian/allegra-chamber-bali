# Skill: Weekly Health Audit

Kamu adalah agen audit yang berjalan otomatis setiap Minggu pagi pukul 08:00 WIB.
Tugasmu: jalankan pemeriksaan kesehatan situs Allegra Chamber Bali secara menyeluruh,
simpan laporan ke docs, dan kirimkan ringkasan + rekomendasi ke Slack `#allegra-updates`.

Laporan ini bersifat informatif — owner yang menentukan tindak lanjut secara manual.

## Konteks Proyek

- Website: `https://allegra.indonesiaistimewastudio.id`
- Repository: `fardianpian/allegra-chamber-bali`
- GA4 Property ID: `542419294`
- GSC: domain property covering seluruh `indonesiaistimewastudio.id`

## Langkah Eksekusi

### Bagian A — SEO & Indexing

**A1. GSC Performance (7 hari terakhir):**
Gunakan `mcp__google-search-console__get_performance_overview` dengan:
- siteUrl: `sc-domain:indonesiaistimewastudio.id`
- startDate: 7 hari lalu
- endDate: hari ini
- Ekstrak: total clicks, total impressions, avg CTR, avg position
- Top 5 halaman by clicks

**A2. Indexing Status:**
Gunakan `mcp__google-search-console__batch_url_inspection` untuk cek URL-URL berikut:
```
https://allegra.indonesiaistimewastudio.id/
https://allegra.indonesiaistimewastudio.id/journal/wedding-pianist-bali
https://allegra.indonesiaistimewastudio.id/journal/live-music-bali-wedding-guide
https://allegra.indonesiaistimewastudio.id/journal/string-quartet-bali-wedding
https://allegra.indonesiaistimewastudio.id/journal/cliffside-wedding-uluwatu
https://allegra.indonesiaistimewastudio.id/journal/live-music-vendor-questions
https://allegra.indonesiaistimewastudio.id/journal/vendor-partnership-logistics-bali
https://allegra.indonesiaistimewastudio.id/journal/wedding-ceremony-piano-music
https://allegra.indonesiaistimewastudio.id/id/journal/wedding-pianist-bali
https://allegra.indonesiaistimewastudio.id/id/journal/live-music-bali-wedding-guide
https://allegra.indonesiaistimewastudio.id/id/journal/string-quartet-bali-wedding
https://allegra.indonesiaistimewastudio.id/id/journal/cliffside-wedding-uluwatu
https://allegra.indonesiaistimewastudio.id/id/journal/live-music-vendor-questions
https://allegra.indonesiaistimewastudio.id/id/journal/vendor-partnership-logistics-bali
https://allegra.indonesiaistimewastudio.id/id/journal/wedding-ceremony-piano-music
https://allegra.indonesiaistimewastudio.id/packages
https://allegra.indonesiaistimewastudio.id/about
https://allegra.indonesiaistimewastudio.id/faq
```
Tambahkan URL artikel baru yang mungkin sudah ditambahkan sejak run terakhir
(baca `src/content/articles/` untuk daftar terbaru).

Hitung: berapa URL yang Indexed vs Not Indexed vs Crawled-not-indexed.

**A3. GA4 Traffic (7 hari terakhir):**
Gunakan `mcp__google-analytics__run_report` dengan property `542419294`:
- Dimensions: `pagePath`, `sessionDefaultChannelGroup`
- Metrics: `sessions`, `bounceRate`, `averageSessionDuration`, `engagedSessions`
- dateRange: 7 hari terakhir

Ekstrak: total sessions, top 5 halaman by sessions, traffic sources breakdown.

### Bagian B — Technical Health

**B1. Build check:**
```bash
cd /Users/fardian.fp/Claude/Project/allegra-chamber-bali
npm run lint && npm run build
```
Catat: ✅ Clean atau ❌ Error (sertakan pesan error singkat jika ada).

**B2. SEO Audit (skill):**
Jalankan skill `seo-audit` untuk full-site technical SEO check pada:
`https://allegra.indonesiaistimewastudio.id`

Ekstrak skor utama dan top 3 issues jika ada.

**B3. Audit Website (opsional, jika squirrelscan tersedia):**
Cek apakah `squirrelscan` tersedia dengan `which squirrelscan`.
Jika tersedia: jalankan skill `audit-website` dan ekstrak overall score + top issues.
Jika tidak tersedia: skip dan catat "squirrelscan not available".

### Bagian C — Content Gap Analysis

Baca semua file di `src/content/articles/` (exclude `id/` subdirektori).
Hitung artikel per pillar dari frontmatter `pillar` field.

Dari 4 pillar yang valid:
- `planning` — Wedding Music Planning
- `piano-repertoire` — Piano & Repertoire  
- `bali-venues` — Bali Ceremony & Venue Guides
- `for-planners` — For Wedding Planners & Venues

Identifikasi pillar dengan artikel paling sedikit.
Baca `docs/SEO-STRATEGY.md` untuk keyword clusters yang belum ditulis.
Generate 2–3 topik kandidat untuk minggu depan (akan digunakan agen Article Proposer).

### Bagian D — Tulis Laporan

**D1. Append ke `docs/PROGRESS.md`:**

Tambahkan section baru di awal (setelah header) atau di akhir "Next steps" section:

```markdown
## Weekly Audit — YYYY-MM-DD

**GSC 7 hari:** X clicks | Y impressions | Z% CTR | pos avg W
**Indexing:** X/Y URL terindex di Google
**GA4 7 hari:** X sessions | top page: /journal/<slug>
**Build:** ✅ Clean / ❌ Error: <pesan>
**SEO Score:** <score atau "N/A">
**Content gap:** Pillar `<pillar>` — X artikel (target minimum: 3)
**Top rekomendasi:**
- <rekomendasi 1>
- <rekomendasi 2>
- <rekomendasi 3>
```

**D2. Append ke `docs/AUDIT-LOG.md`:**

File ini khusus audit — format lebih detail:

```markdown
---

## Audit: YYYY-MM-DD

### GSC Performance
- Clicks (7d): X
- Impressions (7d): X
- Avg CTR: X%
- Avg Position: X
- Top pages: ...

### Indexing Status
- Indexed: X/Y
- Not indexed: (list URL)
- Crawled-not-indexed: (list URL jika ada)

### GA4 Traffic
- Sessions (7d): X
- Top channel: X
- Top pages: ...

### Technical
- Build: ✅/❌
- SEO Audit: <ringkasan>
- audit-website: <ringkasan atau "not run">

### Content
- Artikel per pillar: planning(X), piano-repertoire(X), bali-venues(X), for-planners(X)
- Pillar paling kosong: <pillar>
- Kandidat topik minggu depan: <list>

### Action Items (untuk owner)
- [ ] <item 1>
- [ ] <item 2>
```

**D3. Git commit:**
```bash
git add docs/PROGRESS.md docs/AUDIT-LOG.md
git commit -m "docs: weekly audit report YYYY-MM-DD"
git push origin main
```

### Bagian E — Kirim Slack

Gunakan `mcp__claude_ai_Slack__slack_send_message` ke `#allegra-updates`:

```
📊 *Weekly Audit* — Allegra Chamber Bali (YYYY-MM-DD)

🔍 *Indexing:* X/Y URL terindex di Google
📈 *GSC 7 hari:* X clicks | Y impressions | pos avg Z
👥 *GA4:* X sessions | top: `/journal/<slug>`
🔧 *Build:* ✅ Clean / ❌ Ada error
📝 *Content:* Pillar `<pillar>` paling kosong (X artikel)

*Rekomendasi tindak lanjut:*
• <rekomendasi 1>
• <rekomendasi 2>
• <rekomendasi 3>

Detail: `docs/AUDIT-LOG.md` | `docs/PROGRESS.md`
```

## Error Handling

- Jika GSC MCP gagal: log "GSC unavailable", lanjutkan ke bagian berikutnya
- Jika GA4 MCP gagal: log "GA4 unavailable", lanjutkan
- Jika build gagal: TETAP lanjutkan laporan, tandai sebagai ❌ Error di semua output
  dan kirim Slack alert tambahan:
  ```
  🚨 *Build Error!* — Allegra Chamber Bali
  `npm run lint && npm run build` gagal. Perlu ditindaklanjuti segera.
  Error: <pesan error>
  ```
- Jika Slack MCP gagal: simpan laporan ke docs, log error, lanjutkan

## Catatan

- Agen ini bersifat READ-HEAVY + REPORT — tidak mengubah kode situs
- Satu-satunya file yang diubah: `docs/PROGRESS.md` dan `docs/AUDIT-LOG.md`
- Owner yang memutuskan tindak lanjut dari rekomendasi, tidak dilakukan agen ini
- Jalan Minggu 08:00 WIB — 1 jam sebelum Article Proposer (19:00 WIB) agar info
  content gap bisa dipakai untuk topik minggu ini
