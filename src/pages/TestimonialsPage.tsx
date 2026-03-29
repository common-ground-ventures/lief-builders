import { useEffect } from "react";
import Testimonials from "@/components/Testimonials";

const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <Testimonials />
    </div>
  );
};

export default TestimonialsPage;
