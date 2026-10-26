// Keeps the last three words of every paragraph together so no line ends on one or two
// orphaned words (Jimmy 10/26). Idempotent: it counts the last two word gaps, turns any
// plain space among them into a non-breaking space, and re-runs as routes render.
const SELECTOR = ".v2 main p, .v2 main figcaption, .v2 main li, .v2 footer p";
const GAPS = 2;

function bindLastWords(el: Element) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) nodes.push(n as Text);
  let need = GAPS;
  let seenWord = false;
  for (let i = nodes.length - 1; i >= 0 && need > 0; i--) {
    const node = nodes[i];
    const chars = node.data.split("");
    let changed = false;
    for (let k = chars.length - 1; k >= 0 && need > 0; k--) {
      const c = chars[k];
      const isGap = c === " " || c === "\u00A0";
      // a hyphen inside the bound words would still allow a break; make it non-breaking
      if (c === "-") { chars[k] = "\u2011"; changed = true; seenWord = true; continue; }
      if (!isGap) { seenWord = true; continue; }
      if (!seenWord) continue; // trailing whitespace, not a gap between words
      if (c === " ") { chars[k] = "\u00A0"; changed = true; }
      need--;
      seenWord = false;
    }
    if (changed) node.data = chars.join("");
  }
}

function run() {
  document.querySelectorAll(SELECTOR).forEach(bindLastWords);
}

export function startNoOrphans() {
  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; run(); });
  };
  schedule();
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
}
