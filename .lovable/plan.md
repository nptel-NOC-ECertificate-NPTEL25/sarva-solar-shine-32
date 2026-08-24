# Sarva Solar → Production CMS Platform

## Current state (verified)

- Vite + React 18 + TS SPA, 8 static pages (`Index`, `Residential`, `Commercial`, `Pumps`, `Projects`, `About`, `Contact`, `NotFound`), shadcn UI, Tailwind design tokens.
- All content is hard-coded: `src/lib/site.ts` (contact/social), `src/data/projects.ts` (portfolio + imported JPGs), inline copy in every page, `SavingsCalculator.tsx` constants (tariff 8.5, sun hours 5.2, ₹60,000/kW, degradation, 25 yrs).
- `LeadForm.tsx` validates with zod but **does not persist** — it fakes a 700ms delay and shows a success card.
- Lovable Cloud (Supabase) is enabled but empty: no `supabase/migrations/`, no `src/integrations/supabase/types.ts`, no tables, no auth, no storage buckets, no edge functions.
- SEO: `index.html` has title/description/OG/LocalBusiness JSON-LD; `SEO.tsx` sets per-route head tags client-side. No sitemap.xml generation, no dynamic-route SEO.

Gap vs spec: everything except the visual shell and form validation is missing — no CMS, no persistence, no auth/RLS, no media pipeline, no CRM, no audit logs.

## Architectural conflicts to resolve up front

1. **Express/TypeScript API vs this platform.** This project deploys as a static SPA on Lovable's CDN; there is no long-running Node process, so an Express server cannot be hosted here (same constraint applies on Vercel — you'd need serverless functions or a separate always-on host like Render/Fly, adding a second deploy target, CORS, and its own secrets).
   **Proposal (simplest production-safe):** keep a single deploy target. Use **Supabase Postgres + RLS as the primary API** (typed client, row-level authorization enforced by the database), and **Supabase Edge Functions (Deno) for every trusted server-side operation** — lead intake with rate limiting, quote PDF/email, admin bulk actions, sitemap generation, revalidation. Edge functions can be written in Express-style route handlers (Hono) if the Express ergonomics matter. If you later require a true Express service, it can be added as a separate repo consuming the same Supabase DB with a service role — nothing in this plan blocks that.
2. **Client-side SEO on an SPA.** `SEO.tsx` mutates the DOM after hydration; crawlers that don't execute JS see only `index.html`. Fix pragmatically: keep react-helmet-style head management, add a **build-time prerender step** (`vite-plugin-prerender`/static route snapshot) for public routes, plus a **DB-driven `sitemap.xml` + `robots.txt`** served by an edge function.
3. **"No localStorage as source of truth."** Auth session storage in localStorage stays (that's Supabase's session, not content). Everything else reads from the DB.

## Data model (Supabase, all in `public`, RLS on, GRANTs per table)

- `profiles` (id → auth user, name, phone, avatar)
- `user_roles` + `app_role` enum (`admin`, `editor`, `sales`, `viewer`) + `has_role()` security-definer function — roles never on profiles
- Content: `pages`, `page_sections` (typed JSONB blocks), `site_settings` (singleton: contact, social, map, hours), `navigation_items`
- Catalog: `products` (panels/inverters/pumps, specs JSONB, price), `product_categories`, `services`
- Portfolio: `projects` (category, size, location, gallery), `testimonials`
- Marketing: `blog_posts` (slug, MDX/HTML body, status, published_at), `blog_categories`, `careers` (+ `job_applications`), `faqs`, `subsidy_schemes` (PM Surya Ghar tiers, editable rates)
- CRM: `leads` (source, status pipeline, assigned_to, UTM), `lead_notes`, `lead_activities`, `quotes` (line items JSONB, totals, status), `quote_items`
- Calculator: `calculator_settings` (tariff, sun hours, ₹/kW by size band, degradation, offset %, CO₂ factor) — read publicly, written by admin
- Ops: `audit_logs` (actor, table, row, action, diff), `media_assets` (storage path, alt, dimensions)
- Storage buckets: `media` (public read, admin write), `documents` (private, signed URLs for quotes/CVs)

RLS shape: public `SELECT` only on published content (`status = 'published'`); all writes require `has_role(auth.uid(),'admin'|'editor')`; `leads`/`quotes` insert allowed to `anon` **only via edge function** (service role), never direct; every admin table gets an audit trigger.

## Edge functions

- `submit-lead` — zod validation, IP+phone rate limit, honeypot, UTM capture, writes lead, sends notification email
- `submit-application` — careers CV upload + record
- `generate-quote` — builds quote from products + calculator settings, stores PDF in `documents`
- `sitemap` — DB-driven XML
- `admin-bulk` — guarded destructive/bulk ops with role check in code

## Admin CMS (`/admin`)

Protected shell (auth guard + role guard, server-enforced by RLS): Dashboard (lead funnel, conversion, revenue), Leads (kanban + detail, notes, assignment), Quotes builder, Products, Projects, Blog editor, Careers + applications, Testimonials/FAQs, Pages & sections editor, Media library (upload/crop/alt), Calculator settings, Subsidy schemes, Site settings, Users & roles, Audit log viewer.

## Public site rework

Rebuild pages to render from DB (with typed loaders + React Query, skeletons, ISR-ish caching). New/changed routes: `/`, `/services/:slug`, `/products`, `/products/:slug`, `/projects`, `/projects/:slug`, `/subsidy`, `/blog`, `/blog/:slug`, `/careers`, `/careers/:slug`, `/about`, `/contact`, `/quote`. Visual direction is re-derived from a fresh design system (tokens in `index.css`); no hard-coded copy, colors chosen deliberately rather than inherited.

## Phasing

1. **Foundation** — schema migrations (all tables, GRANTs, RLS, roles, audit triggers), storage buckets, seed from existing hard-coded content so nothing is lost.
2. **Auth + admin shell** — email/password + Google, role guards, layout, dashboard skeleton.
3. **CMS modules** — settings, pages/sections, media, products, projects, testimonials, FAQs, calculator, subsidy.
4. **Lead/CRM** — `submit-lead` function + rate limiting, wire `LeadForm`, leads pipeline, quotes builder, notifications.
5. **Blog + careers** — editors, public listings/details, applications.
6. **Public rebuild** — all pages DB-driven, new design system, dynamic calculator.
7. **SEO + hardening** — prerender, sitemap/robots, per-route JSON-LD, security scan + linter pass, RLS test matrix, performance budget, deployment checks.

## Decisions I need from you

1. Confirm the **Supabase + Edge Functions** architecture (no separate Express host) — or name the host you want for Express.
2. Design direction: keep the current green/yellow brand as a starting point, or a clean-slate direction (share references if any)?
3. Lead notification channel: email only, or email + WhatsApp/SMS (needs a provider + secret)?
4. Blog editor: rich text (TipTap) or markdown?
