import { useState } from "react";
import CustomizedSnackbar from "../../../components/utils/CustomizeSnackBar";
import SpeciesCreateDialogForm from "./DialogForms.tsx/SpeciesCreateDialogForm";
import SpeciesTable from "./Tables/SpeciesTable";

const SpeciesSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => setOpenDialog(true);
  const handleChangeSnackBar = (message: string) => {
    setSnackBarMessage(message);
    setOpenSnackBar(true);
  };

  return (
    <>
      <SpeciesTable handleOpen={handleOpenDialog} />
      <SpeciesCreateDialogForm
        open={openDialog}
        handleClose={handleCloseDialog}
        handleChangeSnackBar={handleChangeSnackBar}
      />
      <CustomizedSnackbar
        open={openSnackBar}
        type="success"
        subTitle={snackBarMessage}
        handleClose={() => setOpenSnackBar(false)}
      />
    </>
  );
};

export default SpeciesSection;
