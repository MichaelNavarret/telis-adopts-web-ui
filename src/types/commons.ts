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
  //Color used to menus and buttons
  primary_color: string;
  //Color used to backgrounds and forms
  secondary_color: string;
  //Color used to selected options
  selected_color: string;
  //Color used to shadows
  shadow_color: string;
  //Color used to normal texts. Used on Backgrounds - forms
  text_color: string;
  //Color used on Button/Menus text
  text_02_color: string;
  //Color used to titles or highlighted texts.
  text_03_color: string;
};
