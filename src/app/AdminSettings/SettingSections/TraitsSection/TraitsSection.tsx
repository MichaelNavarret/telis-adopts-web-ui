import { useState } from "react";
import CustomizedSnackbar from "../../../../components/utils/CustomizeSnackBar";
import TraitsTable from "./TraitsTable";
import TraitsCreateDialogForm from "./TraitsCreateDialogForm";

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
