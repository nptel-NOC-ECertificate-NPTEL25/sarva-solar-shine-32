# Phase 1 — Supabase-backed production architecture

## Build is currently broken (blocking)

`src/components/LeadForm.tsx` now imports `db` from `src/firebase.ts`, but that file only initialises Firebase and analytics — it exports nothing. Rollup fails with "db is not exported by src/firebase.ts". The missing packages (`firebase`, `@emailjs/browser`) are now installed, so this export is the only remaining break. Plan mode cannot edit source, so the very first action after approval is to remove the Firebase/EmailJS lead path entirely and route lead submission through Supabase (details below). Firebase config with live keys is committed in `src/firebase.ts`; it will be deleted, not extended.

## Audit of the existing codebase

**Stack:** Vite 5 + React 18 + TS + Tailwind + shadcn/ui, React Router, TanStack Query (installed, unused), zod. Supabase client exists at `src/integrations/supabase/client.ts` but `./types` is not generated yet and no table exists. No Express, no server code, no compelling dependency on a long-running Node process.

**Routing:** `/`, `/residential`, `/commercial`, `/pumps`, `/projects`, `/about`, `/contact`, `*` — all wrapped in `SiteLayout` (Header, Footer, WhatsAppFab, scroll-to-top). No `/admin`, no auth guard.

**Hard-coded / mock content to migrate:**
| Source | Content |
|---|---|
| `src/lib/site.ts` | name, tagline, phone, WhatsApp, email, address, map embed, social links |
| `src/data/projects.ts` | 8 projects + imported JPG assets |
| `src/components/Testimonials.tsx` | testimonials |
| `src/components/TrustStats.tsx` | statistics |
| `src/components/ServiceCard.tsx` + pages | services, features, FAQ copy, subsidy copy |
| `src/pages/*.tsx` | all hero, section and SEO copy |
| `index.html` | title/OG/LocalBusiness JSON-LD with placeholder phone/URL |
| `src/components/SavingsCalculator.tsx` | TARIFF 8.5, SUN_HOURS 5.2, COST_PER_KW 60000, DEGRADATION 0.005, YEARS 25, 92% offset, CO₂ factor |

**Forms:** one — `LeadForm` (zod validated, currently Firestore + EmailJS). No careers, quote or application forms.

**Reusable UI worth preserving:** full shadcn set, `SiteLayout`/`Header`/`Footer`/`WhatsAppFab`, `PageHero`, `ServiceCard`, `CtaBanner`, `SEO`, `SavingsCalculator` shell, `useCountUp`. These stay; only their data sources change (props/hooks instead of literals), plus a brand-token pass to the specified green/amber/slate palette.

## Architecture decision

No Express. There is no technical dependency requiring it, and a long-running server would need a second always-on host (Vercel/Lovable serve static output only), a second deploy pipeline, CORS surface and its own secret store. Instead:

- **Supabase Postgres + RLS** = the API for all reads and authenticated writes, via the typed client.
- **Supabase Edge Functions (Deno)** = the trusted server tier for anything that must not be client-trusted: public lead/application intake with rate limiting, quote generation, notification emails, sitemap, bulk/destructive admin ops. Service role never leaves the server.
- Deployment stays a single static SPA build — Vercel-compatible.

## Schema (all `public`, normalized, RLS on, GRANTs in the same migration)

**Identity & access**
- `profiles` (user_id → auth.users, full_name, phone, avatar_url, is_active)
- `app_role` enum: `super_admin | admin | content_manager | crm_staff`
- `user_roles` (user_id, role, unique) + `has_role(_user_id, _role)` and `is_staff(_user_id)` security-definer functions. Roles never stored on profiles.

**Site & content**
- `site_settings` (singleton key/value-typed row: brand, tagline, phone, whatsapp, email, addresses, hours, map, social, footer)
- `branches` (name, address, city, phone, geo)
- `navigation_items` (label, href, parent_id, sort_order, location: header/footer, is_active)
- `pages` (slug, title, status, seo_title, seo_description, og_image_id, canonical)
- `page_sections` (page_id, type, sort_order, content JSONB, is_active)
- `hero_slides` (page_id, headline, subheadline, media_id, cta_label, cta_href, sort_order)
- `statistics` (label, value, suffix, icon, sort_order)

**Catalog & portfolio**
- `service_categories`, `services` (slug, name, summary, body, icon, hero_media_id, status)
- `product_categories`, `products` (slug, name, brand, category_id, specs JSONB, price, warranty_years, status), `product_media` (join → `media_assets`)
- `projects` (slug, title, category, capacity_kw, location, branch_id, commissioned_on, summary, status), `project_media` (join)
- `testimonials` (name, location, rating, quote, project_id, media_id, status)
- `gallery_items` (media_id, title, tags, sort_order)
- `faqs` (question, answer, category, sort_order, status)

**Marketing & careers**
- `blog_categories`, `blog_posts` (slug, title, excerpt, body, cover_media_id, author_id, status, published_at, seo fields), `blog_post_categories` (join)
- `jobs` (slug, title, department, location, type, description, status, closes_on)
- `job_applications` (job_id, name, email, phone, resume_path, cover_note, status) — private

**CRM**
- `leads` (name, phone, email, city, service_id, message, source, utm JSONB, status enum, assigned_to, ip_hash) — private
- `lead_notes`, `lead_activities` (actor, type, payload)
- `quotes` (lead_id, quote_no, system_kw, subtotal, subsidy_amount, total, status, valid_until, pdf_path)
- `quote_items` (quote_id, product_id, description, qty, unit_price, line_total)

