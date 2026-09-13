# Laporan Kompetitor, Outlier & Gap — Allegra Chamber Bali

> Dibuat: 2026-09-14. Menggantikan peta kompetitor di `docs/COMPETITOR-PROFILES.md` (2026-06-28,
> hanya 3–4 pemain) — profil lama tetap valid sebagai detail Silaen/BEA/DIVO.
> Persona dasar diambil dari `docs/CUSTOMER-RESEARCH.md` (2026-06-28).

---

## 0. Ringkasan Eksekutif

1. **Kompetitor langsung yang sesungguhnya adalah Moira Ensembles**, tidak tercatat di riset Juni.
   Mereka menempati 5 dari 15 hasil teratas untuk "string quartet bali wedding" (semuanya
   Instagram/Facebook). Tanpa website sendiri, Instagram mereka 2,8K follower / 548 post.
2. **Allegra sebenarnya sudah terlihat di Google**: posisi ~3–4 untuk "string quartet bali
   wedding" dan posisi ~4 untuk "wedding pianist bali" (artikel). Tapi total GSC 90 hari hanya
   **±26 klik dari ±1.200 impresi**. Masalahnya bukan lagi "tidak ditemukan", tapi **tidak
   dipilih**: SERP Bali didominasi Instagram dan grup Facebook, jadi calon klien memutuskan
   berdasarkan bukti sosial dan video, dua hal yang paling lemah di Allegra (0 testimoni, IG 52
   follower / 9 post).
3. **Tidak ada satu pun kompetitor lokal yang membantu calon klien memilih.** Tidak ada finder
   formasi, panduan per momen/jumlah tamu/tipe venue, pratinjau aransemen, atau alur khusus
   untuk pasangan yang merencanakan dari luar negeri. Ini gap yang paling murah diisi dan paling
   selaras dengan psikologi pembeli (lihat §7).
4. **Tiga value jual yang benar-benar belum dimiliki siapa pun:** (a) piano sudah termasuk di
   setiap ensemble, (b) "lagu Anda, diaransemen untuk piano & gesek" sebagai inti produk,
   bukan tambahan (Moira mengenakan biaya ekstra untuk aransemen), (c) situs bilingual dengan
   dokumen logistik siap-planner.
5. **Pola outlier konten** di niche ini jelas dan berbiaya produksi rendah: _song-request
   reveal_, _"Imagine [lagu] as your wedding entrance"_, dan _collab post_ dengan
   videografer/WO. Hampir semua outlier memakai biola/kuartet, **nyaris tidak ada versi piano +
   gesek**. Itu celah konten milik Allegra.

---

## 1. Metodologi & Batasan

| Sumber                                          | Dipakai untuk                                       | Catatan                                                                     |
| ----------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |
| Google Search Console (domain property)         | Performa Allegra 90 hari (query, halaman)           | Query bervolume kecil disembunyikan Google, jadi banyak klik "tak berlabel" |
| Firecrawl search (lokasi AU/US/UK/ID)           | Snapshot SERP 8 kueri                               | Snapshot, bukan rank-tracker; posisi bisa beda per perangkat/waktu          |
| Firecrawl scrape (ekstraksi terstruktur)        | Fitur situs 8 kompetitor + 1 benchmark              | Data per 2026-09-14                                                         |
| vidIQ Instagram/TikTok outlier search + IG data | Laporan outlier niche & akun Moira/Baliyostring     | View = angka platform saat diambil                                          |
| Repo Allegra (`src/`)                           | Audit fitur/alur Allegra saat ini                   | —                                                                           |
| **Tidak tersedia**                              | DataForSEO (kredit habis, HTTP 402), GA4 (re-login) | Volume keyword & data konversi on-site belum masuk laporan ini              |

Kompetitor yang hanya terlihat dari snippet SERP/profil IG (Baliyostring, Real Entertainment
Bali, Bali Violinist, Claudia Amerta) ditandai **"data terbatas"**. Jangan dikutip sebagai fakta
lengkap.

---

## 2. Posisi Allegra Saat Ini

### 2.1 Snapshot SERP (2026-09-14)

| Kueri (lokasi)                                 | Posisi Allegra                           | Hasil #1                            |
| ---------------------------------------------- | ---------------------------------------- | ----------------------------------- |
| string quartet bali wedding (AU)               | **#4** (homepage)                        | IG @moira.ensembles                 |
| bali string quartet wedding ceremony hire (US) | **#3** (homepage)                        | IG reel Moira                       |
| string quartet pernikahan bali (ID)            | **#4** (`/id/`)                          | IG @moira.ensembles                 |
| wedding pianist bali (AU)                      | **#4** (artikel `wedding-pianist-bali`)  | Grup Facebook "Pianist for wedding" |
| wedding musicians bali (AU)                    | tidak di top 15                          | Grup Facebook (rekomendasi)         |
| wedding violinist bali (AU)                    | tidak di top 15                          | IG @claudiaamerta                   |
| live music for bali wedding ceremony (UK)      | #9 (artikel `wedding-music-budget-bali`) | Bali Wedding Solutions `/music/`    |

