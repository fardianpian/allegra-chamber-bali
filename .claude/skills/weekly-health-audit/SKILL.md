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

**A1. Organic Performance (7 hari terakhir):**

Cek dulu tool apa yang tersedia di environment ini — GSC/GA4 TIDAK terhubung di cloud
routine run (hanya Slack, Semrush, Ahrefs, Firecrawl yang terhubung), jadi ini kondisi
normal/permanen untuk run terjadwal, bukan error transient yang perlu di-retry:

- **Jika `mcp__google-search-console__get_performance_overview` tersedia** (run lokal):
  gunakan dengan siteUrl `sc-domain:indonesiaistimewastudio.id`, startDate 7 hari lalu,
  endDate hari ini. Ekstrak: total clicks, total impressions, avg CTR, avg position,
  top 5 halaman by clicks.
- **Jika tidak tersedia** (cloud routine run): gunakan `semrush organic_research` untuk
  domain `allegra.indonesiaistimewastudio.id` (estimasi traffic organik + top keywords)
  dan `mcp__claude_ai_Ahrefs__site-explorer-metrics` untuk metrik traffic tambahan.
  Tandai hasil di laporan sebagai "estimasi (Semrush/Ahrefs, bukan data GSC langsung)".

**A2. Indexing Status:**

Bagian ini HANYA bisa dijalankan jika `mcp__google-search-console__batch_url_inspection`
tersedia (run lokal). Jika tidak tersedia (cloud routine run): **skip bagian ini**, catat
"Indexing: N/A — GSC tidak tersedia di cloud environment, cek manual saat sesi lokal
berikutnya" di laporan. Jangan menebak angka indexing dari sumber lain.

Jika GSC tersedia, cek URL-URL berikut. **Gunakan trailing slash** (mis. `/packages/`,
bukan `/packages`) — Astro static build canonically menyajikan versi dengan trailing
slash dan me-redirect (308) versi tanpa slash ke situ; mengecek versi tanpa slash membuat
`batch_url_inspection` melaporkan status "Redirect error" yang salah (bukan bug situs,
cuma false positive dari URL yang salah bentuk — dikonfirmasi via `curl -sIL` 2026-07-05).
**Batch maksimal 10 URL per panggilan** (limit API) — pecah daftar 18 URL di bawah jadi
2 batch:

```
https://allegra.indonesiaistimewastudio.id/
https://allegra.indonesiaistimewastudio.id/journal/wedding-pianist-bali/
https://allegra.indonesiaistimewastudio.id/journal/live-music-bali-wedding-guide/
https://allegra.indonesiaistimewastudio.id/journal/string-quartet-bali-wedding/
https://allegra.indonesiaistimewastudio.id/journal/cliffside-wedding-uluwatu/
https://allegra.indonesiaistimewastudio.id/journal/live-music-vendor-questions/
https://allegra.indonesiaistimewastudio.id/journal/vendor-partnership-logistics-bali/
https://allegra.indonesiaistimewastudio.id/journal/wedding-ceremony-piano-music/
https://allegra.indonesiaistimewastudio.id/packages/
https://allegra.indonesiaistimewastudio.id/about/
--- batch 2 ---
https://allegra.indonesiaistimewastudio.id/id/journal/wedding-pianist-bali/
https://allegra.indonesiaistimewastudio.id/id/journal/live-music-bali-wedding-guide/
https://allegra.indonesiaistimewastudio.id/id/journal/string-quartet-bali-wedding/
https://allegra.indonesiaistimewastudio.id/id/journal/cliffside-wedding-uluwatu/
https://allegra.indonesiaistimewastudio.id/id/journal/live-music-vendor-questions/
https://allegra.indonesiaistimewastudio.id/id/journal/vendor-partnership-logistics-bali/
https://allegra.indonesiaistimewastudio.id/id/journal/wedding-ceremony-piano-music/
https://allegra.indonesiaistimewastudio.id/faq/
```

Tambahkan URL artikel baru yang mungkin sudah ditambahkan sejak run terakhir
(baca `src/content/articles/` untuk daftar terbaru).

Hitung: berapa URL yang Indexed vs Not Indexed vs Crawled-not-indexed.

**A3. Traffic (7 hari terakhir):**

- **Jika `mcp__google-analytics__run_report` tersedia** (run lokal): gunakan dengan
  property `542419294` — Dimensions: `pagePath`, `sessionDefaultChannelGroup`;
  Metrics: `sessions`, `bounceRate`, `averageSessionDuration`, `engagedSessions`;
  dateRange: 7 hari terakhir. Ekstrak: total sessions, top 5 halaman by sessions,
  traffic sources breakdown.
- **Jika tidak tersedia** (cloud routine run): gunakan `semrush overview_research` atau
  `mcp__claude_ai_Ahrefs__site-explorer-metrics` untuk estimasi traffic & top pages.
  Tandai sebagai "estimasi (Semrush/Ahrefs, bukan data GA4 langsung)".

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

- GSC/GA4 tidak terhubung di cloud routine run adalah kondisi normal/permanen (lihat A1–A3
  di atas) — langsung pakai jalur substitusi Semrush/Ahrefs, jangan retry GSC/GA4 atau
  anggap ini error yang perlu dilaporkan.
- Jika Semrush/Ahrefs MCP gagal (bukan sekadar tidak tersedia, tapi error saat dipanggil):
  log "traffic data unavailable this run", tandai section terkait sebagai "N/A (tool error)",
  lanjutkan ke bagian berikutnya — jangan hentikan seluruh audit.
- Jika build gagal: TETAP lanjutkan laporan, tandai sebagai ❌ Error di semua output
  dan kirim Slack alert tambahan:
  ```
  🚨 *Build Error!* — Allegra Chamber Bali
  `npm run lint && npm run build` gagal. Perlu ditindaklanjuti segera.
  Error: <pesan error>
  ```
- Jika Slack MCP gagal: simpan laporan ke docs, log error, lanjutkan
- Prinsip umum: laporan yang PARSIAL (dengan section ditandai N/A) harus tetap sampai ke
  Slack. Jangan biarkan satu section gagal membuat seluruh run diam-diam tidak mengirim apa pun.

## Catatan

- Agen ini bersifat READ-HEAVY + REPORT — tidak mengubah kode situs
- Satu-satunya file yang diubah: `docs/PROGRESS.md` dan `docs/AUDIT-LOG.md`
- Owner yang memutuskan tindak lanjut dari rekomendasi, tidak dilakukan agen ini
- Jalan Minggu 08:00 WIB — 1 jam sebelum Article Proposer (19:00 WIB) agar info
  content gap bisa dipakai untuk topik minggu ini
