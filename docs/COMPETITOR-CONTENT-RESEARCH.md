# Riset Kompetitor Konten — Validasi Pembaca Artikel Journal

> Dibuat: 2026-07-05. Sumber data: DataForSEO Labs (Google Keyword Data + Live SERP),
> lokasi **United States** (proxy pasar internasional utama) dan **Australia** (pasar
> destination-wedding Bali terbesar). Semua angka volume = pencarian/bulan, bukan estimasi.
>
> **Tujuan:** memastikan setiap artikel `/journal` yang ditulis benar-benar punya pembaca —
> divalidasi lewat data keyword nyata, bukan asumsi. Dokumen ini juga mengoreksi beberapa
> estimasi volume di `CONTENT-STRATEGY-2026-07.md` yang ternyata meleset.
>
> Pelengkap dari `COMPETITOR-PROFILES.md` (profil bisnis/positioning kompetitor) — dokumen
> ini fokus khusus ke **konten & keyword**, bukan produk.

---

## 1. Temuan Utama (TL;DR)

1. **Tidak ada kompetitor Bali yang menang lewat artikel.** Silaen Music hanya ranking lewat
   homepage pada keyword kecil (etv < 1 visit/bln). Bali Entertainment Agency dapat traffic
   dari _service pages_ ("Hire Musicians in Bali" — keyword `bali musician` 480/bln), bukan
   blog. Satu-satunya artikel yang ranking di SERP "bali wedding music" adalah milik
   **7.agency** (agensi wedding planner, bukan vendor musik). Lapangan konten masih kosong.
2. **Keyword Bali-spesifik hampir tidak punya volume** (≈10/bln atau tidak ada di database
   Google sama sekali) — di US **dan** Australia. Nilai artikel ber-angle Bali bukan dari
   volume keyword-nya sendiri, tapi dari long-tail + AEO + konversi tinggi (pencarinya
   sedang merencanakan wedding di Bali betulan).
3. **Pembaca terbesar ada di keyword repertoire generik** yang belum kita garap:
   `wedding processional songs` **12.100/bln**, `wedding recessional songs` **9.900/bln**,
   `wedding entrance songs` **8.100/bln**, `wedding prelude music` **2.900/bln** (kompetisi
   0,01!). Ini satu cluster "musik per momen upacara" — cocok persis dengan pilar
   `piano-repertoire`.
4. **Dua prioritas di CONTENT-STRATEGY-2026-07.md ternyata salah frasa/salah volume** —
   lihat § 4. Topiknya tetap valid, tapi keyword targetnya harus diganti.
5. **AI Overview sudah muncul** di SERP "bali wedding music" — memperkuat keputusan
   memakai FAQ/JSON-LD (AEO) sebagai mekanisme utama, karena porsi klik organik menyusut.

---

## 2. Peta Kompetitor Konten

### Siapa yang benar-benar ranking — SERP "bali wedding music" (Australia, live 2026-07-05)

| Posisi     | Domain                             | Jenis halaman             | Catatan                                                         |
| ---------- | ---------------------------------- | ------------------------- | --------------------------------------------------------------- |
| 1          | baliweddingsolutions.com           | Halaman layanan `/music/` | Agensi generalis; gamelan s/d string quartet dalam satu daftar  |
| 2          | baliweddingmusic.com               | Homepage                  | Exact-match domain; band/DJ/orkestra, situs katalog             |
| 3          | bridestory.com                     | Halaman direktori vendor  | Marketplace — bukan konten editorial                            |
| —          | **AI Overview**                    | —                         | Muncul di atas posisi 4                                         |
| 4          | coastalbeatsdjs.com.au             | Landing page layanan      | DJ Australia yang melayani Bali — menyasar pasar AU             |
| 6          | **7.agency**                       | **Artikel blog**          | Satu-satunya artikel di halaman 1 — planner, bukan vendor musik |
| 7          | tirtha.com                         | Halaman venue             | Venue chapel — entertainment sebagai sub-halaman                |
| Local pack | Silaen Music, Music For Life, LOVA | Google Business Profile   | Kompetitor lokal menang lewat GBP + review, bukan konten        |

