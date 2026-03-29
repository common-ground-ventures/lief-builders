import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import osbornImg from "@/assets/projects/301-osborn.png";
import canyonImg from "@/assets/projects/canyon-corporate.jpg";
import silverImg from "@/assets/projects/silver-mountain.jpg";
import basinImg from "@/assets/projects/pahrump-basin.jpg";
import vailImg from "@/assets/projects/the-vail.png";

const ease = [0.16, 1, 0.3, 1] as const;
const accentColor = "#00FF88";

const projects = [
  {
    img: osbornImg,
    name: "301 W Osborn",
    type: "Adaptive Reuse",
    desc: "Commercial to residential conversion. 23 luxury urban units with secure parking & conditioned storage. Full SABS build.",
    location: "Midtown, Phoenix AZ",
    status: "SABS Showcase",
    featured: true,
  },
  {
    img: vailImg,
    name: "The Vail",
    type: "Boutique 55+ Community",
    desc: "The Southwest\u2019s premier boutique community where discerning adults trade square footage for more time, freedom, and the memories that matter.",
    location: "Arizona",
    status: "In Design",
    featured: false,
    zoom: 1.10,
  },
  {
    img: canyonImg,
    name: "Canyon Corporate Plaza",
    type: "Office-to-Residential",
    desc: "14-story conversion from commercial office to modern residential. SABS cementitious coating system throughout.",
    location: "Phoenix, AZ",
    status: "In Development",
    featured: false,
  },
  {
    img: silverImg,
    name: "Silver Mountain Ranches",
    type: "Equestrian Community",
    desc: "100+ acre equestrian community with luxury custom homes built using L\u00efef Blocks with SABS Technology.",
    location: "Scottsdale, AZ",
    status: "In Development",
    featured: false,
  },
  {
    img: basinImg,
    name: "440 Basin Avenue",
    type: "Multi-Family",
    desc: "204-unit multi-family development. $56M savings vs. traditional construction methods.",
    location: "Pahrump, NV",
    status: "In Development",
    featured: false,
  },
];

const ProjectsPage = () => {
  const { ref: projRef, inView: projInView } = useInView(0.1);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <section className="relative overflow-hidden py-12 md:py-28" style={{ background: "var(--v2-deep)" }}>
        <div className="v2-ghost-text hidden lg:block top-8 right-8 text-right" style={{ fontSize: "min(9vw, 110px)", color: "rgba(0,107,63,.24)" }}>PROJECTS</div>
        <div ref={projRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">
                Current In Process
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 35 }} animate={projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-16" style={{ color: "var(--v2-white)" }}>
                THE WORK<br /><span style={{ color: "var(--v2-neon)" }}>SPEAKS<span className="v2-neon-period">.</span></span>
              </motion.h2>

              {/* Featured project - 301 W Osborn */}
              {projects.filter(p => p.featured).map((proj) => (
                <motion.div key={proj.name} initial={{ opacity: 0, y: 35 }} animate={projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="relative overflow-hidden group mb-px" style={{ minHeight: "520px", border: `2px solid ${accentColor}` }}>
                  <img src={proj.img} alt={proj.name} className="absolute inset-0 w-full h-full object-cover brightness-[.5] transition-all duration-700 group-hover:brightness-[.65]" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.2) 50%, transparent 100%)" }} />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2" style={{ background: accentColor, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a0a0a", fontWeight: 700 }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0a0a0a", display: "inline-block" }} />
                      Featured &mdash; {proj.status}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 p-10 z-10">
                    <h3 className="v2-headline text-3xl md:text-4xl mb-2" style={{ color: "var(--v2-white)" }}>{proj.name}</h3>
                    <p className="mb-3" style={{ fontSize: "1rem", color: accentColor, letterSpacing: "0.05em", fontWeight: 600 }}>{proj.type}</p>
                    <p className="max-w-2xl mb-4" style={{ fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>{proj.desc}</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)" }}>{proj.location}</p>
                  </div>
                </motion.div>
              ))}

              {/* Other projects */}
              <motion.div initial={{ opacity: 0, y: 35 }} animate={projInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-1 md:grid-cols-2 gap-px">
                {projects.filter(p => !p.featured).map((proj) => (
                  <div key={proj.name} className="relative overflow-hidden group" style={{ minHeight: "380px", border: "1px solid var(--v2-rule)" }}>
                    <img src={proj.img} alt={proj.name} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[.4] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.6]" style={proj.zoom ? { transform: `scale(${proj.zoom})` } : undefined} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.3) 60%, transparent 100%)" }} />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5" style={{ background: "rgba(0,0,0,.8)", border: `1px solid ${accentColor}`, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor, display: "inline-block" }} />
                        {proj.status}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 z-10">
                      <h3 className="v2-headline text-xl md:text-2xl mb-1" style={{ color: "var(--v2-white)" }}>{proj.name}</h3>
                      <p className="mb-2" style={{ fontSize: "0.9rem", color: accentColor, letterSpacing: "0.05em" }}>{proj.type}</p>
                      <p className="max-w-md mb-3" style={{ fontSize: "0.95rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>{proj.desc}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--v2-dim)" }}>{proj.location}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
