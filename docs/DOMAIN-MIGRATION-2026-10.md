# Domain Migration — `allegra.indonesiaistimewastudio.id` → `allegrachamberbali.com`

Prepared 2026-10-07. Hosting does not change (same Cloudflare Pages project
`allegra-chamber-bali`). Code changes live on branch `chore/domain-allegrachamberbali-com` —
**do not merge it until step 3 is green**, or canonicals/sitemap/hreflang will point at a
domain that doesn't resolve yet.

Status at prep time: `allegrachamberbali.com` was **not registered yet** (the `.com` registry
returned no NS records). Owner approved the name on 2026-10-07 and is buying it the same day.

## Progress

| #   | Step                                                     | Who            | Status                                                                                                                   |
| --- | -------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 0   | Code + docs prepared on branch                           | Claude         | done                                                                                                                     |
| 1   | Register `allegrachamberbali.com`                        | Owner          | done (Cloudflare Registrar, NS lennon/vida.ns.cloudflare.com)                                                            |
| 2   | Attach apex + `www` to Pages                             | Owner          | done                                                                                                                     |
| 3   | Verify new domain serves 200                             | Claude         | done (200, Google Trust Services cert)                                                                                   |
| 4   | Set `PUBLIC_SITE_URL`, then merge the branch             | Owner + Claude | done (PR #34, d476740; live verified)                                                                                    |
| 5   | Bulk Redirects (old sub-domain, pages.dev, www) + verify | Owner + Claude | done (list 748ed115…, ruleset 90eddc10…; curl verified)                                                                  |
| 6   | GSC/GA4/Web3Forms + skill property swap                  | Owner + Claude | GSC done (property + Change of Address 2026-10-07, sitemap submitted, skills swapped); GA4 stream URL + GSC link pending |
| 7   | Off-site link updates                                    | Owner          | pending                                                                                                                  |

After each owner step, tell Claude — steps 3, 4 and 5 are verified with `curl` from the repo.

## Why this name (decision 2026-10-07)

Data checked before choosing (free sources only):

- Keywords in a domain are not a Google ranking signal (John Mueller, Google Search Advocate), so
  an exact-match domain (`baliweddingmusicians.com`, `balistringquartet.com`) buys nothing.
- Keyword Planner (`docs/data/gkp-2026-09-*.csv`, 3,362 keywords): "Bali + music" phrases sit in
  the 10–100/month bucket (`wedding band bali`, `wedding singer bali`,
  `wedding entertainment bali`); `string quartet bali` has no data.
- Live SERP 2026-10-07: the old sub-domain already ranks #4 for "string quartet bali wedding"
  and #3 for "wedding pianist bali" on content alone; the existing EMD `baliweddingmusic.com`
  doesn't reach page 1 for "wedding musicians bali".
- "allegra bali" SERP is crowded by Villa Allegra listings, a yacht, and another Bali-based music
  act (@itsyourallegra) → `allegrabali.com` invites confusion; "chamber" is the disambiguator.
- GSC (Jul–Oct 2026) already shows branded queries `allegra bali` (avg pos 2.7),
  `allegra piano`, `allegra musik`, `bali chambers` — thin data, but consistent with the name.

## 1. Register the domain (owner)

- Recommended: **Cloudflare Registrar** (at-cost pricing, and the zone is created on Cloudflare
  automatically — no nameserver change needed).
- If registered elsewhere (e.g. Hostinger): add the domain to Cloudflare as a zone
  (**Domains → Onboard a domain**, Free plan) and change the registrar's nameservers to the two
  Cloudflare nameservers it shows. An **apex** domain on Pages only works when the zone's
  nameservers are on Cloudflare — a plain CNAME at another DNS host is not enough for the apex.

## 2. Attach to Pages (owner, Cloudflare dashboard)

**Workers & Pages → allegra-chamber-bali → Custom domains → Set up a custom domain**:

1. `allegrachamberbali.com` → Cloudflare creates the DNS record + SSL automatically.
2. `www.allegrachamberbali.com` → also attach (so it gets a certificate); it is redirected to
   the apex in step 5.
3. Leave `allegra.indonesiaistimewastudio.id` attached and its Hostinger CNAME in place — the
   old-domain redirect in step 5 needs traffic to keep reaching Cloudflare.

## 3. Verify the new domain serves the site

```bash
curl -sI https://allegrachamberbali.com/ | head -5
```

Expect `HTTP/2 200`. (Content will still carry the old canonical until step 4.)

## 4. Cutover (same sitting, in this order)

0. **Timing vs. the journal routine:** `allegra-journal-publisher` (`trig_01JKkuH8qSJTB37cTbWChZDz`)
   opens an article PR Mon/Wed/Fri 08:00 WIB. Cut over on a Tue/Thu/Sat/Sun, or after that day's
   article PR is merged, and rebase the domain branch on the latest `main` first (it was cut from
   `00a439f`; `main` has moved since).
1. **Pages → Settings → Variables and Secrets (Production):** set
   `PUBLIC_SITE_URL=https://allegrachamberbali.com` (no trailing newline/slash). This env var
   overrides the fallback in `src/lib/site.ts`, so skipping it keeps every canonical on the old
   domain even after the merge. Also update `PUBLIC_PLAUSIBLE_DOMAIN` if it is set there.
2. Merge the `chore/domain-allegrachamberbali-com` PR → Cloudflare rebuilds with the new env.
3. Spot-check the deployed HTML:

```bash
curl -s https://allegrachamberbali.com/ | grep -oE '(canonical|hreflang)[^>]*' | head
```

```bash
curl -s https://allegrachamberbali.com/robots.txt | tail -1
```

## 5. 301 redirects (owner, Cloudflare dashboard — Bulk Redirects)

`_redirects` cannot match on hostname, so use an account-level **Bulk Redirect List**
(**Rules → Bulk Redirects → Create list**, then a rule that enables it):

| Source URL                           | Target URL                       | Status | Options                                                                               |
| ------------------------------------ | -------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `allegra.indonesiaistimewastudio.id` | `https://allegrachamberbali.com` | 301    | Preserve query string, Subpath matching, Preserve path suffix, Include subdomains off |
| `allegra-chamber-bali.pages.dev`     | `https://allegrachamberbali.com` | 301    | same as above                                                                         |
| `www.allegrachamberbali.com`         | `https://allegrachamberbali.com` | 301    | same as above                                                                         |

**Include subdomains must stay off on the `pages.dev` row** — otherwise PR preview deploys
(`<branch>.allegra-chamber-bali.pages.dev`, used to review the routine's article PRs) would also
be redirected to production.

Keep these redirects for at least a year (Google's site-move guidance), and keep the
`indonesiaistimewastudio.id` registration + `allegra` CNAME alive that long — printed PDFs,
Instagram posts and directory listings with the old URL depend on it.

Verify (path + query must survive):

```bash
curl -sI "https://allegra.indonesiaistimewastudio.id/journal/wedding-pianist-bali/?x=1" | grep -iE "^(HTTP|location)"
```

Expected: `301` + `location: https://allegrachamberbali.com/journal/wedding-pianist-bali/?x=1`.
If the old sub-domain doesn't redirect (it's a Pages custom domain on a non-Cloudflare DNS zone),
report back — fallback is a small hostname-based redirect, decided then.

## 6. Search & analytics (owner + Claude)

- **GSC:** add a Domain property `sc-domain:allegrachamberbali.com` (DNS TXT verification on the
  new Cloudflare zone), submit `https://allegrachamberbali.com/sitemap-index.xml`, then run
  **Settings → Change of address** from the old property to the new one. Keep the old property —
  its history stays there.
- Then update the GSC property name in `.claude/skills/weekly-health-audit/SKILL.md` and
  `.claude/skills/keyword-research-expansion/SKILL.md` (still point at the old property on
  purpose, so the routines don't break before the new property exists).
- Request indexing for the key pages on the new domain (Claude in Chrome, per the GSC manual
  indexing plan).
- **GA4:** edit the web data stream URL to the new domain (cosmetic; the tag itself already
  follows `PUBLIC_SITE_URL`). Add the new domain to any referral-exclusion list.
- **Web3Forms:** if a domain allowlist is set on the access key, add the new domain. Owner then
  submits one real test from a browser (CLAUDE.md rule 19).

- **Routine prompt (owner, claude.ai UI):** `allegra-journal-publisher`'s prompt opens with the
  old URL as context. It's informational only (the routine reads everything else from the repo),
  but edit it to the new domain — agents can't update `http_api`-created routines.

## 7. Off-site references (owner)

- Google Business Profile website field
- Instagram bio / link-in-bio
- Directory listings already submitted (`docs/DIRECTORY-SUBMISSIONS-PLAN.md`)
- WhatsApp Business profile website
- Email signatures, B2B one-pager PDF / pricing sheet PDF re-exports (HTML sources already updated)

## Not changed on purpose

- `invoices/` — issued documents keep the domain they were issued with.
- `docs/PROGRESS*.md`, `docs/BRIEF.md`, `docs/KEYWORD-MAP-2026-09.md`, `docs/MARKETING-SPRINT-2026-06.md`,
  `.claude/skills/_archive/` — historical records.
- `allegra@indonesiaistimewastudio.id` mailbox and the Hostinger zone for `indonesiaistimewastudio.id`.
