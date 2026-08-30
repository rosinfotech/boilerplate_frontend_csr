<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD034 -->

[![rosinfo.tech](https://cdn.rosinfo.tech/id/logo/id_logo_width_160.svg "rosinfo.tech")](https://rosinfo.tech)

# Rosinfotech Boilerplate Frontend TanStack Router

## Stack

- Server Side Rendering (web) / SPA-shell (mobile);
- Clean Architecture;
- TanStack Start;
- TanStack Router;
- TypeScript;
- React;
- Ant Design;
- TailwindCSS;
- Capacitor;
- ESlint;
- Prettier;
- Stylelint;

## Approach

One codebase builds two artifacts of the same TanStack Start application:

- **Web = SSR** — `npm run build` produces a Node SSR server (`.output/server/index.mjs` via the Nitro/Vite pipeline) plus client assets. Every request gets a full streamed HTML document with route-level `<head>` management (title, description, OpenGraph, twitter), loaders execute on the server and their data is embedded into the response. Deployed as a Node process behind a reverse proxy (nginx);

- **Mobile = SPA-shell** — `npm run build:mobile` configures `tanstackStart({ spa: { enabled: true } })`. After the client build, TanStack Start prerenders the root route into a single `/_shell.html` (the router's pending fallback stands in for matched routes). The shell is copied to `index.html` with relative asset URLs (`./assets/...`), web-only artifacts (robots.txt, sitemap.xml) are stripped, and the result becomes the Capacitor `webDir` (`dist-mobile/client`). No SSR server ever lands inside an APK/IPA;

Unlike the NextJS boilerplate this repo does not need the `pageExtensions` platform trick: platform routing is handled by the router itself.

What is genuinely better than in the NextJS-based boilerplate:

- **Dynamic path params work in static export** — `/user/$id` is matched by the client router at runtime, so a direct WebView entry into `/user/3` renders natively (NextJS static export forces `?id=` query params instead);

- **Typed search params work in static export** — `validateSearch` with a zod schema parses, validates and canonicalizes `?page=2` on the client exactly like on the server, and `<Link search>` / `useSearch()` are checked at compile time;

- **Typed navigation everywhere** — the committed generated route trees (`src/routeTree.gen.ts` for web, `src/routeTree.mobile.gen.ts` for mobile) make `Link to/params/search`, `useSearch` and `useParams` compile-time verified;

Platform separation mechanics:

- Routes live in a single `src/routes` tree. Files prefixed with `_mobile.` (pathless route → clean URL, e.g. `/notifications`) are mobile-only and are excluded from the web build via `router.routeFileIgnorePattern`; the mobile build ignores `^_web\\.` files the same way;

- Each platform compiles its own route tree, and `src/router.tsx` imports it through the `@/route-tree` alias which the Vite config resolves per platform — the opposite platform's route files are never referenced by the bundle, so mobile code cannot leak into the web artifact and vice versa (verified by build output inspection);

- Page-level forks follow the "shared by default" pattern: a thin route file imports `@/page-index`, which resolves to `IndexPage.tsx` (web/shared) or `IndexPage.mobile.tsx` (mobile) via the same alias mechanism. Layouts fork identically through `@/layout` (`LayoutContent` vs `LayoutContentMobile`);

- The menu config is shared (`src/configs/menu-items.ts`) and the mobile one extends it (`menu-items-mobile.ts` adds mobile-only entries);

Honest limitations:

- **All route code always ships in the mobile bundle** — a mobile build contains every shared route; secrets, permissions and experiments must be restricted on the API side, never by hiding web pages from the mobile artifact;

- **SSR code hiding / React Server Components are experimental** in TanStack Start and are deliberately NOT used here — server functions and server routes would not exist in the mobile branch, so loaders always call the external API over `fetch` (the same code runs on the server in SSR and in the WebView in the SPA shell);

- Without `VITE_PLATFORM=mobile` in the env files a "mobile" build silently produces a web artifact — always use the `.mobile` env sets (see Quick Start);

## Deployed version

- https://boilerplate-frontend-tanstack-router.demo.rosinfo.tech/

## Quick Start

### Initialization

- Create env files as one of the first steps: copy the variables you need from `envs/.env.example` into `envs/.env.development`, `envs/.env.production` and their `.mobile` counterparts, and optionally into `envs/.env.local*` overrides; all env files except `.env.example` are gitignored;

  - For `.mobile` env files `VITE_PLATFORM=mobile` is required — without it mobile builds silently produce a web bundle;

  - Client-side variables must use the `VITE_` prefix; there is no runtime env injection — each environment gets its own build;

- `npm i`;

- If you would like to work on mobile version (SPA-shell):

  - Once:

    - `npm run mobile:init`;

### Development

- Web:

  - `npm run dev`

- Mobile:

  - Terminal 1: `npm run dev:mobile`;

  - Terminal 2:

    - `npm run build:mobile:ios` and `npm run dev:mobile:ios`;

    - or `npm run build:mobile:android` and `npm run dev:mobile:android`;

### Building

- Web:

  - `npm run build`;

  - Start the SSR server: `npm run start` (`node .output/server/index.mjs`, honours `PORT`/`HOSTNAME`);

- Mobile:

  - Build:

    - `npm run build:mobile:ios`;

    - or `npm run build:mobile:android`;

### Deployment

- Local:

  - Start:

    - `make local_docker_compose_start`
    - or `docker compose -f ops/docker-compose.local.yml up -d`

  - Stop:

    - `make local_docker_compose_stop`
    - or `docker compose -f ops/docker-compose.local.yml --env-file envs/.env.local down`

- Remote:

  - This is approach suitable if you have own VPS;

    - We recommend to use GitHub Actions as one of true CI/CD approaches;

  - You can use `make local_deploy_remote` command, with your own server resource and secrets;

  - Also, you should make settings Nginx of own www domain with very similar config:

    ```shell
    server {
        listen 80;
        server_name example.com www.example.com;
        return 301 https://example.com/;
    }

    server {
        listen 443;
        server_name example.com www.example.com;
        charset utf-8;
        client_max_body_size 128m;
        root /home/boilerplate-frontend-tanstack-router/www;
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

        location / {
            proxy_buffering off;
            proxy_pass http://localhost:33333;
            proxy_pass_request_headers on;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-NginX-Proxy true;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```

    `proxy_buffering off` keeps response streaming intact — the SSR document is flushed to the client as soon as the shell is ready.

## Other

- Command `make clear` removes all development artifacts directories;
- Generated route trees `src/routeTree.gen.ts` and `src/routeTree.mobile.gen.ts` are committed and regenerated on `dev`/`build`; both are excluded from eslint/prettier;
- Ant Design styles are injected client-side (no server-side style extraction): SSR HTML may flash unstyled antd components until hydration completes;
