import { useEffect } from "react";
import LiefBlocks from "@/components/LiefBlocks";

const SabsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div>
      <LiefBlocks />
    </div>
  );
};

export default SabsPage;
