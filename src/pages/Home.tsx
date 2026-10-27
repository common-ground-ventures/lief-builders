import Hero from "@/components/Hero";
import StatsTicker from "@/components/StatsTicker";
import Services from "@/components/Services";
import AlignmentBanner from "@/components/AlignmentBanner";
import Capabilities from "@/components/Capabilities";
import PartnersPress from "@/components/PartnersPress";
import Markets from "@/components/Markets";
import FAQ from "@/components/FAQ";
import StoplightQuote from "@/components/StoplightQuote";
import { PoweredByKanopiBand } from "@/components/Kanopi";
import Contact from "@/components/Contact";

const Home = () => (
  <>
    <Hero />
    <StatsTicker />
    <Services />
    <StoplightQuote />
    <AlignmentBanner />
    <PoweredByKanopiBand />
    <Capabilities />
    <PartnersPress />
    <Markets />
    <FAQ />
    <Contact />
  </>
);

export default Home;
