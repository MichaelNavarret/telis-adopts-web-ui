import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Button } from ".";
import styles from "./DialogComponent.module.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTheme } from "../context/ThemeProvider";

type DialogComponentProps = {
  open: boolean;
  handleClose: () => void;
  cancelButton?: boolean;
  customDialog?: React.ReactNode;
  content?: React.ReactNode;
  primaryButton?: React.ReactNode;
};

const DialogComponent = (props: DialogComponentProps) => {
  const {
    open,
    handleClose,
    cancelButton = false,
    customDialog,
    content,
    primaryButton,
  } = props;

  const { colors } = useTheme();

  const dialogContent = (
    <DialogContent className={styles.dialogContentContainer}>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
  );

  return (
    <Dialog
      open={open}
      className={styles.dialogContainer}
      PaperProps={{
        style: {
          backgroundColor: colors.CTX_CONTAINER_COLOR,
          borderRadius: "10px",
          width: "500px",
          height: "auto",
          padding: "20px",
        },
      }}
    >
      <CloseRoundedIcon className={styles.crossIcon} onClick={handleClose} />
      {customDialog ? customDialog : dialogContent}

      <DialogActions>
        {cancelButton && <Button onClick={handleClose}>Cancel</Button>}
        {primaryButton}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
