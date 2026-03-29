import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

import ritzCarlton from "@/assets/partners/ritz-carlton.png";
import discoveryChannel from "@/assets/partners/discovery-channel.png";
import pgaTour from "@/assets/partners/pga-tour.png";
import architecturalDigest from "@/assets/partners/architectural-digest.png";
import shelby from "@/assets/partners/shelby.png";
import lacma from "@/assets/partners/lacma.png";
import hgtv from "@/assets/partners/hgtv.png";
import planetGreen from "@/assets/partners/planet-green.png";
import diyNetwork from "@/assets/partners/diy-network.png";
import oakley from "@/assets/partners/oakley.png";
import forbes from "@/assets/partners/forbes.png";
import marucci from "@/assets/partners/marucci.png";
import builderMagazine from "@/assets/partners/builder-magazine.png";
import fox from "@/assets/partners/fox.png";
import maya from "@/assets/partners/maya.png";
import kellerWilliams from "@/assets/partners/keller-williams.png";
import zillow from "@/assets/partners/zillow.png";
import usNews from "@/assets/partners/us-news.png";
import robbReport from "@/assets/partners/robb-report.png";
import laTimes from "@/assets/partners/la-times.png";

const ease = [0.16, 1, 0.3, 1] as const;

interface Partner {
  name: string;
  logo: string;
  opacity?: number;
  invert?: boolean;
}

const partners: Partner[] = [
  { name: "The Ritz-Carlton", logo: ritzCarlton },
  { name: "Discovery Channel", logo: discoveryChannel },
  { name: "PGA Tour", logo: pgaTour },
  { name: "Architectural Digest", logo: architecturalDigest },
  { name: "Shelby", logo: shelby },
  { name: "LACMA", logo: lacma },
  { name: "HGTV", logo: hgtv },
  { name: "Planet Green", logo: planetGreen },
  { name: "DIY Network", logo: diyNetwork },
  { name: "Oakley", logo: oakley },
  { name: "Forbes", logo: forbes },
  { name: "Marucci", logo: marucci },
  { name: "Builder Magazine", logo: builderMagazine },
  { name: "Fox Racing", logo: fox },
  { name: "Maya Day + Night", logo: maya, invert: true },
  { name: "Keller Williams", logo: kellerWilliams },
  { name: "Zillow", logo: zillow },
  { name: "U.S. News", logo: usNews },
  { name: "Robb Report", logo: robbReport },
  { name: "Los Angeles Times", logo: laTimes },
];

const PartnerItem = ({ partner }: { partner: Partner }) => {
  const base = partner.opacity ?? 0.4;
  const baseFilter = `grayscale(100%)${partner.invert ? " invert(1) brightness(0.55)" : ""}`;
  return (
  <div
    className="flex items-center justify-center transition-all duration-300"
    style={{ opacity: base }}
    onMouseEnter={(e) => {
      e.currentTarget.style.opacity = "1";
      const img = e.currentTarget.querySelector("img") as HTMLImageElement;
      if (img) img.style.filter = partner.invert ? "invert(1) brightness(0)" : "grayscale(100%) brightness(0)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.opacity = String(base);
      const img = e.currentTarget.querySelector("img") as HTMLImageElement;
      if (img) img.style.filter = baseFilter;
    }}
  >
    <img
      src={partner.logo}
      alt={partner.name}
      style={{ height: "60px", maxWidth: "160px", width: "auto", objectFit: "contain", filter: baseFilter, transition: "filter 0.3s" }}
    />
  </div>
  );
};

const PartnersPress = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="py-16 md:py-24" style={{ background: "var(--v2-white)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.75, ease }}
          >
            <h2 className="v2-headline text-center mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--v2-deep)" }}>
              PARTNERS <span style={{ fontFamily: "var(--v2-font-body)", fontWeight: 300 }}>&</span> PRESS
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
              {partners.map((p) => <PartnerItem key={p.name} partner={p} />)}
            </div>
          </motion.div>
      </div>
    </section>
  );
};

export default PartnersPress;
