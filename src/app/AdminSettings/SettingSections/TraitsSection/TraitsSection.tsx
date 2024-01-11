import { useState } from "react";
import TraitsTable from "./TraitsTable";
import TraitsCreateDialogForm from "./TraitsCreateDialogForm";

const TraitsSection = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => setOpenDialog(true);
  return (
    <>
      <TraitsTable handleOpen={handleOpenDialog} />
      <TraitsCreateDialogForm
        open={openDialog}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default TraitsSection;
