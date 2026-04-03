import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Flame, Droplets, Bug, Thermometer, Shield, Wind, Recycle, Volume2 } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";
import liefLogoGreen from "@/assets/logos/lief-logo-green.png";
import dotsNeon from "@/assets/dots/dots-neon.png";

/* ── PARTNER LOGOS ── */
import logoRitzCarlton from "@/assets/logos/ritz-carlton.png";
import logoDiscovery from "@/assets/logos/discovery-channel.png";
import logoPgaTour from "@/assets/logos/pga-tour.png";
import logoAD from "@/assets/logos/architectural-digest.png";
import logoCobra from "@/assets/logos/shelby.png";
import logoLacma from "@/assets/logos/lacma.png";
import logoHgtv from "@/assets/logos/hgtv.png";
import logoPlanetGreen from "@/assets/logos/planet-green.png";
import logoDiy from "@/assets/logos/diy-network.png";
import logoOakley from "@/assets/logos/oakley.png";
import logoForbes from "@/assets/logos/forbes.png";
import logoMarucci from "@/assets/logos/marucci.png";
import logoBuilder from "@/assets/logos/builder-magazine.png";
import logoFoxRacing from "@/assets/logos/fox.png";
import logoMaya from "@/assets/logos/maya.png";
import logoKW from "@/assets/logos/keller-williams.png";
import logoZillow from "@/assets/logos/zillow.png";
import logoUSNews from "@/assets/logos/us-news.png";
import logoRobbReport from "@/assets/logos/robb-report.png";
import logoLATimes from "@/assets/logos/la-times.png";

/* ── PRESS LOGOS ── */
import logoNBC from "@/assets/logos/nbc.svg";
import logoFoxNews from "@/assets/logos/fox-news.svg";
import logoCBS from "@/assets/logos/cbs.svg";
import logoPBS from "@/assets/logos/pbs.svg";
import logoAZCentral from "@/assets/logos/az-central.svg";
import logoAZFamily from "@/assets/logos/az-family.svg";
import logoABC15 from "@/assets/logos/abc15.svg";
import logoFox10 from "@/assets/logos/fox10.svg";
import logoAZRepublic from "@/assets/logos/arizona-republic.svg";
import logoBizJournal from "@/assets/logos/business-journal.svg";

const ease = [.16, 1, .3, 1] as const;
const accentColor = "#00FF88";

/* ── DATA ── */

const specs = [
  { value: "0%", label: "Flame Spread" },
  { value: "250 MPH", label: "Wind Rating" },
  { value: "R-75 to R-100", label: "Insulation Rating" },
  { value: "100%", label: "Mold & Termite Immune" },
];

const attributes = [
  { icon: Flame, title: "Anti-Fire", desc: "Non-combustible concrete shell with 0% flame spread. The ultimate desert safety standard." },
  { icon: Droplets, title: "Anti-Mold & Moisture", desc: "100% impermeable to Arizona's extreme monsoon elements. Zero moisture intrusion." },
  { icon: Bug, title: "Anti-Termite", desc: "Zero wood framing means zero risk from structural pests. Permanent protection." },
  { icon: Thermometer, title: "Thermal Performance", desc: "R-75 to R-100 insulation rating. Massive HVAC overhead reduction through high-density insulation." },
  { icon: Wind, title: "250 MPH Wind Rating", desc: "Exceeds Florida hurricane zone requirements. Built for extreme conditions" },
  { icon: Recycle, title: "100% Recyclable", desc: "EPS foam core is fully recyclable. Zero construction waste to landfill" },
];

const stats = [
  { value: "$13", suffix: "/sq ft", label: "Average Savings", desc: "Average residential construction cost savings" },
  { value: "14", suffix: "%", label: "Timeline Reduction", desc: "Average reduction across build types" },
  { value: "+50", suffix: "%", label: "Energy Efficiency", desc: "R-75 to R-100 insulation cuts HVAC costs by half compared to conventional construction" },
  { value: "100", suffix: "+", label: "Projects Delivered", desc: "SABS Technology has delivered 100+ projects in multiple climates and regions" },
];

