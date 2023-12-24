import { Container, Typography } from "@mui/material";
import {
  ToastContainer as RtToastContainer,
  toast as RtToast,
} from "react-toastify";

type ToastContainerProps = {
  position?: "bottom-right";

  autoClose?: number | false;

  closeOnClick?: boolean;

  draggable?: boolean;
};

export const ToastContainer = (props: ToastContainerProps) => {
  const {
    position = "top-right",
    autoClose = 10000, // default autoclose is 5 sec
    closeOnClick = true,
    draggable = false,
  } = props;
  return (
    <RtToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={closeOnClick}
      rtl={false}
      pauseOnFocusLoss
      draggable={draggable}
      pauseOnHover
    />
  );
};

type ToastContentProps = {
  title: string;
  subTitle?: string;
  customContent?: React.ReactNode;
};

const ToastContent = (props: ToastContentProps) => {
  const { title, subTitle, customContent } = props;
  return (
    <Container>
      <Typography content={title} sx={{ textTransform: "capitalize" }} />
      {subTitle && <Typography variant="subtitle2" content={subTitle} />}
      {customContent && customContent}
    </Container>
  );
};

export type ToastProps = {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  subTitle?: string;
  position?: "bottom-right";
  autoClose?: number | false;
  theme?: "light" | "dark" | "colored";
  showIcon?: boolean;
  closeOnClick?: boolean;
  draggable?: boolean;
  customContent?: React.ReactNode;
};

const Toast = (props: ToastProps) => {
  const {
    type = "success",
    title = "",
    subTitle = "",
    position = "top-right",
    autoClose = 10000,
    theme = "light",
    showIcon = true,
    closeOnClick = true,
    draggable = false,
    customContent,
  } = props;

  return RtToast[type](
    <ToastContent
      title={title}
      subTitle={subTitle}
      customContent={customContent}
    />,
    {
      position: position,
      autoClose: autoClose,
      hideProgressBar: true,
      closeOnClick: closeOnClick,
      pauseOnHover: true,
      draggable: draggable,
      progress: undefined,
      theme: theme,
      icon: showIcon,
    }
  );
};

export default Toast;
