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
  titleLines?: string[];
}

const principals: Member[] = [
  {
    name: "Jesse Fowler",
    title: "Principal and Operating Partner, LÏEF Development",
    titleLines: ["Principal and Operating Partner,", "LÏEF Development"],
    bio: "25 years in design, build and development. Featured in Architectural Digest, HGTV and Discovery Channel. Project advocacy across the Southwest.",
    img: jesseImg,
    imgStyle: { width: "185.26%", left: "-50.40%", top: "-11.29%" },
  },
  {
    name: "Josh Szvoren",
    title: "Development & Construction",
    titleLines: ["Development &", "Construction"],
    bio: "20+ years delivering complex developments, including CityCenter Las Vegas ($7.1B), One Beverly Hills ($1.3B), and flagships for Louis Vuitton and Dior.",
    img: joshImg,
    imgStyle: { width: "118.53%", left: "-15.33%", top: "-0.74%" }, /* eye line 3pt lower per Jimmy 10/25 */
  },
  {
    name: "Scott Meiers",
    title: "Architectural Review",
    titleLines: ["Architectural", "Review"],
    bio: "40+ years of architectural design across commercial and residential sectors. Pre-submittal oversight, code compliance review, and value engineering for every engagement.",
    img: scottImg,
    imgStyle: { width: "289.61%", left: "-104.16%", top: "-7.27%" },
  },
  {
    name: "Nick Scavio",
    title: "General Counsel",
    titleLines: ["General", "Counsel"],
    bio: "15+ years of business law, real estate, and transactions. Insurance negotiation and legal consultation for complex construction disputes.",
    img: nickImg,
    imgStyle: { width: "129.95%", left: "-24.36%", top: "5.69%" }, /* +10% zoom per Jimmy 10/25 */
  },
];

const Portrait = ({ member }: { member: Member }) => (
  <div className="flex flex-col items-center text-center group">
    {member.img ? (
      <div className="relative w-28 h-28 md:w-32 md:h-32 overflow-hidden mb-3" style={{ border: "1px solid var(--v2-rule)" }}>
        {/* Crops measured with Apple Vision (10/25): every face is cut so eye-to-chin is 36% of the
            frame and the eye line sits 42% down: same size and eye height for all four, with the
            full head, chin and neck in frame (head tops from Vision person segmentation). */}
        <img src={member.img} alt={member.name} className="absolute grayscale brightness-[.5] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.85]" style={{ maxWidth: "none", height: "auto", ...member.imgStyle }} />
      </div>
    ) : (
      <div
        className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4"
        style={{ border: "1px solid var(--v2-rule)", background: "rgba(239,236,227,.05)" }}
      >
        <span className="v2-headline" style={{ fontSize: "2rem", color: "var(--v2-neon)" }}>{member.initials}</span>
      </div>
    )}
    <h3 className="v2-headline" style={{ fontSize: "1rem", color: "var(--v2-white)", letterSpacing: "0.08em" }}>{member.name}</h3>
    {/* Titles break on purpose and share one height, so every bio starts on the same line. */}
    <span className="v2-label v2-team-title mt-1 block" style={{ fontSize: "1rem" }}>
      {(member.titleLines ?? [member.title]).map((line) => (
        <span key={line} className="block whitespace-nowrap md:whitespace-normal [&:last-child]:whitespace-nowrap">{line}</span>
      ))}
    </span>
    <p className="mt-3 max-w-[300px]" style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>{member.bio}</p>
  </div>
);

const Team = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="team" className="relative pt-24 pb-10 md:pt-24 md:pb-10" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : false}
              transition={{ duration: 0.75, ease }}
              className="relative mb-8"
            >
              <div className="v2-ghost-text absolute top-0 right-0 md:-right-6" style={{ fontSize: "min(9.6vw, 120px)", lineHeight: 1, color: "rgba(194,184,167,.6)" }}>
                TEAM
              </div>
              <div className="v2-label mb-6">The Team</div>
              <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
                CIRCLE OF<br /><span style={{ color: "var(--v2-neon)" }}>EXPERTISE</span><span className="v2-neon-period">.</span>
              </h2>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.15rem", color: "var(--v2-muted)" }}>
                Third-party objectivity. Protection. Knowledge. Expertise.
              </p>
              <p className="mt-3 max-w-[900px]" style={{ fontSize: "1rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>
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
              <div className="v2-label mb-4 pb-3" style={{ fontSize: "1rem", borderBottom: "1px solid var(--v2-neon)" }}>PRINCIPALS</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-6">
                {principals.map((m) => <Portrait key={m.name} member={m} />)}
              </div>
            </motion.div>
          </>
      </div>
    </section>
  );
};

export default Team;
