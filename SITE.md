# liefbuilders.com

Owner of the repo and brand: Jimmy (jimmyk247). Org: common-ground-ventures.

## How changes land (branch protection, set by Jimmy 10/19)
- Every change to `main` goes in as a pull request. No direct pushes, no force-pushes, no branch deletes, from any session or person.
- Copy and content changes merge without approval.
- Anything touching brand files (stylesheets, fonts, footer) waits for Jimmy's code-owner sign-off (`.github/CODEOWNERS`).
- Infrastructure changes (hosting config, `wrangler.jsonc`, `_redirects`, `_headers`, DNS, routes) stay open until Robbie (robbyproc87) has reviewed them.

## Hosting
- Today: Vercel (Jimmy's team), Git-connected to this repo; every PR gets a Vercel preview.
- Moving to Cloudflare Workers static assets: `wrangler.jsonc` serves `dist` from `npm run build`. Not live until the liefbuilders.com zone moves to Cloudflare and the custom domain is attached in a separate cutover.

## Build
`npm ci && npm run build` (Vite, SSR build, prerender into `dist`).
