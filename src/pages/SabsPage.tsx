import { useEffect } from "react";
import LiefBlocks from "@/components/LiefBlocks";

const SabsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div>
      <h1 className="sr-only">SABS Technology</h1>
      <LiefBlocks />
    </div>
  );
};

export default SabsPage;
