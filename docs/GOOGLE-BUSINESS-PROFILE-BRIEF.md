# Google Business Profile — Setup Brief (Final, Ready to Paste)

> **Status:** brief lengkap, pengganti catatan singkat di `docs/MARKETING-SPRINT-2026-06.md`
> Hari 1 ("Setup/klaim Google Business Profile (kategori: Wedding music/Live entertainment)...").
> Dokumen ini adalah versi final/detail — gunakan ini sebagai sumber kebenaran untuk eksekusi GBP,
> bukan baris singkat di sprint plan.
>
> **Claude Code TIDAK bisa setup GBP-nya sendiri** — tidak ada integrasi API Google Business
> Profile di environment ini, dan GBP memang mengharuskan verifikasi pemilik bisnis asli (kode
> pos/video/telepon terikat ke akun Google pribadi owner). Dokumen ini adalah **instruksi + isi
> siap-paste** untuk owner kerjakan manual di [business.google.com](https://business.google.com).
>
> Riset best-practice di bawah memakai WebSearch real-time (Juni 2026) — bukan dari pengetahuan
> training statis, karena kebijakan GBP (terutama kategori, atribut, dan fitur Q&A) berubah
> cukup sering. Sumber dicatat per-bagian.

---

## 1. Ringkasan & Status

| Item                             | Status                                                                                                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GBP sudah pernah dibuat/diklaim? | **Belum diketahui — owner harus cek dulu** di business.google.com sebelum membuat baru (cek apakah Google sudah auto-generate listing "tidak diklaim" dari aktivitas lain) |
| Kategori final direkomendasikan  | Primary: **Band**; Secondary: **Entertainer**, **Musician**, **Wedding service** (lihat §2 untuk alasan & cara verifikasi nama persis)                                     |
| Tipe profil                      | **Service-area business** (tanpa alamat publik) — lihat §2                                                                                                                 |
| Nomor WhatsApp & Instagram       | **Sudah ada datanya, BUKAN placeholder lagi** (lihat catatan koreksi di bawah) — owner cukup salin dari `.env`, tidak perlu mengisi dari nol                               |
| Pricing                          | **Tidak ditampilkan** di field manapun, sesuai `CLAUDE.md` §9 (locked)                                                                                                     |
| Q&A                              | **Fitur ini sedang dihapus Google** (lihat §2.4) — brief menyesuaikan strategi, bukan mengandalkan fitur yang sudah usang                                                  |

**Koreksi terhadap asumsi awal task:** brief instruksi menyebut nomor WhatsApp dan handle
Instagram masih placeholder (`62XXXXXXXXXXX`, `your-handle`) di kode. Setelah membaca `.env` repo
ini langsung, **keduanya sudah terisi data asli**: WhatsApp `+62 857-0824-7611`
(`PUBLIC_WHATSAPP_NUMBER=6285708247611`) dan Instagram `@allegrachamber.bali`
(`PUBLIC_INSTAGRAM=https://www.instagram.com/allegrachamber.bali`). `.env.example` (template,
bukan nilai live) masih menampilkan placeholder — itu wajar, templatenya memang harus generik.
Jadi item "owner wajib isi WA/IG asli" yang diminta di prompt task sudah **tidak relevan** —
owner hanya perlu **menyalin** nilai yang sudah ada ke field GBP, bukan mencari nomor baru. Item
yang benar-benar masih kosong ada di §10 (Owner Action Items).

---

## 2. Setup Dasar

### 2.1 Nama Bisnis

```
Allegra Chamber Bali
```

Jangan tambahkan kata kunci ke nama bisnis (mis. "Allegra Chamber Bali — Wedding Musicians") —
ini melanggar kebijakan "Representasi Bisnis" Google (nama harus sama dengan nama bisnis nyata,
bukan nama + keyword stuffing) dan berisiko suspend profil.

### 2.2 Kategori (Primary + Secondary)

> **Catatan metodologi:** Google tidak mempublikasikan daftar kategori resmi yang bisa di-browse
> penuh — kategori hanya bisa divalidasi dengan mengetik nama di field kategori saat setup dan
> melihat apakah Google menyarankannya sebagai opsi valid (autocomplete). Riset di bawah
> mengonfirmasi kategori **"Band"** dan **"Entertainer"** memang ada di database ~4.000 kategori
> GBP (dikonfirmasi via [Google Business Profile Community thread](https://support.google.com/business/thread/84744455/what-categories-in-google-is-a-music-band?hl=en)
> dan ringkasan kategori [daltonluka.com](https://daltonluka.com/blog/google-my-business-categories)).
> **"Musician" dan "Wedding service" kemungkinan besar ada** (pola GBP konsisten menyediakan
> kategori spesifik per-niche wedding seperti "Wedding Photographer", "Wedding Planner",
> "Wedding Venue" — lihat [nergisyuksel.com](https://www.nergisyuksel.com/wedding-seo-blog/google-business-profile-for-wedding-businesses)),
> tapi **belum terverifikasi 100% by name** lewat pencarian publik. **Owner WAJIB mengetik
> masing-masing nama di bawah satu per satu ke field kategori GBP saat setup** dan pakai yang
> benar-benar muncul di dropdown — jangan asumsikan nama persis ini pasti tersedia tanpa dicek.

**Primary category (rekomendasi #1):**

```
Band
```

Alasan: ini kategori paling spesifik dan paling sering dikonfirmasi valid untuk grup musik
live (termasuk ensemble musik klasik/chamber) di forum resmi Google Business Profile Community.
Google merekomendasikan memilih kategori paling spesifik yang merepresentasikan bisnis secara
keseluruhan ("ini ADALAH apa", bukan daftar layanan) — "Band" menangkap identitas Allegra
sebagai grup musik pertunjukan, bukan agency atau venue.

**Jika "Wedding service" terkonfirmasi ada saat owner mengetiknya:** pertimbangkan menjadikan ini
primary alih-alih "Band", karena GBP primary category adalah **faktor #1 untuk local-pack
ranking** dan "Wedding service" menangkap intent pencarian "wedding [sesuatu] near me" yang lebih
langsung relevan dengan audiens Allegra (couples mencari vendor wedding, bukan orang mencari
"band" generik untuk acara apa saja). Keputusan akhir antara "Band" vs "Wedding service" sebagai
primary **owner ambil saat setup**, berdasarkan mana yang benar-benar tersedia + preview hasil
pencarian "near me" Google saat mengetik (Google biasanya menampilkan estimasi relevansi).

**Secondary categories (pilih semua yang valid, maksimal yang Google izinkan — biasanya hingga 9
tapi disarankan 2-3 paling relevan saja, bukan memenuhi kuota):**

```
Entertainer
Musician
Wedding service          (jika tersedia)
```

**Jangan pilih** kategori yang menyiratkan venue fisik (mis. "Music venue", "Banquet hall",
"Event venue") — Allegra tidak memiliki venue, musisi datang ke lokasi klien (lihat §2.3).
Jangan pilih "Disc jockey" — DJ bukan bagian dari layanan Allegra dan akan mengaburkan
positioning live chamber ensemble.

### 2.3 Service-Area Business Setting (Tanpa Alamat Publik)

> Sumber: [Google Business Profile Help — Manage your business address](https://support.google.com/business/answer/2853879?hl=en),
> [rankai.ai Service Area Business Guide 2026](https://rankai.ai/articles/service-area-business-google-business-profile-guide).

Allegra **wajib** disetel sebagai **service-area business (SAB)** — bukan opsional. Ini konsisten
dengan `src/lib/jsonld.ts` yang sudah set `areaServed: 'Bali, Indonesia'` tanpa alamat jalan.

Langkah setup (per 2026):

1. Saat membuat/mengedit profil: **Edit profile → Location → Business location → Edit → matikan
   "Show business address to customers"**. Alamat tetap diminta secara internal untuk verifikasi
   Google (lihat poin 3 di bawah), tapi tidak akan tampil ke publik.
2. **Set Service area** — pilih kota/kabupaten, bukan radius dari satu titik, karena Bali punya
   banyak area venue spesifik yang relevan untuk pernikahan (bukan satu pusat kota). Daftar
   service area yang disarankan (maks 20 area diizinkan Google, gunakan secukupnya, jangan
   memaksa 20):
   ```
   Bali, Indonesia
   Uluwatu, Bali
   Ubud, Bali
   Nusa Dua, Bali
   Canggu, Bali
   Seminyak, Bali
   Denpasar, Bali
   ```
   Area ini sama dengan modifier lokasi yang sudah divalidasi di `docs/SEO-STRATEGY.md` §3.4 dan
   vocabulary "Preferred (EN)" di `.claude/brand-voice-guidelines.md` — konsisten lintas dokumen.
3. **Verifikasi GBP tetap butuh alamat fisik nyata** (bukan PO Box/virtual office) di balik
   layar — biasanya alamat rumah/studio musisi/owner. Ini tidak akan publik, hanya untuk Google.
   Jika owner tidak punya alamat domisili yang nyaman dipakai untuk ini, verifikasi via video
   (Google sering menawarkan opsi verifikasi video untuk SAB tanpa kantor) adalah alternatif —
   cek opsi yang muncul saat proses verifikasi, ini ditentukan Google per-akun, tidak bisa
   dipastikan dari sini.
4. **Jangan mengarang alamat jalan/nomor** di field manapun — sesuai instruksi task dan
   konsistensi dengan `src/lib/jsonld.ts` yang sengaja hanya pakai `addressRegion`/
   `addressCountry`.

**Implikasi ke ranking dibanding bisnis beralamat fisik:** SAB tanpa alamat publik secara
struktural sedikit dirugikan di local-pack untuk pencarian yang sangat hyper-lokal ("dekat saya"
dalam radius kecil), karena Google Maps tidak punya titik pin presisi untuk menghitung jarak
sebenarnya — pin yang ditampilkan biasanya berupa area perkiraan (perimeter service area), bukan
alamat persis. Untuk Allegra ini **tidak masalah besar**: target pencarian intinya sudah
level-pulau ("wedding pianist bali", bukan "wedding pianist near me [alamat spesifik]"), dan
SEO-STRATEGY.md §3.4 sudah membuktikan kombinasi area+layanan tidak punya volume pencarian nyata
— jadi precision lokasi bukan faktor yang akan banyak hilang.

### 2.4 Status Fitur Q&A (Penting — Mengubah Strategi)

> Sumber: [North County Digital — Q&A Discontinued](https://www.northcountydigital.com/marketing-blog/google-business-profile-qa-discontinued),
> [Tall Boy Marketing](https://www.tallboymarketing.com/google-business-profile-removes-qa),
> [Google for Developers Q&A API changelog](https://developers.google.com/my-business/content/qanda/change-log).

Riset Juni 2026 mengonfirmasi: **Q&A API resmi dihentikan 3 November 2025**, dan mulai
**3 Desember 2025** Google mulai menghapus thread Q&A publik dari Search/Maps secara bertahap,
diganti tombol "Ask" berbasis Gemini AI. **Profil bisnis baru (seperti Allegra, belum pernah
dibuat) kemungkinan besar dibuat TANPA fitur Q&A sama sekali** — bukan lagi fitur yang bisa
diandalkan untuk seeding pertanyaan sendiri seperti praktik lama.

**Implikasi untuk brief ini:**

- §7 di bawah tetap menyediakan draft Q&A — **gunakan HANYA jika fitur Q&A masih muncul** di
  dashboard GBP owner saat setup (variasinya bertahap per akun/region, per Januari 2026 beberapa
  profil lama masih menampilkan Q&A lama meski tidak bisa ditambah baru).
- **Strategi pengganti yang lebih tahan-lama:** isi **Business Description** (§3) dan
  **Services** (§4) selengkap dan paling kaya-konteks mungkin — Gemini AI ("Ask Maps") membaca
  field-field ini sebagai sumber jawaban otomatis untuk pertanyaan calon klien, menggantikan
  fungsi Q&A manual. Artinya draft Q&A di §7 tetap **berguna sebagai referensi isi FAQ di
  website** (`/faq`, sudah ada `FAQPage` JSON-LD per `CLAUDE.md` §5) — bukan terbuang, hanya
  pindah saluran utama.

---

## 3. NAP (Name, Address, Phone) — Status

| Field        | Nilai final yang harus dipakai di GBP                                | Status                                             |
| ------------ | -------------------------------------------------------------------- | -------------------------------------------------- |
| **N**ama     | `Allegra Chamber Bali`                                               | Fix — sudah final                                  |
| **A**lamat   | Tidak ditampilkan publik (service-area business, lihat §2.3)         | Fix secara desain, bukan placeholder               |
| **P**hone    | `+62 857-0824-7611` (WhatsApp, dari `.env` `PUBLIC_WHATSAPP_NUMBER`) | **Sudah ada, tinggal salin**                       |
| Email        | `allegrachamberbali@gmail.com`                                       | **Sudah ada, tinggal salin**                       |
| Website      | `https://allegra.indonesiaistimewastudio.id`                         | **Sudah ada, tinggal salin**                       |
| Instagram    | `https://www.instagram.com/allegrachamber.bali`                      | **Sudah ada, tinggal salin**                       |
| Service area | Bali + 6 area (lihat §2.3)                                           | Sudah ditentukan di brief ini, owner tinggal input |

**Konsistensi NAP lintas listing lain** — lihat §9 (checklist NAP-consistency) untuk
keterkaitan dengan Bing Places, Bridestory, dst. yang sudah direncanakan di
`docs/MARKETING-SPRINT-2026-06.md`.

---

## 4. Business Description (Final, ≤750 karakter)

> Mengikuti `.claude/brand-voice-guidelines.md`: tone warm/refined, tanpa hype/superlatif kosong,
> piano disebut sebagai flagship (bukan "just a string quartet"), tanpa harga, menyuntikkan
> keyword riset SEO-STRATEGY.md §3.0/§3.1 secara natural (bukan stuffing).

### English (paste persis ini ke field "Business description" GBP — primary)

```
Allegra Chamber Bali is a live chamber ensemble — piano and strings — performing wedding
ceremonies and receptions across Bali. As a wedding musician and pianist for hire, we perform
solo, duo, trio, string quartet, and large ensemble formations, conservatory-trained and
arranged around your story. Piano is a signature part of every formation, not an optional
add-on. We work directly with couples, wedding planners, and venues across Bali — Uluwatu,
Ubud, Nusa Dua, Canggu, Seminyak, and beyond — from an intimate cliffside ceremony to a full
string quartet reception. Message us on WhatsApp to check availability for your date.
```

(Hitung karakter: ±560 — di bawah limit 750, beri ruang aman.) Keyword yang disuntikkan secara
natural: **"wedding musician"** (head term, vol 5400 US), **"wedding pianist"** (KD 1, opportunity
terbaik di SEO-STRATEGY.md), **"pianist for hire"** (varian commercial-intent dari cluster §3.0.1),
**"string quartet"** (differentiator). Tidak ada klaim superlatif ("best", "world-class") sesuai
tabel Avoid→Prefer brand voice guide.

### Indonesian (catatan opsional — field deskripsi GBP hanya 1 bahasa per listing utama, jadi ini

referensi cadangan jika Google menampilkan profil ke pencari ID, atau untuk dipakai di listing
lain yang memang berbahasa Indonesia)

```
Allegra Chamber Bali adalah ansambel musik kamar live — piano dan gesek — yang membawakan
upacara dan resepsi pernikahan di seluruh Bali. Formasi solo, duo, trio, kuartet gesek, hingga
large ensemble, dimainkan musisi terlatih konservatori dan diaransemen khusus untuk momen Anda.
Piano adalah bagian signature di setiap formasi, bukan sekadar tambahan. Kami bekerja langsung
dengan pasangan, wedding planner, dan venue di seluruh Bali. Hubungi kami via WhatsApp untuk cek
ketersediaan tanggal Anda.
```

(Catatan: per `docs/SEO-STRATEGY.md` §8, permintaan pencarian Indonesia untuk kategori ini
nyaris nol — versi ID ini nilainya pada trust/UX untuk audiens berbahasa Indonesia yang
menemukan profil, bukan untuk menangkap volume pencarian ID.)

---

## 5. Services (5 Formasi + Piano+ Upsell)

> GBP "Services" tab mengizinkan kategori layanan + deskripsi singkat per item (umumnya tanpa
> harga publik — field harga di GBP **dikosongkan**, sesuai `CLAUDE.md` §9 yang melarang harga
> tampil dimanapun). Urutan di bawah meniru urutan formasi di `/packages` situs, piano selalu
> tampil di lineup pertama sesuai aturan flagship.

| #   | Nama Service (paste persis)        | Deskripsi singkat (paste persis, ≤300 char per item)                                                                                                                            |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Solo (Violin, Cello, or Piano)** | A single conservatory-trained musician — violin, cello, or piano — for an intimate ceremony or cocktail hour. Piano is a full solo option, not a lesser alternative to strings. |
| 2   | **Duo**                            | Two musicians performing together, arranged around your ceremony's pace. Piano + violin or piano + cello pairings available alongside string-only duos.                         |
| 3   | **Trio**                           | A three-piece formation balancing strings and piano for a fuller sound through ceremony and reception.                                                                          |
| 4   | **String Quartet**                 | Our most-requested formation for receptions — two violins, viola, and cello, with a "Piano +" upgrade available to add piano to the quartet sound.                              |
| 5   | **Large Ensemble**                 | Our fullest formation: string quartet, piano, and double bass — six musicians arranged for a complete ceremony-to-reception experience.                                         |
| 6   | **Piano + (upgrade add-on)**       | Add piano to any Duo, Trio, or String Quartet booking — piano holds the harmony and rhythm while strings carry the melody.                                                      |

**Catatan penting:** baris #6 ("Piano +") sengaja TIDAK dibuat sebagai item layanan utama
berdiri sendiri di posisi pertama — ini konsisten dengan `docs/SEO-STRATEGY.md` §3.0 yang
menemukan kombinasi "Piano + Quartet" dkk. punya nol volume pencarian; Piano+ adalah **strategi
upsell/produk**, sama seperti diperlakukan di halaman `/packages`, bukan keyword/H1 tersendiri.
Tampilkan sebagai item ke-6/terakhir di Services, bukan dihapus — calon klien yang sudah scroll
sampai bawah tetap perlu tahu opsi ini ada.

---

## 6. Attributes yang Relevan untuk Dicentang

> GBP attributes berfungsi sebagai filter pencarian (mis. "wedding musician dekat saya, online
> booking") — sumber: [setmore.com booking links guide](https://www.setmore.com/blog/booking-links-google-business-profile/).
> Centang hanya yang benar-benar berlaku; jangan centang demi mengisi kuota.

- **Online appointments** — jika owner ingin tombol konsultasi via WhatsApp dianggap sebagai
  booking link (lihat §10 untuk cara pasang link `wa.me`).
- **Identifies as Indonesian-owned** (jika atribut ini tersedia dan owner ingin mencantumkannya
  — opsional, keputusan owner, tidak ada data yang mewajibkan).
- **Online estimates** — jika owner nyaman menyediakan estimasi (bukan harga pasti) via
  WhatsApp setelah inquiry; pertimbangkan ini sebagai jembatan antara "tidak ada harga publik"
  dan "ada jalur estimasi" tanpa melanggar §9 CLAUDE.md (estimasi tetap diberikan manual via
  chat, tidak tertulis di profil).
- **LGBTQ+ friendly** — relevan untuk audiens destination wedding internasional jika sesuai
  dengan nilai bisnis owner; ini keputusan owner, bukan keputusan teknis.
- Jangan centang atribut terkait fasilitas fisik (parkir, wheelchair accessible, dine-in, dst.)
  — Allegra bukan venue, atribut-atribut itu tidak relevan dan bisa membingungkan SAB tanpa
  lokasi fisik.

---

## 7. Q&A Seeding (5-8 Pertanyaan — Gunakan HANYA Jika Fitur Masih Tersedia, lihat §2.4)

> Jika Q&A tidak muncul di dashboard GBP owner, isi ini tetap berguna sebagai draft tambahan
> untuk `/faq` di website (lihat `CLAUDE.md` § Journal/FAQ — `FAQPage` JSON-LD). Jawaban di
> bawah sudah tanpa harga, sesuai brand voice (warm, quietly credible, tanpa superlatif).

1. **Q: Do you perform at weddings outside Uluwatu, like Ubud or Canggu?**
   A: Yes — we perform across Bali, including Uluwatu, Ubud, Nusa Dua, Canggu, and Seminyak.
   Message us on WhatsApp with your venue and date to confirm availability.

2. **Q: Is piano available as a solo performance, or only with strings?**
   A: Piano is one of our Solo formation options on its own — it's a flagship part of every
   formation we offer, not an add-on. You can also add a "Piano +" upgrade to a Duo, Trio, or
   String Quartet booking.

3. **Q: What's the difference between a Duo, Trio, and String Quartet?**
   A: Duo and Trio are smaller, intimate formations suited to a quiet ceremony; String Quartet
   is our most-requested formation for receptions. All formations can include piano. Our
   Repertoire and Packages pages have the full breakdown.

4. **Q: Can you play our first dance song or a specific request?**
   A: Yes — arrangements are built around your own songs, including first dance and processional
   music. Send us your song list and we'll confirm what's possible for your formation.

5. **Q: Do you work with wedding planners and venues directly?**
   A: Yes — we regularly coordinate directly with planners and venues on logistics like stage
   plot, tech rider, and repertoire sheets. See our planner-facing page for details.

6. **Q: How do I check availability for my wedding date?**
   A: Message us on WhatsApp with your date and venue — we'll confirm availability and walk you
   through formation options from there.

7. **Q: Are you based in Bali, or do you travel from elsewhere?**
   A: We're based in Bali and perform across the island for ceremonies and receptions — we don't
   fly in from another country for each booking.

8. **Q: What's included in a Large Ensemble booking?**
   A: Our Large Ensemble is a six-piece formation: string quartet, piano, and double bass —
   arranged for a full ceremony-to-reception sound. The exact instrumentation can be customized
   on request.

---

## 8. Rencana Posts — 4 Minggu Pertama

> Sumber frekuensi: [HigherVisibility — How Often Should You Post](https://www.highervisibility.com/seo/learn/how-often-post-google-business-profile/),
> konsensus 2026: minimum 1x/minggu, optimal 2-3x/minggu untuk pasar kompetitif — Allegra cukup
> **1x/minggu** (pasar niche, bukan kompetitif tinggi, dan ini menghindari beban konten
> berlebihan di atas kewajiban Instagram yang sudah ada di sprint plan). Selalu pakai foto/video
> asli (bukan stok), caption singkat tanpa hard-sell, 1 CTA (link `/packages`, `/for-planners`,
> atau WhatsApp).

| Minggu | Judul/Angle Post                                                                                                                                         | Link CTA                         |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| 1      | **"Piano holds the harmony, strings carry the melody"** — reuse foto/video pianis yang sudah ada izin pakai (asset terkuat saat ini).                    | `/packages` (anchor Solo Piano)  |
| 2      | **"From an intimate duo to a six-piece ensemble"** — showcase rentang formasi (Solo → Large Ensemble), reuse ide caption #3 dari sprint plan.            | `/packages`                      |
| 3      | **"New on the Journal: what to expect from a wedding pianist in Bali"** — promosikan artikel Journal yang sudah live (`/journal/wedding-pianist-bali/`). | `/journal/wedding-pianist-bali/` |
| 4      | **"Planning with a wedding planner or venue?"** — angle B2B, reliability-over-romance tone sesuai brand voice For-Planners.                              | `/for-planners`                  |

Setelah 4 minggu pertama, lanjutkan kadens 1x/minggu dengan rotasi: showcase formasi → konten
Journal terbaru → angle B2B → ulangi, sinkron dengan kalender Instagram yang sudah ada di
`docs/MARKETING-SPRINT-2026-06.md`.

---

## 9. Foto — Checklist Jenis & Spesifikasi

> Spesifikasi sumber: [postfa.st GBP cover photo sizing](https://postfa.st/sizes/google-business-profile/cover),
> [socialrails.com profile photo sizing](https://socialrails.com/sizes/google-business-profile/profile),
> data engagement: profil dengan 15+ foto menerima signifikan lebih banyak direction-request dan
> klik website dibanding profil minim foto ([storyvenuemarketing.com](https://storyvenuemarketing.com/google-my-business-for-wedding-venues-complete-guide-2026/)).

**Spesifikasi teknis (2026):**

| Jenis                | Rasio/Ukuran                                                   | Format/Limit          |
| -------------------- | -------------------------------------------------------------- | --------------------- |
| Logo                 | 720×720px, rasio 1:1 (minimal 250×250px)                       | JPG/PNG, 10KB–5MB     |
| Cover photo          | 1024×576px (16:9), upload hingga 1920×1080px untuk hasil tajam | JPG/PNG, di bawah 5MB |
| Foto profil tambahan | 720×720px, rasio 1:1 (maks upload 1080×1080px)                 | JPG/PNG               |
| Foto post            | 1200×900px, rasio 4:3                                          | JPG/PNG               |

**Checklist jenis foto yang dibutuhkan (target minimal 15 foto untuk profil baru):**

- [ ] Logo Allegra Chamber Bali (sudah ada di repo aset brand — pastikan versi 1:1 terbaru
      dipakai, bukan logo dengan rasio lain yang ter-crop otomatis).
- [ ] Foto/video pianis yang sudah ada izin pakai (2026-06-18) — jadikan salah satu foto utama,
      bukan disimpan untuk Instagram saja.
- [ ] Minimal 1 foto per formasi (Solo, Duo, Trio, Quartet, Large Ensemble) — **belum ada di
      tangan untuk semua formasi**, lihat §10 untuk gap aset.
- [ ] Foto suasana performance (musisi sedang bermain, bukan foto pose studio) — sesuai aesthetic
      "real Bali wedding/venue photography is the hero" di `CLAUDE.md`.
- [ ] **JANGAN** memakai foto venue/lokasi yang belum ada izin pakai — `docs/PROGRESS.md` &
      `MARKETING-SPRINT-2026-06.md` mencatat foto venue beach/chapel/ballroom belum tersedia.
- [ ] **JANGAN** memakai foto generik/stok yang tidak mewakili Allegra secara nyata — melanggar
      kebijakan representasi Google dan brand voice "sensory and Bali-specific."

**Video:** jika ada video performance pendek (15-30 detik) selain yang sudah dipakai di home
page (`feat: add featured wedding video embed`), upload juga ke GBP — video pada profil GBP
meningkatkan engagement dan relevan untuk audiens yang ingin "mendengar" sebelum booking.

---

## 10. Strategi Review

> Sumber: [Birdeye — Google Review Policy 2026](https://birdeye.com/blog/google-review-policy/),
> [Three Chapter Media — Review Policy 2026](https://www.threechaptermedia.com/blog/google-review-policy-2026).
> **Update kebijakan awal 2026 yang wajib dipatuhi:** review gating (menyaring pelanggan
> berdasarkan sentimen sebelum kirim link review), insentif review (diskon/hadiah), kuota review
> staf, dan menyebut nama karyawan secara spesifik untuk memancing review — **semua sekarang
> dilarang & ditegakkan aktif**. Ini relevan karena testimoni nyata masih jadi gap konten
> Allegra (lihat `docs/PROGRESS.md` Next steps) — review GBP adalah jalur lain untuk menutup
> gap kepercayaan yang sama, harus dijalankan sesuai aturan dari awal.

### Cara minta review (compliant)

1. **Kirim WhatsApp message singkat ke setiap klien setelah hari pernikahan mereka** (semua
   klien, bukan hanya yang terlihat senang — Google melarang penyaringan sentimen). Lampirkan
   link review langsung (`g.page/r/.../review` — owner generate link ini dari dashboard GBP
   setelah profil live).
2. **Jangan meminta rating bintang tertentu** ("tolong beri 5 bintang") — cukup minta "ulasan
   jujur" atau "ceritakan pengalaman Anda."
3. **Jangan menawarkan insentif apapun** (diskon booking selanjutnya, hadiah) sebagai imbalan
   review — ini melanggar kebijakan dan berisiko review dihapus/profil ditandai.
4. Manfaatkan form testimoni yang sudah ada (`/share-your-story`, lihat `docs/PROGRESS.md`
   2026-06-22) sebagai momen alami untuk juga menyelipkan link Google review — dua kanal
   (testimoni situs + Google review) bisa diminta dalam satu pesan yang sama.

### Template balas review (PLACEHOLDER — bukan kutipan asli, jangan dipublikasikan sebagai contoh ulasan nyata)

> **[TEMPLATE balasan untuk review positif]**
> "Thank you for sharing this, [Name] — it meant a lot to be part of your day at [venue, jika
>
> > disebutkan]. Wishing you both all the best."

> **[TEMPLATE balasan untuk review negatif/keluhan]**
> "Thank you for the feedback, [Name]. We're sorry this didn't meet your expectations — we'd
> like to understand more and make it right. Please reach out to us directly at
> allegrachamberbali@gmail.com or WhatsApp so we can follow up properly."

Target waktu respons: 24-48 jam untuk semua review (24 jam untuk negatif, 48 jam untuk positif)
— sesuai konsensus best-practice 2026. Selalu balas, baik positif maupun negatif — engagement
aktif adalah sinyal yang dilihat algoritma local-pack.

---

## 11. Checklist NAP-Consistency Lintas Listing

> Terkait langsung dengan tabel directory submission yang sudah ada di
> `docs/MARKETING-SPRINT-2026-06.md` ("Tracker directory submission"). GBP **harus dianggap
> sebagai sumber NAP master** — isi listing lain (Bing Places, Bridestory, dst.) harus identik
> persis dengan apa yang diisi di GBP, termasuk format nomor telepon dan kapitalisasi nama
> bisnis.

- [ ] **Bing Places for Business** — sinkronkan nama, nomor WA (`+62 857-0824-7611`), email,
      website, dan deskripsi bisnis **persis sama** dengan GBP (bukan diparafrase ulang).
- [ ] **Bridestory** — nama vendor harus persis `Allegra Chamber Bali` (bukan singkatan/variasi).
- [ ] **Hello Bali Wedding**, **The Bali Bride**, **Easy Weddings**, **WeddingWire**,
      **The Knot**, **Yelp for Business**, **Facebook Business Page**, **Here Comes The Guide**,
      **Hotfrog/Manta** — semua harus pakai NAP identik: nama bisnis, nomor WA dalam format
      konsisten (`+62 857-0824-7611`, jangan campur format `0857...` di listing lain), email
      `allegrachamberbali@gmail.com`, website `https://allegra.indonesiaistimewastudio.id`.
- [ ] Setelah GBP live, **catat tanggal & kategori final yang dipilih** di sini agar listing
      berikutnya bisa menyalin kategori yang sama persis (mis. jika GBP akhirnya pakai "Wedding
      service" sebagai primary, Bing Places sebaiknya juga pakai kategori paralel yang sama).
- [ ] Blurb deskripsi: gunakan **Approved Copy positioning statement** yang sudah dicatat di
      `docs/MARKETING-SPRINT-2026-06.md` ("Allegra Chamber Bali brings refined live chamber
      music to weddings across Bali...") untuk listing yang field deskripsinya pendek/generik —
      untuk GBP sendiri pakai versi §4 di atas yang sudah dioptimalkan keyword secara spesifik
      untuk format GBP (≤750 karakter, menyuntikkan "wedding musician"/"wedding pianist").

---

## 12. Owner Action Items (Final — Hanya yang Benar-Benar Kosong)

> Daftar ini sudah dikoreksi dari asumsi awal task — WhatsApp dan Instagram **bukan** lagi item
> kosong (lihat koreksi di §1). Berikut yang **benar-benar** butuh input/aksi owner karena Claude
> Code tidak punya datanya atau tidak bisa mengeksekusinya:

1. **Buat/klaim profil GBP** di business.google.com — login dengan akun Google milik bisnis
   (bukan akun pribadi campur-aduk, agar mudah transfer kepemilikan di masa depan bila perlu).
2. **Cek dulu apakah listing sudah ada tapi belum diklaim** — Google terkadang auto-generate
   listing dari data pihak ketiga; cari "Allegra Chamber Bali" di Google Maps sebelum membuat
   baru, untuk menghindari duplikat.
3. **Ketik & verifikasi nama kategori persis** ("Band", "Entertainer", "Musician", "Wedding
   service") di field kategori GBP — pilih yang benar-benar muncul di dropdown, sesuai §2.2.
4. **Putuskan primary category final** (Band vs Wedding service, jika keduanya valid) —
   keputusan ini sebaiknya owner ambil sambil melihat preview hasil pencarian yang Google
   tampilkan saat setup.
5. **Siapkan alamat verifikasi internal** (alamat domisili nyata, tidak publik) atau cek opsi
   verifikasi video jika GBP menawarkannya untuk service-area business tanpa kantor (§2.3).
6. **Generate link review GBP** (`g.page/r/...`) setelah profil live & terverifikasi, untuk
   dipakai di pesan follow-up klien (§10).
7. **Upload foto** sesuai checklist §9 — terutama menunggu foto formasi yang belum ada di tangan
   (gap yang sama dengan yang sudah dicatat di `docs/PROGRESS.md`/sprint plan: testimoni nyata
   dan foto venue beach/chapel/ballroom belum tersedia).
8. **Cek apakah field Q&A muncul** di dashboard GBP owner saat setup — jika ya, paste draft §7;
   jika tidak (kemungkinan besar untuk profil baru per §2.4), lewati dan fokuskan effort ke
   Business Description + Services yang lengkap.
9. **Eksekusi rencana Posts 4 minggu** di §8 — publish manual setiap minggu, tidak otomatis.
10. **Update tracker directory submission** di `docs/MARKETING-SPRINT-2026-06.md` baris #1
    (Google Business Profile) dari "Belum (Sprint Hari 1)" menjadi status nyata begitu profil
    live & terverifikasi, lalu lanjutkan checklist NAP-consistency di §11 dokumen ini untuk
    listing-listing berikutnya.

---

## Sumber Riset (WebSearch, Juni 2026)

- [Google Business Profile Community — kategori band musik](https://support.google.com/business/thread/84744455/what-categories-in-google-is-a-music-band?hl=en)
- [daltonluka.com — Google Business Profile Categories Complete List 2026](https://daltonluka.com/blog/google-my-business-categories)
- [Google Business Profile Help — Manage your business category](https://support.google.com/business/answer/7249669?hl=en)
- [Google Business Profile Help — Manage your business address](https://support.google.com/business/answer/2853879?hl=en)
- [rankai.ai — Service Area Business GBP Guide 2026](https://rankai.ai/articles/service-area-business-google-business-profile-guide)
- [North County Digital — GBP Q&A Discontinued](https://www.northcountydigital.com/marketing-blog/google-business-profile-qa-discontinued)
- [Tall Boy Marketing — Why Google Removed Business Profile Q&A](https://www.tallboymarketing.com/google-business-profile-removes-qa)
- [Google for Developers — Q&A API change log](https://developers.google.com/my-business/content/qanda/change-log)
- [HigherVisibility — How Often Should You Post on GBP](https://www.highervisibility.com/seo/learn/how-often-post-google-business-profile/)
- [Birdeye — Google Review Policy 2026](https://birdeye.com/blog/google-review-policy/)
- [Three Chapter Media — Google Review Policy 2026: What Changed](https://www.threechaptermedia.com/blog/google-review-policy-2026)
- [postfa.st — GBP cover photo specs](https://postfa.st/sizes/google-business-profile/cover)
- [socialrails.com — GBP profile photo specs](https://socialrails.com/sizes/google-business-profile/profile)
- [storyvenuemarketing.com — Google My Business for Wedding Venues 2026](https://storyvenuemarketing.com/google-my-business-for-wedding-venues-complete-guide-2026/)
- [Setmore — Add Booking Links to GBP](https://www.setmore.com/blog/booking-links-google-business-profile/)
- [nergisyuksel.com — GBP for Wedding Professionals](https://www.nergisyuksel.com/wedding-seo-blog/google-business-profile-for-wedding-businesses)
