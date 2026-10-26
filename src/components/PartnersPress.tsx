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

const PartnerItem = ({ partner }: { partner: Partner }) => (
  <div role="img" aria-label={partner.name} className="v2-partner relative flex items-center justify-center w-full max-w-[200px]">
    {/* invisible image keeps each logo's natural proportions */}
    <img src={partner.logo} alt="" aria-hidden="true" style={{ height: "76px", maxWidth: "100%", width: "auto", objectFit: "contain", visibility: "hidden" }} />
    {/* logo shape as a solid fill: soft grey at rest, Forest Green on hover */}
    <span
      className="v2-partner-fill absolute inset-0"
      style={{
        WebkitMaskImage: `url(${partner.logo})`, maskImage: `url(${partner.logo})`,
        WebkitMaskSize: "contain", maskSize: "contain",
        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
        WebkitMaskPosition: "center", maskPosition: "center",
      }}
    />
  </div>
);

const PartnersPress = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section ref={ref} className="v2-light pt-16 pb-12 md:pt-20 md:pb-10" style={{ background: "var(--v2-villa)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.75, ease }}
          >
            {/* Same header treatment as Services: label + headline left, ghost word right. */}
            {/* Headline left, faded PARTNERS & PRESS right, sharing one bottom line. */}
            <div className="relative mb-16 md:mb-[144px] md:flex md:justify-between md:gap-10" style={{ alignItems: "last baseline" }}>
              <h2 className="v2-headline v2-h2-match relative" style={{ color: "var(--v2-deep)" }}>
                WHO WE HAVE<br /><span style={{ color: "#5E5345" }}>WORKED WITH</span><span className="v2-neon-period" style={{ color: "#5E5345" }}>.</span>
              </h2>
              <div className="v2-ghost-text text-right hidden md:block md:-mr-6" style={{ position: "static", fontSize: "min(4.4vw, 78px)", lineHeight: 1, color: "rgba(15,26,20,.08)" }}>
                PARTNERS<br />&amp; PRESS
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 items-center justify-items-center gap-x-8 gap-y-12 md:gap-x-16 md:gap-y-16">
              {partners.map((p) => <PartnerItem key={p.name} partner={p} />)}
            </div>
          </motion.div>
      </div>
    </section>
  );
};

export default PartnersPress;
