import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { KanopiLink } from "@/components/Kanopi";

const ease = [0.16, 1, 0.3, 1] as const;

interface ServiceData {
  num: string;
  label: string;
  title: string;
  body: React.ReactNode;
}

const services: ServiceData[] = [
  {
    num: "01",
    label: "BUDGET FROM YOUR PLANS",
    title: "Know the number before you sign.",
    body: <>We measure your plan set three times, start to finish, in <KanopiLink />, the takeoff and estimating software we built, and price every trade against it. You get a budget you can hold every bid against, before you pay for construction drawings.</>,
  },
  {
    num: "02",
    label: "BIDDING AND PLACEMENT",
    title: "The right builder, in your market.",
    body: "We run the bid with licensed builders where you are building, level every bid against our takeoff so you compare price and scope instead of guesses, and place the contract with the one we would hire for our own projects. In Arizona that is often Armstrong Construction Group, a Lïef partner.",
  },
  {
    num: "03",
    label: "OWNER'S REPRESENTATION",
    title: "Someone on your side until the last draw.",
    body: "We read every bid, change order and draw request before you sign it, and check each change order against quantities, not a guess. Site walks, vendor and material checks, insurance and legal coordination. After a fire, we work the claim with you and the adjuster from the first call.",
  },
  {
    num: "04",
    label: "PROJECT ADVOCACY & PROTECTION",
    title: "Your shield in the build.",
    body: "You don't know what you don't know, and that's exactly what contractors count on. From Greensburg, Kansas tornado rebuilds to Santa Barbara fire damage, we've been the owner's advocate in disaster zones for over two decades. We own and design projects in the Palisades area, giving us a personal stake in the communities we serve. Every engagement is customized to the scope your project demands.",
  },
];

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
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }}>
                SERVICES
              </div>
              <div className="v2-label mb-6">What We Do</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                PRICED<span className="v2-neon-period">.</span><br />PLACED<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>PROTECTED</span><span className="v2-neon-period">.</span>
              </h2>
            </motion.div>

            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : false}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease }}
                className="py-12"
                style={{ borderTop: "1px solid var(--v2-rule)" }}
              >
                <div>
                  <span className="v2-headline block mb-4" style={{ fontSize: "clamp(4rem, 8vw, 6rem)", color: "rgba(194,184,167,.6)", lineHeight: 1 }}>
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
              </motion.div>
            ))}
          </>
      </div>
    </section>
  );
};

export default Services;