**Implikasi:** halaman 1 diisi halaman layanan, direktori, dan GBP. Artikel editorial yang
menjawab pertanyaan couple (format Allegra `/journal`) praktis tidak ada dari vendor musik
mana pun. Gap-nya nyata dan masih terbuka.

### Dari mana traffic konten kompetitor berasal

| Kompetitor                  | Sumber ranking organik                                                                    | Blog yang ranking? |
| --------------------------- | ----------------------------------------------------------------------------------------- | ------------------ |
| silaenmusic.com             | Homepage saja — `bali singers` (70/bln, pos. 12), `bali band` (40/bln, pos. 11)           | ❌ Tidak ada       |
| balientertainmentagency.com | Service pages — `bali musician` (480/bln, pos. 12), `bali singers`, `bali karaoke`        | ❌ Tidak ada       |
| 7.agency                    | Blog editorial ("The best Wedding Music in Bali") — pola yang harus Allegra tiru+kalahkan | ✅ Satu-satunya    |

Keyword `bali musician` (480/bln US) adalah keyword ber-volume terbesar yang berhasil
di-ranking kompetitor lokal — dan itu lewat halaman layanan, posisi 12. Artinya: dengan
konten yang lebih baik, posisi itu bisa direbut.

---

## 3. Validasi Keyword — Mana yang Punya Pembaca

Volume = US, per bulan. KD = keyword difficulty (0–100) bila tersedia.

### Tier A — Pembaca besar, terbukti (≥ 1.000/bln)

| Keyword                    | Volume     | KD  | Kompetisi | Pilar              | Status                          |
| -------------------------- | ---------- | --- | --------- | ------------------ | ------------------------------- |
| wedding processional songs | **12.100** | —   | 0,02      | `piano-repertoire` | ❌ Belum ada artikel            |
| wedding recessional songs  | **9.900**  | —   | 0,01      | `piano-repertoire` | ❌ Belum ada artikel            |
| wedding entrance songs     | **8.100**  | —   | 0,02      | `piano-repertoire` | ❌ Belum ada artikel            |
| wedding prelude music      | **2.900**  | —   | **0,01**  | `piano-repertoire` | ❌ Belum ada artikel            |
| wedding ceremony music     | 2.400      | —   | 0,05      | `planning`         | ⚠️ Tersentuh live-music guide   |
| classical wedding songs    | 2.400      | —   | 0,08      | `piano-repertoire` | ❌ Belum ada artikel            |
| wedding string quartet     | 2.400      | 5   | 0,22      | `planning`         | ✅ string-quartet-bali-wedding  |
| bride entrance songs       | 1.600      | —   | 0,02      | `piano-repertoire` | ❌ Belum ada artikel            |
| instrumental wedding songs | 1.300      | —   | 0,05      | `piano-repertoire` | ❌ Belum ada artikel            |
| piano wedding songs        | 1.000      | —   | 0,14      | `piano-repertoire` | ⚠️ wedding-ceremony-piano-music |
| violin wedding songs       | 1.000      | —   | 0,13      | `piano-repertoire` | ❌ Belum ada artikel            |

