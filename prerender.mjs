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
    title: "Lïef Builders | Budgets, Bidding and Owner's Representation Nationwide",
    desc: "Send us the plans from any state. We tell you what it should cost, bid it to licensed builders in your market and stay on your side until the last draw.",
  },
  "/national": {
    title: "How It Works, Nationwide | Lïef Builders",
    desc: "A budget from your plans, bids from licensed builders in your market, and someone on your side until the last draw. Our fee is written down before you sign.",
  },
  "/palisades-fire-rebuild-owners-rep": {
    title: "Palisades Fire Rebuild Owner's Representation | Lïef Builders",
    desc: "Owner's representation for homeowners rebuilding after the Palisades fire. LÏEF advocates for the owner through the contractor, the insurer and the build.",
  },
  "/ai": {
    title: "Technology and Innovation | Lïef Builders",
    desc: "Kanopi, the takeoff and estimating software we built, and why it lets the people on your job spend their hours on judgment instead of counting.",
  },
  "/sabs": {
    title: "SABS Construction Technology | Lïef Builders",
    desc: "The Saebi Alternative Building System. 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation. Faster and 15-20% less than traditional methods.",
  },
  "/projects": {
    title: "Projects | Lïef Builders",
    desc: "Lïef developments we price and coordinate, from Midtown Phoenix to Nevada.",
  },
  "/team": {
    title: "Our Team | Lïef Builders",
    desc: "The builders, developers, architects and counsel behind Lïef Builders, on the owner's side of the table.",
  },
  "/testimonials": {
    title: "Testimonials | Lïef Builders",
    desc: "Testimonials: what owners say about working with Lïef Builders.",
  },
  // Moved from anewlief.com/learn on 10/26 (narrative v4); the old addresses 301 here.
  "/learn/owners-rep-alternative-building-systems-arizona": {
    title: "Arizona Owner's Rep for Alternative Building Systems | Lïef Builders",
    desc: "Owner's rep for SABS, ICCF, SCIP and SIPs projects in Arizona: what the role covers, where conventional reps miss and how to weigh the alt-system case.",
  },
  "/learn/arizona-owners-rep-sabs-project-case-files": {
    title: "Arizona Owner's Rep Case Files: SABS Projects | Lïef Builders",
    desc: "Arizona owner's rep case files on SABS projects: 301 W Osborn, Canyon Corporate Plaza, Silver Mountain Ranches and 440 Basin Avenue, and who did what on each.",
  },
};

// Breadcrumb trail per inner route (home is the root and carries none).
const CRUMBS = {
  "/national": "How It Works, Nationwide",
  "/palisades-fire-rebuild-owners-rep": "Palisades Fire Rebuild Owner's Representation",
  "/ai": "Technology and Innovation",
  "/sabs": "SABS Construction Technology",
  "/projects": "Projects",
  "/team": "Our Team",
  "/testimonials": "Testimonials",
  "/learn/owners-rep-alternative-building-systems-arizona": "Owner's Rep for Alternative Building Systems in Arizona",
  "/learn/arizona-owners-rep-sabs-project-case-files": "Arizona Owner's Rep Case Files",
};

function breadcrumbLd(url) {
  const name = CRUMBS[url];
  if (!name) return "";
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Lïef Builders", item: BASE + "/" },
      { "@type": "ListItem", position: 2, name, item: BASE + url },
    ],
  };
  return `    <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`;
}

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
    )
    .replace(
      /<meta property="og:description" content="[\s\S]*?"\s*\/>/,
      `<meta property="og:description" content="${esc(meta.desc)}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:description" content="${esc(meta.desc)}" />`
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
  const crumbs = breadcrumbLd(url);
  if (crumbs) html = html.replace("</head>", crumbs);
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
  title: "Page Not Found | Lïef Builders",
  desc: "The page you are looking for could not be found.",
});
html404 = html404.replace(
  "</head>",
  '  <meta name="robots" content="noindex" />\n  </head>'
);
fs.writeFileSync(path.join(distDir, "404.html"), html404);
console.log("prerendered 404 -> 404.html (noindex)");

console.log(`\nDone. Prerendered ${count} routes.`);
