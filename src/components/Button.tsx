import { CircularProgress } from "@mui/material";
import styles from "./Button.module.scss";

type ButtonProps = {
  colorButton?: string;
  colorTextButton?: string;
  buttonColorShadow?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {
    colorButton = "#F784A1",
    colorTextButton = "#fef1df",
    buttonColorShadow = "#BB6D9B",
    children,
    type = "submit",
    width = "300px",
    height = "60px",
    disabled = false,
    loading = false,
  } = props;
  return (
    <button
      className={styles.buttonStyles}
      style={{
        backgroundColor: colorButton,
        color: colorTextButton,
        width: width,
        height: height,
        boxShadow: `0 0 10px ${buttonColorShadow}`,
        //grayFilter when disabled
        filter: disabled ? "grayscale(100%)" : "none",
        //disabled cursor pointer when disabled
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      type={type}
      disabled={disabled}
      onClick={props.onClick}
    >
      {loading ? <CircularProgress /> : children}
    </button>
  );
};

export default Button;
