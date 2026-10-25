import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { useContactModal } from "@/contexts/ContactModalContext";
import FinePrint from "@/components/FinePrint";

const ease = [0.16, 1, 0.3, 1] as const;
const stagger = (i: number) => ({ delay: 0.3 + i * 0.15 });

const watch = [
  {
    num: "01",
    title: "Contractors",
    kicker: "Every bid and change order, read before you sign.",
    body: "Someone on your side of the table reviews the bids, holds the contractor to the scope, and negotiates change orders and third-party contracts for you. Red flags get named early.",
  },
  {
    num: "02",
    title: "Insurance",
    kicker: "Coordinated, not left to you alone.",
    body: "We coordinate with your insurer so the rebuild and the claim move together.",
  },
  {
    num: "03",
    title: "The build",
    kicker: "Eyes on the site, hands on the draws.",
    body: "Site walks and inspections, draw request review, vendor and material verification, and coordination of the mechanical, electrical, plumbing and structural work as the house goes back up.",
  },
];

const steps = [
  {
    num: "1",
    title: "Tell us where you are",
    body: "Where the lot stands, what the insurer has said, and whether you have a contractor yet.",
  },
  {
    num: "2",
    title: "We review what you have",
    body: "The plans, the bids, the claim and the contract in front of you. We tell you what is fair, what is missing and what to ask for.",
  },
  {
    num: "3",
    title: "We stay on your side",
    body: "From the first review to the last draw, LÏEF is the owner's representative. We advocate for you, not for the contractor and not for the insurer.",
  },
];

const Section = ({ id, children, bg = "var(--v2-deep)" }: { id?: string; children: React.ReactNode; bg?: string }) => (
  <section id={id} className="relative py-20 md:py-28" style={{ background: bg, borderTop: "1px solid var(--v2-rule)" }}>
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">{children}</div>
  </section>
);