**Pola SERP:** ±40–50% dari 15 hasil teratas adalah Instagram, Facebook group, dan YouTube. Orang yang
mencari musisi wedding Bali **mencari bukti visual dan rekomendasi orang lain**, bukan halaman
layanan. Google sendiri mengarahkan ke sana.

### 2.2 GSC 90 hari — halaman

| Halaman                                  | Klik | Impresi | Posisi | Catatan                                                 |
| ---------------------------------------- | ---: | ------: | -----: | ------------------------------------------------------- |
| `/` (EN)                                 |   12 |     134 |    7,8 | CTR 9% — sehat                                          |
| `/id/`                                   |    2 |      70 |    7,6 |                                                         |
| `/packages/`                             |    2 |      70 |    9,6 | CTR 2,9% — judul/meta kurang menjawab "mana yang cocok" |
| `/for-planners/`                         |    0 |      53 |    8,1 | **0 klik** — meta tidak berbicara ke planner            |
| `/journal/wedding-ceremony-piano-music/` |    0 |      58 |   10,1 | Hampir halaman 1, 0 klik                                |
| `/journal/wedding-prelude-music/`        |    0 |      50 |   36,6 | Topik global, sulit menang                              |
| `/privacy/`                              |    0 |      48 |    5,1 | Impresi terbuang                                        |
| `/thank-you/` (EN & ID)                  |    1 |      13 |      — | **Terindeks — seharusnya `noindex`** (bug, lihat §8 P0) |

---

## 3. Peta Kompetitor (15 pemain + 1 benchmark)

### 3.1 Segmentasi

| Tier                                  | Pemain                                                                                     | Kenapa relevan                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **A. Langsung — ensemble gesek Bali** | Moira Ensembles, Baliyostring\*, Real Entertainment Bali\*                                 | Produk sama, pembeli sama                                              |
| **B. Solois gesek/piano**             | Bali Violinist (Adinda Laksmi)\*, Claudia Amerta\*, Bezaliel Yehuda (pianist, YouTube)\*   | Merebut pasangan "Solo" dan budget kecil                               |
| **C. Solois premium fly-in**          | Anna Edelweiss (Santorini Violinist), Alan Milan\*                                         | Merebut pasangan luxury yang menilai "nama" dan reputasi internasional |
| **D. Band vokal/cover**               | Silaen Music, La Puja, LOVA, Bali Live Entertainment (Iraga), Bali Singer (Phil Stoodley)  | Anggaran musik yang sama, beda kategori                                |
| **E. Agensi & marketplace**           | Bali Entertainment Agency, FixTheMusic, Bali Wedding Music, The Seven Agency               | Menangkap trafik generik, one-stop                                     |
| **F. Gatekeeper (WO/venue)**          | Bali Wedding Solutions, Magical Bali Wedding, Honey + Stone Events (AU), Tirtha (in-house) | Mereka yang merekomendasikan vendor musik ke pasangan                  |
| **Benchmark internasional**           | String Musicians Australia (SMA)                                                           | Standar "best-in-class" konversi situs kuartet wedding                 |

\* data terbatas (snippet SERP / profil IG saja)

### 3.2 Profil kunci — Moira Ensembles (ancaman #1)

