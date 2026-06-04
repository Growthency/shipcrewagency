# Deploying to Vercel

**Short answer: yes, you can deploy right now and it will not error.** The public
website builds and runs with **zero configuration** — it ships with bundled
content, default fonts, optimized images, and baked-in defaults. You only need a
few environment variables to switch on the admin portal and the database/CMS.

---

## 1. Import the project

1. Go to <https://vercel.com> → **Add New… → Project**.
2. **Import** the GitHub repo `Growthency/shipcrewagency`.
3. Vercel auto-detects **Next.js** — leave Framework Preset, Build Command
   (`next build`) and Output as the defaults.
4. Click **Deploy**. The first build will succeed and the public site goes live.

No `vercel.json` is needed. Node 20+ and `sharp` (for image optimization) are
handled automatically.

---

## 2. Environment variables

Add these under **Project → Settings → Environment Variables**, then trigger a
**Redeploy** (variables that start with `NEXT_PUBLIC_` are baked in at build
time, so a redeploy is required for them to take effect).

| Variable | Needed for | Notes |
| --- | --- | --- |
| `SESSION_SECRET` | **Admin login** | **Required in production.** Copy from your local `.env.local`, or generate: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `VAULT_SECRET` | Vault encryption | Same as above (a second, different value). |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap | Your production URL, e.g. `https://shipcrewagency.com` (or the `*.vercel.app` URL for now). |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp button | Client's number, international format, digits only. |
| `ADMIN_EMAIL` | Admin login | Optional — defaults to `admin@shipcrewagency.com`. |
| `ADMIN_PASSWORD_HASH` | Admin login | Optional — defaults to the `ShipCrew@2026` hash. Change with `npm run hash-password "NewPassword"`. |
| `NEXT_PUBLIC_SUPABASE_URL` | CMS / Vault data | From Supabase → Project Settings → API. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | CMS / Vault data | From the same page. |
| `SUPABASE_SERVICE_ROLE_KEY` | CMS / Vault data | From the same page (keep secret). |

> ⚠️ **Important — `SESSION_SECRET` on Vercel.** Vercel runs serverless functions.
> If `SESSION_SECRET` is **not** set, each function instance signs cookies with a
> different temporary key, so the `/taslima` admin login will appear to "log you
> out" immediately. Setting `SESSION_SECRET` (one fixed value) fixes this. The
> **public site is unaffected** and works without it.

---

## 3. Database (optional — enables the CMS & Vault)

1. Create a project at <https://supabase.com>.
2. SQL Editor → run [`supabase/schema.sql`](supabase/schema.sql).
3. Storage → create a **public** bucket named `images`.
4. Add the 3 Supabase variables above → redeploy.
5. (Optional) push the starter articles: run `npm run seed` locally.

Until Supabase is connected, the blog shows the 8 bundled articles (per language)
and the contact form silently accepts submissions — no errors.

---

## 4. Custom domain

Project → Settings → Domains → add your domain and follow the DNS steps. Then set
`NEXT_PUBLIC_SITE_URL` to that domain and redeploy so canonical tags, the sitemap,
and social-share cards use it.

---

### What works with **no** configuration
Public site (EN + 中文), all pages, blog with pagination, images (WebP +
`next/image`), fonts, animations, light/dark theme, WhatsApp & scroll-to-top
buttons, OG/social-share cards, sitemap, robots, structured data.

### What needs env vars
`/taslima` admin login (`SESSION_SECRET`), the Vault (`VAULT_SECRET`), the blog
CMS / contact inbox (Supabase keys), and the live WhatsApp number.
