# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/catalog site for **Ixora Spa (Bucaramanga, Colombia)**, domain `https://ixoraspabucaramanga.com`. Angular 19 (standalone components) with SSR + prerendering, styled with Tailwind CSS 3. There is no backend: the content (plans and services) is edited in the C-Code CMS, stored in Firestore and turned into static JSON files before each build; bookings happen through WhatsApp links. UI text and routes are in Spanish. It shares its components with Laurel Spa Medellín (`C:/dev/medellin-spa`) through the `@c-code/c-code-fw/ui` library.

## Commands

- `npm run content` — brings the content from Firestore: writes `src/assets/data/*.json` and updates `prerender-routes.txt` and `public/sitemap.xml` (`c-code-content pull --site xora-spa --project c-code-bf1fd`, package `@c-code/content`). It runs automatically before `npm start` and `npm run build`.
- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build to `dist/xora-spa/` with prerendering. `vercel.json` makes Vercel use it, so the content is pulled before every deploy.
- `npm run serve:ssr:xora-spa` — run the built Express SSR server (`src/server.ts`)
- `npm test` — Karma + Jasmine unit tests (needs Chrome). Specs get their providers from `TEST_PROVIDERS` in `src/test-providers.ts`.

## Architecture

- `src/app/` holds the shell (`app.component`: fixed header with top bar, nav and mobile menu, optional promo popup, floating WhatsApp button hidden on plan details), the shared footer (`components/site-footer`), `nav-links.ts`, `site.config.ts`, app config and routes. Pages live in `src/app/pages/`. `<main>` carries the top padding for the fixed header (`pt-16 lg:pt-[7.5rem]`), so pages must not add their own offset.
- Routes: `''` (home), `planes` (children `''` → plan list, `:slug` → plan details; the old `planes/detalles` redirects to the list), `galeria`, `politicas`.
- **UI components come from `@c-code/c-code-fw/ui`** (source in `C:/dev/c-code/c-code-fw`): `cc-plan-catalog`, `cc-plan-details`, `cc-plan-card`, `cc-gallery`, `cc-page-banner`, `cc-section-heading`, `cc-info-item`, `cc-notice`, `cc-faq`/`cc-faq-item`, `cc-social-links`, `cc-whatsapp-button`, `cc-promo-modal` and the `ccButton` directive for every call to action. Pages only load data, set SEO and pass props; choose the look with component inputs (`variant`, `tone`, `size`, `appearance`…). Fix component bugs in the library, not with CSS overrides here.
- Page layout pattern: `<div class="mx-auto max-w-site px-4 py-8 lg:px-8 lg:py-12">` with a `cc-page-banner` (the page `<h1>`), or sections with `cc-section-heading` on the home page.
- **Theme = `src/styles.css`, the single source of colors and fonts.** It defines the brand variables (`--xora-*`) and maps them to the library roles (`--cc-accent`, `--cc-on-accent`, `--cc-heading`…). `tailwind.config.js` reads the same variables (`primary`, `primary_dark`, `primary_darker`, `secondary`, `secondary_text`, `cocoa`, `ink`, `bg`, `mist`, `stone`) and maps `fontSize` to the library's `--cc-text-*` scale (`tokens.css` is loaded in `angular.json` → styles). Tailwind opacity modifiers do not work with these variables; use `bg-[color-mix(in_srgb,var(--xora-teal-darker)_70%,transparent)]`.
- Headings use Quicksand (`font-heading`), body text Albert Sans. Pink buttons use dark text (`--cc-on-accent: --xora-cocoa`); white on pink fails contrast. Pink used as text must be `text-secondary_text`.
- The home hero image (`bg_main.webp`) has the teal arch baked in; the hero text sits on that arch and the plans section continues it with `bg-primary`. White text on `bg-primary` only passes contrast when it is large and bold (≥ 20px bold).
- **Data = JSON in `src/assets/data/`, generated from Firestore and not tracked by git.** Edit plans and services in the C-Code CMS (`npm run cms` in `C:/dev/c-code/c-code-fw`), not in these files: the next `npm run content` overwrites them. They are `plans.json` (category `0` Individual, `1` Couple, `2` Group; durations in sentence case) and `additionals.json`. There is no `priceRanges.json`, so the catalog is configured with `providePlanCatalog({ priceRangesUrl: null })` and the filter only offers included services.
- **/planes keeps the category in the URL** (`?categoria=individual|pareja|grupal`, see `pages/plans/category-slugs.ts`); without it, couples show. Plan details live at `/planes/<slug>` (slug from the plan name via `planSlug()`); unknown slugs redirect to `/planes`.
- **SEO:** every page calls `SeoService.update()` (configured with `provideSeo()` in `app.config.ts`). Plan details add a per-plan `Service` JSON-LD. The business `DaySpa` JSON-LD is static in `src/index.html`; keep it in sync with `site.config.ts`. `provideHttpClient(withFetch())` is required so the prerender can read the JSON files.
- **Prerendered routes are listed in `prerender-routes.txt`**, and `public/sitemap.xml` lists the same URLs. `npm run content` rewrites the plan entries (`/planes/<slug>`) of both from the CMS and keeps the other lines; add or remove the site's own pages (home, gallery…) by hand.
- **Contact data lives in `src/app/site.config.ts`:** `CONTACT` (phones, email, address, hours, maps link), `SOCIAL_LINKS`, `WHATSAPP_URL`, `planWhatsappUrl(plan)` and `PROMO` (set it to show the popup; `null` hides it).
- Gallery photos: `assets/images/galery/<n>.webp` (full size, opened in the lightbox) and `galery/thumbs/<n>.webp` (600px, used in the grid). Add both when adding a photo, and a caption in `CAPTIONS` in `galery.component.ts`.

## Conventions / gotchas

- Code runs on the server during SSR and prerendering. Guard any direct `document`/`window` access with `isPlatformBrowser`.
- Keep one `<h1>` per page.
- To try unpublished library changes, build and pack the library (`npx ng build core && cd dist/core && npm pack` in `c-code-fw`) and run `npm install --no-save <path>/c-code-c-code-fw-<version>.tgz` here.
