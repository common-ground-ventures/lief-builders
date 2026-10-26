import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

// Jesse's analogy for what an owner's rep does to a job (JF-TEL-57, his words).
export const STOPLIGHT_QUOTE =
  "It's the camera at the stoplight, or the patrol car parked around the corner. Nobody speeds when they know somebody will call it. That's what an owner's rep does to a job.";

const StoplightQuote = () => {
  const { ref, inView } = useInView(0.2);
  return (
    <section className="relative py-16 md:py-24" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <motion.blockquote initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : false} transition={{ duration: 0.75, ease }}>
          <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "var(--v2-white)", lineHeight: 1.5 }}>
            "{STOPLIGHT_QUOTE}"
          </p>
          <footer className="mt-6" style={{ fontSize: "1rem", color: "var(--v2-neon)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
            Jesse Fowler
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default StoplightQuote;
