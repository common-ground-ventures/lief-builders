import { useEffect } from "react";
import Team from "@/components/Team";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <Team />
    </div>
  );
};

export default TeamPage;
