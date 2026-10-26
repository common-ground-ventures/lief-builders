import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
                ANY STATE<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>ONE STANDARD</span><span className="v2-neon-period">.</span>
              </h2>
              <p className="max-w-[700px] mx-auto" style={{ fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }}>
                Home base is Phoenix, with work in Las Vegas and Los Angeles and projects on record from Kansas to Texas to Utah. Everywhere else, we price it from here and bid it with builders who work there.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {markets.map((m) => (
                <div
                  key={m.city}
                  className="p-8 text-center transition-all duration-300 cursor-pointer"
                  style={{ background: "rgba(0,0,0,.15)", border: "1px solid rgba(239,236,227,.1)" }}
                >
                  <h3 style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.5rem", fontWeight: 600, color: "var(--v2-white)" }}>{m.city}</h3>
                  <span className="v2-label block mt-1" style={{ fontSize: "1rem" }}>{m.state}</span>
                  <p className="mt-3" style={{ fontSize: "1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.5 }}>{m.desc}</p>
                </div>
              ))}
              <Link
                to="/national"
                onClick={() => window.scrollTo({ top: 0 })}
                className="block p-8 text-center transition-all duration-300 hover:brightness-110"
                style={{ background: "rgba(0,0,0,.15)", border: "1px solid var(--v2-neon)" }}
              >
                <h3 style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.5rem", fontWeight: 600, color: "var(--v2-white)" }}>Anywhere else</h3>
                <span className="v2-label block mt-1" style={{ fontSize: "1rem" }}>ANY STATE</span>
                <p className="mt-3" style={{ fontSize: "1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.5 }}>Send the plans.</p>
              </Link>
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Markets;
