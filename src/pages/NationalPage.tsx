import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { useContactModal } from "@/contexts/ContactModalContext";
import NationalMap from "@/components/NationalMap";
import logoConcrete from "@/assets/logos/logo-concrete.png";
import { PINS } from "@/data/us-map";

const ease = [0.16, 1, 0.3, 1] as const;
const stagger = (i: number) => ({ delay: 0.3 + i * 0.15 });

const lanes = [
  {
    num: "01",
    title: "Pre-construction",
    kicker: "Everything before the first shovel.",
    body: "Architectural design and production, structural, mechanical, electrical and plumbing engineering, estimating, value engineering and permitting, sealed by licensed professionals registered in your state. Our own rendering and estimating software runs beside the drawings from the first sketch, so the design never drifts away from what it costs to build.",
  },
  {
    num: "02",
    title: "General Construction",
    kicker: "Contracts placed in your market.",
    body: "We run the bid, hold every number against our own takeoff, and place the contract with a general contractor from our network that we would hire for our own projects. Our fee sits on the contractor's side. Your price is the contractor's price.",
  },
  {
    num: "03",
    title: "Owner Representation",
    kicker: "On top, wherever you build.",
    body: "Site walks, change order review, draw requests, insurance and legal coordination, vendor and material verification. Someone on your side of the table for the whole build.",
  },
];

const steps = [
  {
    num: "1",
    title: "Send the site and the idea",
    body: "We come back with a measured takeoff and a budget built in our own estimating software, before you have spent anything on drawings.",
  },
  {
    num: "2",
    title: "We build the pre-construction team",
    body: "Design, engineering and permitting, produced under LÏEF's direction and sealed by professionals licensed where you are building.",
  },
  {
    num: "3",
    title: "We place the contract and stay",
    body: "We bid the work to general contractors in your market, place the contract, and remain your owner's representative until the last draw.",
  },
];

// Coordinated projects. Mirrors the five on ProjectsPage; Jesse is adding to it.
const coordinated = [
  { name: "301 W Osborn", type: "Adaptive Reuse", location: "Midtown, Phoenix AZ" },
  { name: "The Vail", type: "Boutique 55+ Community", location: "Arizona" },
  { name: "Canyon Corporate Plaza", type: "Office-to-Residential", location: "Phoenix, AZ" },
  { name: "Silver Mountain Ranches", type: "Equestrian Community", location: "Scottsdale, AZ" },
  { name: "440 Basin Avenue", type: "Multi-Family", location: "Pahrump, NV" },
];

const statesOnRecord = Array.from(new Set(PINS.map((p) => p.state)));
const stateNames: Record<string, string> = {
  AZ: "Arizona", CA: "California", NV: "Nevada", UT: "Utah", CO: "Colorado", TX: "Texas",
  KS: "Kansas", OR: "Oregon", ID: "Idaho", WA: "Washington", MT: "Montana", FL: "Florida",
};

