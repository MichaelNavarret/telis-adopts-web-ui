export type TypeSnackBar = "success" | "error" | "warning" | "info";

export type CustomizedSnackbarProps = {
  type?: TypeSnackBar;
  subTitle?: string;
  open?: boolean;
  handleClose?: () => void;
  backgroundColor?: string;
  color?: string;
};
