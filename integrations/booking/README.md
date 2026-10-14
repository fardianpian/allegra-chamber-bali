# Lock Your Date — booking register (Google Sheet + Apps Script)

Couples open a private link, `allegrachamberbali.com/lock-your-date/` (or `/id/lock-your-date/`),
that Yessica sends on WhatsApp once their date is available. Owner direction 2026-10-14: the link
opens the **booking terms first**, built from `src/data/booking-terms.json`. Couples can stop there,
or ask on WhatsApp. If they wait, the date is not held and another couple may book it, and the page
says so. Ticking "We have read and agree" opens the form at `/lock-your-date/form/`, with the terms
box already ticked. The form records which terms version they agreed to. Filling in the form takes
no payment. It does three things:

1. Adds a row to the **Allegra Booking Register** (a Google Sheet) with status `Held`, or
   `Pending review` if the date already has an active booking. The `Consent` column records both
   agreements and the terms version, e.g. `privacy yes · terms 2026-10.2 agreed · <time>`.
2. Emails the couple from the Allegra Gmail account, signed by Yessica. The email says how long the
   date is held (14 days, or 7 when the wedding is 44 days away or less), the deadline to pay, the
   booking details, and that the quote
   and full booking terms follow within 24 hours. It is short on purpose: the first live test landed
   in Gmail Spam, and payment/bank wording from a new sender reads like phishing. The terms and bank
   details travel in the Booking Terms PDF instead.
3. Emails `allegrachamberbali@gmail.com` a notification about the new submission.

Payment terms (owner direction 2026-10-14, `src/data/booking-terms.json`): a **50% deposit** within
the 14-day hold, and the **balance by 30 days before the wedding**. When the wedding is 44 days away
or less, there is one full payment within a 7-day hold instead (or by the day before the wedding,
if that comes sooner).

Each morning at 09:00 WITA a daily job runs. It does three things:

- Sends the couple **one** reminder 2 days before their hold ends.
- Tells Allegra when a hold has expired. The date is **never** released automatically. Yessica
  changes the status by hand.
- For a `Confirmed` booking, emails Allegra **14 days before the balance is due**, with the balance
  amount (from the `Quotes` sheet) and the couple's WhatsApp number. Yessica then sends the balance
  invoice **by hand on WhatsApp**. The couple never gets an automatic payment email.
  `Balance reminder sent` records the date, so it goes out only once.
- For a `Confirmed` booking whose balance is still not marked as paid 7 days after it was due,
  emails Allegra **once** (`Balance overdue reported`). The date is not released automatically.

The site stays static. The form posts to Google Apps Script, an external service like Web3Forms;
no SSR or serverless code runs on Cloudflare Pages.

## One-time setup (≈15 minutes, signed in as `allegrachamberbali@gmail.com`)

1. Google Drive → **New → Google Sheets** → name it `Allegra Booking Register`.
2. In the Sheet: **Extensions → Apps Script**. Delete the sample code, then paste the full contents
   of `integrations/booking/Code.gs`. Save it and name the project `Allegra booking register`.
3. **Project Settings** (gear icon) → time zone `(GMT+08:00) Makassar` (`Asia/Makassar`).
4. In the editor, pick the `setup` function → **Run** → allow the permissions. This one-time step
   creates the `Bookings` sheet, adds the headers and the Status dropdown, and installs the daily
   trigger. Google will show an "unverified app" warning: choose Advanced → Go to project, because
   this script is yours.
5. **Deploy → New deployment** → type **Web app**:
   - _Execute as_: **Me** (`allegrachamberbali@gmail.com`)
   - _Who has access_: **Anyone**. This is required so the website form can post to it; only the
     Sheet itself holds the data.

   Copy the **Web app URL** (ends in `/exec`).

