import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

const markets = [
  { city: "Phoenix", state: "ARIZONA", desc: "Home base. 25+ years of boots on the ground." },
  { city: "Las Vegas", state: "NEVADA", desc: "Active projects. Direct SABS\u2122 supply chain." },
  { city: "Los Angeles", state: "CALIFORNIA", desc: "Fire reconstruction. Fresh perspective, no local bias." },
];

const Markets = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} className="relative py-20 md:py-28" style={{ background: "var(--v2-green)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="mb-12"
            >
              <div className="v2-label mb-6">Markets</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                THREE MARKETS.<br /><span style={{ color: "var(--v2-neon)" }}>ONE STANDARD</span><span className="v2-neon-period">.</span>
              </h2>
              <p className="max-w-[700px] mx-auto" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
                Same climate conditions. Same material challenges. Same level of oversight. We serve property owners across the Sun Belt with SABS&trade; technology and project advocacy you can trust.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {markets.map((m) => (
                <div
                  key={m.city}
                  className="p-8 text-center transition-all duration-300 cursor-pointer"
                  style={{ background: "rgba(0,0,0,.15)", border: "1px solid rgba(255,255,255,.1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--v2-neon)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,136,.25), inset 0 0 20px rgba(0,255,136,.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3 style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.5rem", fontWeight: 600, color: "var(--v2-white)" }}>{m.city}</h3>
                  <span className="v2-label block mt-1" style={{ fontSize: "1rem" }}>{m.state}</span>
                  <p className="mt-3" style={{ fontSize: "1rem", color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              ))}
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Markets;
