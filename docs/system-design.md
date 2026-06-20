# System Design — Allegra Chamber Bali

> Dokumen referensi visual untuk dipakai di tool lain (Claude design/Artifacts, Canva,
> Figma, dll) agar semua materi — slide, social post, PDF proposal, brosur — tetap
> konsisten dengan website live. Sumber kebenaran teknis tetap `src/styles/global.css`
> dan `CLAUDE.md` di repo; dokumen ini adalah ekstraknya dalam bentuk siap pakai.

## 1. Brand Essence

- **Nama:** Allegra Chamber Bali — sub-brand dari Indonesia Istimewa Studio.
- **Kategori:** Live chamber/piano & string ensemble untuk wedding di Bali.
- **Audiens:** Pasangan (mayoritas destination wedding internasional), wedding planner,
  venue, event organizer.
- **Mood kata kunci:** romantic luxury, editorial, warm, refined, lapang (airy).
  **Bukan**: dark, loud, boho, glossy stock-photo generik.
- **Referensi mood:** editorial wedding luxury (Magnolia Rouge, Once Wed), hospitality
  Bali kelas atas (Alila, COMO, Six Senses).
- Piano adalah instrumen flagship di semua formasi — jangan pernah digambarkan sebagai
  add-on atau "sekadar string quartet".

## 2. Logo / Wordmark

Tidak ada file logo grafis di repo — wordmark dirender sebagai teks dengan font brand:

```
Allegra              ← font-display (Cormorant Garamond), sentence case
CHAMBER BALI          ← font-display (serif, BUKAN sans), uppercase, letter-spacing 0.2em
```

- Subtitle "CHAMBER BALI" sengaja tetap serif walau file logo asli ownernya pakai sans —
  ini keputusan owner, jangan dikembalikan ke sans tanpa konfirmasi ulang.
- Dua varian warna: `ink` (di atas background terang) dan `ivory` (di atas background gelap/foto).
- Tiga ukuran: sm (teks ~20px), md (~24px), lg (~36–48px, untuk hero/cover).

## 3. Color Palette

Rule komposisi: **80% ivory/charcoal — 15% taupe/sage — 5% gold accent.**

| Nama           | Hex       | Peran                       | Catatan                                            |
| -------------- | --------- | --------------------------- | -------------------------------------------------- |
| Warm Ivory     | `#F7F3EC` | Background utama (80%)      | Base hampir semua kanvas                           |
| Charcoal / Ink | `#1E1C19` | Foreground/teks utama (80%) | Headline, body, dasar tombol primary               |
| Champagne Gold | `#C2A36B` | Accent utama (5%)           | CTA, hover state, garis dekoratif tipis, highlight |
| Deep Sage      | `#3E5247` | Depth/sekunder (15%)        | Section alternatif, kontras dari ivory             |
| Warm Taupe     | `#6D665C` | Muted text (15%)            | Eyebrow label, caption, subhead sekunder           |

**Penting soal Taupe:** versi lama `#9C9183` (hasil sampling langsung dari file logo)
**sudah deprecated** — kontrasnya hanya 2.79:1 di atas ivory, gagal WCAG AA (butuh 4.5:1
untuk teks kecil). Pakai `#6D665C` (5.12:1) di semua materi baru, termasuk Canva/slide.

**Opacity overlay yang sering dipakai** (bukan warna baru, tapi variasi alpha dari token
di atas — kalau tool tidak mendukung alpha, dekati dengan tint solid):

- `ink/85`, `ink/40`, `ink/15` — gradient overlay di atas foto hero
- `ivory/80`, `ivory/70`, `ivory/60`, `ivory/50` — teks/label di atas background gelap
- `ink/10`, `ink/20`, `ink/25` — garis pembatas (hairline) di atas ivory
- `gold/40` — garis aksen dekoratif tipis (di atas pull-quote, value props)

## 4. Typography

| Peran                   | Font                                                                             | Karakteristik                                              |
| ----------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Heading (H1–H3)         | **Cormorant Garamond** (fallback Playfair Display, Georgia)                      | Serif, weight 500, letter-spacing -0.01em, line-height 1.1 |
| Body                    | **Inter** (fallback system-ui)                                                   | Sans, ~17px, line-height 1.6                               |
| Pull-quote / testimoni  | Inter atau Cormorant, **italic**                                                 | Untuk kutipan & tagline                                    |
| Eyebrow / label section | Inter, **uppercase**, letter-spacing 0.18em, ukuran ~12px (0.75rem), warna taupe |

**Skala ukuran yang dipakai di web** (acuan kasar untuk slide/dokumen):

- H1 hero: 60–96px (6xl–8xl)
- H2 section heading: 36–48px (4xl–5xl)
- Body: 17px, max width baca ~720px (≈65 karakter/baris)
- Tombol/label: 14px (text-sm), uppercase, letter-spacing 0.08em

