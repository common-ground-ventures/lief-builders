import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const ease = [0.16, 1, 0.3, 1] as const;

const capabilitiesLeft = [
  "Initial Project Review",
  "MEP & Structural Coordination",
  "Value Engineering During Design",
  "Site Walks & Inspections",
  "Contractor Communication",
  "Insurance Coordination",
  "Architectural Review",
];

const capabilitiesRight = [
  "Third-Party Contract Negotiation",
  "Change Order Negotiation & Review",
  "Vendor & Material Discount Verification",
  "Red Flag Identification",
  "Legal Review",
  "Budget & Schedule Management",
  "SABS\u2122 Material Supply",
];

const CapStat = ({ end, suffix, label, inView }: { end: number; suffix: string; label: string; inView: boolean }) => {
  const count = useCountUp(end, 2000, 0, inView);
  return (
    <div>
      <span className="v2-headline block" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)" }}>{count}{suffix}</span>
      <span className="v2-label" style={{ fontSize: "1rem", color: "var(--v2-neon)" }}>{label}</span>
    </div>
  );
};

const Capabilities = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="relative py-20 md:py-28" style={{ background: "var(--v2-green)" }}>
      <div className="overflow-hidden absolute inset-0 pointer-events-none" style={{ top: "40%", transform: "translateY(-50%)" }}>
        <div className="v2-ghost-text" style={{ fontSize: "min(10vw, 130px)", lineHeight: 1, color: "rgba(0,0,0,.08)", animation: "v2-ghost-scroll 55s linear infinite", position: "relative", whiteSpace: "nowrap" }}>
          ARCHITECTURE · GENERAL CONSTRUCTION · TRADE WORK · INTERIOR DESIGN · LEGAL · INSURANCE
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-16 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.75, ease }}
              >
                <h2 style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "var(--v2-white)", lineHeight: 1.2 }}>
                  One team.<br />Every discipline.
                </h2>
                <p className="mt-6" style={{ fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }}>
                  Consultants in every modality. Experts across architecture, general construction, trade work, interior design, and legal. Expert advice from the first insurance call to the final walkthrough. We specialize in fire damage work. No handoffs. No compromises. No excuses.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.75, delay: 0.15, ease }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-12"
              >
                <div className="space-y-0">
                  {capabilitiesLeft.map((item) => (
                    <div key={item} className="flex items-center gap-3 py-4" style={{ borderBottom: "1px solid rgba(239,236,227,.1)" }}>
                      <Check size={18} style={{ color: "var(--v2-neon)", flexShrink: 0 }} />
                      <span style={{ fontSize: "1.05rem", color: "var(--v2-white)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-0">
                  {capabilitiesRight.map((item) => (
                    <div key={item} className="flex items-center gap-3 py-4" style={{ borderBottom: "1px solid rgba(239,236,227,.1)" }}>
                      <Check size={18} style={{ color: "var(--v2-neon)", flexShrink: 0 }} />
                      <span style={{ fontSize: "1.05rem", color: "var(--v2-white)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.3, ease }}
              className="text-center pt-8"
            >
              <div className="flex justify-center gap-16 md:gap-24 mb-6">
                <CapStat end={14} suffix="%" label="TIME SAVINGS" inView={inView} />
              </div>
              <p className="max-w-[700px] mx-auto" style={{ fontSize: "1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.6 }}>
                We handle it from start to finish. Every project requires a consultation because every project is different. Less stress. Less confusion. More money in your pocket.
              </p>
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Capabilities;