const technicals = [
  { title: "ICC-ES ESR-1638", detail: "Evaluation report covering structural use in residential and commercial applications" },
  { title: "ASTM C578 Type XI", detail: "Standard specification for rigid cellular polystyrene thermal insulation" },
  { title: "ASTM E-84 Class A", detail: "Surface burning characteristics. Class A fire rating for flame spread and smoke development" },
  { title: "STC 52 Sound Rating", detail: "Sound Transmission Class rating exceeding standard wood-frame construction" },
  { title: "Category A\u2013F Seismic", detail: "Engineered for all seismic design categories per IBC requirements" },
  { title: "100% Recyclable", detail: "EPS foam core is fully recyclable. Zero construction waste to landfill" },
];

const technicalIcons = [Shield, Shield, Flame, Volume2, Shield, Recycle];

const pressOutlets = [
  { name: "NBC", src: logoNBC },
  { name: "Fox News", src: logoFoxNews },
  { name: "CBS", src: logoCBS },
  { name: "PBS", src: logoPBS },
  { name: "AZ Central", src: logoAZCentral },
  { name: "AZ Family", src: logoAZFamily },
  { name: "ABC15", src: logoABC15 },
  { name: "Fox 10", src: logoFox10 },
  { name: "Arizona Republic", src: logoAZRepublic },
  { name: "Business Journal", src: logoBizJournal },
];

const trustLogos = [
  { name: "Ritz-Carlton", src: logoRitzCarlton },
  { name: "Discovery Channel", src: logoDiscovery },
  { name: "PGA Tour", src: logoPgaTour },
  { name: "Architectural Digest", src: logoAD },
  { name: "Cobra", src: logoCobra },
  { name: "LACMA", src: logoLacma },
  { name: "HGTV", src: logoHgtv },
  { name: "Planet Green", src: logoPlanetGreen },
  { name: "DIY Network", src: logoDiy },
  { name: "Oakley", src: logoOakley },
  { name: "Forbes", src: logoForbes },
  { name: "Marucci", src: logoMarucci },
  { name: "Builder", src: logoBuilder },
  { name: "Fox Racing", src: logoFoxRacing },
  { name: "Maya", src: logoMaya },
  { name: "Keller Williams", src: logoKW },
  { name: "Zillow", src: logoZillow },
  { name: "U.S. News", src: logoUSNews },
  { name: "Robb Report", src: logoRobbReport },
  { name: "Los Angeles Times", src: logoLATimes },
];

/* ── CALCULATOR ── */

const projectTypes: Record<string, { traditional: number; liefBlocks: number }> = {
  "Single Family Residential": { traditional: 185, liefBlocks: 145 },
  "Multi-Family Residential": { traditional: 165, liefBlocks: 130 },
  "Commercial Office": { traditional: 200, liefBlocks: 160 },
  "Mixed-Use Development": { traditional: 190, liefBlocks: 150 },
  "Adaptive Reuse / Conversion": { traditional: 175, liefBlocks: 140 },
};

/* ── COMPONENT ── */

