import { CircularProgress } from "@mui/material";
import styles from "./Button.module.scss";
import { useTheme } from "../../context/ThemeProvider";

type ButtonProps = {
  colorButton?: string;
  colorTextButton?: string;
  buttonColorShadow?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  marginTop?: string;
  className?: string;
};

export const Button = (props: ButtonProps) => {
  const { colors } = useTheme();
  const {
    colorButton = colors.CTX_BUTTON_COLOR,
    colorTextButton = colors.CTX_TEXT_COLOR,
    buttonColorShadow = colors.CTX_BUTTON_SHADOW_COLOR,
    children,
    content,
    type = "submit",
    width = "300px",
    height = "60px",
    disabled = false,
    loading = false,
    marginTop = "0px",
    className,
  } = props;
  return (
    <button
      className={
        className ? `${styles.buttonStyles} ${className}` : styles.buttonStyles
      }
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
        marginTop: marginTop,
        padding: "10px",
      }}
      type={type}
      disabled={disabled}
      onClick={props.onClick}
    >
      {loading ? <CircularProgress /> : children ? children : content}
    </button>
  );
};

export default Button;
