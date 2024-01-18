import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
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
  withoutPadding?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  TransitionComponent?: any;
};

const DialogComponent = (props: DialogComponentProps) => {
  const {
    open,
    handleClose,
    customDialog,
    content,
    dialogTitle,
    height,
    width,
    fullScreen = false,
    withoutPadding = false,
    maxWidth = "sm",
    TransitionComponent,
  } = props;

  const { colors } = useTheme();

  const dialogContent = (
    <DialogContent
      className={styles.dialogContentContainer}
      sx={{
        //-webkit-scrollbar
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          background: colors.CTX_FORM_CONTAINER_COLOR,
        },
        "&::-webkit-scrollbar-thumb": {
          background: colors.CTX_MENUBAR_COLOR,
        },
      }}
    >
      <DialogContentText component={"div"}>{content}</DialogContentText>
    </DialogContent>
  );

  return (
    <Dialog
      open={open}
      component={"div"}
      className={styles.dialogContainer}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      TransitionComponent={TransitionComponent}
      PaperProps={{
        style: {
          backgroundColor: colors.CTX_FORM_CONTAINER_COLOR,
          borderRadius: "10px",
          width: width ? width : fullScreen ? "" : "auto",
          height: height ? height : fullScreen ? "" : "auto",
          padding: withoutPadding ? "0px" : "20px",
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
    </Dialog>
  );
};

export default DialogComponent;
