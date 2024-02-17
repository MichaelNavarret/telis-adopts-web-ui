import toast from "react-hot-toast";

const toastColors = {
  success: {
    background: "#5cb85c",
    text: "#fff",
  },
  error: {
    background: "#d9534f",
    text: "#fff",
  },
  warning: {
    background: "#f0ad4e",
    text: "#fff",
  },
};

export const successToast = (message: string) => {
  return toast.success(message, {
    duration: 4000,
    position: "top-center",
    style: {
      borderRadius: "10px",
      background: toastColors.success.background,
      color: toastColors.success.text,
      width: "100%",
    },
  });
};

export const errorToast = (message: string) => {
  return toast.error(message, {
    duration: 4000,
    position: "top-center",
    style: {
      borderRadius: "10px",
      background: toastColors.error.background,
      color: toastColors.error.text,
      width: "100%",
    },
  });
};

export const warningToast = (message: string) => {
  return toast(message, {
    duration: 4000,
    position: "top-center",
    style: {
      borderRadius: "10px",
      background: toastColors.warning.background,
      color: toastColors.warning.text,
      width: "100%",
    },
  });
};
