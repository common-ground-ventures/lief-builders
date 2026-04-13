import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import LiefBlocks from "@/components/LiefBlocks";

const SabsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
    <Helmet>
      <title>SABS Technology | Li&#239;ef Builders</title>
      <meta name="description" content="Smart Automated Building System. Proprietary construction technology delivering faster timelines, lower costs, and higher quality for luxury builds." />
      <link rel="canonical" href="https://www.liefbuilders.com/sabs" />
      <meta property="og:title" content="SABS Technology | Li&#239;ef Builders" />
      <meta property="og:description" content="Smart Automated Building System. Proprietary construction technology delivering faster timelines, lower costs, and higher quality for luxury builds." />
      <meta property="og:url" content="https://www.liefbuilders.com/sabs" />
      <meta property="og:image" content="https://www.liefbuilders.com/og-image.png" />
    </Helmet>
    <div>
      <h1 className="sr-only">SABS Technology</h1>
      <LiefBlocks />
    </div>
    </>
  );
};

export default SabsPage;
