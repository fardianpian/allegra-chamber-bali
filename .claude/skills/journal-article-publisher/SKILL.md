---
name: journal-article-publisher
description: Routine terjadwal yang menulis dan mempublish satu artikel /journal per run dari backlog tetap (docs/JOURNAL-BACKLOG.md), termasuk cover image, self-review konten, lalu membuka Pull Request dan meng-auto-merge-nya sendiri kalau lolos gerbang review — bukan push langsung ke main.
---

# Journal Article Publisher (cloud routine)

Berjalan otomatis 3x/minggu (Senin/Rabu/Jumat, lihat jadwal cron di registrasi RemoteTrigger).
Setiap run mengeksekusi **satu** artikel dari `docs/JOURNAL-BACKLOG.md` secara lengkap — draft EN,
draft ID, cover image, validasi build, self-review konten, buka Pull Request, lalu **auto-merge PR
itu sendiri** kalau lolos gerbang review (Step 9). **Routine ini TIDAK PERNAH push langsung ke
`main`** — selalu lewat branch + PR, tapi mulai 2026-09-04 (atas keputusan owner) merge PR tidak
lagi menunggu review manual owner: routine sendiri yang memutuskan merge atau tidak, berdasarkan
checklist review konten di Step 6 dan status CI di Step 9. Kalau checklist review ATAU CI gagal, PR
dibiarkan terbuka + Slack alert — bukan auto-merge paksa. Cloudflare Pages auto-deploy jalan
otomatis begitu PR di-merge.

Topik, keyword, outline, dan rencana internal link SUDAH ditentukan di
`docs/JOURNAL-BACKLOG.md` — routine ini tidak melakukan riset keyword atau pemilihan topik sendiri.

## Step 0 — Prasyarat (gagal cepat, sebelum menulis apa pun)

1. Konfirmasi working tree bersih:
   ```bash
   git status --short
   ```
2. **Install dependencies kalau sandbox fresh** (ditemukan lewat run tes 2026-08-30: sandbox baru
   tidak punya `node_modules`, bikin Step 4 cover image dan Step 6 lint/build gagal dengan error
   "Cannot find package" — bukan soal kredensial, cuma belum ter-install):
   ```bash
   test -d node_modules/.bin && ls node_modules/.bin/prettier >/dev/null 2>&1 && echo "sudah ada" || npm install
   ```
   Lakukan ini SEBELUM Step 4, bukan reaktif setelah Step 4/6 gagal — supaya cover image generation
   dapat kesempatan jalan dengan benar sejak awal, bukan cuma lint/build yang tertolong. Kalau
   `npm install` mengubah `package-lock.json`, itu wajar (normalisasi lockfile) — sertakan file itu
   di commit Step 7 bersama file lain, jangan commit terpisah.
3. **Hard gate — jangan lewati ini.** Konfirmasi kedua file panduan ada di disk:
   ```bash
   test -f .claude/article-seo-geo-aeo-guidelines.md && test -f .claude/brand-voice-guidelines.md
   ```
   Kalau salah satu tidak ada: **STOP**, kirim Slack alert ke `#allegra-updates` yang menyatakan
   dengan jelas bahwa file panduan tidak ada di checkout ini dan routine menolak menulis draf tanpa
   itu. Jangan fallback diam-diam ke `docs/BRAND-VOICE.md` — itu file export Notion lama yang
   sebagian sudah stale, bukan sumber kebenaran (lihat CLAUDE.md § Brand Voice).
4. Baca `docs/JOURNAL-BACKLOG.md`. Cari baris pertama dengan `status: todo` di tabel Status
   (urutan dari atas = urutan prioritas).
5. Kalau tidak ada baris `todo`: kirim Slack "Backlog `/journal` sudah habis — tidak ada artikel
   yang perlu dipublish run ini. Tambahkan item baru ke docs/JOURNAL-BACKLOG.md kalau mau lanjut."
   lalu **stop dengan status sukses** (ini bukan kegagalan).
6. Cek defensif: pastikan `src/content/articles/<slug>.md` BELUM ada untuk slug item itu.
   ```bash
   test -f src/content/articles/<slug>.md && echo "SUDAH ADA — jangan lanjut" || echo "aman, lanjut"
   ```
   Kalau sudah ada (berarti ada inkonsistensi antara backlog dan konten nyata): ubah status baris
   itu ke `blocked` di `docs/JOURNAL-BACKLOG.md`, commit+push perubahan status itu SENDIRI (tanpa
   isi artikel apa pun) ke branch baru, alert Slack untuk review manual owner, lalu stop. Jangan
   menebak mana yang benar.

