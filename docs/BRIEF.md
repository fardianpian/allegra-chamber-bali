# Brief & Guideline — Allegra Chamber Bali Website (Claude Code Ready)

> Source of truth: Notion page "🎻 Brief & Guideline — Allegra Chamber Bali Website (Claude Code Ready)"
> (https://app.notion.com/p/21e60412d3c64122b6ad57f7cd5549cc). Copied here so the full spec lives in the
> repo, not only in Notion. If the two ever diverge, treat Notion as canonical and update this file.

**Tujuan dokumen:** brief eksekusi end-to-end untuk membangun website **Allegra Chamber Bali** — jasa
grup musik / ansambel (string & chamber ensemble) untuk pernikahan di Bali. Target deploy: sub-domain
di bawah `indonesiaistimewastudio.id`, hosting Hostinger.

## Ringkasan

- **Brand:** Allegra Chamber Bali — live chamber/string ensemble untuk wedding ceremony, cocktail hour,
  dan reception di Bali.
- **Sub-domain target:** `allegra.indonesiaistimewastudio.id`.
- **Hosting:** Hostinger (shared/LiteSpeed) → situs harus static (SSG), bukan Vercel/Node runtime.
- **Audiens utama:** pasangan destination wedding (mayoritas internasional + domestik premium), wedding
  organizer/planner, venue (hotel/resort/villa), event organizer.
- **Bahasa:** English primary + Bahasa Indonesia secondary.
- **Stack:** Astro 5 (static output) + TypeScript + TailwindCSS v4, deploy ke Hostinger via FTP
  (build di GitHub Actions, upload `dist/`).

## 1. Project Overview

- Owner: Fardian Fardian (Indonesia Istimewa Studio ecosystem).
- Tipe: multi-page kecil (homepage + repertoire + packages + gallery + about + contact/booking).
- Featured offering: String Quartet & Chamber Ensemble untuk wedding ceremony + reception.
- Eksekutor: Claude Code, QA manual per fase.

## 2. Positioning

Allegra Chamber Bali = sub-brand di bawah Indonesia Istimewa Studio, tone romantic luxury/refined/warm
(berbeda dari induk yang editorial/archival/scholarly). Funnel: inquiry tanggal → cek availability →
quote → booking deposit. SEO target: "bali wedding string quartet", "live wedding music bali".

Positioning statement: _Allegra Chamber Bali brings refined live chamber music to weddings across
Bali — from a solo cliffside ceremony to a full string quartet reception, performed by
conservatory-trained musicians, arranged for your moment._

Tampilkan koneksi halus ke Indonesia Istimewa Studio (footer + 1 baris di About) tanpa membaur brand.

## 3. Goals

1. Lead generation: ≥15 inquiry booking/bulan dari organic + referral WO dalam 90 hari.
2. Trust building lewat gallery + testimoni + daftar venue.
3. SEO lokal-internasional: top 5 untuk keyword wedding music Bali dalam 90 hari.
4. Halaman "For Planners & Venues" untuk B2B repeat business.
5. Frictionless booking: landing → WhatsApp/inquiry ≤ 2 klik.

## 4. Target Audience

1. Pasangan destination wedding internasional (AU/EU/US/Asia) — booking remote.
2. Pasangan domestik premium (Jakarta/Surabaya/Bali).
3. Wedding planner / WO.
4. Venue (hotel/resort/villa) — cliffside, beach, garden, chapel.
5. Event organizer non-wedding (gala dinner, corporate) — secondary.

## 5. Tech Stack (Hostinger)

- **Hostinger ≠ Vercel** — shared hosting menjalankan Apache/LiteSpeed + PHP, bukan Node SSR. Situs
  harus static (SSG), build jadi HTML/CSS/JS lalu upload ke document root sub-domain.
- Framework: Astro 5.x, `output: 'static'`.
- Styling: TailwindCSS v4 + design tokens custom.
- Typography: `@fontsource` self-hosted (hindari render-blocking Google Fonts).
- Content: MDX collections di `src/content/` untuk repertoire/testimonials/venues/packages.
- Image optimization: `astro:assets` + `sharp` (WebP/AVIF).
- Forms: Web3Forms atau Formspree. WhatsApp deep-link tetap CTA utama.
- Audio/Video: embed YouTube/Vimeo + SoundCloud (lazy facade). Hindari self-host video besar.
- Analytics: Plausible (cookieless) atau GA4.
- Deployment: sub-domain dibuat di hPanel → build di GitHub Actions → deploy `dist/` via FTP/SFTP.
  SSL via free Let's Encrypt Hostinger. Clean URLs & redirect via `.htaccess`.

## 6. Design Direction

Romantic luxury, terang, lapang, refined — bukan glossy/loud, bukan boho murahan. Referensi: editorial
wedding luxury (Magnolia Rouge, Once Wed), string quartet premium internasional, hospitality Bali kelas
atas (Alila, COMO, Six Senses). Foto dokumentasi pertunjukan & venue Bali = hero; UI = bingkai.

**Color Palette:**

- Background: Warm Ivory `#F7F3EC`
- Foreground/ink: Charcoal `#1E1C19`
- Accent 1 (primary): Champagne Gold `#C2A36B`
- Accent 2 (depth): Deep Sage/Emerald `#3E5247`
- Muted: Warm Taupe `#9C9183`
- Rule 80/15/5: 80% ivory/charcoal, 15% taupe/sage, 5% gold accent.

**Typography:**

- Display/H1–H2: Cormorant Garamond atau Playfair Display.
- H3–H4/eyebrow: sans uppercase small-caps untuk label section.
- Body: Inter 16–18px, leading 1.6, max width 65ch.
- Accent/pull-quote: serif italic untuk testimoni & tagline.

**Layout:** grid 12 kolom desktop, gutter 24px, reading column max 720px, max content 1280px. White
space lega (96–120px antar section). 1 section = 1 fokus. Mobile-first; breakpoints 375/768/1280/1536.

**Motion:** fade-in on scroll (300ms ease-out, 12px lift). No parallax, no scroll-hijack. Hormati
`prefers-reduced-motion`.

**Imagery:** foto wedding real di venue Bali, tone warm natural, golden hour. Hindari stok generik.

> **Update sesi 2026-06-17:** brand logo asli (file dari owner) sudah dikonfirmasi final — lihat
> `docs/PROGRESS.md` § Keputusan Terkonfirmasi untuk detail font/warna yang sudah diverifikasi cocok
> dengan token di atas.

## 7. Sitemap & Page Structure

Keputusan: multi-page kecil (lebih kuat untuk SEO per-keyword & halaman B2B planner).

```
allegra.indonesiaistimewastudio.id/
├── /                       → Homepage
├── /repertoire             → Daftar lagu + audio/video sample
├── /packages               → Formasi & paket (solo, duo, trio, quartet, large ensemble) + harga/range
├── /gallery                → Foto & video dokumentasi event + venue
├── /about                  → Cerita brand, musisi, link ke Indonesia Istimewa Studio
├── /for-planners           → Halaman B2B untuk WO & venue
├── /faq                    → FAQ booking
├── /contact                → Inquiry form + WhatsApp + availability check
├── /thank-you              → Post-submit
├── /privacy                → Privacy policy
└── /404                    → Custom 404
```

## 8. Content Spec per Halaman

### 8.1 Homepage (`/`)

Sections (urutan): Hero → Trust strip → What We Play (5 formasi) → Featured Audio/Video → Moments We
Score (Ceremony/Cocktail/Reception) → How Booking Works (4 langkah) → Testimonials → Gallery preview →
For Planners & Venues strip → Final CTA → Footer.

### 8.2 Repertoire (`/repertoire`)

Filter by momen (Processional/Signing/Recessional/Cocktail/Reception) + genre (Classical/Pop/Film/
Indonesian). List lagu dengan audio sample pendek per item (lazy). Catatan custom arrangement. CTA
inquiry.

### 8.3 Packages (`/packages`)

5 formasi: Solo (Violin/Cello/Piano), Duo, Trio, String Quartet, Large Ensemble — deskripsi, ideal
untuk momen apa, jumlah lagu/durasi set, sample. Tabel paket + range harga (placeholder sampai
dikonfirmasi user), travel fee per area (Uluwatu/Ubud/Nusa Dua/Canggu), durasi standar set, sound
system/PA, overtime. Add-ons: extra musician, sound engineer/PA, additional set, custom arrangement.
CTA request quote.

**Piano sebagai produk unggulan** (dikonfirmasi 2026-06-18): piano bukan hanya bagian Large Ensemble
— Solo punya opsi piano solo, dan Duo/Trio/String Quartet masing-masing menawarkan upgrade "Piano +"
sebagai upsell copy di body teks formasi (bukan halaman/keyword terpisah). Lihat
`docs/SEO-STRATEGY.md` §3.0 untuk data riset di balik keputusan ini.

### 8.4 Gallery (`/gallery`)

Grid masonry foto event + venue (lazy, WebP/AVIF). Filter by venue type (Cliffside/Beach/Garden/
Chapel/Ballroom). 2–4 video highlight (embed).

### 8.5 About (`/about`)

Brand story. Profil musisi (conservatory-trained, ISI Denpasar / pengalaman) — E-E-A-T signal.
Filosofi: live, tailored, refined. 1 paragraf koneksi ke Indonesia Istimewa Studio.

### 8.6 For Planners & Venues (`/for-planners`)

Value prop B2B: reliability, tech rider lengkap, komunikasi cepat. Download: tech rider PDF, stage
plot, repertoire sheet, high-res logo. Partnership/preferred-vendor inquiry form.

### 8.7 FAQ (`/faq`)

Travel fee & area cover, durasi set, song request/custom arrangement, kebutuhan PA/sound, plan B
cuaca, deposit & pembayaran, lead time booking. Untuk FAQ schema.

### 8.8 Contact (`/contact`)

Inquiry form: nama, email, WhatsApp, wedding date, venue/lokasi, formasi diminati, momen, pesan.
WhatsApp button (deep-link pre-fill), email, Instagram. Response time \<24 jam. Catatan availability:
"Popular dates book out 6–12 months ahead."

## 9. Functional Requirements

- WhatsApp deep-link dengan pre-fill di setiap CTA primary.
- Inquiry form: validasi client-side + Web3Forms/Formspree, auto-reply email.
- Audio sample player inline lazy-load.
- Video facade YouTube/Vimeo (klik untuk load iframe).
- Language toggle EN ⇄ ID (default EN), hreflang antar versi.
- SEO essentials: meta per halaman, OG image, JSON-LD `LocalBusiness`/`MusicGroup` + `FAQPage` +
  `BreadcrumbList`.
- Sitemap.xml + robots.txt auto-generate.
- `.htaccess`: clean URL, force HTTPS, redirect non-www, custom 404, cache headers.
- Cookie/consent ringan bila pakai GA4.

## 10. Performance & Accessibility

- Lighthouse mobile target: Performance ≥95, Accessibility ≥100, Best Practices ≥95, SEO ≥100.
- Core Web Vitals: LCP \<2.0s, INP \<200ms, CLS \<0.05.
- Page weight \<1.5MB above-the-fold.
- WCAG 2.1 AA: kontras 4.5:1, focus ring, alt text wajib, keyboard nav, semantic HTML,
  `prefers-reduced-motion`, skip-to-content.
- Image: `astro:assets`, AVIF+WebP, `sizes` benar, blur placeholder, lazy.
- Font: `@fontsource` self-host, `display: swap`, preload weight utama.

## 11. SEO & Content Strategy

> **Update 2026-06-18:** keyword cluster di bawah ini adalah daftar awal brief. Riset data-driven
> lengkap (DataForSEO, dengan volume/KD riil per keyword, dan revisi prioritas) ada di
> `docs/SEO-STRATEGY.md` — dokumen itu yang jadi acuan eksekusi, bukan daftar di bawah. Temuan
> kunci: head term komersial terbaik bukan "string quartet" tapi "musician for wedding ceremony"
> (KD rendah, volume tinggi); cluster "wedding pianist" (KD 1) adalah opportunity KD terbaik di
> seluruh riset setelah piano dikonfirmasi sebagai produk unggulan; kombinasi lokasi/instrumen
> majemuk (mis. "string quartet uluwatu", "piano + quartet") nyaris selalu tidak punya data
> permintaan terukur — jangan jadikan H1/halaman terpisah berdasarkan asumsi itu tanpa cek data.

Keyword cluster (awal, lihat catatan di atas): `bali wedding string quartet`, `live music for
wedding bali`, `chamber ensemble bali wedding`, `string quartet uluwatu/ubud/nusa dua`, `musik
akustik pernikahan bali`. Local SEO: Google Business Profile (kategori "Wedding Service"/"Live
Music"). Schema: `MusicGroup` + `LocalBusiness` (homepage), `FAQPage` (faq), `BreadcrumbList`.

## 12. Deployment Workflow — Hostinger

**A. Setup sub-domain (manual, user):** hPanel → Domains → Subdomains → `allegra` → catat document
root → aktifkan free SSL.

**B. Build & deploy (GitHub Actions → FTP):** `npm ci` → `npm run build` → upload `dist/` via FTP/SFTP
(`SamKirkland/FTP-Deploy-Action`), kredensial dari GitHub Secrets.

**C. `.htaccess`:** force HTTPS, clean URLs, custom 404, cache headers.

**D. Forms:** daftar Web3Forms/Formspree, access key sebagai env saat build.

**E. Verifikasi:** SSL aktif, semua halaman ter-serve, form terkirim + auto-reply, sitemap submit ke
Google Search Console.

## 16. Acceptance Criteria (Definition of Done v1)

- [ ] Sub-domain `allegra.indonesiaistimewastudio.id` aktif dengan SSL.
- [ ] Semua halaman v1 live sebagai static.
- [ ] Header sticky + mobile hamburger + language toggle EN/ID berfungsi.
- [ ] WhatsApp deep-link pre-fill di setiap primary CTA.
- [ ] Audio sample & video facade jalan di Safari iOS + Chrome Android + desktop.
- [ ] Inquiry form terkirim ke email + auto-reply.
- [ ] Lighthouse mobile ≥ 95/100/95/100 di home, packages, gallery.
- [ ] CLS \<0.05, LCP \<2.0s, INP \<200ms.
- [ ] JSON-LD valid (MusicGroup + LocalBusiness, FAQPage).
- [ ] Sitemap.xml + robots.txt + hreflang EN/ID terpasang & submit ke GSC.
- [ ] `.htaccess`: HTTPS force, custom 404, cache headers aktif.
- [ ] WCAG 2.1 AA pass.
- [ ] GitHub Actions build + FTP deploy ke Hostinger berjalan otomatis.

## 17. Aset yang Harus Disiapkan User (Manual)

- [ ] Kredensial FTP Hostinger (GitHub Secrets).
- [ ] Akun Web3Forms/Formspree + Plausible/GA4.
- [ ] Logo Allegra Chamber Bali (SVG primary + mono) — **selesai dikonfirmasi 2026-06-17**, lihat
      `docs/PROGRESS.md`.
- [ ] Foto dokumentasi wedding real di venue Bali (min 1920px) — izin pakai dari klien/WO.
- [ ] Foto musisi + portrait ensemble.
- [ ] Audio sample 4–8 lagu, versi pendek MP3.
- [ ] Video highlight 1–3 (link YouTube/Vimeo).
- [ ] Repertoire list lengkap.
- [ ] Daftar formasi & harga/range + travel fee per area + kebijakan deposit.
- [ ] Testimoni 3–5 (nama, venue, tanggal, foto, izin).
- [ ] Daftar venue yang pernah dimainkan.
- [ ] Tech rider + stage plot PDF.
- [ ] WhatsApp business number + handle Instagram.
- [ ] Privacy policy draft.

## 21. Keputusan Terkonfirmasi & Pertanyaan Tersisa

**✅ Locked:**

- Sub-domain final: `allegra.indonesiaistimewastudio.id`.
- Hosting: static-only (Astro SSG), build di GitHub Actions, deploy `dist/` via FTP.
- Bahasa: English primary + Indonesian secondary (default EN, toggle ID, hreflang).
- Formasi: Solo, Duo, Trio, String Quartet, Large Ensemble (5 formasi).
- **Large Ensemble** (dikonfirmasi 2026-06-17): string quartet + piano + double bass (6 musisi) — TBC,
  tunggu sign-off final owner sebelum publish.
- **Logo brand** (dikonfirmasi final 2026-06-17): lihat `docs/PROGRESS.md`.
- **Piano = produk unggulan** (dikonfirmasi 2026-06-18): Solo kini termasuk opsi piano solo;
  Duo/Trio/String Quartet masing-masing punya upsell "Piano +" sebagai body copy, bukan
  halaman/keyword terpisah (data riset: `docs/SEO-STRATEGY.md` §3.0).

**❓ Masih terbuka (jangan mengarang):**

1. Harga & travel fee per formasi/area + kebijakan deposit.
2. Aset audio/video & foto wedding — ketersediaan + izin pakai.
