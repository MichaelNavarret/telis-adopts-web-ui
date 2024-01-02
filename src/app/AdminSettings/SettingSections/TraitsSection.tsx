import { useState } from "react";
import CustomizedSnackbar from "../../../components/CustomizeSnackBar";
import TraitsTable from "./Tables/TraitsTable";
import TraitsCreateDialogForm from "./DialogForms.tsx/TraitsCreateDialogForm";

const TraitsSection = () => {
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
      <TraitsTable handleOpen={handleOpenDialog} />
      <TraitsCreateDialogForm
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

export default TraitsSection;