## Step 1 — Baca konteks

Baca penuh, dalam urutan ini:

1. Blok "Item Details" untuk item yang dipilih di `docs/JOURNAL-BACKLOG.md` (outline H2, kandidat
   FAQ, target link, konsep gambar — semua sudah disiapkan, tinggal dieksekusi).
2. `.claude/article-seo-geo-aeo-guidelines.md` — struktur artikel, checklist SEO/GEO/AEO, hard
   rules.
3. `.claude/brand-voice-guidelines.md` — tone, kosakata (tabel Avoid → Prefer), Approved Copy.
4. `CLAUDE.md` sudah otomatis termuat di awal sesi — jangan baca ulang, tapi tetap ikuti aturan di
   dalamnya (terutama Work Rule #9 soal tidak boleh fabrikasi harga/statistik/testimoni/nama venue).

## Step 2 — Draft artikel EN (`src/content/articles/<slug>.md`)

Ikuti struktur di `.claude/article-seo-geo-aeo-guidelines.md` § Article Structure persis:

- **Frontmatter wajib** (schema `src/content/config.ts`): `title` (tag `<title>`, PAKAI suffix
  " — Allegra Chamber Bali"), `heading` (H1 on-page, JANGAN pakai suffix brand — field terpisah
  dari `title`, jangan digabung), `description` (**150-160 karakter, hitung persis** — jangan
  eyeball, gunakan `python3 -c "print(len('...'))"` atau setara sebelum commit), `excerpt`,
  `pillar` (harus salah satu dari 4 nilai enum: `planning` | `piano-repertoire` | `bali-venues` |
  `for-planners` — ambil dari backlog item, jangan menebak/mengubah), `targetKeyword` (dari
  backlog item), `pubDate` (tanggal hari ini, `date +%Y-%m-%d`), `ogImage` (diisi di Step 4 kalau
  cover image berhasil dibuat — kalau gagal, field ini dibiarkan kosong/tidak diisi, BUKAN
  diisi string kosong), `faq` (array `{question, answer}`, 3-5 pasang dari kandidat FAQ backlog
  item — tulis ulang jadi jawaban 1-3 kalimat yang berdiri sendiri, verifikasi dulu ke halaman lain
  di situs sebelum menjawab apa pun yang berupa fakta operasional (proses booking, lead time, dsb)
  — jangan mengarang jawaban untuk placeholder `[confirm ...]` di backlog, cari faktanya dulu di
  `src/content/packages/*.md`, `src/i18n/ui.ts`, atau artikel lain; kalau benar-benar tidak ada
  faktanya di repo, tulis jawaban yang mengarahkan ke WhatsApp/contact, jangan mengarang angka).
- **Hook** (paragraf pembuka, 40-60 kata, tanpa H2 di atasnya): formula Masalah → Penyelesaian →
  CTA. Sebutkan pertanyaan/kekhawatiran nyata pembaca di kalimat pertama, lalu pivot ke bagaimana
  artikel ini (dan Allegra) menjawabnya, tutup dengan kalimat yang mengarah ke pembayaran/keputusan
  yang bisa dibuat pembaca setelah membaca. Jangan buka dengan definisi kosong atau frasa
  "in this article, we'll explore..." (dilarang juga oleh brand voice).
- **H2** persis mengikuti daftar outline di backlog item (boleh menyesuaikan sedikit kalimatnya
  supaya lebih natural, tapi jangan ubah urutan/cakupan topik) — tiap H2 dijawab langsung 1-2
  kalimat di awal sebelum diperluas.
- **List/table** kalau membandingkan opsi (formasi, tipe venue, dst).
- **Internal link outbound**: minimal 1, ke target yang sudah ditentukan backlog item
  (`outboundLinkTarget`) — path absolut dari root, trailing slash, sintaks Markdown biasa:
  `[teks](/packages/)`.
- Jangan pernah fabrikasi harga/statistik/testimoni/nama venue. Jangan pernah menggambarkan
  formasi yang sudah termasuk piano (Duo/Trio/Quartet) sebagai "just a string quartet" atau piano
  sebagai add-on berbayar — piano adalah flagship instrument, sudah termasuk standar.
- Ikuti tabel Avoid → Prefer di `brand-voice-guidelines.md` — tanpa tanda seru, tanpa "best in
  Bali"/"world-class", tanpa pembuka klise AI.

## Step 3 — Draft terjemahan ID (`src/content/articles/id/<slug>.md`)

Terjemahan genuine (bukan transliterasi kaku), schema sama persis. `pillar`, `pubDate`,
`targetKeyword`, `ogImage` disalin identik dari versi EN (konvensi existing — cek artikel lain di
`src/content/articles/id/` kalau ragu). Link internal di body mengarah ke `/id/journal/...`,
`/id/packages/`, dst — bukan path EN.

## Step 4 — Cover image (best-effort, TIDAK menghalangi publish)

```bash
node scripts/generate-cover-image.mjs <slug> "<cover image prompt dari backlog item>"
```

**PENTING — jangan pakai `npm run generate:cover --`.** Wrapper npm itu hardcode
`--env-file=.env`, dan Node akan langsung exit code 9 kalau file `.env` tidak ada di sandbox —
terlepas dari apakah `CLOUDFLARE_ACCOUNT_ID`/`CLOUDFLARE_API_TOKEN` sudah di-set sebagai environment
variable asli atau belum. Panggil script-nya langsung seperti di atas; dia baca `process.env`
secara native, tidak butuh dotenv.

- Kalau sukses: script mencetak baris `Add to article frontmatter: ogImage: '/images/og-<slug>.jpg'`
  — salin nilai itu persis ke frontmatter EN dan ID.
- Kalau gagal (kredensial belum ter-provision di environment ini, atau error lain apa pun): jangan
  isi `ogImage`, catat 1 baris di kolom yang relevan (tambahkan catatan singkat di bawah baris
  item terkait di `docs/JOURNAL-BACKLOG.md`, misal "cover image pending — jalankan manual: node
  scripts/generate-cover-image.mjs <slug> \"<prompt>\""), lalu **lanjut ke Step 5**. `ogImage`
  opsional di schema — artikel tanpa cover image tetap valid dan tetap harus dipublish.

## Step 5 — Inbound link

Buka file yang ditunjuk `inboundLinkSource` di backlog item, tambahkan 1-2 kalimat natural yang
diakhiri link ke artikel baru — di file EN DAN padanan `/id/`-nya:

- Kalau target adalah artikel lain (`src/content/articles/*.md`): sintaks Markdown biasa,
  `[teks](/journal/<slug>/)`.
- Kalau target adalah file `src/content/packages/*.md`: ikuti konvensi file itu — biasanya HTML
  `<a>` inline dengan class Tailwind (`class="underline decoration-gold underline-offset-2
hover:text-gold"`), lihat `packages/solo.md` sebagai contoh.

## Step 6 — Gerbang validasi build & konten

Ini gerbang terakhir sebelum commit. Sejak 2026-09-04, tidak ada owner yang review PR sebelum
merge (lihat Step 9) — jadi checklist konten di bawah ini **menggantikan** review manual itu, harus
dikerjakan sungguh-sungguh dengan sudut pandang kritis terhadap draf sendiri, bukan cuma dilihat
sekilas.

**6a. Checklist review konten** (baca ulang draf EN + ID dengan kepala dingin, seolah-olah kamu
reviewer eksternal, bukan penulisnya):

- [ ] `title` mengandung suffix " — Allegra Chamber Bali"; `heading` TIDAK mengandung nama brand
      sama sekali; dua field ini beda isi, bukan duplikat.
- [ ] `description` **150-160 karakter persis** — hitung dengan
      `python3 -c "print(len('...'))"`, jangan eyeball, untuk EN dan ID.
- [ ] `pillar` sama persis dengan yang ditentukan di `docs/JOURNAL-BACKLOG.md` untuk item ini
      (salah satu dari 4 enum) — bukan hasil menebak ulang.
- [ ] `faq`: 3-5 pasang, tiap jawaban berdiri sendiri (bukan potongan kalimat), tidak ada fakta
      operasional yang dikarang (lead time, proses booking, dll — kalau ragu harus mengarah ke
      WhatsApp/contact, bukan angka pasti yang tidak ada sumbernya di repo).
- [ ] Tidak ada harga, statistik, testimoni, atau nama venue yang dikarang di mana pun di body.
- [ ] Formasi yang sudah termasuk piano (Duo/Trio/Quartet) tidak pernah digambarkan sebagai "just a
      string quartet" atau piano sebagai add-on berbayar.
- [ ] Semua link internal (EN maupun ID, termasuk yang ditambahkan ke `inboundLinkSource` di Step 5) menunjuk ke route yang benar-benar ada — cek dengan `ls` ke path `src/pages/...` atau
      slug artikel lain di `src/content/articles/`, jangan asumsi. Link versi ID harus ke path
      `/id/...`, bukan menyalin path EN mentah-mentah.
- [ ] Terjemahan ID genuine (bukan transliterasi kaku Google-Translate-style) dan secara faktual
      konsisten dengan versi EN.
- [ ] **Kalau topik menyinggung budaya/adat/agama lokal (mis. upacara Bali)**: framing harus
      berhati-hati — Allegra hanya membawakan repertoar musik kamar/piano gaya Barat, elemen
      tradisional/ritual SELALU diarahkan ke perencana pernikahan/spesialis lokal, jangan pernah
      berlagak tahu detail ritual atau mengklaim mewakili tradisi yang bukan milik Allegra untuk
      dibawakan.
- [ ] Ikuti tabel Avoid → Prefer di `brand-voice-guidelines.md` (tanpa tanda seru, tanpa "best in
      Bali"/"world-class", tanpa pembuka klise AI seperti "in this article, we'll explore...").

**Kalau ADA satu saja item yang gagal:** perbaiki draf-nya langsung di tempat (bukan lanjut dulu
lalu diperbaiki nanti) sebelum ke 6b. Kalau tidak yakin bisa memperbaiki sendiri dengan percaya
diri (misal kasus sensitivitas budaya yang ambigu): **STOP total** seperti gagal 6b di bawah — lebih
aman PR tidak pernah dibuka daripada dibuka lalu di-auto-merge dengan isi yang meragukan.

**6b. Validasi build:**

```bash
npm run lint && npm run build
```

**Salah satu dari 6a (setelah upaya perbaikan) atau 6b gagal → STOP total.** Jangan `git add` apa
pun. Kirim Slack alert ke `#allegra-updates` berisi: (a) item checklist 6a yang gagal ATAU output
error 6b persis (potong kalau terlalu panjang, tapi sertakan bagian yang relevan), dan (b) **draf
lengkap EN dan ID (frontmatter + body penuh) sebagai code block inline di pesan Slack yang sama**.
Ini bukan opsional — belum terkonfirmasi apakah filesystem sandbox ini persist antar run, jadi
pesan Slack ini adalah satu-satunya salinan yang pasti bisa dipulihkan kalau local commit sandbox
hilang. Karena belum ada yang di-`git add`, `docs/JOURNAL-BACKLOG.md` tetap `todo` untuk item ini —
run terjadwal berikutnya otomatis mengulang item yang sama.

## Step 7 — Commit atomik

```bash
git checkout -b journal/<slug>
```

Update baris status item ini di `docs/JOURNAL-BACKLOG.md` menjadi `done` dengan `publishedDate`
hari ini — DALAM edit yang sama dengan konten, belum di-commit terpisah.

```bash
git add src/content/articles/<slug>.md src/content/articles/id/<slug>.md docs/JOURNAL-BACKLOG.md <file-inbound-link-EN> <file-inbound-link-ID>
git commit -m "feat(journal): add <slug> article (EN + ID)"
```

## Step 8 — Push branch + buka Pull Request

```bash
git push -u origin journal/<slug>
```

Kalau gagal: retry sampai 3x dengan jeda ~10 detik antar percobaan. Catatan jujur: penyebab utama
kegagalan push yang pernah ditemukan di routine ini (lihat insiden 2026-07-05,
`docs/PROGRESS-ARCHIVE.md`) adalah **izin GitHub App yang kurang**, bukan masalah transient —
retry tidak memperbaiki itu, cuma jaring pengaman tambahan kalau memang ada elemen jaringan yang
flaky.

Setelah push sukses, buka Pull Request (pakai GitHub MCP connector — cari tool dengan
`ToolSearch({query: "select:mcp__github__create_pull_request"})` atau nama setara yang tersedia di
environment ini) ke `main`, isi body PR dengan: target keyword, pillar, status cover image
(berhasil/pending), ringkasan singkat isi artikel, dan catatan bahwa versi ID juga disertakan.

**Sukses (push + PR terbuka):** kirim Slack ke `#allegra-updates`:

> PR dibuka: <link PR>. Judul: "<title>". Pillar: <pillar>. Target keyword: <targetKeyword>.
> Cover image: <berhasil / pending, lihat catatan backlog>. Lolos checklist review konten (Step
> 6a) — menunggu status CI, akan auto-merge kalau hijau (lihat Step 9). Kalau tidak ada follow-up
> Slack dalam ~10 menit, cek PR manual — kemungkinan CI tidak kunjung selesai.

**Gagal setelah 3x retry:** kirim Slack alert berisi error persis + **draf lengkap EN+ID inline**
(pola sama seperti Step 6) + SHA commit lokal (`git log -1 --format=%h`) untuk referensi, plus
catatan eksplisit: "Push gagal — kemungkinan besar izin GitHub App belum benar (lihat
docs/PROGRESS-ARCHIVE.md soal insiden 2026-07-05). Konten lengkap ada di pesan ini sebagai
cadangan, bukan cuma di commit lokal sandbox." Jangan ubah status backlog ke `done` — biarkan
`todo`, sudah ter-set begitu karena belum sempat ter-commit.

## Step 9 — Auto-merge setelah CI hijau

Dikerjakan di sesi yang sama, langsung setelah PR terbuka (Step 8 sukses). Ini menggantikan review
manual owner — jangan skip atau anggap opsional.

1. **Poll status check PR** (Cloudflare Pages deploy-preview) setiap ~30 detik, maksimal 10x
   percobaan (~5 menit total). Pakai GitHub MCP connector — cari tool status/checks dengan
   `ToolSearch({query: "github pull request status checks"})` (nama tool bervariasi tergantung
   connector yang terpasang di environment ini), atau kalau `gh` CLI ternyata terautentikasi di
   sandbox ini, `gh pr checks <nomor-PR>` sebagai fallback.
2. **Kalau semua check jadi `success`/hijau sebelum timeout:**
   ```bash
   gh pr merge <nomor-PR> --squash --delete-branch
   ```
   atau tool merge dari GitHub MCP connector kalau `gh` tidak tersedia (cari dengan
   `ToolSearch({query: "select:mcp__github__merge_pull_request"})` atau nama setara). Setelah
   berhasil, kirim Slack follow-up ke thread/channel yang sama:
   > ✅ Auto-merged: <link PR>. Cloudflare Pages auto-deploy jalan otomatis — artikel akan live
   > dalam beberapa menit, tidak ada langkah manual lagi.
3. **Kalau ada check yang `failure`/merah:** JANGAN merge. Biarkan PR tetap terbuka. Kirim Slack
   alert: "PR <link> lolos checklist review konten tapi CI gagal (<nama check yang gagal>) —
   dibiarkan terbuka untuk investigasi manual, tidak di-auto-merge." Ini kasus berbeda dari
   kegagalan Step 6b (build lokal) — build lokal sudah lolos, jadi ini kemungkinan besar masalah
   spesifik environment Cloudflare, bukan bug di kode/konten.
4. **Kalau masih `pending` setelah 10x percobaan (timeout):** jangan merge, jangan terus polling
   tanpa batas. Kirim Slack alert: "PR <link> lolos checklist review konten, CI belum selesai
   setelah ~5 menit — cek manual, mungkin perlu merge manual kalau CI ternyata sudah hijau." Stop
   routine dengan status sukses (artikel & PR sudah ada, cuma merge yang tertunda — bukan
   kegagalan routine).

## Aturan keras (wajib, tidak bisa dinegosiasi)

1. Tidak pernah push ke `main` langsung — selalu lewat branch `journal/<slug>` + PR, dan PR hanya
   di-merge lewat Step 9 (setelah checklist Step 6a lolos DAN CI hijau) — tidak pernah merge
   sebelum kedua syarat itu terpenuhi.
2. Tidak pernah fabrikasi harga, statistik, testimoni, atau nama venue.
3. `heading` tidak pernah mengandung nama brand; `title` selalu mengandung suffix brand.
4. `faq` selalu berupa array `{question, answer}` yang valid untuk `FAQPage` JSON-LD.
5. Setiap artikel EN WAJIB disertai padanan ID di commit yang sama — tidak ada "EN dulu, ID
   menyusul nanti."
6. Kalau ragu soal fakta operasional apa pun (lead time, proses booking, kebijakan venue), cari di
   repo dulu (`src/i18n/ui.ts`, `src/content/packages/*.md`, artikel lain) — kalau tidak ketemu,
   arahkan pembaca ke WhatsApp/contact, jangan mengarang jawaban.
7. Kalau ragu soal hasil checklist 6a (terutama sensitivitas budaya/agama) dan tidak yakin bisa
   memperbaiki sendiri dengan percaya diri: jangan paksa lanjut — STOP di Step 6, bukan
   lanjut-lalu-berharap-CI-menangkapnya. CI cuma cek build, bukan cek konten.
