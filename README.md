# Ship Crew Agency

A world-class, bilingual (English / 简体中文) marketing website and content platform for **Ship Crew Agency** — a global ship-crew manning agency. Built with Next.js 15 (App Router), React 19, TypeScript and Supabase.

The English site is served at the root (`/`) and the Simplified Chinese site at `/zh`. The two language editions are fully independent — the English edition never renders Chinese, and the Chinese edition never renders English.

---

## Highlights

- **Two complete language editions** — `/` (English) and `/zh` (中文), each with its own dictionary so content never mixes.
- **Premium, motion-rich UI** — animated gradient "aurora" backgrounds, scroll-reveal sections, a shimmer hero headline, a typewriter sub-headline, smooth (Lenis) scrolling, and a scroll-progress indicator.
- **Full marketing site** — home, about, why-us, compliance, our process, six service pages, four crew-category pages, FAQ, contact (with a working inquiry form), legal pages, and a maritime knowledge hub (blog).
- **Content platform (Supabase)** — a private admin portal to manage blog articles (bilingual), contact submissions, navigation menus, footer/social links, and custom header scripts.
- **Secure Vault** — AES-256-GCM encrypted credential storage inside the admin.
- **SEO-ready** — per-page metadata, hreflang alternates, sitemap, JSON-LD article schema, and Open Graph tags.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript, React 19 |
| Database / Storage | Supabase (Postgres + Storage) |
| Motion | Framer Motion + Lenis |
| Styling | Hand-crafted design system (CSS) |
| Auth | Signed-cookie session (custom admin portal) |

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example and fill in the values:

```bash
cp .env.local.example .env.local
```

The site runs **without** a database (it falls back to bundled demo content), so you can start immediately. Connect Supabase whenever you're ready (see below).

### 3. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000> (English) or <http://localhost:3000/zh> (中文).

### 4. Production build

```bash
npm run build
npm start
```

---

## Supabase setup (optional, enables the CMS)

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the contents of [`supabase/schema.sql`](supabase/schema.sql).
3. In **Storage**, create a **public** bucket named `images` (used for article images).
4. From **Project Settings → API**, copy the values into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. (Optional) Push the bundled articles into the database so they become editable in the admin:

   ```bash
   npm run seed
   ```

---

## Admin portal

The private content portal lives at a custom URL:

```
/taslima
```

**Default credentials**

| Email | Password |
| --- | --- |
| `admin@shipcrewagency.com` | `ShipCrew@2026` |

Change them by setting `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in your environment. Generate a new password hash with:

```bash
npm run hash-password "YourNewStrongPassword"
```

The admin includes: dashboard, bilingual blog manager, contact-message inbox, menu manager, footer & social settings, custom scripts, and the encrypted **Vault**.

> Generate fresh `SESSION_SECRET` and `VAULT_SECRET` values for production:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
> ```

---

## Deployment

Deploy to any Node host (Vercel, Netlify, a container, etc.). Set the same environment variables from `.env.local` in the host's dashboard. Build command `npm run build`, start command `npm start`.

---

## Project structure

```
src/
  app/
    (site)/         English site (served at /)
    zh/             Chinese site (served at /zh)
    admin/          Private admin portal
    taslima/        Admin login
    api/            Route handlers (contact, admin)
    layout.tsx      Root layout + fonts
    globals.css     Design system
    sections.css    Section styles
  components/
    layout/         Header, footer, chrome
    sections/       Reusable sections
    pages/          Page bodies (language-driven)
    ui/             Buttons, hero, CTA strip…
    fx/             Motion (reveal, typewriter, aurora, smooth-scroll)
    admin/          Admin UI
  i18n/             en.ts / zh.ts dictionaries (+ types)
  lib/              auth, vault, supabase, blog, seo
  data/             bundled blog + legal content
supabase/
  schema.sql        Database schema
scripts/            hash-password, seed
```

---

© Ship Crew Agency. All rights reserved.