**Policy / calculator**
- `calculator_settings` (singleton: default_tariff, sun_hours, degradation_pct, offset_pct, co2_factor, years, is_active + versioned history)
- `calculator_cost_slabs` (min_kw, max_kw, cost_per_kw) — sizing/pricing bands
- `subsidy_schemes` (name, authority, effective_from/to, status) + `subsidy_slabs` (scheme_id, min_kw, max_kw, amount or per_kw rate, cap)

**Ops**
- `media_assets` (bucket, path, mime, width, height, size, alt_text, uploaded_by)
- `audit_logs` (actor_id, action, entity_table, entity_id, before JSONB, after JSONB, ip, created_at)

Every table gets `created_at`/`updated_at` with a shared `update_updated_at_column()` trigger.

## RLS strategy

- **Public (`anon`) read only where explicitly published:** `status = 'published'`/`is_active = true` on pages, sections, hero slides, services, products, projects, testimonials, FAQs, gallery, blog posts (and `published_at <= now()`), jobs, subsidy schemes/slabs, navigation, statistics, branches, site_settings, calculator settings/slabs, media_assets in the public bucket. `GRANT SELECT ... TO anon` only on those.
- **Public writes: none.** `leads`, `job_applications` accept no direct anon insert; intake goes through edge functions using the service role after validation + rate limiting.
- **Staff:** all content tables writable by `content_manager`+; CRM tables readable/writable by `crm_staff`+; `user_roles`, `site_settings`, `audit_logs` restricted to `admin`/`super_admin`; role changes to `super_admin` only. All checks via `has_role()` to avoid recursive policy evaluation.
- **Audit logs:** insert only by triggers/service role, read by admins, no update/delete.
- Row-level ownership where relevant (`assigned_to` for CRM staff scoping, `author_id` for drafts).

## Storage

- `media` — public read, staff write (images: hero, products, projects, blog, gallery)
- `documents` — private, signed URLs (quote PDFs, brochures)
- `resumes` — private, write via edge function only, read by CRM staff
Upload validation (mime + size) on the client and re-checked server-side; `media_assets` rows created in the same operation and a cleanup routine removes orphans.

## Audit logging

Generic `audit_trigger()` (security definer) attached to every content, CRM, settings and role table: captures actor `auth.uid()`, action, table, row id and before/after JSONB. Edge-function actions log explicitly with the acting user resolved from the verified JWT.

## Calculator model

`SavingsCalculator` reads `calculator_settings` + `calculator_cost_slabs` + active `subsidy_schemes/slabs` via React Query (cached, with safe fallbacks). No policy or pricing constant remains in code. The quote-generating math lives in an edge function so displayed prices can't be tampered with client-side.

## Security risks and mitigations

| Risk | Mitigation |
|---|---|
| Firebase API keys + unsecured Firestore writes committed in repo | Delete `src/firebase.ts`, remove firebase/EmailJS deps; rotate/disable that Firebase project |
| Public spam into `leads` | Edge function only: zod validation, honeypot, per-IP/phone rate limit table, no anon insert grant |
| Lead/quote/applicant data exposure | Private tables, no anon GRANT, staff-scoped policies, resumes in private bucket with signed URLs |
| Privilege escalation | Roles in separate `user_roles` table, `has_role()` security definer, role writes restricted to super_admin, never trust client role claims |
| Tampered prices/subsidies | Totals computed server-side in the quote function against DB slabs |
| XSS via rich text | Sanitize on write and render (DOMPurify), restricted tag allowlist |
| Malicious uploads | Mime/size/extension allowlist, private-by-default buckets, no executable types |
| Secret leakage | Service role only inside edge functions; client uses publishable key |
| Enumeration / abuse of functions | JWT verification in code for admin functions, CORS allowlist, rate limits, generic error responses |

## Migration sequence

1. `update_updated_at_column`, `app_role`, `user_roles`, `profiles`, `has_role`/`is_staff`, signup trigger, `audit_logs` + `audit_trigger()`
2. `media_assets` + buckets + storage policies
3. Site core: `site_settings`, `branches`, `navigation_items`, `statistics`, `pages`, `page_sections`, `hero_slides`
4. Catalog: services, products (+categories, media joins), projects, testimonials, gallery, faqs
5. Policy: `calculator_settings`, `calculator_cost_slabs`, `subsidy_schemes`, `subsidy_slabs`
6. CRM: `leads`, `lead_notes`, `lead_activities`, `quotes`, `quote_items`
7. Marketing/careers: blog tables, `jobs`, `job_applications`
8. Attach audit triggers to all of the above; seed every current hard-coded value (site.ts, projects.ts, testimonials, stats, calculator constants, page copy) so nothing is lost
9. Edge functions: `submit-lead`, `submit-application`, `generate-quote`, `sitemap`
10. Frontend rewiring: delete Firebase path, typed hooks per entity, pages read from DB, calculator from settings, SEO from `pages`

Phase 1 ends when the public site renders entirely from Supabase and the lead form persists securely. Admin CMS screens and the CRM UI are Phase 2, built on this schema.

## Confirmations needed

1. Firebase project `sarva-group-of-companys` — safe to remove from this codebase (and should its Firestore writes be locked down separately)?
2. Lead notifications: email via edge function (Resend), or also WhatsApp/SMS (needs a provider + secret)?
3. Should Phase 1 also apply the specified green/amber/slate brand tokens, or keep the current palette until Phase 2?
