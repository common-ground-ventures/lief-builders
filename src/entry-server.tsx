import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import AppInner from "./AppInner";

// Rendered at build time by prerender.mjs. Returns the app HTML string for a
// given route, injected into the shipped index.html so crawlers and AI engines
// get real content without executing JavaScript.
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <AppInner />
    </StaticRouter>
  );
}
