import { CircularProgress } from "@mui/material";
import styles from "./Button.module.scss";
import {
  MAIN_BUTTON_COLOR,
  MAIN_BUTTON_SHADOW_COLOR,
  MAIN_TEXT_COLOR,
} from "../constants/colors";

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
    colorButton = MAIN_BUTTON_COLOR,
    colorTextButton = MAIN_TEXT_COLOR,
    buttonColorShadow = MAIN_BUTTON_SHADOW_COLOR,
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