const LiefBlocks = () => {
  const { openModal } = useContactModal();
  const [projectType, setProjectType] = useState("Single Family Residential");
  const [sqft, setSqft] = useState(5000);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const costs = projectTypes[projectType];
  const totalSavings = (costs.traditional - costs.liefBlocks) * sqft;
  const savingsPercent = Math.round(((costs.traditional - costs.liefBlocks) / costs.traditional) * 100);

  const { ref: heroRef, inView: heroInView } = useInView(0.1);
  const { ref: whatRef, inView: whatInView } = useInView(0.1);
  const { ref: specsRef, inView: specsInView } = useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.1);
  const { ref: techRef, inView: techInView } = useInView(0.1);
  const { ref: vidRef, inView: vidInView } = useInView(0.1);
  const { ref: pressRef, inView: pressInView } = useInView(0.1);
  const { ref: calcRef, inView: calcInView } = useInView(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.1);

  // Parallax scroll transforms
  const { scrollY } = useScroll();
  const heroGlowY = useTransform(scrollY, [0, 600], [0, -60]);
  const ghostTextY = useTransform(scrollY, [0, 3000], [0, -120]);
  const dotsScale = useTransform(scrollY, [0, 1500], [1, 1.08]);

  // Anti-flicker: always render content, control animation via inView
  const show = (inView: boolean, y = 35) => inView ? { opacity: 1, y: 0 } : { opacity: 0, y };

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-x-hidden" style={{ background: "var(--v2-deep)" }}>
        {/* Ambient glows */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroGlowY }}>
          <div className="absolute top-0 right-0 w-[60%] h-[60%]" style={{ background: "radial-gradient(ellipse at top right, rgba(0,107,63,.12), transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%]" style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.04), transparent 70%)" }} />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full -mt-[8vh]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={show(heroInView, 20)}
                transition={{ duration: 0.75, delay: 0.3, ease }}
                className="mb-3 md:mb-4"
              >
                <span className="v2-label hidden md:inline text-[1.25rem]">
                  L&iuml;ef x SABS
                </span>
                <span
                  className="md:hidden"
                  style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)" }}
                >
                  L&iuml;ef x SABS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={show(heroInView)}
                transition={{ duration: 0.75, delay: 0.45, ease }}
                className="v2-headline leading-[0.95] mb-6 md:mb-8"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", letterSpacing: "-0.02em" }}
              >
                SABS&trade; TECHNOLOGY<span className="v2-neon-period">.</span>
                <br />
                <span style={{ color: "var(--v2-neon)" }}>YOUR STRUCTURAL EDGE</span><span className="v2-neon-period">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 35 }}
                animate={show(heroInView)}
                transition={{ duration: 0.75, delay: 0.6, ease }}
                style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: "var(--v2-muted)", lineHeight: 1.5 }}
              >
                Our premier Structural Concrete Insulated Panel System. Faster. Stronger. Smarter.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 35 }}
                animate={show(heroInView)}
                transition={{ duration: 0.75, delay: 0.75, ease }}
                className="mt-2 max-w-[560px]"
                style={{ fontSize: "1.1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}
              >
                Fire-proof, mold-proof, termite-proof concrete structures with built-in R-75 to R-100 insulation. We deploy it through our proprietary L&iuml;ef Block&trade; components, engineered to bring this technology from blueprint to build.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                animate={show(heroInView)}
                transition={{ duration: 0.75, delay: 0.9, ease }}
                className="mt-5 md:mt-12 flex flex-wrap gap-3 md:gap-4"
              >
                <button
                  onClick={openModal}
                  className="transition-all duration-300 hover:brightness-110"
                  style={{
                    fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase",
                    letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-neon)",
                    color: "var(--v2-deep)", border: "none", padding: "10px 24px", cursor: "pointer",
                  }}
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => document.querySelector("#what-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
                  style={{
                    fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase",
                    letterSpacing: "0.14em", fontWeight: 600, background: "transparent",
                    color: "var(--v2-neon)", border: "1px solid var(--v2-neon)", padding: "10px 24px", cursor: "pointer",
                  }}
                >
                  Learn More
                </button>
              </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span style={{ fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }}>Scroll</span>
          <div className="w-px h-8 md:h-12" style={{ background: "linear-gradient(to bottom, var(--v2-neon), transparent)" }} />
        </div>
      </section>

      {/* ════════ WHAT ARE LÏEF BLOCKS ════════ */}
      <section id="what-section" className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img src={dotsNeon} alt="" className="w-[176vw] max-w-[1512px] opacity-[0.01]" style={{ scale: dotsScale }} />
        </div>
        <div ref={whatRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={show(whatInView)} transition={{ duration: 0.75, ease }} className="v2-label mb-6">
                  The Technology
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 35 }} animate={show(whatInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-3xl md:text-5xl lg:text-6xl mb-6" style={{ color: "var(--v2-white)" }}>
                  WHAT IS SABS&trade;<span className="v2-neon-period">?</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 35 }} animate={show(whatInView)} transition={{ duration: 0.75, delay: 0.16, ease }} className="mb-6" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                  SABS (Saebi Alternative Building System) is a patented cementitious coating technology that transforms lightweight structural panels into fire-proof, mold-proof, termite-proof concrete structures. The result: a monolithic building envelope with zero flame spread, 250 MPH wind resistance, and built-in R-75 to R-100 insulation, exceeding every major structural and energy code in the industry.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 35 }} animate={show(whatInView)} transition={{ duration: 0.75, delay: 0.24, ease }} style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                  We deploy SABS through our proprietary L&iuml;ef Block&trade; components, precision-engineered EPS panels that form the structural core of walls, floors, and roofs. Once assembled and coated with the SABS compound, the system creates a seamless, reinforced concrete structure from the ground up.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 35 }} animate={show(whatInView)} transition={{ duration: 0.75, delay: 0.32, ease }} className="mt-6" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                  We build across the full construction spectrum &mdash; wood frame, steel, and advanced modular &mdash; and we've incorporated SABS into our methods because its structural properties are simply unmatched. For our clients, that means another high-performance option and a builder equipped to match the right system to every project.
                </motion.p>
              </div>

              {/* Visual: block diagram — hidden on mobile */}
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(whatInView)} transition={{ duration: 0.75, delay: 0.40, ease }} className="hidden md:flex justify-center items-center">
                <div className="w-full max-w-[420px]">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="transition-all duration-500"
                        style={{
                          aspectRatio: "2/1",
                          border: `1px solid ${accentColor}`,
                          background: "rgba(0,255,136,.05)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,136,.2)"; e.currentTarget.style.boxShadow = `0 0 20px rgba(0,255,136,.15)`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,255,136,.05)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    ))}
                  </div>
                  <div className="text-center" style={{ letterSpacing: "0.12em", textTransform: "uppercase", color: accentColor }}>
                    <p style={{ fontSize: "1.05rem", fontWeight: 600 }}>L&iuml;ef EPS Core x SABS Coating</p>
                    <p style={{ fontSize: "1.05rem", fontWeight: 600 }}>= Structural Concrete</p>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>
      </section>


      {/* ════════ ATTRIBUTES + STATS ════════ */}
      <section className="relative py-12 md:py-28" style={{ background: "#006B3F" }}>
        <div className="absolute inset-x-0 top-0 h-[40%] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.12), transparent)" }} />
        <div ref={statsRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(statsInView)} transition={{ duration: 0.75, ease }} className="mb-6" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.6)" }}>
                Performance
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 35 }} animate={show(statsInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
                WE BUILD<br /><span style={{ color: "var(--v2-neon)" }}>SMARTER<span className="v2-neon-period">.</span></span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 35 }} animate={show(statsInView)} transition={{ duration: 0.75, delay: 0.16, ease }} className="max-w-[550px] mb-20" style={{ fontWeight: 300, fontSize: "1.25rem", color: "rgba(245,245,243,.7)", lineHeight: 1.8 }}>
                Arizona's #1 SABS-trained builder. Lïef Blocks with SABS Technology radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency.
              </motion.p>

              {/* Attribute cards */}
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(statsInView)} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-px">
                {attributes.map((attr) => {
                  const Icon = attr.icon;
                  return (
                    <div
                      key={attr.title}
                      className="p-6 md:p-8 transition-all duration-500 group"
                      style={{ border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor}40`}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                    >
                      <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ border: `1px solid ${accentColor}40` }}>
                        <Icon size={32} style={{ color: accentColor }} />
                      </div>
                      <h4 className="mb-3" style={{ fontSize: "1.25rem", fontWeight: 600, color: accentColor, textTransform: "uppercase" }}>{attr.title}</h4>
                      <p style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.6)", lineHeight: 1.6 }}>{attr.desc}</p>
                    </div>
                  );
                })}
              </motion.div>

              {/* Stat cards */}
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(statsInView)} transition={{ duration: 0.75, delay: 0.32, ease }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 md:p-8 transition-all duration-500"
                    style={{ border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor}40`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div className="v2-headline mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--v2-white)" }}>
                      {stat.value}<span style={{ fontSize: "0.5em", fontWeight: 400 }}>{stat.suffix}</span>
                    </div>
                    <div className="mb-2" style={{ fontSize: "1rem", textTransform: "uppercase", color: "var(--v2-white)", letterSpacing: "0.1em", fontWeight: 600 }}>{stat.label}</div>
                    <div style={{ fontSize: "1rem", color: "rgba(245,245,243,.55)", lineHeight: 1.5 }}>{stat.desc}</div>
                  </div>
                ))}
              </motion.div>
        </div>
      </section>

      {/* ════════ ICC CERTIFIED TECHNICALS ════════ */}
      <section className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)" }}>
        <motion.div className="v2-ghost-text hidden lg:block top-28 right-8" style={{ fontSize: "min(10vw, 140px)", color: "rgba(0,255,136,.04)", y: ghostTextY }}>CERTIFIED</motion.div>
        <div ref={techRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(techInView)} transition={{ duration: 0.75, ease }} className="v2-label mb-6">
                Certified Technicals
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 35 }} animate={show(techInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
                ICC/ES<br /><span style={{ color: "var(--v2-neon)" }}>APPROVED<span className="v2-neon-period">.</span></span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 35 }} animate={show(techInView)} transition={{ duration: 0.75, delay: 0.16, ease }} className="max-w-[600px] mb-16" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                Every component of the LÏEF Blocks system is tested, certified, and code-compliant. No shortcuts. No workarounds.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(techInView)} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-1 md:grid-cols-2 gap-px">
                {technicals.map((tech, i) => {
                  const Icon = technicalIcons[i];
                  return (
                    <div
                      key={tech.title}
                      className="flex items-start gap-5 p-6 md:p-8 transition-all duration-500"
                      style={{ border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.01)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accentColor}40`; e.currentTarget.style.background = "rgba(0,255,136,.03)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--v2-rule)"; e.currentTarget.style.background = "rgba(0,255,136,.01)"; }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mt-1" style={{ border: `1px solid ${accentColor}30` }}>
                        <Icon size={20} style={{ color: accentColor }} />
                      </div>
                      <div>
                        <h4 className="mb-2" style={{ fontWeight: 600, fontSize: "1.1rem", color: "var(--v2-white)" }}>{tech.title}</h4>
                        <p style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>{tech.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
        </div>
      </section>

      {/* ════════ VIDEO ════════ */}
      <section className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
        <div ref={vidRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(vidInView)} transition={{ duration: 0.75, ease }} className="v2-label mb-6">
                See It Built
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 35 }} animate={show(vidInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-5xl mb-12" style={{ color: "var(--v2-white)" }}>
                HOW IT WORKS<span className="v2-neon-period">.</span>
              </motion.h2>

              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(vidInView)} transition={{ duration: 0.75, delay: 0.16, ease }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "aQFVqs_XrEY", title: "SABS Start to Finish Process", scale: "1" },
                  { id: "vXAN6usiCGg", title: "Timelapse of SABS Texas Project", scale: "1.35" },
                ].map((vid) => (
                  <div key={vid.id} className="relative w-full" style={{ aspectRatio: "16/9", border: "1px solid var(--v2-rule)", overflow: "hidden" }}>
                    {playingVideo === vid.id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0`}
                        title={vid.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        style={{ border: "none" }}
                      />
                    ) : (
                      <div
                        onClick={() => setPlayingVideo(vid.id)}
                        className="group cursor-pointer absolute inset-0 w-full h-full"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`}
                          alt={vid.title}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                          style={{
                            filter: "grayscale(100%)",
                            opacity: 0.6,
                            transform: `scale(${vid.scale})`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = "grayscale(0%)";
                            e.currentTarget.style.opacity = "1";
                            e.currentTarget.style.transform = `scale(${parseFloat(vid.scale) + 0.1})`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = "grayscale(100%)";
                            e.currentTarget.style.opacity = "0.6";
                            e.currentTarget.style.transform = `scale(${vid.scale})`;
                          }}
                        />
                        {/* Custom green play button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] transition-all duration-500"
                            style={{ filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.7))" }}
                            ref={(el) => {
                              if (!el) return;
                              const parent = el.closest('.group');
                              if (!parent) return;
                              parent.addEventListener('mouseenter', () => {
                                el.style.filter = "drop-shadow(0 0 30px rgba(0,255,136,0.6)) drop-shadow(0 6px 20px rgba(0,0,0,0.7))";
                                el.style.transform = "scale(1.15)";
                              });
                              parent.addEventListener('mouseleave', () => {
                                el.style.filter = "drop-shadow(0 6px 20px rgba(0,0,0,0.7))";
                                el.style.transform = "scale(1)";
                              });
                            }}
                          >
                            <polygon points="34,18 34,82 84,50" fill="var(--v2-neon)" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
        </div>
      </section>

      {/* ════════ COST CALCULATOR ════════ */}
      <section className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
        <div ref={calcRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(calcInView)} transition={{ duration: 0.75, ease }}>
                <div className="v2-label mb-6">Savings Calculator</div>
                <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
                  SEE THE<br /><span style={{ color: "var(--v2-neon)" }}>DIFFERENCE</span><span className="v2-neon-period">.</span>
                </h2>
                <p className="max-w-md" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                  Estimate your project savings with LÏEF Blocks compared to traditional construction.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(calcInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="p-8 md:p-10" style={{ border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.01)" }}>
                <label className="block mb-2" style={{ fontSize: "1rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }}>Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full mb-6 p-3 outline-none transition-colors duration-300 focus:border-[#00FF88]"
                  style={{ background: "var(--v2-deep)", border: "1px solid rgba(255,255,255,.15)", color: "var(--v2-white)", fontFamily: "var(--v2-font-body)", fontSize: "1rem" }}
                >
                  {Object.keys(projectTypes).map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>

                <label className="block mb-2" style={{ fontSize: "1rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }}>
                  Square Footage: <span style={{ color: accentColor, fontWeight: 600 }}>{sqft.toLocaleString()} sq ft</span>
                </label>
                <input
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full mb-8"
                  style={{ accentColor }}
                />

                <div className="grid grid-cols-2 gap-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  <div>
                    <div className="v2-headline mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: accentColor }}>
                      ${totalSavings.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "1rem", color: "var(--v2-dim)" }}>Estimated Savings</div>
                  </div>
                  <div>
                    <div className="v2-headline mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: accentColor }}>
                      {savingsPercent}%
                    </div>
                    <div style={{ fontSize: "1rem", color: "var(--v2-dim)" }}>Cost Reduction</div>
                  </div>
                </div>
                <p className="mt-4" style={{ fontSize: "1rem", color: "var(--v2-dim)", fontStyle: "italic", opacity: 0.7 }}>
                  *Estimates based on average project data. Actual savings vary by project scope, location, and specifications.
                </p>
              </motion.div>
            </div>
        </div>
      </section>

      {/* ════════ AS FEATURED IN ════════ */}
      <section className="relative py-12 md:py-20" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
        <div ref={pressRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(pressInView)} transition={{ duration: 0.75, ease }} className="v2-label mb-12">As Featured In</motion.div>
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(pressInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20">
                {pressOutlets.map((outlet) => (
                  <img
                    key={outlet.name}
                    src={outlet.src}
                    alt={outlet.name}
                    className="v2-press-logo"
                    style={{ height: "48px", width: "auto", objectFit: "contain" }}
                  />
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(pressInView)} transition={{ duration: 0.75, delay: 0.16, ease }} className="v2-label mb-10">Trusted By Industry Leaders</motion.div>
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(pressInView)} transition={{ duration: 0.75, delay: 0.24, ease }} className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
                {trustLogos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="v2-partner-logo"
                    style={{ height: "60px", width: "auto", objectFit: "contain" }}
                  />
                ))}
              </motion.div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="relative py-16 md:py-28" style={{ background: "var(--v2-black)", borderTop: "1px solid var(--v2-rule)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px" style={{ height: "100px", background: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
        <div ref={ctaRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
              <motion.h2 initial={{ opacity: 0, y: 35 }} animate={show(ctaInView)} transition={{ duration: 0.75, ease }} className="v2-headline mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)", lineHeight: 1.2 }}>
                BUILD WITH US<span className="v2-neon-period">.</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 35 }} animate={show(ctaInView)} transition={{ duration: 0.75, delay: 0.08, ease }} className="mb-10 max-w-[420px]" style={{ fontWeight: 300, fontSize: "1.3rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
                Whether you're a developer, builder, or investor, let's talk about how LÏEF x SABS can transform your next project.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 35 }} animate={show(ctaInView)} transition={{ duration: 0.75, delay: 0.16, ease }} className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={openModal}
                  className="inline-block transition-all duration-300 hover:brightness-110"
                  style={{
                    fontFamily: "var(--v2-font-body)", fontSize: "1.1rem", textTransform: "uppercase",
                    letterSpacing: "0.14em", fontWeight: 600, background: accentColor,
                    color: "var(--v2-deep)", padding: "16px 40px", border: "none", cursor: "pointer",
                  }}
                >
                  Start a Conversation
                </button>
                <button
                  onClick={openModal}
                  className="inline-block transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
                  style={{
                    fontFamily: "var(--v2-font-body)", fontSize: "1.1rem", textTransform: "uppercase",
                    letterSpacing: "0.14em", color: accentColor, border: `1px solid ${accentColor}`,
                    padding: "16px 40px", background: "transparent", cursor: "pointer",
                  }}
                >
                  Contact Us
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={show(ctaInView, 20)} transition={{ duration: 0.75, delay: 0.24, ease }} className="flex flex-wrap justify-center gap-12 mt-16">
                <div className="text-center">
                  <div style={{ fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }}>Email</div>
                  <a href="mailto:hello@liefdev.com" style={{ fontSize: "1rem", color: "var(--v2-muted)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors">hello@liefdev.com</a>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }}>Location</div>
                  <span style={{ fontSize: "1rem", color: "var(--v2-muted)" }}>Phoenix, Arizona</span>
                </div>
              </motion.div>
        </div>
      </section>
    </>
  );
};

export default LiefBlocks;
