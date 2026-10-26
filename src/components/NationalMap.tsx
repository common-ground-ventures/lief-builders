import { MAP_W, MAP_H, NATION_D, STATES, PINS, type MapPin } from "@/data/us-map";

// SVG map of the US with a pin on every state that has a project on record.
// Geometry is precomputed (scripts/gen-usmap.mjs). One pin style throughout:
// the shaded state already says "project on record", so pins and labels share
// one colour. Hovering a state, its pin, or its button lights the state, grows
// its pins and brightens their labels.

const LOGGIA = "#C2B8A7";
const VILLA = "#EFECE3";

// Default label sits right of the pin. Santa Barbara is tucked against the
// coast under Las Vegas / above Los Angeles, so its label goes above the pin.
const labelFor = (p: MapPin) => {
  if (p.label === "Santa Barbara") return { x: p.x, y: p.y - 12, anchor: "middle" as const };
  return { x: p.x + 11, y: p.y + 4, anchor: "start" as const };
};

type Props = { hovered: string | null; onHover: (usps: string | null) => void };

const NationalMap = ({ hovered, onHover }: Props) => (
  <svg
    viewBox={`0 0 ${MAP_W} ${MAP_H}`}
    role="img"
    aria-label="Map of the United States with a pin on every state where LÏEF has a project on record"
    className="nm w-full h-auto block"
    onMouseLeave={() => onHover(null)}
  >
    <defs>
      <filter id="nm-lift" x="-10%" y="-10%" width="120%" height="130%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000" floodOpacity=".45" />
      </filter>
      <filter id="nm-text" x="-10%" y="-40%" width="120%" height="180%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.6" floodColor="#0F1A14" floodOpacity=".9" />
      </filter>
      <filter id="nm-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <g>
      {STATES.map((s) => {
        const on = s.active && hovered !== null && s.usps === hovered;
        return (
          <path
            key={s.id}
            d={s.d}
            fill={s.active ? (on ? "rgba(194,184,167,.62)" : "rgba(194,184,167,.35)") : "rgba(239,236,227,.06)"}
            stroke={s.active ? (on ? VILLA : "rgba(194,184,167,.75)") : "rgba(194,184,167,.18)"}
            strokeWidth={s.active ? (on ? 1.4 : 0.9) : 0.6}
            strokeLinejoin="round"
            filter={on ? "url(#nm-glow)" : s.active ? "url(#nm-lift)" : undefined}
            style={{ transition: "fill .3s, stroke .3s", cursor: s.active ? "pointer" : "default" }}
            onMouseEnter={() => onHover(s.active ? s.usps : null)}
          >
            <title>{s.name}</title>
          </path>
        );
      })}
      <path d={NATION_D} fill="none" stroke="rgba(194,184,167,.28)" strokeWidth={0.8} strokeLinejoin="round" pointerEvents="none" />
    </g>
    <g>
      {PINS.map((p) => {
        const l = labelFor(p);
        const on = hovered === p.state;
        return (
          <g
            key={p.label}
            aria-label={`${p.label}, ${p.state}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onHover(p.state)}
          >
            <circle cx={p.x} cy={p.y} r={on ? 12 : 8} fill="none" stroke={on ? VILLA : LOGGIA} strokeWidth={0.8} opacity={on ? 0.9 : 0.45} style={{ transition: "r .3s, opacity .3s" }} />
            <circle cx={p.x} cy={p.y} r={on ? 5.6 : 4.2} fill={on ? VILLA : LOGGIA} filter={on ? "url(#nm-glow)" : undefined} style={{ transition: "r .3s" }} />
            <text
              className="nm-label"
              x={l.x + (on && l.anchor === "start" ? 3 : 0)}
              y={l.y}
              textAnchor={l.anchor}
              style={{ fontFamily: "'Japandi', sans-serif", fontSize: on ? 14.5 : 12, fontWeight: 500, letterSpacing: "0.06em", fill: on ? VILLA : LOGGIA, filter: "url(#nm-text)", transition: "font-size .3s, fill .3s" }}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </g>
  </svg>
);

export default NationalMap;
