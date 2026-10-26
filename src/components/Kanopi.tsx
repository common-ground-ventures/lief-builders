import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

// Kanopi is the design, takeoff and estimating software we built. Every link out
// goes to kanopibuild.com in a new tab. Page content only: the footer is a brand file.
export const KANOPI_URL = "https://kanopibuild.com";

const ease = [0.16, 1, 0.3, 1] as const;

/** Inline text link: "Kanopi" inside a sentence. */
export const KanopiLink = ({ children = "Kanopi" }: { children?: React.ReactNode }) => (
  <a
    href={KANOPI_URL}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "var(--v2-neon)", textDecoration: "underline", textUnderlineOffset: "3px" }}
  >
    {children}
  </a>
);

/** Small "Powered by Kanopi" mark, for the proof position on a page. */
export const PoweredByKanopiMark = ({ className = "" }: { className?: string }) => (
  <a
    href={KANOPI_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 transition-all duration-300 hover:brightness-110 ${className}`}
    style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "8px 16px" }}
  >
    Powered by Kanopi
    <ArrowUpRight size={16} strokeWidth={1.5} />
  </a>
);

/** Full band for the home page. */
export const PoweredByKanopiBand = () => {
  const { ref, inView } = useInView(0.15);
  return (
    <section id="kanopi" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-24 items-start">
          <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : false} transition={{ duration: 0.75, ease }}>
            <div className="v2-label mb-6">How we price it</div>
            <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl" style={{ color: "var(--v2-white)" }}>
              POWERED BY<br /><span style={{ color: "var(--v2-neon)" }}>KANOPI</span><span className="v2-neon-period">.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : false} transition={{ duration: 0.75, delay: 0.1, ease }}>
            <p className="mb-5" style={{ fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }}>
              Every Lïef Builders budget runs through Kanopi, the design, takeoff and estimating software we built.
            </p>
            <p className="mb-5" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              It measures your plan set three times, start to finish, checks every bid line and change order against that takeoff, and flags what does not match. A person on our team reads what it flags and makes the call before any number leaves us.
            </p>
            <p className="mb-8" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              The software does the counting. Our people spend their hours on the calls that cost you money. Builders who want a takeoff for their own bids can use Kanopi directly.
            </p>
            <a
              href={KANOPI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:brightness-110"
              style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px" }}
            >
              See Kanopi
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
