import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "..";
import styles from "./DialogComponent.module.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTheme } from "../../context/ThemeProvider";
import TextComponent from "../TextComponents/TextComponent";

type DialogComponentProps = {
  open: boolean;
  dialogTitle?: string;
  handleClose: () => void;
  cancelButton?: boolean;
  customDialog?: React.ReactNode;
  content?: React.ReactNode;
  primaryButton?: React.ReactNode;
  fullScreen?: boolean;
  height?: string;
  width?: string;
};

const DialogComponent = (props: DialogComponentProps) => {
  const {
    open,
    handleClose,
    cancelButton = false,
    customDialog,
    content,
    primaryButton,
    dialogTitle,
    height,
    width,
    fullScreen = false,
  } = props;

  const { colors } = useTheme();

  const dialogContent = (
    <DialogContent className={styles.dialogContentContainer}>
      <DialogContentText component={"div"}>{content}</DialogContentText>
    </DialogContent>
  );

  return (
    <Dialog
      open={open}
      component={"div"}
      className={styles.dialogContainer}
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          backgroundColor: colors.CTX_FORM_CONTAINER_COLOR,
          borderRadius: "10px",
          width: width ? width : fullScreen ? "" : "auto",
          height: height ? height : fullScreen ? "" : "auto",
          padding: "20px",
        },
      }}
    >
      <CloseRoundedIcon
        className={styles.crossIcon}
        onClick={handleClose}
        fontSize={fullScreen ? "large" : "medium"}
        style={{
          marginTop: fullScreen ? "30px" : "",
        }}
      />
      <DialogTitle align="center">
        {dialogTitle && (
          <TextComponent
            className={styles.dialogTitle}
            content={dialogTitle}
            animation={false}
            hover={false}
            colorText={colors.CTX_FORM_TITLE_COLOR}
          />
        )}
      </DialogTitle>

      {customDialog ? customDialog : dialogContent}

      <DialogActions>
        {cancelButton && <Button onClick={handleClose}>Cancel</Button>}
        {primaryButton}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
