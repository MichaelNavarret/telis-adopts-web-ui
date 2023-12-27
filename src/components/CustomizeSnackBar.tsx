import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { CustomizedSnackbarProps } from "../types/commons";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbar = (props: CustomizedSnackbarProps) => {
  const { type = "success", subTitle, open = false, handleClose } = props;

  const backgroundColor = type === "error" ? "#000100" : "#F784A1";
  const color = type === "error" ? "#FA65FF" : "#FEF1DF";
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: "100%",
          backgroundColor: { backgroundColor },
          color: { color },
        }}
      >
        {subTitle}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