> Catatan jujur: keyword sebesar ini juga diperebutkan The Knot/Brides dkk. Realistisnya
> Allegra tidak merebut posisi 1 — targetnya long-tail variant ("processional songs for
> string quartet", "piano prelude music for wedding") + kutipan AI Overview via FAQ schema.
> Kompetisi paid yang sangat rendah (0,01–0,08) menandakan SERP-nya editorial, bukan
> komersial — artikel repertoire punya peluang nyata di sana.

### Tier B — Pembaca menengah (100–999/bln), paling realistis untuk ranking

| Keyword                             | Volume | KD    | Pilar              | Status                                |
| ----------------------------------- | ------ | ----- | ------------------ | ------------------------------------- |
| wedding ceremony timeline           | 880    | **1** | `for-planners`     | ❌ = prioritas #5 strategi            |
| wedding pianist                     | 720    | —     | `piano-repertoire` | ✅ wedding-pianist-bali               |
| live wedding music                  | 480    | 28    | `planning`         | ✅ live-music-bali-wedding-guide      |
| string quartet wedding songs        | 390    | —     | `piano-repertoire` | ❌ Belum ada artikel                  |
| wedding music checklist             | 320    | —     | `for-planners`     | ❌ Belum ada artikel                  |
| first dance song ideas              | 260    | **1** | `piano-repertoire` | ❌ = prioritas #6 strategi            |
| processional music                  | 260    | —     | `piano-repertoire` | ❌ (gabung ke processional)           |
| garden wedding ceremony             | 210    | 5     | `bali-venues`      | ✅ garden-wedding-ceremony-music-bali |
| wedding band vs dj                  | 170    | **1** | `planning`         | ❌ = prioritas #2 (frasa baru)        |
| destination wedding bali            | 170    | —     | `bali-venues`      | ❌ Belum ada artikel                  |
| band vs dj wedding                  | 140    | 1     | `planning`         | ❌ (gabung ke atas)                   |
| uluwatu wedding (AU: 140, US: 50 ↑) | 140    | 6     | `bali-venues`      | ✅ cliffside-wedding-uluwatu          |
| how many songs for wedding ceremony | 110    | —     | `planning`         | ❌ Belum ada artikel                  |
| modern wedding ceremony songs       | 110    | 9     | `piano-repertoire` | ❌ Belum ada artikel                  |

### Tier C — Volume kecil tapi intent booking tinggi (angle Bali)

Keyword di bawah ≈10–90/bln, TAPI pencarinya adalah calon klien langsung. Tetap layak
digarap sebagai artikel/halaman — jangan berharap traffic besar, ukur lewat konversi.

| Keyword                      | Volume US | Volume AU | Catatan                                              |
| ---------------------------- | --------- | --------- | ---------------------------------------------------- |
| bali musician                | 480       | —         | Terbesar di kategori Bali — direbut BEA pos. 12      |
| beach wedding music          | 90        | —         | Tanpa "bali" — versi ber-Bali tidak ada volume       |
| bali wedding cost            | 90        | —         | Informational, cocok jadi konteks artikel            |
| wedding ceremony piano music | 90        | —         | ✅ Sudah digarap                                     |
| cello wedding songs          | 70        | —         | Long-tail repertoire                                 |
| ubud wedding                 | —         | 50        | AU sedikit; US lebih kecil                           |
| bali wedding band            | 10        | 10–20     | Transactional — untuk halaman layanan, bukan artikel |
| bali wedding music           | 10        | 10        | Idem                                                 |

### Tier D — TIDAK punya pembaca (jangan jadikan keyword target)

Tidak ada di database Google (volume efektif nol) di US maupun AU:

- `wedding pianist bali`, `string quartet bali`, `wedding musicians bali`,
  `live music bali wedding`, `beach wedding music bali`, `ubud wedding music`,
  `solo piano wedding`, `chamber music wedding`\*
- `live music vs dj wedding` — frasa yang dicari orang adalah **"wedding band vs dj"**
- `best piano songs for wedding ceremony` — hanya 10/bln; head term-nya
  **"piano wedding songs"** (1.000/bln)

\* Boleh tetap dipakai sebagai frasa di judul/H1 untuk relevansi lokal & AEO — tapi jangan
dijadikan justifikasi "artikel ini punya pembaca". Pembacanya datang dari keyword generik +
long-tail + AI answer engines.

---

## 4. Koreksi terhadap CONTENT-STRATEGY-2026-07.md

| # strategi | Rencana lama                            | Estimasi lama | Data nyata                     | Koreksi                                                                    |
| ---------- | --------------------------------------- | ------------- | ------------------------------ | -------------------------------------------------------------------------- |
| #1         | "best piano songs for wedding ceremony" | 1K–2K         | **10/bln**                     | Ganti target → **"piano wedding songs"** (1.000/bln, komp. 0,14)           |
| #2         | "live music vs dj wedding"              | 1.2K–2.4K     | **tidak ada volume**           | Ganti target → **"wedding band vs dj"** (170 + 140/bln, KD 1)              |
| #3         | "beach wedding music Bali"              | —             | tidak ada; tanpa Bali = 90/bln | Target "beach wedding music" (90), angle Bali di body — ekspektasi kecil   |
| #4         | "solo piano wedding"                    | 400–800       | **tidak ada di database**      | Reframe → bagian dari artikel piano cluster, bukan artikel berdiri sendiri |
| #5         | "wedding ceremony timeline"             | tinggi        | **880/bln, KD 1** ✅           | Valid — tetap prioritas, KD 1 = sangat bisa direbut                        |
| #6         | "first dance song ideas"                | 500–1K        | **260/bln, KD 1**              | Valid tapi lebih kecil dari estimasi; KD 1 tetap menarik                   |

**Yang hilang dari strategi lama dan seharusnya masuk prioritas atas:** cluster
processional / recessional / entrance / prelude (§ 3 Tier A) — total ≈33.000 pencarian/bln
dalam satu tema yang belum disentuh sama sekali, kompetisi paid nyaris nol, dan cocok persis
dengan positioning "kami yang memainkan musik momen-momen ini setiap minggu".

---

## 5. Rekomendasi Prioritas Artikel (revisi, berbasis data)

1. **Wedding Processional, Recessional & Entrance Songs (cluster 2–3 artikel)** —
   `piano-repertoire`. 12.100 + 9.900 + 8.100/bln. Angle Allegra: versi live
   piano/strings dari lagu-lagu ini + apa yang berbeda saat dimainkan di upacara outdoor
   Bali. FAQ schema wajib — format daftar lagu adalah favorit AI Overview.
2. **Wedding Prelude Music: What Guests Hear Before the Ceremony** — `piano-repertoire`.
   2.900/bln, kompetisi 0,01 (terendah dari semua yang divalidasi). Belum ada artikel
   kompetitor musik yang serius di topik ini.
3. **Piano Wedding Songs** (revisi prioritas #1 lama) — 1.000/bln. Perluas/lengkapi
   `wedding-ceremony-piano-music` yang sudah ada daripada bikin halaman kanibal — cek
   dulu apakah lebih tepat update artikel lama.
4. **Wedding Band vs DJ (vs Chamber Ensemble)** (revisi prioritas #2 lama) — 170+140/bln,
   KD 1. Angle diferensiasi: opsi ketiga yang tidak dibahas artikel band/DJ.
5. **Wedding Ceremony Timeline / Music Checklist** — 880/bln KD 1 + 320/bln. Gabungkan
   jadi satu asset planner-facing (sesuai rencana #5 lama — valid).
6. **Classical Wedding Songs** — 2.400/bln. Wilayah alami Allegra; tak satu pun kompetitor
   Bali menyentuhnya.
7. **String Quartet Wedding Songs** — 390/bln. Internal link kuat ke
   `string-quartet-bali-wedding` (KD 5 anchor).

---

## 6. Aturan Validasi Topik (checklist sebelum menulis artikel apa pun)

Sebelum artikel baru masuk pipeline, wajib lolos minimal **satu** dari tiga jalur:

1. **Jalur volume:** keyword target punya volume terverifikasi ≥ 100/bln (DataForSEO /
   GSC), bukan estimasi. Frasa persisnya dicek — bukan frasa yang "kedengarannya dicari"
   (pelajaran dari "live music vs dj wedding").
2. **Jalur konversi:** volume kecil (10–90/bln) TAPI intent transaksional/komersial jelas
   dan Bali-spesifik (mis. `bali musician`) — pembaca sedikit, tapi tiap pembaca calon
   klien. Ukur lewat inquiry, bukan traffic.
3. **Jalur permintaan nyata non-Google:** pertanyaan yang berulang kali masuk lewat
   WhatsApp/kontak form/planner (mis. pertanyaan teknis sound outdoor). Tidak terlihat di
   data keyword tapi pembacanya terbukti ada — dan jadi bahan FAQ/AEO.

Topik yang tidak lolos ketiganya → tidak ditulis, sekreatif apa pun idenya.

**Sumber verifikasi berkala:** GSC query report (`gsc-keywords`) tiap bulan untuk melihat
keyword mana yang mulai impresi — itu data pembaca paling jujur setelah artikel tayang.
