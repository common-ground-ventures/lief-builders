const items = [
  { value: "14%", label: "Average Time Savings" },
  { value: "", label: "Consultants in Every Modality" },
  { value: "", label: "Fire Damage Specialists" },
  { value: "", label: "AI-Powered Oversight & Analytics" },
  { value: "", label: "Palisades · Santa Barbara · Greensburg · Phoenix" },
];

const TickerItem = ({ value, label }: { value: string; label: string }) => (
  <span className="flex items-center gap-3 whitespace-nowrap">
    {value && (
      <span style={{ fontFamily: "'Japandi', sans-serif", fontSize: "1.25rem", color: "var(--v2-neon)" }}>
        {value}
      </span>
    )}
    <span style={{ fontSize: "1.25rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--v2-muted)" }}>
      {label}
    </span>
    <span style={{ color: "rgba(194,184,167,.15)", margin: "0 24px" }}>◆</span>
  </span>
);

const StatsTicker = () => {
  const repeated = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        padding: "0.9rem 0",
        background: "linear-gradient(to right, #1B3427, #15271D)",
      }}
    >
      <div className="v2-ticker-track flex items-center" style={{ width: "max-content" }}>
        {repeated.map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default StatsTicker;
