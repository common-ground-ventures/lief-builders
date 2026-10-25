import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import jesseImg from "@/assets/team/jesse.png";
import scottImg from "@/assets/team/scott.png";
import nickImg from "@/assets/team/nick.png";
import joshImg from "@/assets/team/josh.png";

const ease = [0.16, 1, 0.3, 1] as const;

interface Member {
  name: string;
  title: string;
  bio: string;
  img?: string;
  initials?: string;
  imgStyle?: React.CSSProperties;
}

const principals: Member[] = [
  {
    name: "Jesse Fowler",
    title: "Principal and Operating Partner, LÏEF Development",
    bio: "25 years in design, build and development. Featured in Architectural Digest, HGTV, and Discovery Channel. Contractor oversight, cost control, and project advocacy across Southern California and the Southwest.",
    img: jesseImg,
    imgStyle: { transform: "scale(1.6) translateY(-2%)", transformOrigin: "center top" },
  },
  {
    name: "Josh Szvoren",
    title: "Development & Construction",
    bio: "20+ years delivering complex developments: luxury retail, hospitality, multifamily, and mixed-use. Key projects include CityCenter Las Vegas ($7.1B), One Beverly Hills ($1.3B), and flagships for Louis Vuitton, Dior, and Valentino.",
    img: joshImg,
    imgStyle: { transform: "scale(1.0) translateY(0%)", transformOrigin: "center top" },
  },
  {
    name: "Scott Meiers",
    title: "Architectural Review",
    bio: "40+ years of architectural design across commercial and residential sectors. Pre-submittal oversight, code compliance review, and value engineering for every engagement.",
    img: scottImg,
    imgStyle: { transform: "scale(2.2) translateY(-2%)", transformOrigin: "center top" },
  },
  {
    name: "Nick Scavio",
    title: "General Counsel",
    bio: "15+ years of business law, real estate, and transactions. Insurance negotiation and legal consultation for complex construction disputes.",
    img: nickImg,
    imgStyle: { transform: "scale(1.15) translateY(10%)", transformOrigin: "center top" },
  },
];

const Portrait = ({ member }: { member: Member }) => (
  <div className="flex flex-col items-center text-center group">
    {member.img ? (
      <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden mb-4" style={{ border: "1px solid var(--v2-rule)" }}>
        <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale brightness-[.5] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.85]" style={member.imgStyle} />
      </div>
    ) : (
      <div
        className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4"
        style={{ border: "1px solid var(--v2-rule)", background: "rgba(1,68,33,.1)" }}
      >
        <span className="v2-headline" style={{ fontSize: "2rem", color: "var(--v2-neon)" }}>{member.initials}</span>
      </div>
    )}
    <h3 className="v2-headline" style={{ fontSize: "1rem", color: "var(--v2-white)", letterSpacing: "0.08em" }}>{member.name}</h3>
    <span className="v2-label mt-1" style={{ fontSize: "1rem" }}>{member.title}</span>
    <p className="mt-3 max-w-[300px]" style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>{member.bio}</p>
  </div>
);

const Team = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="team" className="relative pt-28 pb-12 md:pt-36 md:pb-16" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="relative mb-12"
            >
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(1,68,33,.24)" }}>
                TEAM
              </div>
              <div className="v2-label mb-6">The Team</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                CIRCLE OF<br /><span style={{ color: "var(--v2-neon)" }}>EXPERTISE</span><span className="v2-neon-period">.</span>
              </h2>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.15rem", color: "var(--v2-muted)" }}>
                Third-party objectivity. Protection. Knowledge. Expertise.
              </p>
              <p className="mt-3 max-w-[600px]" style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>
                Every engagement is backed by a dedicated team of principals and specialized consultants. Each project is customized with the right people for the right scope.
              </p>
            </motion.div>

            {/* Principals */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, delay: 0.15, ease }}
              className="mb-8"
            >
              <div className="v2-label mb-6 pb-3" style={{ fontSize: "1rem", borderBottom: "1px solid var(--v2-neon)" }}>PRINCIPALS</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
                {principals.map((m) => <Portrait key={m.name} member={m} />)}
              </div>
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Team;
