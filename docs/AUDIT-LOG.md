# Allegra Chamber Bali — Weekly Audit Log

Log teknis mingguan dari agen `weekly-health-audit`.
Setiap entry diappend otomatis setiap Minggu pagi 08:00 WIB.

Untuk ringkasan eksekutif dan next steps, lihat `docs/PROGRESS.md`.

---

<!-- Audit entries akan diappend di bawah ini oleh agen weekly-health-audit -->

---

## Audit: 2026-07-05

**Catatan insiden (baca sebelum data di bawah):** Ini seharusnya run otomatis pertama
`weekly-health-audit` (Minggu 08:00 WIB), tapi gagal silent — tidak ada entry di sini,
tidak ada pesan Slack. Root cause: `SKILL.md` hardcode pemanggilan tool
`mcp__google-search-console__*` / `mcp__google-analytics__*` / `mcp__dataforseo__*`
sebagai satu-satunya jalur, padahal ketiganya TIDAK terhubung di environment cloud
routine (hanya Slack, Semrush, Ahrefs, Firecrawl yang terhubung di sana). Fix
(percabangan tool-availability) sudah dibuat & di-push ke `main` jam 15:02 WIB hari ini
(`9ebd8d9`), sebelum jadwal `allegra-article-proposer` (19:00 WIB) — repo lokal sempat
ketinggalan commit ini dan sudah disinkronkan. Audit di bawah dijalankan manual (sesi
lokal, semua tool GSC/GA4 tersedia) untuk mengisi laporan minggu ini sekaligus
memverifikasi datanya benar.

### GSC Performance

- Clicks (7d): 5
- Impressions (7d): 605
- Avg CTR: 0.83%
- Avg Position: 11.2
- Tren harian: 06/28 (3 clicks, pos 9.8) turun ke 0 clicks beberapa hari, naik lagi 1 click
  di 07/04 — volume masih sangat kecil, wajar untuk situs baru berusia ~2 minggu

### Indexing Status

- Indexed: 15/18
- Not indexed:
  - `/journal/live-music-bali-wedding-guide/` — Discovered, currently not indexed (belum
    pernah di-crawl)
  - `/id/journal/live-music-bali-wedding-guide/` — Excluded by noindex tag (crawl terakhir
    2026-06-20, **sebelum** fix noindex 2026-06-23 — cache Google basi, bukan noindex asli
    saat ini)
  - `/id/journal/live-music-vendor-questions/` — Excluded by noindex tag (crawl terakhir
    2026-06-22, sama seperti di atas — cache basi)
- Catatan teknis: checklist URL lama di `SKILL.md` tidak pakai trailing slash, sehingga 6
  URL sempat terbaca "Redirect error" (false positive — dikonfirmasi via `curl -sIL`
  bahwa redirect-nya bersih, single-hop 308 ke versi trailing-slash). Checklist sudah
  diperbaiki di commit `dbe2c98`, tidak perlu ditindaklanjuti sebagai bug.

### GA4 Traffic

- Sessions (7d): 13 (7 engaged, bounce rate ~46%)
- Top channel: Organic Search (mendominasi hampir semua pageview; Direct & Unassigned
  minor)
- Top pages (berdasarkan touch count per page, bukan sesi unik): `/` (home), `/id/`,
  `/id/journal/string-quartet-bali-wedding/`, `/journal/`, lalu beberapa halaman journal
  EN/ID di angka 1-2

### Technical

- Build: ✅ Clean (`prettier --check` + `astro check`: 0 error, 0 warning; `astro build`:
  41 halaman). Warning "Duplicate id" saat build adalah stale content-layer cache dikenal
  (CLAUDE.md rule #12), bukan duplikat nyata.
- SEO Audit: robots.txt (200) & sitemap-index.xml (200) OK. Redirect trailing-slash bersih
  (308 single-hop, dikonfirmasi manual). Lighthouse/Core Web Vitals tidak dijalankan siklus
  ini (butuh browser tooling, di luar scope audit cepat ini).
- audit-website: not run (squirrelscan not available)

### Content

- Artikel per pillar: planning(2), piano-repertoire(2), bali-venues(1), for-planners(2)
- Pillar paling kosong: `bali-venues` (target minimum 3)
- Kandidat topik minggu depan: beachfront wedding venue (live music guide), garden wedding
  venue (live music guide), ballroom/indoor reception (live music guide) — angle tipe
  venue, bukan nama area/kota (lihat `docs/SEO-STRATEGY.md` §3.4: tidak ada search demand
  untuk kombinasi "[area] wedding venue/musician" per kota di Bali)

### Action Items (untuk owner)

- [ ] Request Indexing ulang di GSC untuk 2 URL ID yang masih ke-cache noindex
- [ ] Tulis/approve 2-3 artikel baru untuk pillar `bali-venues`
- [ ] Konfirmasi `allegra-article-proposer` (19:00 WIB malam ini) berjalan sukses pasca-fix
