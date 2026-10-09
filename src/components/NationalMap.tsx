import { MAP_W, MAP_H, NATION_D, STATES, PINS, type MapPin } from "@/data/us-map";

// Static SVG map of the US with a pin on every state that has a project on
// record. Geometry is precomputed (scripts/gen-usmap.mjs) so this renders at
// build time with no runtime fetch. Solid pin = known city, hollow = state.

const neon = "#00FF88";

// Default label sits right of the pin. Santa Barbara is tucked against the
// coast under Las Vegas / above Los Angeles, so its label goes above the pin.
const labelFor = (p: MapPin) => {
  if (p.label === "Santa Barbara") return { x: p.x, y: p.y - 12, anchor: "middle" as const };
  return { x: p.x + 11, y: p.y + 4, anchor: "start" as const };
};

const NationalMap = () => (
  <svg
    viewBox={`0 0 ${MAP_W} ${MAP_H}`}
    role="img"
    aria-label="Map of the United States with a pin on every state where Lïef has a project on record"
    className="w-full h-auto block"
  >
    <g>
      {STATES.map((s) => (
        <path
          key={s.id}
          d={s.d}
          fill={s.active ? "rgba(0,107,63,.38)" : "#111111"}
          stroke={s.active ? "rgba(0,255,136,.75)" : "rgba(0,255,136,.18)"}
          strokeWidth={s.active ? 0.9 : 0.6}
          strokeLinejoin="round"
        >
          <title>{s.name}</title>
        </path>
      ))}
      <path d={NATION_D} fill="none" stroke="rgba(0,255,136,.28)" strokeWidth={0.8} strokeLinejoin="round" />
    </g>
    <g>
      {PINS.map((p) => {
        const l = labelFor(p);
        return (
          <g key={p.label} aria-label={`${p.label}, ${p.state}`}>
            {p.kind === "city" ? (
              <>
                <circle cx={p.x} cy={p.y} r={8} fill="none" stroke={neon} strokeWidth={0.8} opacity={0.45} />
                <circle cx={p.x} cy={p.y} r={4.2} fill={neon} />
              </>
            ) : (
              <>
                <circle cx={p.x} cy={p.y} r={8} fill="none" stroke={neon} strokeWidth={0.8} opacity={0.45} />
                <circle cx={p.x} cy={p.y} r={4.2} fill="#0a0a0a" stroke={neon} strokeWidth={1.6} />
              </>
            )}
            <text
              className="nm-label"
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.06em", fill: "#F5F5F3" }}
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
