import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import StatsTicker from "@/components/StatsTicker";
import Services from "@/components/Services";
import AlignmentBanner from "@/components/AlignmentBanner";
import Capabilities from "@/components/Capabilities";
import PartnersPress from "@/components/PartnersPress";
import Markets from "@/components/Markets";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

const Home = () => (
  <>
    <Helmet>
      <title>Li&#239;ef Builders | Project Advocacy and Oversight</title>
      <meta name="description" content="Owner's Rep. Project advocacy and oversight for luxury residential and commercial construction in Arizona. Built. Different." />
      <link rel="canonical" href="https://www.liefbuilders.com/" />
      <meta property="og:title" content="Li&#239;ef Builders | Project Advocacy and Oversight" />
      <meta property="og:description" content="Owner's Rep. Project advocacy and oversight for luxury residential and commercial construction in Arizona. Built. Different." />
      <meta property="og:url" content="https://www.liefbuilders.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.liefbuilders.com/og-image.png" />
    </Helmet>
    <Hero />
    <StatsTicker />
    <Services />
    <AlignmentBanner />
    <Capabilities />
    <PartnersPress />
    <Markets />
    <FAQ />
    <Contact />
  </>
);

export default Home;
