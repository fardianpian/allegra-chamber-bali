# Lock Your Date — booking register (Google Sheet + Apps Script)

Couples open a private link, `allegrachamberbali.com/lock-your-date/` (or `/id/lock-your-date/`),
that Yessica sends on WhatsApp once their date is available. Filling in the form takes no
payment. It does three things:

1. Adds a row to the **Allegra Booking Register** (a Google Sheet) with status `Held`, or
   `Pending review` if the date already has an active booking.
2. Emails the couple from the Allegra Gmail account, signed by Yessica. The email says how long the
   date is held (7 days), the deadline to pay the deposit, and summarises the booking terms with
   real calendar dates.
3. Emails `allegrachamberbali@gmail.com` a notification about the new submission.

Each morning at 09:00 WITA a daily job runs. It sends the couple **one** reminder 2 days before
their hold ends, and tells Allegra when a hold has expired. The date is **never** released
automatically. Yessica changes the status by hand.

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

6. Cloudflare Pages → `allegra-chamber-bali` → Settings → Environment variables → add
   `PUBLIC_BOOKING_ENDPOINT` = that URL (Production **and** Preview). Then redeploy. Until this
   variable is set, the page shows a WhatsApp button instead of the form.
7. **Real test** (CLAUDE.md rules 19–20: delivery can only be proven in a real browser and inbox):
   fill in the form on the live page using your own email address. Then check that:
   - a new row appears in `Bookings`,
   - the confirmation email arrives (check Spam too),
   - the notification email arrives at `allegrachamberbali@gmail.com`.

   Delete the test row afterwards.

## Daily use (Yessica)

| Status in the Sheet | Meaning                                               | Who sets it        |
| ------------------- | ----------------------------------------------------- | ------------------ |
| `Held`              | Date held, waiting for the deposit                    | Script (automatic) |
| `Pending review`    | Date already has an active booking, needs a decision  | Script (automatic) |
| `Confirmed`         | Deposit received                                      | Yessica            |
| `Released`          | Hold ended with no deposit, or the date was not taken | Yessica            |
| `Cancelled`         | Booking cancelled after confirmation                  | Yessica            |

- After a new `Held` notification, send the quote and the Booking Terms PDF
  (`npm run booking:terms private/bookings/<ref>.json`) **within 24 hours**. The email to the couple
  promises this.
- `Pending review`: reply to the couple within 24 hours. If the date can be taken, change the
  status to `Held` and send the quote.
- To extend a hold, edit the `Hold until` column (format `yyyy-mm-dd`).

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

## Limits & safety

- A free Gmail account can send email to 100 recipients per day through Apps Script
  ([Google quotas](https://developers.google.com/apps-script/guides/services/quotas)). Each
  submission uses 2, which is plenty for wedding volume.
- Spam protection: the link is private, the page is `noindex` and not in the sitemap, and the form
  has a honeypot field. Values that start with `=`, `+`, `-` or `@` are written as text, never as
  spreadsheet formulas.
- Personal data stays in the Allegra Google account. The privacy policy (`/privacy`, EN + ID)
  covers this form. The consent checkbox and its timestamp are recorded in the `Consent` column
  (UU 27/2022 PDP: consent must be explicit and recorded).
