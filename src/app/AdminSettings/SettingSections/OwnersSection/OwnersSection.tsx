import { useState } from "react";
import OwnersTable from "./OwnersTable";
import OwnersCreateDialogForm from "./OwnersCreateDialogForm";

const OwnersSection = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <OwnersTable handleClick={() => setShowDialog(true)} />
      <OwnersCreateDialogForm
        open={showDialog}
        handleClose={() => setShowDialog(false)}
      />
    </>
  );
};

export default OwnersSection;
