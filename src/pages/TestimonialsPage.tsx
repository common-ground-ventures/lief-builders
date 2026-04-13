import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Testimonials from "@/components/Testimonials";

const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
    <Helmet>
      <title>Testimonials | Li&#239;ef Builders</title>
      <meta name="description" content="What clients and partners say about working with Li&#239;ef Builders. Real feedback from luxury residential and commercial construction projects." />
      <link rel="canonical" href="https://www.liefbuilders.com/testimonials" />
      <meta property="og:title" content="Testimonials | Li&#239;ef Builders" />
      <meta property="og:description" content="What clients and partners say about working with Li&#239;ef Builders. Real feedback from luxury residential and commercial construction projects." />
      <meta property="og:url" content="https://www.liefbuilders.com/testimonials" />
      <meta property="og:image" content="https://www.liefbuilders.com/og-image.png" />
    </Helmet>
    <div className="pt-16 md:pt-20">
      <h1 className="sr-only">Client Testimonials</h1>
      <Testimonials />
    </div>
    </>
  );
};

export default TestimonialsPage;
