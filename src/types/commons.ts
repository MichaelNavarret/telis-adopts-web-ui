export type TypeSnackBar = "success" | "error" | "warning" | "info";

export type CustomizedSnackbarProps = {
  type?: TypeSnackBar;
  subTitle?: string;
  open?: boolean;
  handleClose?: () => void;
  backgroundColor?: string;
  color?: string;
};

export type ErrorInfo = {
  response: ErrorResponse;
};

export type ErrorResponse = {
  data: {
    message: string;
  };
};

export type BaseResponse = {
  status: string;
  code: number;
  message: string;
};

export type Colors = {
  text: string;
  titleText: string;
  button: string;
  bubble: string;
  bubbleIcon: string;
  container: string;
  secondContainer: string;
  buttonShadow: string;
  bubbleHome: string;
  // ! New colors. Remove when all components are updated
  menubar: string;
  menubarHover: string;
  tableHeader: string;
  tableHeaderText: string;
  tableRowHover: string;
  tableRowHoverText: string;
  formContainer: string;
  formTitle: string;
  buttonShadow2: string;
  formButton: string;
  tableTitle: string;
  menubarText: string;
};
