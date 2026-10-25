import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

const aiCapabilities = [
  "Change Order Management & Negotiation",
  "Plan & Specification Clarification",
  "Estimating Verification & Audit",
  "Budget Tracking & Variance Analysis",
  "Schedule Optimization & Monitoring",
  "Document Analysis & Compliance Review",
  "Vendor & Material Price Verification",
  "Insurance Claim Documentation",
];

const AISection = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="technology" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="relative mb-12"
            >
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(1,68,33,.24)" }}>
                TECH
              </div>
              <div className="v2-label mb-6">The Edge</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                AI-POWERED<br /><span style={{ color: "var(--v2-neon)" }}>OVERSIGHT</span><span className="v2-neon-period">.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: 0.75, delay: 0.1, ease }}
                  className="mb-4"
                  style={{ fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}
                >
                  Our team is heavily trained in the latest artificial intelligence and machine learning tools. You're not just getting human expertise. You're armed with an AI agent team that accelerates every phase of your project.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: 0.75, delay: 0.15, ease }}
                  className="mb-8"
                  style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}
                >
                  From automated change order analysis to real-time budget tracking, our AI tools catch discrepancies that manual review misses, faster and with greater precision.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: 0.75, delay: 0.2, ease }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-8"
                >
                  {aiCapabilities.map((item) => (
                    <div key={item} className="flex items-start gap-3 py-3" style={{ borderBottom: "1px solid var(--v2-rule)" }}>
                      <Check size={16} style={{ color: "var(--v2-neon)", flexShrink: 0, marginTop: 4 }} />
                      <span style={{ fontSize: "1rem", color: "var(--v2-white)" }}>{item}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.75, delay: 0.25, ease }}
                className="flex flex-col gap-6"
              >
                {/* Quote Card */}
                <div className="p-8 md:p-10" style={{ background: "rgba(1,68,33,.15)", border: "1px solid var(--v2-rule)" }}>
                  <p style={{ fontStyle: "italic", fontSize: "1rem", color: "var(--v2-white)", lineHeight: 1.7 }}>
                    "Think of it like a cop up the road with a radar gun. Are you gonna speed? The answer is no. That's what an owner's rep does. The contractors aren't going to cut corners because they know they'll get caught. That accountability alone saves you multiples of our fee."
                  </p>
                  <p className="mt-4" style={{ fontSize: "1rem", color: "var(--v2-neon)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  </p>
                </div>
              </motion.div>
            </div>
          </>
      </div>
    </section>
  );
};

export default AISection;
