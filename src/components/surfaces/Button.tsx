import { CircularProgress } from "@mui/material";
import styles from "./Button.module.scss";
import { useTheme } from "../../context/ThemeProvider";
import CatsLoading from "../Loading/CatsLoading";
import { hexToRGBA } from "../../tools/commons";

export type ButtonProps = {
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
  catsLoading?: boolean;
  fontSize?: string;
  withShadow?: boolean;
  selected?: boolean;
  notSelected?: boolean;
  singleSelected?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { colors } = useTheme();
  const {
    colorButton = colors.primary_color,
    colorTextButton = colors.text_02_color,
    buttonColorShadow = colors.shadow_color,
    children,
    content,
    type = "submit",
    width = "300px",
    height = "60px",
    disabled = false,
    loading = false,
    marginTop = "0px",
    className,
    catsLoading = false,
    fontSize = "medium",
    withShadow = true,
    selected,
    notSelected,
    singleSelected,
  } = props;

  const getLoadingIcon = () => {
    if (catsLoading) return <CatsLoading withDots />;
    return <CircularProgress />;
  };

  const boxShadow = `0 0 10px ${buttonColorShadow}`;

  const getBackgroundColor = () => {
    if (singleSelected) return colors.primary_color;
    if (selected) return colors.selected_color;
    if (notSelected) return hexToRGBA(colors.primary_color, 0.4);
    return colorButton;
  };

  return (
    <button
      className={
        className ? `${styles.buttonStyles} ${className}` : styles.buttonStyles
      }
      style={{
        backgroundColor: getBackgroundColor(),
        color: colorTextButton,
        width: width,
        height: height,
        boxShadow: withShadow ? boxShadow : "none",
        //grayFilter when disabled
        filter: disabled ? "grayscale(100%)" : "none",
        //disabled cursor pointer when disabled
        cursor: disabled ? "not-allowed" : "pointer",
        marginTop: marginTop,
        padding: "10px",
        fontSize: fontSize,
      }}
      type={type}
      disabled={disabled}
      onClick={props.onClick}
    >
      {loading ? getLoadingIcon() : children ? children : content}
    </button>
  );
};

export default Button;
