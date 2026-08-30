[![rosinfo.tech](https://cdn.rosinfo.tech/id/logo/id_logo_width_160.svg "rosinfo.tech")](https://rosinfo.tech)

# Changelog

<!-- markdownlint-disable MD024 -->

## [0.1.1] - 2026-08-30

### Changed

- Consolidated all build artifacts into a single `.build/` directory with per-target subdirectories (`.build/web`, `.build/mobile`, `.build/tmp`);
- Untracked working env files from git — only `envs/.env.example` is committed now;
- Rewrote the mobile webDir preparation script in TypeScript (runs natively via Node.js type stripping);
- Aligned Vite/Nitro/Capacitor/Docker/Makefile and ignore configs with the new build output layout;

## [0.1.0] - 2026-08-30

### Added

- TanStack Start with full-document SSR (streaming) for the web build;
- TanStack Router file-based routing with committed generated route trees;
- SEO layer: per-route head management (title, description, OpenGraph, twitter), robots.txt and sitemap.xml as web-only static artifacts;
- SPA mode build for mobile (`tanstackStart({ spa: { enabled: true } })`) producing a single `_shell.html` + assets Capacitor webDir;
- Dynamic route `user.$id` and typed search params (`validateSearch` + zod) working both in SSR and inside the static mobile shell;
- Platform switch `VITE_PLATFORM=web|mobile` at build time via env files and `dotenv-cli`;
- Per-platform route trees: mobile-only routes (`_mobile.*` files, excluded from web builds) and platform page forks via build-time aliases;
- Capacitor 8 integration (iOS/Android) with live-reload dev server, assets generation, safe-area support and local notifications demo pages;
- env files system (`envs/`) with example file and gitignored per-environment sets;
- ops/ Docker infrastructure (production/development/local) running the SSR Node server behind a reverse proxy;
- Makefile targets for local docker compose, remote deploy/undeploy and version updates;
- Stylelint with `@rosinfo.tech/stylelint-config-standard`;
- Routing tests: search schema validation and `user.$id` matching in memory history;
- `type-check` script (`tsc --noEmit`);

### Changed

- Migrated from React Router 7 SPA to TanStack Start/Router;
- Aligned dependency versions with `boilerplate-frontend-nextjs` (TypeScript ~6.0.3, ESLint 10, stylelint 17, node engines >=22.22.1);
- Zustand store split into theme/ui slices with selectors and hydration-safe SSR behavior;

### Removed

- `react-router`, `react-router-dom`, `history` dependencies;
- SPA-era `index.html` entry and `serve.json` static fallback;