const Section = ({ id, children, bg = "var(--v2-deep)", full = false }: { id?: string; children: React.ReactNode; bg?: string; full?: boolean }) => (
  <section
    id={id}
    className={`relative ${full ? "lg:min-h-[100svh] lg:flex lg:items-center py-20 md:py-24" : "py-20 md:py-28"}`}
    style={{ background: bg, borderTop: "1px solid var(--v2-rule)" }}
  >
    <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">{children}</div>
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

const NationalPage = () => {
  const { openModal } = useContactModal();
  const navigate = useNavigate();
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const eyebrow = "Pre-construction · General Construction · Owner Representation · Nationwide";

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-center overflow-x-hidden pt-28 pb-28" style={{ background: "var(--v2-deep)" }}>
        <div className="absolute inset-0 pointer-events-none">
        {/* glows removed 10/25: the section gradients carry the light now */}
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(0), ease }} className="mb-6 md:mb-8">
            <span className="v2-label hidden md:inline text-[1.25rem]">{eyebrow}</span>
            <span className="md:hidden" style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" }}>
              <span className="inline-block w-4 h-px mr-2 align-middle" style={{ background: "var(--v2-neon)" }} />
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(1), ease }} className="v2-headline leading-[1.02] mb-6 md:mb-8" style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}>
            YOUR PROJECT<span className="v2-neon-period">.</span>
            <br />
            <span style={{ color: "var(--v2-neon)" }}>ANY STATE</span><span className="v2-neon-period">.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(2), ease }} className="max-w-[680px]" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.3rem)", color: "var(--v2-muted)", lineHeight: 1.6 }}>
            LÏEF runs the pre-construction, places the general construction contract, and stays on your project as the owner's representative, across the country. One team from the first sketch to the last draw. We have relationships with architecture and engineering firms licensed in every state.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ...stagger(3), ease }} className="mt-8 md:mt-12 flex flex-wrap gap-3 md:gap-4">
            <button
              onClick={openModal}
              className="transition-all duration-300 hover:brightness-110"
              style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px", cursor: "pointer" }}
            >
              Start a Conversation
            </button>
            <button
              onClick={() => document.querySelector("#lanes")?.scrollIntoView({ behavior: "smooth" })}
              className="transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]"
              style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" }}
            >
              How it works
            </button>
          </motion.div>
        </div>
      </section>

      {/* The fee */}
      <Section id="fee">
        <div className="v2-label mb-6">The fee</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-24 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <h2 className="v2-headline text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--v2-white)" }}>
              THE CONTRACTOR<br />PAYS US<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>NOT YOU</span><span className="v2-neon-period">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-5" style={{ fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }}>
              Hiring an owner's representative has always meant a second fee on top of the contractor's price. We built the national offering to remove that trade-off.
            </p>
            <p className="mb-5" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              When LÏEF places your general construction contract, our fee comes out of the general contractor's side of the deal. You pay what you would pay a traditional contractor. On top of that price you get an owner's representative who reads every bid, every change order and every draw request before you sign it.
            </p>
            <p style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              The oversight most owners have to buy separately comes with the contract. That is the whole idea.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Three lanes */}
      <Section id="lanes">
        <Reveal className="relative mb-12 md:mb-16">
          <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }}>NATIONAL</div>
          <div className="v2-label mb-6">Three lanes</div>
          <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl" style={{ color: "var(--v2-white)" }}>
            THREE LANES<span className="v2-neon-period">.</span><br /><span style={{ color: "var(--v2-neon)" }}>ONE TEAM</span><span className="v2-neon-period">.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px" style={{ background: "var(--v2-rule)", border: "1px solid var(--v2-rule)" }}>
          {lanes.map((l, i) => (
            <Reveal key={l.num} delay={0.1 + i * 0.12} className="p-8 md:p-10 relative v2-hover-line" >
              <div style={{ background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 }} />
              <span className="v2-headline block mb-4" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "rgba(194,184,167,.6)", lineHeight: 1 }}>{l.num}</span>
              <h3 className="v2-headline mb-2" style={{ fontSize: "1.35rem", color: "var(--v2-white)" }}>{l.title}</h3>
              <p className="mb-4" style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-neon)" }}>{l.kicker}</p>
              <p style={{ fontSize: "1.05rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>{l.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How we land */}
      <Section id="land" bg="var(--v2-black)">
        <Reveal className="mb-12 md:mb-16">
          <div className="v2-label mb-6">How we land in your state</div>
          <h2 className="v2-headline text-4xl md:text-5xl lg:text-6xl" style={{ color: "var(--v2-white)" }}>
            A NEW MARKET<br /><span style={{ color: "var(--v2-neon)" }}>IN THREE MOVES</span><span className="v2-neon-period">.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={0.1 + i * 0.12}>
              <div className="pt-6" style={{ borderTop: "1px solid rgba(194,184,167,.25)" }}>
                <span className="v2-headline block mb-4" style={{ fontSize: "2.5rem", color: "var(--v2-neon)", lineHeight: 1 }}>{s.num}</span>
                <h3 className="mb-3" style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.35rem", fontWeight: 600, color: "var(--v2-white)", lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: "1.05rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The map: headline left, map right on desktop so the section fits one screen.
          State buttons sit above the map, span its width, and light their state on hover. */}
      <Section id="map" full>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.75fr)_2fr] gap-10 lg:gap-14 items-center">
          <Reveal>
            <div className="v2-label mb-6">Projects on record</div>
            <h2 className="v2-headline text-4xl md:text-6xl lg:text-6xl mb-5" style={{ color: "var(--v2-white)" }}>
              ACROSS<br /><span style={{ color: "var(--v2-neon)" }}>THE COUNTRY</span><span className="v2-neon-period">.</span>
            </h2>
            <p className="max-w-[720px]" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
              Every pin is a state where LÏEF has a project on record, from a tornado rebuild in Kansas to a hotel in Texas and a custom residence in the Utah mountains.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="v2-chips grid gap-2 mb-4" style={{ gridTemplateColumns: `repeat(${Math.ceil(statesOnRecord.length / 2)}, minmax(0, 1fr))` }} onMouseLeave={() => setHoveredState(null)}>
              {statesOnRecord.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`v2-chip${hoveredState === s ? " is-on" : ""}`}
                  onMouseEnter={() => setHoveredState(s)}
                  onFocus={() => setHoveredState(s)}
                  onBlur={() => setHoveredState(null)}
                  aria-pressed={hoveredState === s}
                >
                  {stateNames[s] ?? s}
                </button>
              ))}
            </div>
            <div className="v2-map-frame p-3 md:p-6" style={{ background: "rgba(239,236,227,.04)", border: "1px solid rgba(194,184,167,.18)" }}>
              <div className="mx-auto" style={{ maxWidth: "min(100%, calc((100svh - 300px) * 1.6))" }}>
                <NationalMap hovered={hoveredState} onHover={setHoveredState} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Our own tools */}
      <Section id="tools" bg="var(--v2-green)" full>
        <div className="v2-label mb-6">Our own tools</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-24 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <h2 className="v2-headline text-3xl md:text-4xl lg:text-5xl" style={{ color: "var(--v2-white)" }}>
              RENDERING AND ESTIMATING SOFTWARE<br /><span style={{ color: "var(--v2-neon)" }}>WE BUILT OURSELVES</span><span className="v2-neon-period">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-5" style={{ fontSize: "1.25rem", color: "var(--v2-white)", lineHeight: 1.6 }}>
              This is how we bid a project in a state we have never set foot in and hold the number.
            </p>
            <p className="mb-5" style={{ fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }}>
              Every plan set we touch runs through our own estimating engine. It measures the drawings, prices every trade from our own record of bids, and keeps the estimate tied to the model as the design changes. Renderings come from the same model, so what you see is what was priced.
            </p>
            <p style={{ fontSize: "1.1rem", color: "rgba(239,236,227,.85)", lineHeight: 1.7 }}>
              Send us a plan set from anywhere in the country. We return a measured takeoff and a bid built on quantities, not a guess.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Coordinated projects */}
      <Section id="projects">
        <Reveal className="mb-10 md:mb-12">
          <div className="v2-label mb-6">Coordinated Projects</div>
          <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-5" style={{ color: "var(--v2-white)" }}>
            WORK WE HAVE<br /><span style={{ color: "var(--v2-neon)" }}>CARRIED</span><span className="v2-neon-period">.</span>
          </h2>
          <p className="max-w-[720px]" style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
            Projects LÏEF has completed or coordinated.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px overflow-hidden" style={{ background: "var(--v2-rule)", border: "1px solid var(--v2-rule)" }}>
          {coordinated.map((p, i) => (
            <Reveal key={p.name} delay={0.05 + i * 0.08} className="relative p-7 md:p-8 v2-hover-line">
              <div style={{ background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 }} />
              <p className="mb-2" style={{ fontSize: "0.85rem", color: "var(--v2-neon)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>{p.type}</p>
              <h3 className="v2-headline mb-1" style={{ fontSize: "1.2rem", color: "var(--v2-white)" }}>{p.name}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--v2-dim)" }}>{p.location}</p>
            </Reveal>
          ))}
          {/* Fill an incomplete last row with the LÏEF mark so the grid never shows an empty cell. */}
          {Array.from({ length: (3 - (coordinated.length % 3)) % 3 }).map((_, i) => (
            <div key={`fill-${i}`} className="relative hidden md:flex items-center justify-center p-7 md:p-8" aria-hidden="true">
              <div style={{ background: "var(--v2-deep)", position: "absolute", inset: 0, zIndex: -1 }} />
              <div className="flex flex-col items-center gap-3">
                <span className="relative block">
                  <img src={logoConcrete} alt="" className="h-14 w-auto block" style={{ visibility: "hidden" }} />
                  <span className="absolute inset-0" style={{ background: "var(--v2-loggia)", WebkitMaskImage: `url(${logoConcrete})`, maskImage: `url(${logoConcrete})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />
                </span>
                <span className="v2-headline" style={{ fontSize: "1.05rem", letterSpacing: "0.18em", color: "var(--v2-loggia)" }}>
                  BUILT<span className="v2-neon-period">.</span> DIFFERENT<span className="v2-neon-period">.</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8">
          <button
            onClick={() => { navigate("/projects"); window.scrollTo({ top: 0 }); }}
            className="transition-all duration-300 hover:bg-[#C2B8A7] hover:text-[#0F1A14]"
            style={{ fontFamily: "var(--v2-font-body)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "transparent", color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer" }}
          >
            See the projects
          </button>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section id="national-contact" bg="var(--v2-black)">
        <Reveal className="text-center">
          <div className="v2-label mb-6">Anywhere in the country</div>
          <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
            TELL US WHERE<br /><span style={{ color: "var(--v2-neon)" }}>THE PROJECT IS</span><span className="v2-neon-period">.</span>
          </h2>
          <p className="max-w-[640px] mx-auto mb-8" style={{ fontSize: "1.15rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>
            We will tell you what it should cost, who should build it, and how we will protect it.
          </p>
          <button
            onClick={openModal}
            className="transition-all duration-300 hover:brightness-110"
            style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-btn-bg)", color: "var(--v2-btn-fg)", border: "1px solid var(--v2-loggia)", padding: "10px 24px", cursor: "pointer" }}
          >
            Start a Conversation
          </button>
        </Reveal>
      </Section>
    </div>
  );
};

export default NationalPage;
