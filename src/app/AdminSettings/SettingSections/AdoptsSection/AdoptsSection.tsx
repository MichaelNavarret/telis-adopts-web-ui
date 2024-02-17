import { useState } from "react";
import AdoptsTable from "./AdoptsTable";
import AdoptsCreateDialogForm from "./AdoptsCreateDialogForm";

const AdoptsSection = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => setOpenDialog(true);

  return (
    <>
      <AdoptsTable handleOpen={handleOpenDialog} />
      <AdoptsCreateDialogForm
        open={openDialog}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default AdoptsSection;
