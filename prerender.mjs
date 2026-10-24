// Post-build prerender: renders each real route to static HTML and writes
// dist/<route>/index.html with real body content + per-route <title>/canonical.
// The client SPA still boots normally over it (main.tsx uses createRoot), so
// there is no hydration-mismatch risk. Run after `vite build` + the SSR build.
import fs from "node:fs";
import path from "node:path";

const BASE = "https://www.liefbuilders.com";

// Functional SEO meta per route. Titles + canonicals are mechanical.
// Descriptions are auto-generated from existing site facts and can be refined.
const ROUTES = {
  "/": {
    title: "LÏEF Builders | Project Advocacy & Oversight",
    desc: "Owner's representation, project advocacy, and construction oversight across Arizona, Nevada, and Southern California.",
  },
  "/national": {
    title: "National | LÏEF Builders",
    desc: "Pre-construction, general construction contracts and owner representation across the country. The contractor pays our fee, not you.",
  },
  "/ai": {
    title: "Technology and Innovation | LÏEF Builders",
    desc: "How LÏEF Builders applies technology, SABS construction, and intelligent oversight to protect owners on complex builds.",
  },
  "/sabs": {
    title: "SABS Construction Technology | LÏEF Builders",
    desc: "The Saebi Alternative Building System. 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation. Faster and 15-20% less than traditional methods.",
  },
  "/projects": {
    title: "Projects | LÏEF Builders",
    desc: "Luxury residential, commercial, and disaster-recovery projects across Phoenix, Las Vegas, and Los Angeles.",
  },
  "/team": {
    title: "Our Team | LÏEF Builders",
    desc: "Owner's reps, development veterans, architectural review, and general counsel, on the owner's side of the table.",
  },
  "/testimonials": {
    title: "Testimonials | LÏEF Builders",
    desc: "What property owners say about working with LÏEF Builders across Arizona, Nevada, and Southern California.",
  },
};

const distDir = path.resolve("dist");
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const { render } = await import("./dist-server/entry-server.js");

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function patchHead(html, url, meta) {
  const canonical = BASE + (url === "/" ? "/" : url);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?"\s*\/>/,
      `<meta name="description" content="${esc(meta.desc)}" />`
    )
    .replace(
      /<link rel="canonical" href="[\s\S]*?"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:url" content="[\s\S]*?"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?"\s*\/>/,
      `<meta property="og:title" content="${esc(meta.title)}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:title" content="${esc(meta.title)}" />`
    );
}

let count = 0;
for (const [url, meta] of Object.entries(ROUTES)) {
  let appHtml = "";
  try {
    appHtml = render(url);
  } catch (err) {
    console.error(`PRERENDER FAILED for ${url}:`, err.message);
    throw err;
  }
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );
  html = patchHead(html, url, meta);
  const outPath =
    url === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, url.slice(1), "index.html");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  count++;
  console.log(`prerendered ${url} -> ${path.relative(distDir, outPath)} (${appHtml.length} chars)`);
}

// 404 page: render an unmatched route (layout shell), mark noindex, serve with a
// real 404 status (via _redirects on Netlify / 404.html on Vercel).
const notFoundHtml = render("/__not_found__");
let html404 = template.replace(
  '<div id="root"></div>',
  `<div id="root">${notFoundHtml}</div>`
);
html404 = patchHead(html404, "/404", {
  title: "Page Not Found | LÏEF Builders",
  desc: "The page you are looking for could not be found.",
});
html404 = html404.replace(
  "</head>",
  '  <meta name="robots" content="noindex" />\n  </head>'
);
fs.writeFileSync(path.join(distDir, "404.html"), html404);
console.log("prerendered 404 -> 404.html (noindex)");

console.log(`\nDone. Prerendered ${count} routes.`);
