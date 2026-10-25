import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

const featured = {
  quote: "They handled our VIP event space build from start to finish. What started as a small mural project turned into a complete facility build-out. That's what trust looks like: you earn it, then you deliver.",
  name: "Gary Cummings",
  title: "VP Operations, Carroll Shelby International",
};

const testimonials = [
  {
    quote: "We hired LÏEF for a complete home remodel and they exceeded every expectation. Hands-on throughout the entire process. The attention to detail was unmatched and the project came in on time.",
    name: "Michael R.",
    title: "Homeowner, Orange County",
  },
  {
    quote: "From design through completion, the communication was flawless. They walked us through every decision and made sure we understood the budget implications before moving forward. True professionals.",
    name: "Sarah & David K.",
    title: "Homeowners, Santa Barbara",
  },
  {
    quote: "After getting burned by two previous contractors, bringing in an owner's rep was a breath of fresh air. Transparent about costs, realistic about timelines, and the quality of work speaks for itself.",
    name: "Robert T.",
    title: "Commercial Property Owner, Costa Mesa",
  },
  {
    quote: "The Keller Williams office buildout was handled with precision. The team understood our brand requirements and translated them into a workspace that our agents are proud to call home.",
    name: "Branch Manager",
    title: "Keller Williams, Los Angeles",
  },
  {
    quote: "We were overwhelmed after the fire and had no idea where to start. LÏEF came in, took over the insurance coordination, vetted every contractor, and saved us nearly 10% on the total rebuild. Worth every penny.",
    name: "Patricia & Mark D.",
    title: "Homeowners, Santa Barbara Fire Rebuild",
  },
  {
    quote: "We built from the ground up and thought we could manage it ourselves. Within two months we were drowning in change orders and missed deadlines. LÏEF stepped in, renegotiated three major contracts, and got us back on track. We would have lost six figures without them.",
    name: "Daniel & Christine W.",
    title: "Custom Home Build, Scottsdale",
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="testimonials" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="relative mb-12"
            >
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(1,68,33,.24)" }}>
                TRUSTED
              </div>
              <div className="v2-label mb-6">Testimonials</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                WHAT OUR<br /><span style={{ color: "var(--v2-neon)" }}>CLIENTS ARE SAYING</span><span className="v2-neon-period">.</span>
              </h2>
              <p className="max-w-[600px]" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>
                25+ years of client trust across Southern California and the Southwest. Same standards, same results. Now protecting property owners across three markets.
              </p>
            </motion.div>

            {/* Featured quote */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="p-8 md:p-12 mb-8"
              style={{ background: "var(--v2-green)" }}
            >
              <span style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(194,184,167,.3)", fontFamily: "Georgia, serif" }}>&ldquo;</span>
              <p className="mt-2" style={{ fontStyle: "italic", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--v2-white)", lineHeight: 1.7 }}>
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-6">
                <span className="block" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--v2-white)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{featured.name}</span>
                <span className="v2-label mt-1 block" style={{ fontSize: "1rem" }}>{featured.title}</span>
              </div>
            </motion.div>

            {/* Quote grid */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.25, ease }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {testimonials.map((t, i) => (
                <div key={i} className="p-6" style={{ background: "rgba(1,68,33,.04)", border: "1px solid var(--v2-rule)" }}>
                  <span style={{ fontSize: "2rem", lineHeight: 1, color: "rgba(194,184,167,.2)", fontFamily: "Georgia, serif" }}>&ldquo;</span>
                  <p className="mt-2" style={{ fontStyle: "italic", fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--v2-rule)" }}>
                    <span className="block" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--v2-white)" }}>{t.name}</span>
                    <span className="block mt-1" style={{ fontSize: "1rem", color: "var(--v2-dim)" }}>{t.title}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Testimonials;
