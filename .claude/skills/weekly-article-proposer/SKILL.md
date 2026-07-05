# Skill: Weekly Article Proposer

Kamu adalah agen yang berjalan otomatis setiap Minggu malam pukul 19:00 WIB untuk
memilih topik artikel terbaik minggu ini dan mengirimkan proposal ke Slack channel
`#allegra-updates` agar owner dapat menyetujui atau menolak sebelum Senin pagi.

## Konteks Proyek

- Proyek: Allegra Chamber Bali — live chamber music & piano ensemble for weddings in Bali
- Website: `https://allegra.indonesiaistimewastudio.id`
- Stack: Astro 5 SSG, Cloudflare Pages
- Repository: `fardianpian/allegra-chamber-bali`
- Artikel ada di: `src/content/articles/` (EN) dan `src/content/articles/id/` (ID)

## File Konteks yang Harus Dibaca di Awal

1. `CLAUDE.md` — aturan teknis dan brand utama
2. `.agents/product-marketing.md` — marketing context
3. `.claude/article-seo-geo-aeo-guidelines.md` — panduan penulisan + pillar
4. `docs/SEO-STRATEGY.md` §3.0 — keyword opportunities

## Langkah Eksekusi

### Step 1: Inventaris Artikel yang Ada

Baca semua file di `src/content/articles/` (exclude subdirektori `id/`).
Ekstrak `targetKeyword` dan `pillar` dari frontmatter setiap file.
Buat daftar: pillar apa saja yang sudah punya artikel dan berapa.

### Step 2: Identifikasi Gap Pillar

Dari 4 pillar yang valid:

- `planning` — Wedding Music Planning
- `piano-repertoire` — Piano & Repertoire
- `bali-venues` — Bali Ceremony & Venue Guides
- `for-planners` — For Wedding Planners & Venues

Prioritaskan pillar dengan artikel paling sedikit. Urutan default:
`bali-venues` > `for-planners` > `planning` > `piano-repertoire` (artikel ke-2+)

### Step 3: Kandidat Topik

Baca `docs/SEO-STRATEGY.md` untuk keyword clusters yang belum ditulis.
Baca `.claude/article-seo-geo-aeo-guidelines.md` untuk contoh topik per pillar.
Generate 2–3 kandidat topik untuk pillar prioritas.

### Step 4: Keyword Data Nyata

Untuk setiap kandidat, ambil search volume (global + US), Keyword Difficulty (KD), dan
CPC estimasi. Tool yang dipakai tergantung environment — DataForSEO TIDAK terhubung di
cloud routine run (hanya Slack, Ahrefs, Semrush, Firecrawl yang terhubung), jadi ini
kondisi normal/permanen untuk run terjadwal, bukan error transient:

- **Jika DataForSEO tersedia** (run lokal): gunakan
  `mcp__dataforseo__dataforseo_labs_google_keyword_overview` atau
  `mcp__dataforseo__kw_data_google_ads_search_volume`.
- **Jika tidak tersedia** (cloud routine run): gunakan
  `mcp__claude_ai_Ahrefs__keywords-explorer-overview` atau Semrush `keyword_research`
  sebagai pengganti utama.

### Step 5: Pilih Kandidat Terbaik

Kriteria seleksi:

- KD rendah (< 30 ideal, < 50 masih oke)
- Volume realistis (tidak 0, tidak terlalu head term)
- Belum ada artikel dengan keyword serupa di `src/content/articles/`
- Relevan dengan Allegra Chamber Bali (wedding music, Bali venues, piano, planner)

### Step 6: Generate Proposal

Buat konten proposal:

- `title`: judul lengkap untuk `<title>` tag (include "— Allegra Chamber Bali")
- `heading`: H1 on-page (tanpa brand suffix)
- `targetKeyword`: keyword utama yang dipilih
- `pillar`: salah satu dari 4 enum yang valid
- `slug`: slug kebab-case untuk URL dan nama file
- Outline: 5–7 H2 berupa pertanyaan nyata yang dicari orang (ikuti format dari guidelines)
- FAQ: 3–5 pertanyaan bonus untuk FAQPage JSON-LD

### Step 7: Simpan File Proposal

Simpan ke `docs/article-proposals/pending-YYYY-MM-DD.md` dengan format:

```markdown
---
proposedAt: YYYY-MM-DD
status: pending
pillar: <pillar>
slug: <slug>
targetKeyword: <keyword>
keywordVolume: <number>
keywordDifficulty: <number>
---

# Proposal: <heading>

**title:** <title tag>
**heading:** <H1>
**targetKeyword:** <keyword>
**pillar:** <pillar>
**slug:** <slug>

## Outline

1. ## <H2 pertanyaan 1>
2. ## <H2 pertanyaan 2>
3. ## <H2 pertanyaan 3>
4. ## <H2 pertanyaan 4>
5. ## <H2 pertanyaan 5>
6. ## <H2 pertanyaan 6 (opsional)>

## FAQ Kandidat

1. Q: <pertanyaan FAQ 1>
   A: <jawaban singkat>
2. Q: <pertanyaan FAQ 2>
   A: <jawaban singkat>
3. Q: <pertanyaan FAQ 3>
   A: <jawaban singkat>

## Rationale

<1-2 kalimat kenapa topik ini dipilih minggu ini>
```

### Step 8: Kirim Pesan Slack

Gunakan `mcp__claude_ai_Slack__slack_send_message` ke channel `#allegra-updates`.

Format pesan (gunakan Slack markdown):

```
🎵 *Proposal Artikel Minggu Ini* — Allegra Chamber Bali

📌 *Judul:* <title>
🏷️ *H1:* <heading>
🔑 *Target Keyword:* `<keyword>` — Vol: <X>/bln, KD: <Y>
📂 *Pillar:* <pillar label>
🔗 *Slug:* `/journal/<slug>`

*Outline (H2):*
1. <H2 1>
2. <H2 2>
3. <H2 3>
4. <H2 4>
5. <H2 5>

*FAQ kandidat:*
• <FAQ 1>
• <FAQ 2>
• <FAQ 3>

Reply *"setuju"* untuk lanjut publish Senin pagi.
Reply dengan feedback jika ada revisi yang diinginkan.
Jika tidak ada reply sebelum Senin 08:00 WIB, artikel akan ditunda ke minggu depan.

_Proposal tersimpan: `docs/article-proposals/pending-<YYYY-MM-DD>.md`_
```

### Step 9: Selesai

Log ke stdout: "Proposal terkirim ke Slack #allegra-updates — [slug]"

## Error Handling

- Jika DataForSEO/Ahrefs gagal: lanjutkan dengan estimasi dari SEO-STRATEGY.md, tandai
  di proposal sebagai "volume: estimated (API unavailable)"
- Jika Slack MCP gagal: simpan proposal ke file, log error ke stdout, jangan crash
- Jika semua artikel sudah menutup semua pillar (sangat jarang): pilih topik
  "long-tail cluster" tambahan dari SEO-STRATEGY.md §4+

## Output Akhir

- File: `docs/article-proposals/pending-YYYY-MM-DD.md`
- Pesan Slack terkirim ke `#allegra-updates`
