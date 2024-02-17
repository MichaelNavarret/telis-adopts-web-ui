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
  texAlign?: "center" | "left" | "right";
  border?: string;
  colorTitle?: string;
  backgroundColor?: string;
  borderRadius?: string;
};

const DialogComponent = (props: DialogComponentProps) => {
  const {
    open,
    handleClose,
    customDialog,
    content,
    dialogTitle,
    colorTitle,
    height,
    width,
    fullScreen = false,
    withoutPadding = false,
    maxWidth = "sm",
    TransitionComponent,
    texAlign,
    border,
    backgroundColor,
    borderRadius = "10px",
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
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.CTX_FORM_CONTAINER_COLOR,
          borderRadius,
          width: width ? width : fullScreen ? "" : "auto",
          height: height ? height : fullScreen ? "" : "auto",
          padding: withoutPadding ? "0px" : "20px",
          textAlign: texAlign,
          border,
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
            colorText={colorTitle ? colorTitle : colors.CTX_FORM_TITLE_COLOR}
          />
        )}
      </DialogTitle>

      {customDialog ? customDialog : dialogContent}
    </Dialog>
  );
};

export default DialogComponent;
