import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

const AlignmentBanner = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref} className="relative py-16 md:py-24" style={{ background: "var(--v2-green)" }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="flex justify-center mb-6"
            >
              <Shield size={48} strokeWidth={1} style={{ color: "var(--v2-neon)" }} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="v2-headline mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--v2-white)" }}
            >
              100% ALIGNED WITH <span style={{ color: "var(--v2-neon)" }}>YOU</span><span className="v2-neon-period">.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.2, ease }}
              style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}
            >
              In owner's representation, you pay us and nobody else. No kickbacks, vendor deals or material markups.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.3, ease }}
              className="v2-headline mt-6"
              style={{ fontSize: "1rem", letterSpacing: "0.16em", color: "var(--v2-neon)" }}
            >
              WE SUCCEED WHEN YOU SAVE.
            </motion.p>
          </>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,.1)" }} />
    </section>
  );
};

export default AlignmentBanner;
