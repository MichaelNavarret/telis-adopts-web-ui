import { useState } from "react";
import SpeciesCreateDialogForm from "./SpeciesCreateDialogForm";
import SpeciesTable from "./SpeciesTable";

const SpeciesSection = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => setOpenDialog(true);

  return (
    <>
      <SpeciesTable handleOpen={handleOpenDialog} />
      <SpeciesCreateDialogForm
        open={openDialog}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default SpeciesSection;
