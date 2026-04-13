import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AISection from "@/components/AISection";

const TechnologyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
    <Helmet>
      <title>AI Technology | Li&#239;ef Builders</title>
      <meta name="description" content="How Li&#239;ef Builders uses artificial intelligence and machine learning to optimize construction timelines, reduce costs, and improve build quality." />
      <link rel="canonical" href="https://www.liefbuilders.com/ai" />
      <meta property="og:title" content="AI Technology | Li&#239;ef Builders" />
      <meta property="og:description" content="How Li&#239;ef Builders uses artificial intelligence and machine learning to optimize construction timelines, reduce costs, and improve build quality." />
      <meta property="og:url" content="https://www.liefbuilders.com/ai" />
      <meta property="og:image" content="https://www.liefbuilders.com/og-image.png" />
    </Helmet>
    <div className="pt-16 md:pt-20">
      <h1 className="sr-only">Our Technology</h1>
      <AISection />
    </div>
    </>
  );
};

export default TechnologyPage;