Font di-self-host via @fontsource di website — di Canva/tool lain, cari "Cormorant
Garamond" dan "Inter" di Google Fonts library (keduanya gratis & tersedia di Canva).

## 5. Layout & Spacing Signature

- Grid 12 kolom desktop, gutter 24px.
- Max content width: **1280px**. Max reading column (paragraf panjang): **720px**.
- Jarak antar-section: 64–120px (lega, satu section = satu fokus, jangan padat).
- Breakpoint mobile-first: 375 / 768 / 1280 / 1536.
- White space generous — ini elemen kunci kesan "luxury", jangan dipadatkan untuk
  "menghemat ruang" di slide/Canva.

## 6. Visual Signature — Flat, No Shadow, No Rounded Corners

Ini ciri khas yang harus dipertahankan di semua media lain:

- **Tidak ada border-radius** di mana pun (tombol, kartu, foto, badge) — semua sudut **tajam/kotak**.
- **Tidak ada box-shadow** sama sekali — keseluruhan desain flat.
- Pemisah antar-elemen pakai **hairline border tipis** (1px, opacity 10–25% dari ink/gold),
  bukan kartu dengan shadow/background block. Contoh pola: `border-t border-ink/10 pt-10`.
- Garis aksen dekoratif tipis pakai gold di opacity 40% (`border-gold/40`) — sering dipakai
  di atas pull-quote atau value-prop sebagai pemisah halus, bukan garis tebal solid.
- Implikasi untuk Canva/slide: hindari drop shadow default, hindari rounded-corner card
  preset — pakai garis tipis sebagai pembatas, biarkan ruang putih melakukan pekerjaan.

## 7. Buttons / CTA

4 varian, semua: uppercase, letter-spacing 0.08em, ukuran teks kecil (14px), padding
nyaman (≈28px horizontal/14px vertical), transisi warna 300ms, **tanpa rounded corner**.

| Varian  | Background               | Teks  | Hover                | Kapan dipakai                              |
| ------- | ------------------------ | ----- | -------------------- | ------------------------------------------ |
| Primary | Charcoal (`ink`)         | Ivory | → Gold bg, ink text  | CTA default di atas background terang      |
| Gold    | Gold                     | Ink   | → Ivory bg           | CTA paling penting (WhatsApp, booking)     |
| Outline | Transparan, border ink   | Ink   | → Ink bg, ivory text | Sekunder di atas background terang         |
| Ghost   | Transparan, border ivory | Ivory | → Ivory bg, ink text | CTA sekunder di atas foto/background gelap |

## 8. Motion

- Fade-in saat scroll: 300ms ease-out + translateY 12px (elemen muncul dari bawah, halus).
- **Tidak ada** parallax, tidak ada scroll-hijacking.
- Selalu hormati `prefers-reduced-motion` — di slide statis (Canva/PDF) ini otomatis tidak relevan,
  tapi kalau bikin video/motion graphic, jaga durasi & easing yang sama (jangan bouncy/elastic).

## 9. Imagery

- Foto wedding/venue **real di Bali**, tone warm-natural, golden hour. Hindari stok generik.
- Foto adalah hero, UI adalah bingkai — jangan biarkan elemen grafis/teks mengalahkan foto.
- Overlay gradient gelap (ink, dari 85% di bawah ke 15% di atas) dipakai di atas foto hero
  supaya teks ivory tetap terbaca tanpa mengubur foto.
- Tidak ada kompresi visual berat (avoid heavy filter/preset) — natural color grading.

## 10. Voice & Tone (ringkas)

Sumber lengkap: `.claude/brand-voice-guidelines.md` (jangan dikopi penuh ke sini karena
bisa basi — selalu cek file itu untuk approved-copy block & vocabulary use/avoid sebelum
menulis copy baru). Garis besar:

- Bahasa romantis tapi tidak berlebihan, editorial, percaya diri tanpa sombong.
- Piano selalu disebut sebagai bagian inti, bukan tambahan, di semua formasi.
- Dua bahasa: English (utama) + Indonesian (sekunder).

## 11. Hal yang HARUS dihindari di materi non-web

- Jangan tambahkan rounded corner atau shadow ke elemen apa pun.
- Jangan pakai taupe lama `#9C9183` — selalu `#6D665C`.
- Jangan tampilkan harga/angka pricing di materi apa pun — owner belum rilis angka real
  (lihat `CLAUDE.md` § Confirmed decisions).
- Jangan gunakan font sans untuk subtitle "CHAMBER BALI" di wordmark.
- Jangan gunakan foto stok generik — harus foto wedding/venue Bali asli atau placeholder
  yang jelas-jelas ditandai sementara.
