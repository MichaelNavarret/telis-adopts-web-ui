import { useState } from "react";
import BadgesTable from "./BadgesTable";

const BadgesSection = () => {
  const [_showBlade, setShowBlade] = useState(false);

  return (
    <>
      <BadgesTable handleOpen={() => setShowBlade(true)} />
    </>
  );
};

export default BadgesSection;
