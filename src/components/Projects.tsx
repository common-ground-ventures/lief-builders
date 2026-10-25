import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import osbornImg from "@/assets/projects/osborn-new.jpg";
import canyonImg from "@/assets/projects/canyon-corporate.jpg";
import silverImg from "@/assets/projects/silver-mountain.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const projects = [
  {
    img: osbornImg,
    name: "301 W. Osborn Rd.",
    type: "RESIDENTIAL CONVERSION",
    status: "IN PROGRESS",
    desc: "A landmark residential conversion showcasing the power of Xtrata SABS\u2122 technology in adaptive reuse.",
    location: "Phoenix, AZ",
  },
  {
    img: canyonImg,
    name: "Canyon Corporate Plaza",
    type: "OFFICE-TO-RESIDENTIAL",
    status: "IN PROGRESS",
    desc: "Adaptive reuse conversion of corporate office space into modern residential units with premium finishes.",
    location: "Phoenix, AZ",
  },
  {
    img: silverImg,
    name: "Silver Mountain Ranches",
    type: "SUSTAINABLE COMMUNITY",
    status: "IN DESIGN",
    desc: "Luxury ranch-style homes on 5-acre horse property lots with off-grid living options and solar systems.",
    location: "Bradshaw Mountains, AZ",
  },
];

const Projects = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="projects" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="relative mb-12"
            >
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.16)" }}>
                PROJECTS
              </div>
              <div className="v2-label mb-6">Active Projects</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                CURRENT<br /><span style={{ color: "var(--v2-neon)" }}>PIPELINE</span><span className="v2-neon-period">.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 35 }}
                  animate={inView ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.1, ease }}
                  className="group"
                  style={{ border: "1px solid var(--v2-rule)", overflow: "hidden" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover transition-all"
                      style={{ filter: "grayscale(1) brightness(.45)", transitionDuration: "1.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0) brightness(.65)")}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(1) brightness(.45)")}
                    />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: "var(--v2-neon)" }} />
                      <span style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--v2-neon)", fontWeight: 600 }}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 style={{ fontFamily: "var(--v2-font-body)", fontSize: "1.15rem", fontWeight: 700, color: "var(--v2-white)" }}>{p.name}</h3>
                    <span className="v2-label block mt-1" style={{ fontSize: "1rem" }}>{p.type}</span>
                    <p className="mt-3" style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>{p.desc}</p>
                    <p className="mt-2" style={{ fontSize: "1rem", color: "var(--v2-muted)" }}>{p.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
      </div>
    </section>
  );
};

export default Projects;
