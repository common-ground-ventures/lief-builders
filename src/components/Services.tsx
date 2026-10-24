import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const ease = [0.16, 1, 0.3, 1] as const;

interface ServiceData {
  num: string;
  label: string;
  title: string;
  body: string;
  statEnd?: number;
  statPrefix?: string;
  statSuffix?: string;
  statLabel?: string;
}

const services: ServiceData[] = [
  {
    num: "01",
    label: "PROJECT ADVOCACY & PROTECTION",
    title: "Your shield in the build.",
    body: "You don't know what you don't know, and that's exactly what contractors count on. From Greensburg, Kansas tornado rebuilds to Santa Barbara fire damage, we've been the owner's advocate in disaster zones for over two decades. We own and design projects in the Palisades area, giving us a personal stake in the communities we serve. Every engagement is customized to the scope your project demands.",
  },
  {
    num: "02",
    label: "INSURANCE & LEGAL COORDINATION",
    title: "Navigate the claim. Maximize the recovery.",
    body: "We coordinate directly with insurance adjusters, prepare detailed draw requests, negotiate claim settlements, and partner with legal counsel to protect your position. From documentation to dispute resolution, we handle it so you don't have to.",
    statEnd: 40,
    statPrefix: "$",
    statSuffix: "M+",
    statLabel: "OF THIRD-PARTY WORK UNDER OWNER'S REPRESENTATION",
  },
  {
    num: "03",
    label: "COST CONTROL & SCHEDULE OPTIMIZATION",
    title: "Faster builds. Tighter budgets. Zero surprises.",
    body: "Change order negotiation, site walks, vendor discount verification, value engineering, and red flag identification. We catch the problems before they cost you time and money. Our job is to make your project go faster and come in cheaper than you thought possible.",
    statEnd: 4,
    statPrefix: "$",
    statSuffix: "M+",
    statLabel: "IN DELAY COSTS AVOIDED",
  },
];

const CountUpStat = ({ service }: { service: ServiceData }) => {
  const { ref, inView } = useInView(0.5);
  const count = useCountUp(service.statEnd ?? 0, 2000, 0, inView);
  return (
    <div ref={ref}>
      <span className="v2-headline" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--v2-white)" }}>
        {service.statPrefix || ""}{count}{service.statSuffix}
      </span>
    </div>
  );
};

const Services = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="services" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="relative mb-16"
            >
              {/* Ghost text - vertically centered with heading */}
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(0,107,63,.24)" }}>
                SERVICES
              </div>
              <div className="v2-label mb-6">What We Do</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                FULL-SCOPE<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>PROTECTION</span><span className="v2-neon-period">.</span>
              </h2>
            </motion.div>

            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease }}
                className={`grid grid-cols-1 gap-8 md:gap-16 py-12 ${s.statEnd !== undefined ? "md:grid-cols-[1fr_auto]" : ""}`}
                style={{ borderTop: "1px solid var(--v2-rule)" }}
              >
                <div>
                  <span className="v2-headline block mb-4" style={{ fontSize: "clamp(4rem, 8vw, 6rem)", color: "rgba(0,107,63,.24)", lineHeight: 1 }}>
                    {s.num}
                  </span>
                  <div className="v2-label mb-3" style={{ fontSize: "1rem" }}>{s.label}</div>
                  <h3 className="mb-4" style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, color: "var(--v2-white)" }}>
                    {s.title}
                  </h3>
                  <p className="max-w-[600px]" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
                    {s.body}
                  </p>
                </div>
                {s.statEnd !== undefined && (
                  <div className="flex flex-col items-center justify-center text-center md:min-w-[200px]">
                    <CountUpStat service={s} />
                    <span style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--v2-muted)", marginTop: "8px" }}>
                      {s.statLabel}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </>
      </div>
    </section>
  );
};

export default Services;
