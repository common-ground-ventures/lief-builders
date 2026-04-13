import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Team from "@/components/Team";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
    <Helmet>
      <title>Our Team | Li&#239;ef Builders</title>
      <meta name="description" content="Meet the principals and team behind Li&#239;ef Builders. Decades of construction, legal, financial, and brand expertise driving Arizona's next generation of luxury builds." />
      <link rel="canonical" href="https://www.liefbuilders.com/team" />
      <meta property="og:title" content="Our Team | Li&#239;ef Builders" />
      <meta property="og:description" content="Meet the principals and team behind Li&#239;ef Builders. Decades of construction, legal, financial, and brand expertise." />
      <meta property="og:url" content="https://www.liefbuilders.com/team" />
      <meta property="og:image" content="https://www.liefbuilders.com/og-image.png" />
    </Helmet>
    <div className="pt-16 md:pt-20">
      <h1 className="sr-only">Our Team</h1>
      <Team />
    </div>
    </>
  );
};

export default TeamPage;
