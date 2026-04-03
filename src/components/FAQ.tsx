import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const ease = [0.16, 1, 0.3, 1] as const;

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is an owner's representative in construction?",
    answer:
      "An owner's representative is a professional who advocates exclusively for the property owner during a construction project. They oversee contractors, review budgets and change orders, coordinate insurance claims, and ensure the project stays on schedule and on budget. Unlike a general contractor who manages the build, an owner's rep protects the owner's financial and legal interests throughout the entire process.",
  },
  {
    question: "Why do I need an owner's rep for my construction project?",
    answer:
      "Most property owners lack the technical expertise to evaluate contractor bids, negotiate change orders, or identify red flags during construction. An owner's rep brings decades of industry experience to protect you from cost overruns, schedule delays, and contractor disputes. Lïef Builders has saved clients over $40M and delivers a minimum 100% ROI on every engagement.",
  },
  {
    question: "What areas does Lïef Builders serve?",
    answer:
      "Lïef Builders serves property owners in Phoenix and Greater Arizona, Las Vegas and Nevada, and Los Angeles and Southern California. The team has completed over $500M in projects across these markets, ranging from luxury residential builds to large-scale commercial developments and disaster recovery rebuilds.",
  },
  {
    question: "How does Lïef Builders save clients money on construction projects?",
    answer:
      "Lïef Builders protects owners from the cost overruns, unnecessary change orders, and contractor markups that plague most construction projects. The team negotiates contracts, verifies vendor pricing, identifies red flags before they become expensive problems, and conducts regular site inspections to keep projects on track. With over $40M saved for clients and a minimum 100% ROI on every engagement, the investment in owner's representation pays for itself.",
  },
  {
    question: "What is SABS construction technology?",
    answer:
      "SABS (Saebi Alternative Building System) is a patented building technology available through Lïef Builders. It uses EPS foam panels with a high-strength cementitious composite coating called SABSCRETE to create a monolithic structural system. SABS delivers 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation, and 100% mold and termite immunity, with 15-20% cost savings and faster build times compared to traditional construction. Lïef offers SABS alongside traditional stick framing, giving clients the right building method for their project.",
  },
];

const FAQAccordion = ({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div
      className="py-6"
      style={{ borderTop: "1px solid var(--v2-rule)" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between text-left gap-4 group cursor-pointer"
      >
        <span
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 500,
            color: "var(--v2-white)",
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 mt-1 transition-transform duration-300"
          style={{
            color: "var(--v2-neon)",
            fontSize: "1.5rem",
            lineHeight: 1,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p
              className="pt-4"
              style={{
                fontFamily: "var(--v2-font-body)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "var(--v2-white)",
                opacity: 0.7,
                lineHeight: 1.7,
                maxWidth: "48rem",
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { ref, inView } = useInView(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.75, ease }}
          className="relative mb-12"
        >
          <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(0,107,63,.24)" }}>
            FAQ
          </div>
          <div className="v2-label mb-6">Common Questions</div>
          <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
            ANSWERS<span className="v2-neon-period">.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 0.75, delay: 0.2, ease }}
        >
          {faqs.map((faq, i) => (
            <FAQAccordion
              key={i}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
