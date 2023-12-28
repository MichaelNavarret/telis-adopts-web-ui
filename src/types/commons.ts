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
