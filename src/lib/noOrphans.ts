// Keeps the last three words of every paragraph together so no line ends on one or two
// orphaned words (Jimmy 10/26). Idempotent: it counts the last two word gaps, turns any
// plain space among them into a non-breaking space, and re-runs as routes render.
// If the bound words are wider than their box (a long phrase in a narrow phone card),
// it lets them go again, so the text wraps instead of running off the card.
const SELECTOR = ".v2 main p, .v2 main figcaption, .v2 main li, .v2 footer p";
const GAPS = 2;

type Edit = { node: Text; index: number; original: string };
const bound = new Map<Element, Edit[]>();
const released = new WeakSet<Element>();

function bindLastWords(el: Element) {
  const edits: Edit[] = [];
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
      if (c === "-") { edits.push({ node, index: k, original: c }); chars[k] = "\u2011"; changed = true; seenWord = true; continue; }
      if (!isGap) { seenWord = true; continue; }
      if (!seenWord) continue; // trailing whitespace, not a gap between words
      if (c === " ") { edits.push({ node, index: k, original: c }); chars[k] = "\u00A0"; changed = true; }
      need--;
      seenWord = false;
    }
    if (changed) node.data = chars.join("");
  }
  if (edits.length) bound.set(el, [...(bound.get(el) ?? []), ...edits]);
}

function overflows(el: Element) {
  return el.scrollWidth > el.clientWidth + 1;
}

function release(el: Element) {
  for (const { node, index, original } of bound.get(el) ?? []) {
    if (node.isConnected && index < node.data.length) node.data = node.data.slice(0, index) + original + node.data.slice(index + 1);
  }
  bound.delete(el);
  released.add(el);
}

function run() {
  document.querySelectorAll(SELECTOR).forEach((el) => {
    if (released.has(el)) return;
    bindLastWords(el);
    if (bound.has(el) && overflows(el)) release(el);
  });
  for (const el of bound.keys()) if (!el.isConnected) bound.delete(el);
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
  window.addEventListener("resize", schedule);
  document.fonts?.ready.then(schedule);
}