6. Put that URL in `src/lib/site.ts` → `bookingEndpoint` (the fallback value), or set the
   Cloudflare Pages env var `PUBLIC_BOOKING_ENDPOINT` (type **Text**, Production and Preview) and
   redeploy. The URL is public by nature (it is the form's `action`). Done 2026-10-14: the live
   `/exec` URL is the fallback in `site.ts`. If the endpoint is empty, the page shows a WhatsApp
   button instead of the form. After any `Code.gs` change, redeploy with **New version** or the
   old code keeps running.
7. **Real test** (CLAUDE.md rules 19–20: delivery can only be proven in a real browser and inbox):
   fill in the form on the live page using your own email address. Then check that:
   - a new row appears in `Bookings`,
   - the confirmation email arrives (check Spam too),
   - the notification email arrives at `allegrachamberbali@gmail.com`.

   Delete the test row afterwards.

## Daily use (Yessica)

| Status in the Sheet | Meaning                                                 | Who sets it        |
| ------------------- | ------------------------------------------------------- | ------------------ |
| `Held`              | Date held, waiting for the deposit                      | Script (automatic) |
| `Pending review`    | Date already has an active booking, needs a decision    | Script (automatic) |
| `Confirmed`         | Deposit received (or the full payment, if short notice) | Yessica            |
| `Paid in full`      | Balance received too                                    | Yessica            |
| `Released`          | Hold ended with no deposit, or the date was not taken   | Yessica            |
| `Cancelled`         | Booking cancelled after confirmation                    | Yessica            |

- After a new `Held` notification, send the quote and the Booking Terms PDF **within 24 hours**. The
  email to the couple promises this. See [Booking Terms PDF](#booking-terms-pdf-sheet-menu) below.
- `Pending review`: reply to the couple within 24 hours. If the date can be taken, change the
  status to `Held` and send the quote.
- To extend a hold, edit the `Hold until` column (format `yyyy-mm-dd`).

## Booking Terms PDF (Sheet menu)

The PDF holds the prices, the payment schedule with real dates, the bank details and the cancellation
terms, in EN and ID. Yessica makes it from the Sheet on a **laptop or desktop browser**. Custom menus
do not appear in the Google Sheets mobile app
([Google: custom menus](https://developers.google.com/apps-script/guides/menus)).

### One-time install (after the first setup above)

1. Paste the new `Code.gs` into the Apps Script editor, save, and run `setup` again. It adds the
   `Musicians`, `Terms PDF`, `Balance reminder sent`, `Solo instrument` and `Balance overdue reported`
   columns at the end of `Bookings` (existing rows keep their place), the
   `Quotes` and `Items` sheets, and a Drive folder `Allegra Booking Terms`. Google asks for new permissions (Google
   Docs and Drive) because the script now creates documents. Allow them.
2. **Project Settings → Script properties → Add script property**, one per line:

   | Property              | Value                                                   | Required |
   | --------------------- | ------------------------------------------------------- | -------- |
   | `BANK_NAME`           | e.g. `BCA (Bank Central Asia)`                          | yes      |
   | `BANK_ACCOUNT_NAME`   | the name on the account                                 | yes      |
   | `BANK_ACCOUNT_NUMBER` | the account number                                      | yes      |
   | `BANK_SWIFT`          | e.g. `CENAIDJA`, for transfers from abroad              | no       |
   | `BANK_NOTE_EN`        | a line under the bank table, e.g. who holds the account | no       |
   | `BANK_NOTE_ID`        | the same line in Indonesian                             | no       |

   The bank details stay in the Allegra Google account. They are never written in `Code.gs`, because
   this repository is public.

3. **Deploy → Manage deployments → Edit → New version**. The form URL stays the same.
4. Reload the Sheet. An **Allegra** menu appears next to Help.

### The price list (`Items` sheet)

`setup` fills `Items` once with every formation × session and the extra-musician line. Prices and
durations come from the owner's pricing sheet, `docs/Allegra-Chamber-Bali-Pricing.html` ("Final
pricing as of July 2026"). From then on, **`Items` is the price list**: edit a price, add a line or
remove one there. The `Quotes` dropdown follows it. Running `setup` again never overwrites it.
Overtime is not in the list because its rate is not set yet.

### Making a PDF

1. Check the booking's lines in `Quotes`. **They are added automatically when the form arrives**: one
   line per booked session for the booked formation, priced from `Items`. The form requires at
   least one session. If the couple chose "Not decided yet", no lines are added. If the formation or
   sessions change after a conversation, update `Formation` and `Sessions` in `Bookings`, then select
   the row → **Allegra → Fill quote from booking**. It asks before replacing the existing lines. Use
   the same menu for bookings made before this existed. Then adjust:
   - **Reference** and **Item (EN)** are dropdowns. Picking an item fills in `Item (ID)` and
     `Amount (IDR)` from the `Items` sheet. Both stay editable. You can also type an item that is
     not in the list, for example `Solo piano, ceremony (≈ 45 min)`; the sheet shows a warning but
     keeps it.
   - **Special rate:** do not change the lines. Type the total agreed with the couple **once**, in
     `Bookings` → `Agreed total (IDR)` on the booking's row (e.g. `28000000` for a String Quartet
     with 3 sessions at Rp 32,000,000). The PDF lists every line at its regular price, then one
     `Special rate / Harga khusus` line with the difference, and the agreed total. The deposit,
     balance, cancellation amounts and the balance reminder all use the agreed total. An Agreed total
     higher than the lines is refused.
   - **Extra musicians (Large Ensemble):** add the `Additional musician` line once per session, with
     the number of musicians in `Qty` (e.g. `2`). Also set `Musicians` in `Bookings` to the full
     lineup (e.g. 12); the menu asks for it otherwise.
2. In `Bookings`, check the row: status `Held` or `Confirmed`, a real formation (not "Not decided
   yet"; `Formation` is a dropdown, so change it there if the couple chose another one), and a
   `Hold until` date that has not passed. `Musicians` is optional. Leave it empty for the default
   lineup (Solo 1, Duo 3, Trio 4, String Quartet 5, Large Ensemble 10). For Solo, `Solo instrument`
   (violin, cello or piano, from the form) is printed next to the formation; it can be typed in later.
3. Click any cell in that row → **Allegra → Create Booking Terms PDF (selected row)**.
4. After a few seconds a window links to `<reference>-en.pdf` and `<reference>-id.pdf`, saved in
   `Allegra Booking Terms/<reference>/`. The `Terms PDF` column links to that folder.
5. Open both, check them, then send the one in the couple's language on WhatsApp or as a reply to their
   email. The button never emails the couple, so the prices are always checked by a person first.

Before making the PDF, the menu checks the quote against the booking. It refuses:

- a line from `Items` for another formation, for example "String Quartet, ceremony" on a Solo
  booking;
- a booked session with no line, or a quoted session the booking does not have (it points to
  **Fill quote from booking**);
- the same session quoted twice;
- extra musicians with `Musicians` left empty.

Lines typed by hand and "Special rate" lines are not checked. This way the PDF never shows one
booking and charges for another.

Running it again for the same booking replaces the earlier PDFs. If something is missing, the menu
says what to fix instead of making a PDF.

The layout is built as a Google Doc and exported to PDF, because Apps Script's HTML-to-PDF converter
does not support modern CSS. It uses Cormorant Garamond and Inter. If Google Docs refuses them, it
falls back to Georgia and Arial. The command-line generator (`npm run booking:terms
private/bookings/<ref>.json`) still works as a fallback and uses the same wording. Change the wording in
both places until that script is retired.

## Changing things

- **Terms** (deposit %, hold length, cancellation tiers): edit `src/data/booking-terms.json`, run
  `npm run booking:sync`, then paste `Code.gs` into the Apps Script editor again → **Deploy →
  Manage deployments → Edit → New version**. The URL stays the same. `npm run lint` fails if
  `Code.gs` is out of sync with the JSON.
- **Sender name, notification address, how many bookings one date can take**: the `CONFIG` block at
  the top of `Code.gs`. `MAX_BOOKINGS_PER_DATE: 1` means a second submission for the same date
  becomes `Pending review`.
- **Email wording**: `coupleEmail_` and `reminderEmail_` in `Code.gs` (EN + ID). Check
  `.claude/brand-voice-guidelines.md` before editing.
- **Booking Terms PDF wording**: `termsContent_` in `Code.gs`, and the same text in
  `scripts/generate-booking-terms.mjs` while that fallback exists. Layout: `renderDoc_`.

## Limits & safety

- A free Gmail account can send email to 100 recipients per day through Apps Script
  ([Google quotas](https://developers.google.com/apps-script/guides/services/quotas)). Each
  submission uses 2, which is plenty for wedding volume. The same page allows 250 new Google Docs a
  day. Each Booking Terms run creates 2 temporary Docs.
- Spam protection: the link is private, the page is `noindex` and not in the sitemap, and the form
  has a honeypot field. Values that start with `=`, `+`, `-` or `@` are written as text, never as
  spreadsheet formulas.
- Personal data stays in the Allegra Google account. The privacy policy (`/privacy`, EN + ID)
  covers this form. The consent checkbox and its timestamp are recorded in the `Consent` column
  (UU 27/2022 PDP: consent must be explicit and recorded).
