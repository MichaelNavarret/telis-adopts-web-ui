import { useState } from "react";
import CustomizedSnackbar from "../../../components/CustomizeSnackBar";
import AdoptsTable from "./Tables/AdoptsTable";

const AdoptsSection = () => {
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
      <AdoptsTable handleOpen={handleOpenDialog} />
      <CustomizedSnackbar
        open={openSnackBar}
        type="success"
        subTitle={snackBarMessage}
        handleClose={() => setOpenSnackBar(false)}
      />
    </>
  );
};

export default AdoptsSection;
