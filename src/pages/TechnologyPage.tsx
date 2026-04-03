import { useEffect } from "react";
import AISection from "@/components/AISection";

const TechnologyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <h1 className="sr-only">Our Technology</h1>
      <AISection />
    </div>
  );
};

export default TechnologyPage;
