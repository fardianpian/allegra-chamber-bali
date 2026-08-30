# Skill: Weekly Article Publisher

Kamu adalah agen yang berjalan otomatis setiap Senin pagi pukul 09:00 WIB.
Tugasmu: cek apakah owner sudah menyetujui proposal artikel di Slack `#allegra-updates`.
Jika disetujui → tulis artikel lengkap (EN + ID) dan push ke main.
Jika tidak ada approval → tandai proposal sebagai deferred dan notifikasi owner.

## Konteks Proyek

- Proyek: Allegra Chamber Bali — live chamber music & piano ensemble for weddings in Bali
- Website: `https://allegra.indonesiaistimewastudio.id`
- Repository: `fardianpian/allegra-chamber-bali` (push ke `main` → auto deploy Cloudflare Pages)
- Artikel EN: `src/content/articles/<slug>.md`
- Artikel ID: `src/content/articles/id/<slug>.md`

## Langkah Eksekusi

### Step 1: Cari File Proposal Aktif

Cari file `docs/article-proposals/pending-*.md` (file dengan status `pending`).
Jika tidak ada file pending → log "Tidak ada proposal aktif minggu ini" dan stop.
Ambil nama file terbaru (by date) jika ada lebih dari satu.

### Step 2: Cek Approval di Slack

Gunakan `mcp__claude_ai_Slack__slack_search_public_and_private` atau
`mcp__claude_ai_Slack__slack_read_channel` untuk membaca pesan terbaru di
channel `#allegra-updates`.

Cari reply setelah timestamp proposal dikirim (Minggu malam) yang mengandung:

- "setuju", "oke", "ok", "approved", "lanjut", "yes", "go", "go ahead"

### Step 3a: JIKA ADA APPROVAL

Baca file proposal `docs/article-proposals/pending-YYYY-MM-DD.md` untuk mendapatkan:

- `slug`, `title`, `heading`, `targetKeyword`, `pillar`, outline, FAQ kandidat

**Baca konteks wajib sebelum menulis:**

1. `.claude/brand-voice-guidelines.md` — tone, vocabulary, approved copy blocks
2. `.claude/article-seo-geo-aeo-guidelines.md` — struktur artikel, AEO rules
3. `CLAUDE.md` §"Journal / Article Content" — schema rules, dual-title requirement

**Tulis artikel EN:**

- Ikuti struktur: hook (40–60 kata, Problem→Solution→CTA), lalu H2 sebagai pertanyaan nyata
- Setiap H2 buka dengan 1–2 kalimat direct answer sebelum elaborasi
- Internal links: outbound ke `/packages`, `/repertoire`, `/for-planners`
- FAQ block: gunakan kandidat dari proposal, perluas jika perlu
- WhatsApp CTA: satu saja, dari template di brand-voice-guidelines
- Frontmatter wajib: `title`, `heading`, `description` (≤155 char), `excerpt` (1 kalimat),
  `pillar`, `targetKeyword`, `pubDate` (hari ini), `faq` (array)
- Simpan ke `src/content/articles/<slug>.md`

**Tulis terjemahan ID:**

- Terjemahan genuine, bukan transliteration — sesuaikan tone untuk pembaca Indonesia
- Frontmatter identik kecuali `title`, `heading`, `description`, `excerpt`, `faq` (semua dalam Bahasa Indonesia)
- `slug` frontmatter tidak perlu diubah (Astro ambil dari path)
- Simpan ke `src/content/articles/id/<slug>.md`

**Validasi build:**

```bash
cd /Users/fardian.fp/Claude/Project/allegra-chamber-bali
npm run lint && npm run build
```

Jika ada error → kirim Slack alert dengan pesan error, stop (jangan push).

**Git commit dan push:**

```bash
git add src/content/articles/<slug>.md src/content/articles/id/<slug>.md
git commit -m "feat(journal): add <slug> article (EN + ID)"
git push origin main
```

**Rename proposal file:**
Ganti nama `docs/article-proposals/pending-YYYY-MM-DD.md`
menjadi `docs/article-proposals/published-YYYY-MM-DD.md`.
Update frontmatter: `status: published`, tambah `publishedAt: YYYY-MM-DD`.

**Commit docs update:**

```bash
git add docs/article-proposals/published-YYYY-MM-DD.md
git commit -m "docs: mark article proposal as published YYYY-MM-DD"
git push origin main
```

**Kirim Slack konfirmasi:**

```
✅ *Artikel Baru Live!* — Allegra Chamber Bali

📝 *<heading>*
🔗 EN: `https://allegra.indonesiaistimewastudio.id/journal/<slug>`
🔗 ID: `https://allegra.indonesiaistimewastudio.id/id/journal/<slug>`
🔑 Target keyword: `<keyword>`

Artikel sudah di-push ke main — Cloudflare Pages sedang deploy.
Sitemap akan diperbarui otomatis. Manual Request Indexing di GSC direkomendasikan.
```

### Step 3b: JIKA TIDAK ADA APPROVAL (atau waktu sudah lewat)

Rename `docs/article-proposals/pending-YYYY-MM-DD.md`
menjadi `docs/article-proposals/deferred-YYYY-MM-DD.md`.
Update frontmatter: `status: deferred`.

```bash
git add docs/article-proposals/deferred-YYYY-MM-DD.md
git commit -m "docs: defer article proposal YYYY-MM-DD (no approval received)"
git push origin main
```

Kirim Slack notifikasi:

```
⏸️ *Artikel Minggu Ini Ditunda* — Allegra Chamber Bali

Tidak ada reply approval dari Minggu malam s/d Senin 09:00 WIB.

Proposal tersimpan di: `docs/article-proposals/deferred-<YYYY-MM-DD>.md`
Bisa dilanjutkan kapan saja dengan sesi Claude Code manual.
Minggu depan agen akan propose topik baru.
```

## Error Handling

- Jika Slack MCP tidak bisa dibaca: asumsikan "tidak ada approval", lanjutkan ke Step 3b
- Jika build gagal: kirim Slack alert dengan error log, JANGAN push, stop
- Jika push gagal (auth error): kirim Slack alert, stop

## Catatan Penting

- Jangan pernah push jika build gagal
- `title` field harus mengandung "— Allegra Chamber Bali" di akhir
- `heading` field TIDAK boleh mengandung brand name (lihat CLAUDE.md rule tentang dual-title)
- Jangan tulis harga, testimonial palsu, atau venue name yang tidak terbukti nyata
- Semua `faq` harus masuk ke frontmatter sebagai array `{question, answer}` untuk JSON-LD
