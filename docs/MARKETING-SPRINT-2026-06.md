# Marketing Sprint — 22–30 Juni 2026

> Sprint 9 hari, full organik (tidak ada budget iklan), dieksekusi sendiri oleh owner.
> Dua fokus: **(A) Visibility organik** (SEO on-page, social, directory) dan **(B) Outreach B2B**
> ke wedding planner/venue. Dibuat 2026-06-21, mengacu pada `docs/SEO-STRATEGY.md`,
> `.agents/product-marketing.md`, dan `.claude/brand-voice-guidelines.md`.
>
> **Update 2026-06-21 (sore, sama hari plan ini ditulis):** fitur **Journal** (`/journal`) sudah
> dibangun dan live — content hub SEO/GEO/AEO dengan 1 artikel pertama ("Wedding Pianist in
> Bali: What to Expect", target keyword "wedding pianist" KD 1). Ini mengubah beberapa asumsi di
> bawah (lihat bagian "Konteks yang membatasi scope" dan Hari 5) — sprint sekarang punya aset
> konten nyata untuk dipromosikan, bukan cuma optimasi meta tag.
>
> **Update 2026-06-21 (malam): Competitor gap analysis.** 5 kompetitor diprofilkan via skill
> `competitor-profiling` (Sundaram String, Moira Ensembles, Bali Entertainment Agency, Bali
> Wedding Solutions, DIVO Music/Orchestra) — hasil lengkap di `competitor-profiles/` (`_summary.md`
>
> - 1 file per kompetitor). Temuan inti: **tidak ada kompetitor yang menggabungkan "spesialis
>   chamber Bali" + website yang benar-benar ranking di Google** — 2 boutique act (Sundaram, Moira)
>   yang positioning-nya paling mirip Allegra sama sekali tidak punya website; 2 kompetitor yang
>   punya website nyata (Bali Entertainment Agency, Bali Wedding Solutions) adalah generalis yang
>   halaman musiknya tidak ranking untuk keyword musik sama sekali. Ini memvalidasi ulang (dari sisi
>   kompetitor, bukan cuma keyword data) temuan `SEO-STRATEGY.md` §3.0 bahwa "wedding pianist" KD 1
>   masih genuinely terbuka. Rencana aksi untuk sesi berikutnya (belum dieksekusi):
>
> 1. **Perkuat Hari 5 (SEO on-page + Journal)** di atas dengan eksplisit menarget "wedding pianist
>    Bali" dan "wedding string quartet Bali" di title/meta `/packages` dan artikel Journal terbaru
>    — pakai skill `content-strategy` lalu `seo-audit` untuk verifikasi, bukan asumsi sudah cukup.
> 2. **Schema reinforcement** (skill `schema`): pastikan halaman yang menarget 2 keyword di atas
>    punya `MusicGroup`/`FAQPage` JSON-LD lengkap — tidak satu pun kompetitor melakukan ini, jadi
>    ini pembeda murah untuk AI Overview/rich result.
> 3. **Testimoni nyata** masih tertahan izin owner (lihat `docs/PROGRESS.md` Next steps #3) — begitu
>    izin didapat, ini satu-satunya pembeda yang langsung menutup gap kepercayaan vs DIVO (88
>    review, satu-satunya kompetitor dengan review nyata sama sekali).
> 4. **Paid ads** (skill `ads`) dicatat sebagai opsi lebih cepat-tapi-berbayar kalau timeline
>    organik (~2-3 bulan) dianggap terlalu lambat — di luar scope sprint ini ("full organik, tidak
>    ada budget iklan", lihat baris 3), jangan dieksekusi tanpa keputusan owner soal budget.

## Aset baru sejak plan ini ditulis

- **`/journal`** — live, 1 artikel: `/journal/wedding-pianist-bali/` (EN) +
  `/id/journal/wedding-pianist-bali/` (twin struktural ID).
- Panduan menulis artikel + 4 pilar konten + tabel delegasi skill:
  `.claude/article-seo-geo-aeo-guidelines.md`. Pilar `for-planners` paling relevan untuk
  mendukung outreach B2B sprint ini — belum ada artikelnya, jadi ini kandidat kuat untuk ditulis
  selama 9 hari ini (lihat Hari 5 yang sudah diperbarui).

## Konteks yang membatasi scope (penting, jangan dilewat)

- `/journal` sekarang ada (dibangun 2026-06-21, lihat "Aset baru" di atas) — jadi kerja "SEO"
  sprint ini tidak lagi terbatas ke optimasi on-page saja, menulis 1 artikel Journal baru juga
  masuk scope yang realistis (lihat Hari 5). Tetap jangan menulis artikel di luar 4 pilar yang
  sudah ditetapkan di `.claude/article-seo-geo-aeo-guidelines.md`.
- Testimoni nyata, foto venue beach/chapel/ballroom belum ada (masih nunggu owner) — jangan
  dipromosikan di caption/outreach seolah sudah ada. Yang sudah di tangan: 1 foto/video pianis
  dengan izin pakai.
- Pricing sengaja disembunyikan di seluruh situs — jangan sebut angka di caption, directory
  listing, atau pesan outreach manapun.
- Channel komunikasi langsung satu-satunya: WhatsApp `+62 857-0824-7611`. Instagram nyata:
  `@allegrachamber.bali`.
- Brand voice B2B (planner/venue): **reliability over romance** — pimpin dengan logistik
  (tech rider, stage plot, repertoire sheet), bukan bahasa romantis ala copy pasangan.

## Target hasil akhir sprint (metrik sederhana, karena belum ada target bisnis terdokumentasi)

Bukan target booking (terlalu awal untuk dipatok), tapi target aktivitas yang bisa dihitung di
Hari 9:

| Metrik                                                                 | Target                                      |
| ---------------------------------------------------------------------- | ------------------------------------------- |
| Pesan outreach terkirim ke planner/venue                               | ≥ 12                                        |
| Balasan/respon dari outreach                                           | catat saja, tanpa target — baseline pertama |
| Listing directory live                                                 | ≥ 3                                         |
| Post Instagram terbit                                                  | ≥ 3                                         |
| Google Business Profile                                                | live & terverifikasi                        |
| Artikel Journal baru ditulis (pilar `for-planners` atau `bali-venues`) | ≥ 1                                         |
| Inbound WhatsApp inquiry baru selama periode                           | catat saja — baseline pertama               |

## Kalender harian (Senin 22 — Selasa 30 Juni)

**Hari 1 — Senin 22 Juni: Setup & fondasi**

- Setup/klaim **Google Business Profile** (kategori: Wedding music/Live entertainment), isi
  alamat layanan Bali, link ke situs + WhatsApp. Ini freebie dengan dampak lokal-SEO tertinggi,
  tanpa budget. (Cek dulu apakah sudah pernah dibuat — kalau sudah ada tapi belum diverifikasi,
  selesaikan verifikasinya.)
- Review daftar prospek planner/venue di bagian "Daftar Prospek" di bawah — coret yang tidak
  relevan, tambah yang owner sudah kenal personal (lebih prioritas dari hasil pencarian).

**Hari 2 — Selasa 23 Juni: Siapkan materi outreach**

- Pakai template pesan outreach B2B (di bawah) — sesuaikan 1-2 kalimat pembuka per target kalau
  ada koneksi personal.
- Siapkan link yang akan dikirim: `/for-planners` (EN) — halaman ini sudah ada dan dibangun untuk
  audiens ini. Kalau artikel Journal pilar `for-planners` sudah ditulis (lihat Hari 5), pakai
  link itu sebagai pendukung tambahan, bukan pengganti `/for-planners`.

**Hari 3 — Rabu 24 Juni: Outreach gelombang 1 + directory #1**

- Kirim 5–6 pesan outreach pertama (DM Instagram atau form kontak, sesuai channel yang tersedia
  di tiap prospek).
- Submit ke 1 directory (mulai dari yang prosesnya paling cepat — biasanya Bridestory atau
  AlternativeTo-style listing lokal).

**Hari 4 — Kamis 25 Juni: Social — kalender + post #1**

- Susun kalender Instagram 1 minggu ke depan (3-4 slot post) pakai ide caption di bawah.
- Terbitkan post #1 (rekomendasi: foto/video pianis yang sudah ada izin pakai — asset paling
  kuat yang dimiliki saat ini).

**Hari 5 — Jumat 26 Juni: SEO on-page + Journal**

- Link artikel Journal yang sudah live (`/journal/wedding-pianist-bali/`) dari blok Solo Piano di
  halaman Packages — internal link ini juga jadi syarat checklist SEO di
  `.claude/article-seo-geo-aeo-guidelines.md`.
- Cek title tag & meta description Home + Packages sudah memuat klaster "musician for wedding
  ceremony" (head term, bukan "string quartet").
- Tulis 1 artikel Journal baru untuk pilar `for-planners` (mendukung outreach B2B minggu ini —
  topik usulan: "What to Ask a Live Music Vendor Before You Book Them" atau "Tech Rider Basics
  for Live Chamber Music at Weddings"). Ikuti pipeline delegasi skill di panduan — jangan
  freelance satu draft langsung jadi.

**Hari 6 — Sabtu 27 Juni: Outreach gelombang 2 + post #2**

- Kirim 5–6 pesan outreach lanjutan ke sisa daftar prospek.
- Terbitkan post #2 — pakai ide caption #5 (Journal launch) karena artikel for-planners baru
  terbit kemarin (Hari 5), masih relevan untuk dipromosikan segera.

**Hari 7 — Minggu 28 Juni: Buffer & balas respon**

- Hari ringan — tidak ada kewajiban kirim baru. Cek & balas semua respon outreach + DM Instagram
  - inquiry WhatsApp yang masuk. Pakai tone WhatsApp/Email: "akui tanggal+venue → jawab langsung →
    satu next step jelas."

**Hari 8 — Senin 29 Juni: Directory #2-3 + post #3**

- Submit ke 1-2 directory tambahan.
- Terbitkan post #3.

**Hari 9 — Selasa 30 Juni: Tutup sprint**

- Tally metrik di tabel atas (outreach terkirim, respon masuk, directory live, post terbit,
  inquiry WhatsApp baru).
- Update bagian "Next steps" di `docs/PROGRESS.md` dengan hasil sprint + prioritas Juli.

---

## Daftar Prospek B2B (verifikasi channel + wave selesai 2026-06-26)

> Riset awal 2026-06-21 (publik, belum diverifikasi); channel kontak konkret + skor prioritas +
> pembagian wave dilengkapi 2026-06-26. **Rencana eksekusi lengkap (lead sheet, pesan siap-kirim
> per prospek, dasar riset prioritas B2B-vs-direct-couple) ada di
> `docs/B2B-OUTREACH-PLAN.md`** — tabel di bawah ini ringkasan status saja.
>
> Per riset demand 2026-06-26: prioritaskan B2B (planner/venue) untuk 1-2 bulan ke depan — 74%
> couple destination wedding internasional menyewa planner, sementara SEO direct-couple butuh
> 2-3+ bulan untuk matang. Lihat `docs/B2B-OUTREACH-PLAN.md` bagian "Mengapa B2B diprioritaskan"
> untuk detail dan sumber.

**Wedding planner (destination wedding, fokus internasional):**

| Nama                                | Channel terverifikasi (2026-06-26)                        | Confidence | Wave    | Status |
| ----------------------------------- | --------------------------------------------------------- | ---------- | ------- | ------ |
| Tirtha (planner + venue group)      | wedding.inquiry@tirtha.com · +62 816-4701-0120            | High       | 1       | Belum  |
| Bali Wedding Paradise               | admin@baliweddingparadise.com · IG @baliweddingparadise   | High       | 1       | Belum  |
| The Wedding Mood                    | IG @theweddingmood                                        | High       | 1       | Belum  |
| Hitch'd Weddings Bali               | holla@hitchdbali.com · IG @hitchdweddings (10K followers) | High       | 1       | Belum  |
| Global Weddings                     | globalweddings.com.au · +61 435 850 424                   | High       | 1       | Belum  |
| The Seven Agency                    | IG @thesevenwedding                                       | Medium     | 2       | Belum  |
| Poetyque Events                     | poetyque.com · IG @poetyque.events                        | High       | 2       | Belum  |
| Luxury Weddings Indonesia           | luxuryweddingsindonesia.com · IG @luxuryweddingsindo      | High       | 2       | Belum  |
| Plan A — Destination Event Planners | info@planabali.com · IG @plana.destinationevents          | High       | 2       | Belum  |
| Avavi Bali                          | IG @avavibali_weddings                                    | Medium     | Backlog | Belum  |

**Venue (cliffside/Uluwatu — selaras dengan foto yang sudah dimiliki):**

| Nama                   | Channel terverifikasi (2026-06-26)                                                                                   | Confidence | Wave              | Status |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- | ----------------- | ------ |
| Tirtha Uluwatu         | **= "Tirtha" di tabel planner di atas** (email kontak sama persis) — jangan kirim 2x, pakai wave & channel baris itu | High       | 1 (lihat di atas) | —      |
| The Edge Bali          | reservations@theedgebali.com · contact form theedgebali.com/contact                                                  | High       | 1                 | Belum  |
| Alila Villas Uluwatu   | uluwatuevents@alilahotels.com · +62 361 848 2166                                                                     | High       | 2                 | Belum  |
| Bali Wedding Solutions | contact form baliweddingsolutions.com/contact-us                                                                     | Medium     | 2                 | Belum  |

---

## Template pesan outreach B2B (EN — sebagian besar prospek internasional)

> Tone: reliability over romance. Tidak ada bahasa romantis, tidak ada angka harga, tidak ada
> klaim "best/world-class" (avoid list brand voice). Sesuaikan kalimat pembuka per prospek.

```
Subject: Live chamber ensemble for [Venue/Agency Name] couples — Allegra Chamber Bali

Hi [Name],

I'm reaching out from Allegra Chamber Bali, a live chamber ensemble (piano & strings) based
in Bali, performing ceremonies and receptions for destination weddings — solo through to a
6-piece formation with piano, strings, and double bass.

We work directly with planners and venues on logistics: stage plot, tech rider, and a
repertoire sheet built around the couple's own songs. If it's useful, our planner-facing page
has the details: https://allegra.indonesiaistimewastudio.id/for-planners

Happy to share our repertoire list or set up a quick call if you have couples looking for live
music this season.

Best,
[Owner name]
Allegra Chamber Bali
WhatsApp: +62 857-0824-7611
```

**Versi singkat untuk DM Instagram** (karakter terbatas):

```
Hi! We're Allegra Chamber Bali — live piano & strings ensemble for weddings here in Bali.
Would love to connect for any couples/venues you're working with this season. Planner info:
allegra.indonesiaistimewastudio.id/for-planners — happy to send our repertoire sheet too.
```

---

## Ide caption Instagram (warm, evocative, short — minimal hashtag, no hard-sell)

1. **Piano flagship** (pakai asset foto/video pianis yang sudah ada izin):

   > "Piano holds the harmony and rhythm — strings carry the melody. The sound of your moment,
   > live."

2. **Brand essence — Timeless**:

   > "Music that won't date when you watch it back in ten years. Live chamber music for your
   > Bali wedding."

3. **Formation showcase** (Large Ensemble — quartet + piano + double bass):

   > "From an intimate duo to a six-piece ensemble — string quartet, piano, and double bass.
   > Arranged around your story."

4. **For-planners angle** (cross-post ke audiens B2B):

   > "Tech rider ready, repertoire sheet on request. Planning a wedding with live music? Let's
   > talk logistics."

5. **Journal launch** (pakai setelah Hari 4, promosikan artikel yang sudah live):
   > "New on the Journal: what to actually expect from a wedding pianist in Bali — link in bio."

Hashtag minimal (brand voice: "minimal hashtags") — cukup 3-5: `#BaliWedding`
`#LiveWeddingMusic` `#BaliWeddingMusician` + nama area jika foto spesifik (`#UluwatuWedding`,
dst).

---

## Blurb pendek untuk directory listing (reuse Approved Copy)

> "Allegra Chamber Bali brings refined live chamber music to weddings across Bali — from an
> intimate cliffside ceremony to a full string quartet reception, performed by
> conservatory-trained musicians and arranged around your story."

(Positioning statement Approved — lihat `.claude/brand-voice-guidelines.md`. Reuse verbatim,
jangan diparafrase ke arah hype.)

## Catatan directory dari riset SEO sebelumnya

`SEO-STRATEGY.md` §1 mencatat Bridestory/Hello Bali Wedding/Easy Weddings **tidak muncul di
ranking organik** untuk keyword inti niche ini — jadi submit ke sana dinilai sebagai **referral
traffic langsung + backlink**, bukan SEO ranking play. Google Business Profile (Hari 1) tetap
yang paling tinggi dampak lokal-SEO-nya karena nempel langsung ke local search intent.

## Tracker directory submission (draf, 2026-06-23 — belum disubmit)

> Disusun pakai skill `directory-submissions`, tapi katalognya generic SaaS (Product Hunt, G2, MCP
> registry) — tidak relevan untuk wedding vendor, jadi daftar di bawah disusun manual dari
> pengetahuan domain wedding-industry + 3 directory yang sudah dicatat di atas. **Verifikasi ulang
> URL/proses tiap baris sebelum submit** — belum di-cek-live satu per satu.
>
> Blurb listing: pakai **persis** kalimat Approved Copy di bagian "Blurb pendek" di atas, di semua
> directory di bawah — brand voice sudah final, jangan diparafrase per-platform (beda dari rule
> default skill `directory-submissions` yang menyarankan variasi positioning per tier; di niche ini
> konsistensi suara lebih penting daripada variasi). Hanya panjang/tagline yang boleh disesuaikan
> kalau field-nya punya limit karakter ketat.

| #   | Nama                                                            | Kategori                                                                         | Prioritas | Kebutuhan submit                                                                                                   | Status                    |
| --- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| 1   | **Google Business Profile**                                     | Local SEO (bukan directory pihak ketiga, tapi wajib paling dulu)                 | Tertinggi | Akun Google bisnis, kategori "Live entertainment"/"Wedding service", area layanan Bali                             | Belum (Sprint Hari 1)     |
| 2   | Bing Places for Business                                        | Local SEO baseline                                                               | Tinggi    | Akun Microsoft, sinkron data sama dengan GBP (NAP konsisten)                                                       | Belum                     |
| 3   | Bridestory                                                      | Marketplace vendor wedding Indonesia terbesar                                    | Tinggi    | Akun vendor, foto/portfolio, deskripsi                                                                             | Belum                     |
| 4   | Hello Bali Wedding                                              | Directory vendor wedding Bali-spesifik                                           | Tinggi    | Form submit / akun vendor                                                                                          | Belum                     |
| 5   | The Bali Bride                                                  | Blog + directory vendor wedding Bali (audiens destination wedding internasional) | Tinggi    | Cek halaman "list your business"/contact, biasanya manual review                                                   | Belum                     |
| 6   | Easy Weddings (AU)                                              | Directory wedding terbesar Australia                                             | Sedang    | Akun vendor, relevan karena AU adalah salah satu locale dengan volume keyword tervalidasi (`docs/SEO-STRATEGY.md`) | Belum                     |
| 7   | WeddingWire                                                     | Directory wedding global/US, listing gratis dasar tersedia                       | Sedang    | Akun vendor, kategori "Bali" + "Musicians"                                                                         | Belum                     |
| 8   | The Knot                                                        | Directory wedding global/US, pasangan WeddingWire                                | Sedang    | Akun vendor                                                                                                        | Belum                     |
| 9   | Yelp for Business                                               | Local business baseline, NAP consistency                                         | Sedang    | Klaim listing kalau sudah ada otomatis, atau buat baru                                                             | Belum                     |
| 10  | Facebook Business Page (kategori "Musician/band" + lokasi Bali) | Discovery surface, bukan backlink SEO murni tapi link profil dofollow            | Sedang    | Sudah ada Instagram — pastikan FB Page juga ada & link 2 arah                                                      | Cek dulu apakah sudah ada |
| 11  | Here Comes The Guide                                            | Directory wedding vendor niche musisi/entertainment (US-leaning)                 | Rendah    | Akun vendor, kategori "Ceremony Musicians"                                                                         | Belum                     |
| 12  | Hotfrog / Manta (local business generic)                        | Local business directory generic, DR sedang                                      | Rendah    | Form submit cepat, dampak kecil tapi gratis & cepat                                                                | Belum                     |

**Urutan eksekusi yang disarankan** (selaras sprint Hari 1, 3, 8):

1. Google Business Profile + Bing Places dulu (Hari 1) — fondasi local SEO, dampak terbesar.
2. Bridestory + Hello Bali Wedding (Hari 3, sudah di kalender) — directory niche Bali paling relevan.
3. The Bali Bride + Easy Weddings (Hari 8, slot directory #2-3) — perluas ke audiens AU/destination wedding.
4. Sisanya (WeddingWire, The Knot, Yelp, Here Comes The Guide, Hotfrog/Manta) — rolling setelah sprint, tidak perlu dikejar dalam 9 hari ini.

**Catatan:** baris #3-#9 di atas BUTUH akun/login milik owner (kadang dengan email bisnis,
kadang dengan verifikasi telepon) — Claude Code tidak bisa mengeksekusi submission-nya sendiri,
hanya menyiapkan daftar + blurb ini.

---

## Setelah sprint berakhir

Update `docs/PROGRESS.md` § Next steps dengan: hasil tally metrik + 2-3 prioritas Juli (mis.
lanjut outreach ke sisa daftar prospek, tulis 2 artikel Journal yang masih kosong — pilar
`planning` dan `bali-venues` — pakai `.claude/article-seo-geo-aeo-guidelines.md`, follow-up
planner yang merespons).