| Metrik               | Data                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| Positioning (IG bio) | "String Quartet / Trio / Duo / Solo for hire. Specialise in Ambience & Ceremony Music"                  |
| Formasi              | Solo → Duo → Trio → Quartet → Quintet; juga piano, gitar, sax, vokal, band, choir, harpa                |
| Harga (Bridestory)   | Tidak ditampilkan angkanya; **dihitung per sesi 45 menit**                                              |
| Aransemen            | "Requests possible if informed in advance; **extra charges may apply** for music sheets arrangements"   |
| Review               | Bridestory: **1 review**, 14 proyek                                                                     |
| Website              | ❌ Tidak ada — IG, FB, YouTube, Bridestory, WhatsApp                                                    |
| Instagram            | 2,8K follower, 548 post; median reel ~3K plays                                                          |
| Distribusi           | Tag venue (Tirtha), WO (luxurywed…), videografer (#mvbehindthewed)                                      |
| Kelemahan            | Tidak ada situs/SEO, harga aransemen tambahan, piano hanya salah satu instrumen, 1 review, copy generik |

**Implikasi:** Moira menang karena volume konten dan jejaring vendor, bukan karena kualitas
situs atau kejelasan penawaran. Allegra tidak perlu mengalahkan 548 post. Cukup menang di
**kejelasan + bukti + aransemen**, lalu meniru mekanisme distribusi collab-nya.

### 3.3 Ringkasan pemain lain (baru di laporan ini)

| Pemain                        | Temuan penting                                                                                                                                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FixTheMusic** (marketplace) | Halaman Bali: harga £1.348–£15.000, Trustpilot, kredit venue (AYANA, Conrad, Mulia, St. Regis, Banyan Tree), filter budget/event. **Tidak ada satu pun act gesek/piano** di listing Bali, semua band/DJ/sax |
| **Bali Wedding Solutions**    | Halaman `/music/` rank #1 UK tapi terakhir diubah **2019**; string quartet disebut sebagai opsi, tanpa sampel/harga                                                                                         |
| **Magical Bali Wedding**      | Halaman "Live Ceremony Music" (2025): violin/string quartet/piano/sax, tagline "A soundtrack for your vows", tanpa sampel/harga. WO ini _mengambil vendor_, jadi calon **partner**, bukan musuh             |
| **Honey + Stone Events (AU)** | Planner Australia: "FREE Phone + Zoom", roster DJ/band/solo, tanpa sampel. Menunjukkan pasangan AU butuh **konsultasi jarak jauh**                                                                          |
| **Anna Edelweiss**            | Fly-in "world-renowned violinist", halaman Bali tanpa sampel, harga, maupun testimoni; hanya otoritas nama                                                                                                  |
| **Silaen Music**              | Masih kuat di bukti: testimoni bernama + venue (Alila Seminyak, Ubud), sampel audio "Live at Tirtha", FAQ + booking checklist                                                                               |
| **SMA (benchmark AU)**        | 335 review, 3.000+ lagu, **390 rekaman**, alur pilih 4 lagu (1–2 processional, 1–2 signing, 1 recessional), deposit $500 + saldo H-30 transparan, kredit 365 hari jika batal                                |

---

## 4. Laporan Outlier

### 4.1 Outlier akun kompetitor — Moira Ensembles (12 reel terakhir)

| Reel                       | Plays      | vs median (~3K) | Kenapa meledak                                                                                                                    |
| -------------------------- | ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| DarjuP4udh0 (2026-07-12)   | **269,2K** | **~90x**        | **Collab post** (#mvbehindthewed, videografer). Hook emosional: reaksi mempelai pria saat pengantin wanita berjalan. Venue tebing |
| DdOSY_PSNiQ (2026-09-13)   | 18,1K      | ~6x             | Diposting pihak lain, Moira hanya dikredit "Entertainment: @moira.ensembles". Visual spektakuler (kembang api di aisle)           |
| Da5XS2gu6GA (2026-07-17)   | 13,0K      | ~4x             | Collab videografer, upacara tebing, caption naratif nama pasangan                                                                 |
| Reel milik sendiri lainnya | 0,7K–3,8K  | ≤1x             | Caption generik ("Love is in every note"), close-up musisi                                                                        |

**Pelajaran:** reel Moira yang meledak **bukan tentang musisinya**. Isinya momen emosional
pasangan, diunggah bersama akun vendor lain. Musik tetap menjadi "rasa" dari video itu.

### 4.2 Outlier niche global (Instagram & TikTok, 2025-09 s/d 2026-09)

| Kreator                   | Platform | Views | Outlier score | Hook (0–3 detik)                                                                    |
| ------------------------- | -------- | ----- | ------------- | ----------------------------------------------------------------------------------- |
| @rvaharpist               | IG       | 8,7M  | 1.119x        | "because your first married kiss shouldn't be in silence" (Imperial March)          |
| @allieviolin              | IG       | 5,6M  | **2.885x**    | "Would you walk down the aisle to this song? First time I've received this request" |
| @jasminegiffin\_          | TikTok   | 5,6M  | 360x          | "the most special moment from our wedding was about to happen"                      |
| @elegancequartet          | TikTok   | 4,9M  | 11,6x         | "when the groom's processional is 20 Min by Lil Uzi"                                |
| @cassidy_franco           | TikTok   | 3,8M  | 156x          | "my bridal entrance that I will never stop talking about" (piano)                   |
| @cotswoldweddingguitarist | IG       | 3,0M  | 193x          | "The guests couldn't stop talking about this…" (papan request lagu)                 |
| @itsamoney                | IG       | 2,0M  | 43,6x         | "Imagine 'Yeshua' as a Wedding Entrance 💍"                                         |
| @charlotte.violinist      | TikTok   | 1,6M  | 6,5x          | "you can play literally ANY song at your wedding as long as it's instrumental"      |
| @hugo_hui                 | TikTok   | 1,6M  | 68x           | "POV: MS3 plays at your wedding 💍"                                                 |
| @city6strings             | IG       | 470K  | 177x          | "Our bride requested Yellow by Coldplay for her entrance…"                          |
| @violinbymel              | TikTok   | 226K  | 226x          | "THE WEDDING THAT STOPPED THE INTERNET"                                             |
| @thecollectiveconceptsuk  | TikTok   | 100K  | 126x          | "pov you book an ibiza style string quartet for your wedding"                       |

### 4.3 Formula yang berulang (≥2 outlier per pola)

| #   | Formula                                             | Bukti                                                             | Psikologi                                                        | Adaptasi Allegra                                                                                             |
| --- | --------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| F1  | **Song-request reveal** (lagu tak terduga di gesek) | allieviolin, elegancequartet, city6strings, rvaharpist, charlotte | Kejutan + identitas ("kalau lagu itu bisa, lagu kami juga bisa") | "Our couple asked for [lagu] — here it is on piano & strings." Membuktikan USP aransemen                     |
| F2  | **"Imagine [lagu] as your wedding entrance"**       | itsamoney, davidbaymusic, chelseyjohnson                          | Simulasi mental, membayangkan diri di aisle                      | Seri di spot Bali (tebing, sawah, pantai). **Versi piano + gesek hampir tidak ada di outlier**, jadi pembeda |
| F3  | **Momen emosional pasangan, musik sebagai lapisan** | Moira 269K, jasminegiffin, cassidy_franco                         | Empati/vicarious emotion                                         | Minta klip dari videografer, collab post, caption naratif                                                    |
| F4  | **POV musisi di pernikahan Anda**                   | hugo_hui, thecollectiveconceptsuk                                 | Menempatkan penonton sebagai pasangan                            | Kamera dari balik piano ke arah aisle Uluwatu                                                                |
| F5  | **Interaksi tamu / "guests couldn't stop talking"** | cotswoldweddingguitarist, violinbymel                             | Bukti sosial + FOMO tamu                                         | Hook memakai bahasa VOC di `CUSTOMER-RESEARCH.md` Tema 2                                                     |

Hampir semua outlier diproduksi **"within an hour"** dengan satu shot statis. Hambatannya bukan
biaya produksi, tapi **akses ke momen** dan **izin pasangan**. Karena itu `/share-your-story` dan
klausul izin konten di kontrak menjadi aset konten, bukan hanya aset testimoni.

---

## 5. Matriks Fitur — Sudah Ada vs Belum

✅ ada · ⚠️ sebagian/lemah · ❌ tidak ada · — tidak relevan/tidak diketahui

| Fitur                                  | **Allegra**                          | Moira           | Silaen       | BEA          | FixTheMusic   | WO (BWS/Magical) | Anna E.    | **SMA (benchmark)** |
| -------------------------------------- | ------------------------------------ | --------------- | ------------ | ------------ | ------------- | ---------------- | ---------- | ------------------- |
| Website sendiri + SEO                  | ✅ bilingual, 21 artikel             | ❌              | ✅           | ⚠️ templated | ✅            | ⚠️               | ✅         | ✅                  |
| Piano termasuk di ensemble             | ✅ **unik**                          | ❌ terpisah     | ❌           | ❌           | ❌            | ❌               | ❌         | ❌                  |
| Aransemen lagu custom                  | ✅ ("with enough notice")            | ⚠️ biaya ekstra | ⚠️ cover     | ⚠️           | —             | ⚠️               | ❌         | ✅ 3.000+ lagu      |
| Sampel audio/video                     | ⚠️ 1 video + audio                   | ✅ ratusan reel | ✅ audio     | ❌ stok      | ✅            | ⚠️ YouTube (BWS) | ❌         | ✅ 390 rekaman      |
| Daftar repertoar                       | ⚠️ 40 lagu                           | ❌              | ⚠️ contoh    | ❌           | —             | ❌               | ❌         | ✅                  |
| Testimoni / review                     | ❌ **0**                             | ⚠️ 1            | ✅           | ❌           | ✅ Trustpilot | ❌               | ❌         | ✅ 335              |
| Kredit venue nyata                     | ✅ 3 venue                           | ⚠️ tag IG       | ✅           | ❌           | ✅            | ❌               | ⚠️ generik | —                   |
| Harga / struktur harga                 | ❌ (keputusan owner)                 | ⚠️ per 45 mnt   | ❌           | ❌           | ✅ rentang    | ❌               | ❌         | ✅ + deposit        |
| Panduan pilih formasi (finder/kuis)    | ❌                                   | ❌              | ❌           | ❌           | ⚠️ filter     | ❌               | ❌         | ⚠️ saran durasi     |
| Musik per momen dihubungkan ke formasi | ⚠️ section Moments tanpa link        | ⚠️ caption      | ❌           | ❌           | ❌            | ⚠️               | ❌         | ✅ alur 4 lagu      |
| Alur request lagu                      | ⚠️ via FAQ/form bebas                | ⚠️ WA           | ❌           | ❌           | ❌            | ❌               | ❌         | ✅                  |
| Halaman planner/B2B + dokumen logistik | ✅ `/for-planners` + unduhan         | ❌              | ⚠️ checklist | ❌           | ❌            | —                | ❌         | ⚠️                  |
| Janji waktu respons                    | ⚠️ 24 jam (hanya di halaman planner) | ❌              | ❌           | ⚠️ "7/365"   | ❌            | ❌               | ❌         | ✅                  |
| Konsultasi jarak jauh (call/Zoom)      | ❌                                   | ❌              | ❌           | ❌           | ❌            | ✅ Honey+Stone   | ❌         | ✅ phone/email      |
| Kebijakan batal/cuaca                  | ⚠️ syarat shade/permukaan saja       | ❌              | ❌           | ❌           | ⚠️            | ❌               | ❌         | ✅ kredit 365 hari  |
| FAQ + schema                           | ✅                                   | ❌              | ⚠️           | ❌           | ✅            | ❌               | ❌         | ✅                  |
| Kehadiran Instagram                    | ❌ 52 follower / 9 post              | ✅ 2,8K / 548   | ✅           | ⚠️           | —             | ✅               | ✅         | ✅                  |

---

## 6. Gap → Value Jual Utama

### 6.1 Gap yang kosong di pasar (belum dimiliki kompetitor Bali mana pun)

| #   | Gap                                                               | Bukti gap                                                                                       | Allegra siap?                         |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------- |
| G1  | **Piano + gesek sebagai satu suara**                              | Semua pihak menjual piano sebagai instrumen terpisah; hampir semua outlier sosial memakai biola | ✅ sudah jadi kebijakan (2026-07-09)  |
| G2  | **Aransemen lagu pasangan sebagai inti, bukan tambahan**          | Moira: "extra charges may apply"; band: cover                                                   | ⚠️ perlu keputusan owner (lihat §9)   |
| G3  | **Bantuan memilih** (formasi × momen × tamu × venue)              | 0 dari 15 pemain Bali                                                                           | ❌ bisa dibangun statis               |
| G4  | **Rencanakan dari luar negeri dengan tenang**                     | Hanya planner AU (Honey+Stone) yang menawarkan call; vendor musik tidak ada                     | ⚠️ WA ada, belum dikemas              |
| G5  | **Transparansi tanpa harga**: apa yang termasuk, durasi set, alur | FixTheMusic/SMA transparan; vendor Bali semua "contact us"                                      | ⚠️ `HowBookingWorks` ada, belum rinci |
| G6  | **Dokumen logistik siap-planner** (tech rider, stage plot)        | Tidak ada vendor Bali yang mempublikasikan                                                      | ✅ `/for-planners` downloads          |
| G7  | **Konten piano + gesek dengan formula outlier**                   | Outlier F1/F2 hampir semua biola/kuartet                                                        | ❌ belum diproduksi                   |

### 6.2 Rekomendasi positioning (draf, perlu cek brand voice & owner)

> **Inti:** _Bali's piano & string ensemble — your song, arranged for the moment it belongs to._

Tiga pilar, masing-masing melawan kelemahan kompetitor tertentu:

1. **Signature Sound — piano di setiap ensemble.** Melawan Moira/band (piano terpisah atau
   keyboard ritmis). Sudah sesuai aturan "Signature Sound" di brand voice.
2. **Your song, arranged.** Melawan cover band dan biaya aransemen ekstra Moira. Jadi hook F1
   di sosial. _Klaim "included" hanya boleh dipakai jika owner mengonfirmasi (§9)._
3. **Calm planning, from anywhere.** Melawan "contact us" generik di semua kompetitor: finder
   formasi, alur yang jelas, waktu respons, dokumen planner. Selaras dengan voice trait
   "Effortless & calm" (tanpa taktik urgensi).

**Bukti yang wajib ditutup dulu** agar pilar tidak terdengar kosong: testimoni nyata, 3–5 klip
video momen upacara, dan Instagram aktif.

---

## 7. Optimasi: Menemukan & Mengarahkan Pengunjung Sesuai Kebutuhan

### 7.1 Peta jalur masuk per persona

| Persona / tahap                                             | Cara menemukan                                                                  | Pikiran di kepala                                         | Pendorong psikologis                     | Halaman tujuan ideal                                                        | CTA                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| **P1 Ceremony Purist — sadar masalah** ("musik apa?")       | Pinterest/IG reels, artikel "processional songs", "how many songs"              | "Upacara kami jangan terasa generik"                      | Simulasi mental, identitas               | Artikel journal → **modul "Moments"** → audio per momen                     | "Hear it for your entrance" → finder        |
| **P1 — membandingkan solusi** (band vs kuartet vs playlist) | "wedding band vs DJ", "string quartet bali wedding"                             | "Worth it? Bisa lagu kami?"                               | Antisipasi penyesalan, bukti sosial      | `/packages` + **finder formasi** + perbandingan per tamu/venue              | "Find your formation (3 questions)"         |
| **P1 — memilih vendor** (Allegra vs Moira)                  | Nama brand, IG, Bridestory, grup FB                                             | "Bisa dipercaya dari jauh? Cepat balas?"                  | Pengurangan ketidakpastian, kredibilitas | Home: bukti (venue, video, testimoni), alur booking, waktu respons          | "Check Your Date" (WA dengan data terisi)   |
| **P1 — siap booking**                                       | Kembali langsung / WA                                                           | "Apa langkah selanjutnya, apa yang harus saya siapkan?"   | Kemudahan (effort reduction)             | `/contact` dengan field momen/tamu/lagu                                     | WA prefilled: tanggal, venue, momen, lagu   |
| **P2 Logistics-First Planner**                              | Referral, LinkedIn, Bridestory, cold outreach, "bali wedding vendor live music" | "Apakah mereka bikin saya terlihat bagus di depan klien?" | Minim risiko, efisiensi                  | `/for-planners` dengan tech rider, stage plot, kredit venue di fold pertama | "Download planner pack" / WA planner        |
| **P3 (hipotesis) keluarga/pasangan Indonesia**              | `/id/`, Google ID, IG lokal                                                     | "Pantas untuk keluarga, bisa lagu Indonesia/rohani?"      | Norma sosial keluarga                    | `/id/` + repertoar lagu Indonesia/rohani                                    | WA dalam Bahasa Indonesia                   |
| **P4 (hipotesis) venue coordinator**                        | Outreach, kredit venue                                                          | "Vendor ini aman untuk venue kami?"                       | Reputasi institusi                       | **Halaman venue** ("Live music at [venue]") hanya untuk venue nyata         | "Add Allegra to your preferred vendor list" |

P3 & P4 belum divalidasi data. Validasi dengan field "How did you find us?" + "Who is making the
music decision?" di form (gap riset lama di `CUSTOMER-RESEARCH.md`).

### 7.2 Hambatan psikologis yang ditemukan di situs sekarang

| Hambatan                                                                                        | Bukti di repo                                                               | Dampak                                                       |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Kelumpuhan pilihan**: 5 formasi tanpa bantuan memilih                                         | `Formations`, `/packages` hanya daftar `idealFor`                           | Pengunjung tidak yakin → menunda → pergi ke IG kompetitor    |
| **Nama formasi tidak sesuai jumlah musisi**: "Duo" = 3 musisi, "Trio" = 4, "String Quartet" = 5 | `packages/duo.md`: "A second voice adds harmony" padahal violin+cello+piano | Disonansi kognitif, bisa terlihat seperti salah ketik        |
| **Momen tidak terhubung ke formasi/sampel**                                                     | `Moments.astro` tanpa link                                                  | Rasa "ini untuk saya" berhenti di situ, tidak berlanjut      |
| **Tanpa bukti sosial**                                                                          | `Testimonials` dikomentari, 0 review                                        | Faktor #1 di SERP Bali (lihat §2.1)                          |
| **Janji respons 24 jam hanya untuk planner**                                                    | `ui.ts:357`                                                                 | Pasangan luar negeri (beda zona waktu) tidak melihat jaminan |
| **FAQ request lagu menyebut "strings" saja**                                                    | `ui.ts` FAQ "arrange most requests for strings"                             | Melemahkan pilar piano                                       |
| **"Custom arrangement with enough notice"** terdengar seperti pengecualian                      | FAQ yang sama                                                               | USP terbesar disampaikan sebagai syarat                      |

### 7.3 Rekomendasi per halaman

**Homepage**

- Di bawah hero, tambahkan **pemilih jalur** berisi dua kartu: _"Planning your wedding"_ →
  finder, dan _"Planner or venue"_ → `/for-planners`. Ini mengarahkan P1 dan P2 sejak detik
  pertama.
- **Moments** diubah menjadi modul keputusan: tiap momen (Ceremony / Cocktail / Reception) diberi
  sampel audio, formasi yang disarankan, dan link ke artikel pendukung (processional,
  cocktail-hour, song-count).
- Satu baris jaminan tenang di dekat CTA: waktu respons + "no obligation" (setelah owner
  konfirmasi).

**Finder formasi baru (`/packages` atau komponen di home), statis tanpa backend**

- 3 pertanyaan: jumlah tamu, momen yang ingin diiringi, tipe venue (tebing/pantai/taman/indoor).
- Output: 1 formasi rekomendasi + 1 alternatif, sampel audio, dan tombol WA dengan pesan terisi
  (tanggal/venue/momen/formasi). Mengurangi kerja pengunjung dan menaikkan kualitas lead.
- Aturan rekomendasi = keputusan musikal owner (jangan klaim statistik "most couples choose").

**`/packages`**

- Tampilkan jumlah musisi dengan jelas di tiap kartu ("3 musicians") **atau** ganti nama formasi
  (keputusan owner, §9).
- Tabel pembanding: formasi × jumlah musisi × momen × kisaran jumlah tamu × tipe venue.

**Halaman "Your Song, Arranged" (baru)**

- Alur: kirim lagu → konfirmasi apakah bisa diaransemen → bagikan pratinjau (jika owner sanggup).
- Sematkan klip F1 (song-request reveal) begitu tersedia. Target kueri: "custom wedding song
  arrangement bali", dan halaman ini mendukung artikel `custom-wedding-music-arrangement`.

**Halaman venue (programatik, hanya venue nyata)**

- Mulai dari 3 venue di `src/content/venues/` (Alila Villas Uluwatu, Bvlgari, Stone Villas):
  catatan akustik/logistik, formasi yang cocok, foto nyata.
- Menangkap kueri "[venue] wedding music" dan memberi planner/venue coordinator alasan untuk
  menautkan. **Jangan buat halaman untuk venue yang belum pernah dimainkan** (aturan #9).

**`/for-planners`**

- Tulis ulang title/meta (53 impresi, 0 klik) ke bahasa planner: _live music vendor, tech
  rider, stage plot, 24-hour response_. Tampilkan unduhan dan kredit venue di fold pertama.

**`/contact`**

- Tambah field: momen (checkbox), perkiraan jumlah tamu, lagu yang diinginkan, "How did you find
  us?", "Who's deciding on the music?". Mengisi gap riset dan mempercepat quote.

**Distribusi / sosial (tempat keputusan Bali sebenarnya terjadi)**

- Seri IG/TikTok 3x/minggu memakai F1, F2, dan F4. Versi **piano + gesek** di lokasi Bali adalah
  pembeda visual dan audio.
- Program collab: minta klip dari videografer/WO dari setiap pernikahan, lalu posting collab
  (mekanisme outlier 269K milik Moira).
- Listing Bridestory dengan review (sudah direncanakan). Pertimbangkan FixTheMusic karena listing
  Bali-nya **tidak punya act gesek/piano sama sekali** (keputusan owner: komisi).

---

## 8. Roadmap Prioritas

| Prio   | Aksi                                                                    | Butuh owner?                   | Effort   | Dampak              |
| ------ | ----------------------------------------------------------------------- | ------------------------------ | -------- | ------------------- |
| **P0** | `noindex` + keluarkan `/thank-you` (EN/ID) dari sitemap                 | Tidak                          | 15 mnt   | Rendah (kebersihan) |
| **P0** | Hubungkan Moments → formasi + artikel (internal link)                   | Tidak (copy dicek brand voice) | 1–2 jam  | Sedang              |
| **P0** | Tulis ulang title/meta `/for-planners` dan `/packages`                  | Tidak                          | 1 jam    | Sedang              |
| **P0** | FAQ request lagu: sebut piano & gesek                                   | Tidak                          | 15 mnt   | Rendah              |
| **P1** | Finder formasi 3 pertanyaan + WA prefilled                              | Ya: aturan rekomendasi         | 1 hari   | **Tinggi**          |
| **P1** | Pemilih jalur couple/planner di home                                    | Tidak                          | 2–3 jam  | Sedang              |
| **P1** | Field form tambahan (momen, tamu, lagu, sumber, pengambil keputusan)    | Ringan                         | 2 jam    | Sedang              |
| **P1** | Kejelasan nama formasi / badge jumlah musisi                            | **Ya**                         | 1 jam    | Sedang              |
| **P2** | Testimoni: kirim `/share-your-story` ke klien lalu (sudah siap)         | **Ya** (kirim link)            | —        | **Tertinggi**       |
| **P2** | Produksi 6 reel pertama (2 F1, 2 F2, 2 F4) + program collab videografer | **Ya** (musisi, izin)          | 1–2 mgg  | **Tinggi**          |
| **P2** | Halaman "Your Song, Arranged"                                           | Ya: kebijakan aransemen        | 1 hari   | Tinggi              |
| **P3** | Halaman venue untuk 3 venue nyata                                       | Ya: foto & detail              | 1–2 hari | Sedang              |
| **P3** | Bridestory + evaluasi FixTheMusic                                       | Ya                             | —        | Sedang              |

---

## 9. Keputusan yang Dibutuhkan dari Owner

1. **Aransemen lagu custom: termasuk harga atau ada biaya tambahan?** Jika termasuk, ini pembeda
   langsung melawan Moira dan bisa jadi headline. Jika tidak, copy tetap "arranged for you" tanpa
   kata "included".
2. **Waktu respons 24 jam berlaku untuk pasangan juga?** Jika ya, tampilkan di home dan contact.
3. **Nama formasi**: tetap (Duo/Trio/Quartet dengan piano) + badge jumlah musisi, atau rename
   (mis. "Piano Trio", "Piano Quartet", "Piano Quintet", yang secara musikal akurat)?
   _Catatan: rename memengaruhi SEO "string quartet" dan 12+ artikel; badge lebih aman._
4. **Aturan finder**: kisaran jumlah tamu/venue untuk tiap formasi (keputusan musikal).
5. **Konsultasi video call** untuk pasangan luar negeri: bersedia ditawarkan?
6. **Izin konten**: tambahkan klausul izin video/foto di booking agar klip bisa jadi reel/collab.
7. **FixTheMusic/Bridestory**: mau listing di marketplace berkomisi?

---

## 10. Monitoring (bulanan)

- [ ] Posisi Allegra untuk 7 kueri di §2.1 (Firecrawl search atau DataForSEO setelah top-up)
- [ ] Moira: follower IG (2,8K), review Bridestory (1), apakah membuat website
- [ ] FixTheMusic Bali: muncul act gesek/piano?
- [ ] GSC: CTR `/packages` & `/for-planners` setelah rewrite meta
- [ ] Outlier baru di niche (vidIQ): pola F1–F5 masih berlaku?
- [ ] Setelah GA4 re-login: event klik WA per halaman & hasil finder

---

## 11. Data Analitik GA4 (tambahan 2026-09-14)

> Property `542419294`, 90 hari (±16 Jun – 13 Sep 2026), ditarik via GA4 Data API. Volume sangat
> kecil, jadi semua kesimpulan di bawah bersifat **arah**, bukan signifikan secara statistik.

### 11.1 Kualitas data: sekitar separuh sesi bukan calon klien

| Sumber pencemar                                                        | Sesi | Bukti                                                                    |
| ---------------------------------------------------------------------- | ---: | ------------------------------------------------------------------------ |
| Tag GA aktif di `*.pages.dev` + `localhost`                            |   46 | Dimensi hostName: pages.dev 34, localhost 9, preview branch 3            |
| Bot / data center (Council Bluffs, Glenview, Ashburn, Singapore 0 dtk) |  ±27 | Durasi 0–8 detik, engagement 0–6%                                        |
| Kemungkinan internal (Makassar, Denpasar Direct desktop)               |  ±43 | Makassar 32 sesi dari 4 user; Denpasar Direct rata-rata 3,5 jam per sesi |
| **Total tercatat**                                                     |  182 |                                                                          |

Perkiraan pengunjung asli: **±40–60 sesi dalam 90 hari**. Tren mingguan naik lagi sejak minggu
35 (24 → 12 → 27 sesi).

### 11.2 Calon klien nyata yang menghubungi (klik WhatsApp)

GA4 tidak punya event kustom. Klik WhatsApp hanya terbaca dari event outbound `click`. Setelah
tes internal saat launch dibuang, tersisa **7 calon klien** yang mengklik WhatsApp:

| Tanggal | Kota (perangkat)        | Sumber         | Halaman     |
| ------- | ----------------------- | -------------- | ----------- |
| 9 Jul   | Innisfail, AU (mobile)  | direct         | `/packages` |
| 13 Jul  | Cambridge (mobile)      | Google organik | `/faq`      |
| 18 Jul  | Sydney, AU (mobile)     | direct         | `/packages` |
| 25 Agu  | London, UK (desktop)    | **ChatGPT**    | `/faq` (3x) |
| 25 Agu  | Bury, UK (desktop)      | **ChatGPT**    | `/`         |
| 1 Sep   | Long Beach, US (mobile) | Instagram      | `/`         |
| 11 Sep  | Jakarta (desktop)       | Instagram      | `/`         |

Tambahan yang ambigu: 3 klik dari Denpasar via Instagram (27 & 31 Agu), bisa calon klien lokal
atau tes internal. Form kontak hanya menghasilkan **2 submit** (keduanya `/id/`: Gianyar 5 Jul,
Singapore 6 Agu). **WhatsApp menghasilkan ±4x lebih banyak kontak dibanding form.**

### 11.3 Temuan

1. **Persona P1 tervalidasi.** Calon klien nyata datang dari AU, UK, dan US, persis target
   destination wedding. 4 dari 7 memakai mobile.
2. **ChatGPT adalah channel dengan konversi tertinggi.** Hanya 4 sesi, tapi 2 di antaranya
   berujung klik WhatsApp. Pengunjung London menghabiskan 15 menit lalu klik WhatsApp 3x dari
   FAQ. Investasi FAQ + schema (AEO/GEO) terbukti bekerja.
3. **Instagram**: engagement 88% dan 2–4 klik WhatsApp dari hanya 9 post. Mendukung rekomendasi
   konten di §7.3.
4. **`/faq` dan `/packages` adalah halaman keputusan.** `/faq` 2 dari 5 user klik WhatsApp,
   `/packages` ±4 dari 15 user. Homepage hanya ±6% dari 80 user. Calon klien mencari jawaban dan
   perbandingan sebelum menghubungi, sehingga finder formasi (P1) tepat ditaruh di `/packages`.
5. **Journal belum menghasilkan kontak.** 0 klik WhatsApp dari 20 artikel; views per artikel
   rata-rata <10. Artikel berfungsi untuk visibilitas, belum jadi jalur konversi.
6. **Gallery sering discroll** (38 views, 25 scroll event, halaman ke-2 paling banyak discroll)
   tapi tanpa CTA. Bukti visual memang dicari (sesuai temuan SERP §2.1).
7. **Trafik "direct" dari Australia** kemungkinan besar datang dari link tanpa UTM (bio IG,
   Bridestory, WhatsApp share, PDF one-pager), jadi sumber aslinya tidak terbaca.

### 11.4 Rekomendasi berbasis data (menggeser roadmap §8)

| Prio        | Aksi                                                                                                                                       | Butuh owner?           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| **P0 baru** | Tag GA hanya dimuat di hostname produksi (buang 25% sesi pages.dev/localhost)                                                              | Tidak                  |
| **P0 baru** | Event `whatsapp_click` (param `cta_location`, `formation`) + `generate_lead` di `/thank-you`; tandai sebagai key event di GA4 Admin        | Ringan (klik di Admin) |
| **P0 baru** | UTM di semua link keluar milik sendiri: bio IG, Bridestory, one-pager PDF, signature email, WhatsApp broadcast                             | Ya (ubah link bio)     |
| **P0 baru** | GA4 Admin: definisikan internal traffic (IP owner), aktifkan filter; data retention 14 bulan; hubungkan GSC                                | **Ya**                 |
| P1 (tetap)  | Finder formasi di `/packages` + ringkasan 3–4 FAQ terpenting di dekat CTA `/packages`                                                      | Aturan rekomendasi     |
| P1 naik     | AEO/GEO: perluas FAQ (harga-tanpa-angka, logistik venue, jadwal booking dari luar negeri); cek jawaban ChatGPT/Perplexity untuk kueri Bali | Tidak                  |
| P1 naik     | CTA kontekstual di akhir `/gallery` dan artikel journal (ke `/packages` atau WhatsApp dengan pesan per artikel)                            | Tidak                  |
| P2 (tetap)  | Konten Instagram 3x/minggu (formula F1/F2/F4). Channel dengan engagement tertinggi                                                         | Ya                     |

Tanpa P0 baru di atas, dampak P1 tidak akan terukur: finder atau CTA baru tidak bisa dibuktikan
menaikkan kontak.