const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView(0.1);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : false} transition={{ duration: 0.75, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
};

const PalisadesPage = () => {
  const { openModal } = useContactModal();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const eyebrow = "Owner's Representation · Palisades Fire Rebuild · Southern California";

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-x-hidden pt-24 md:pt-28 pb-16" style={{ background: "var(--v2-deep)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-[60%]" style={{ background: "radial-gradient(ellipse at top right, rgba(0,107,63,.12), transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%]" style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.04), transparent 70%)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(0), ease }} className="mb-3 md:mb-4">
            <span className="v2-label hidden md:inline text-[1.25rem]">{eyebrow}</span>
            <span className="md:hidden" style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" }}>
              <span className="inline-block w-4 h-px mr-2 align-middle" style={{ background: "var(--v2-neon)" }} />
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(1), ease }} className="v2-headline leading-[0.95] mb-4 md:mb-6" style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}>
            REBUILDING AFTER THE PALISADES FIRE<span className="v2-neon-period">?</span>
            <br />
            <span style={{ color: "var(--v2-neon)" }}>HAVE SOMEONE ON YOUR SIDE</span><span className="v2-neon-period">.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(2), ease }} className="max-w-[680px]" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)", color: "var(--v2-muted)", lineHeight: 1.6 }}>
            LÏEF Builders provides owner's representation for homeowners rebuilding in Southern California. We advocate for the owner through the contractor, the insurer and the build, from the first review to the last draw.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(3), ease }} className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={openModal}
              className="transition-all duration-300 hover:brightness-110"
              style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-neon)", color: "var(--v2-deep)", border: "none", padding: "10px 24px", cursor: "pointer" }}
            >
              Start a Conversation
            </button>
            <button
              onClick={() => document.querySelector("#watch")?.scrollIntoView({ behavior: "smooth" })}
              className="transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
              style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" }}
            >
              What we cover
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why an owner's rep */}
      <Section id="why">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20">
          <Reveal>
            <div className="v2-label mb-6">Why an owner's representative</div>
            <h2 className="v2-headline text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--v2-white)" }}>
              THE OTHER SIDES<br />KNOW THE PROCESS<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>DO YOU</span><span className="v2-neon-period">?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-5" style={{ fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }}>
              An owner's representative is a professional who advocates exclusively for the property owner during a construction project, protecting their financial and legal interests from start to finish.
            </p>
            <p className="mb-5" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              Contractors and insurers do this every day. Most homeowners do it once. LÏEF puts experienced people on the owner's side so that contractors and insurers cannot take advantage of what an owner does not know.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              Our experience includes disaster recovery rebuilds, including the Greensburg, Kansas tornado and Santa Barbara fire damage.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What we cover */}
      <Section id="watch">
        <Reveal className="relative mb-12 md:mb-16">
          <div className="v2-label mb-6">What we cover</div>
          <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl" style={{ color: "var(--v2-white)" }}>
            THREE PLACES<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>ONE ADVOCATE</span><span className="v2-neon-period">.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "var(--v2-rule)", border: "1px solid var(--v2-rule)" }}>
          {watch.map((l, i) => (
            <Reveal key={l.num} delay={0.1 + i * 0.12} className="p-8 md:p-10 relative v2-hover-line">
              <div style={{ background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 }} />
              <span className="v2-headline block mb-4" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "rgba(0,107,63,.24)", lineHeight: 1 }}>{l.num}</span>
              <h3 className="v2-headline mb-2" style={{ fontSize: "1.35rem", color: "var(--v2-white)" }}>{l.title}</h3>
              <p className="mb-4" style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-neon)" }}>{l.kicker}</p>
              <p style={{ fontSize: "1.05rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>{l.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it starts */}
      <Section id="start" bg="var(--v2-black)">
        <Reveal className="mb-12 md:mb-16">
          <div className="v2-label mb-6">How it starts</div>
          <h2 className="v2-headline text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--v2-white)" }}>
            THREE STEPS<br /><span style={{ color: "var(--v2-neon)" }}>FROM FIRST CALL</span><span className="v2-neon-period">.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={0.1 + i * 0.12}>
              <div className="pt-6" style={{ borderTop: "1px solid rgba(0,255,136,.25)" }}>
                <span className="v2-headline block mb-4" style={{ fontSize: "2.5rem", color: "var(--v2-neon)", lineHeight: 1 }}>{s.num}</span>
                <h3 className="mb-3" style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.35rem", fontWeight: 600, color: "var(--v2-white)", lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: "1.05rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Fire-rated building */}
      <Section id="fire-rated" bg="var(--v2-green)">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20">
          <Reveal>
            <div className="v2-label mb-6">A fire-rated way to rebuild</div>
            <h2 className="v2-headline text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--v2-white)" }}>
              ASK ABOUT<br /><span style={{ color: "var(--v2-neon)" }}>SABS CONSTRUCTION</span><span className="v2-neon-period">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-5" style={{ fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }}>
              For owners who want the new house built to resist the next fire, we can bring in the Saebi Alternative Building System.
            </p>
            <p className="mb-8" style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>
              SABS has 0% flame spread. It is one option to discuss, not a requirement of working with us.
            </p>
            <button
              onClick={() => { navigate("/sabs"); window.scrollTo({ top: 0 }); }}
              className="transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
              style={{ fontFamily: "var(--v2-font-body)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" }}
            >
              About SABS
            </button>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section id="palisades-contact" bg="var(--v2-black)">
        <Reveal className="text-center">
          <div className="v2-label mb-6">Southern California</div>
          <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
            TELL US WHERE<br /><span style={{ color: "var(--v2-neon)" }}>YOU ARE IN THE REBUILD</span><span className="v2-neon-period">.</span>
          </h2>
          <p className="max-w-[640px] mx-auto mb-8" style={{ fontSize: "1.15rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>
            We will tell you what to ask, what to check and who should be in the room.
          </p>
          <button
            onClick={openModal}
            className="transition-all duration-300 hover:brightness-110"
            style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-neon)", color: "var(--v2-deep)", border: "none", padding: "10px 24px", cursor: "pointer" }}
          >
            Start a Conversation
          </button>
        </Reveal>
      </Section>
      <FinePrint />
    </div>
  );
};

export default PalisadesPage;
