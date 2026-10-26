# liefbuilders.com

Owner of the repo and brand: Jimmy (jimmyk247). Org: common-ground-ventures.

## How changes land (branch protection, set by Jimmy 10/19)
- Every change to `main` goes in as a pull request. No direct pushes, no force-pushes, no branch deletes, from any session or person.
- Copy and content changes merge without approval.
- Anything touching brand files (stylesheets, fonts, footer) waits for Jimmy's code-owner sign-off (`.github/CODEOWNERS`).
- Infrastructure changes (hosting config, `wrangler.jsonc`, `_redirects`, `_headers`, DNS, routes) stay open until Robby (robbyproc87) has reviewed them.

## Hosting
- Today: Vercel (Jimmy's team), Git-connected to this repo; every PR gets a Vercel preview.
- Moving to Cloudflare Workers static assets: `wrangler.jsonc` serves `dist` from `npm run build`. Not live until the liefbuilders.com zone moves to Cloudflare and the custom domain is attached in a separate cutover.

## Build
`npm ci && npm run build` (Vite, SSR build, prerender into `dist`).

## Parity checks (receipts/)
Before any cutover, `receipts/http_parity_v2.py` compares live www.liefbuilders.com with `npx wrangler dev` on localhost:8788. It only reads: GET, HEAD, and one CORS preflight to the lead webhook. It never POSTs.
- Part A: status, Location (query string kept), content-type and body hash, GET and HEAD, on 59 paths: every route, `/index` and `/index.html` aliases at every level, uppercase variants, trailing slash, `.html`, `/technology`, and query strings on each kind.
- Part B: browser-style page loads (Chrome user agent, Sec-Fetch-Mode navigate), then a refresh with If-None-Match and Cache-Control max-age=0, then a hard reload. Every hashed asset the HTML references must return 200 with the same content-type as live.
- Part C: contact form evidence. The form is our own `fetch` POST (JSON) to a LeadConnector webhook, not an embedded iframe. The webhook URL sits in the JS bundle, which is byte-identical on both sides.
- Part D: apex liefbuilders.com (live only). A host redirect cannot live in `_redirects`, so cutover needs a Cloudflare Redirect Rule: 307 to https://www.liefbuilders.com keeping path and query.
- Rerun against the custom domain before and after the nameserver change: `python3 receipts/http_parity_v2.py https://www.liefbuilders.com <new base> receipts/parity-paths-v2.txt`.
- Known, accepted differences: Vercel puts content-type text/plain and cache-control on its 308 responses; Workers sends none. Workers sends ETag but no Last-Modified; refresh still answers 304.
