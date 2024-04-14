import { useState } from "react";
import BadgesTable from "./BadgesTable";
import { BadgeCreateBlade } from "./BadgeCreateBlade";

const BadgesSection = () => {
  const [showCreateBlade, setShowCreateBlade] = useState(false);

  return (
    <>
      <BadgesTable handleOpen={() => setShowCreateBlade(true)} />
      <BadgeCreateBlade
        open={showCreateBlade}
        handleClose={() => setShowCreateBlade(false)}
      />
    </>
  );
};

export default BadgesSection;
