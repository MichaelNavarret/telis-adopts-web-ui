import { useState } from "react";
import { MAIN_TEXT_COLOR, MAIN_TITLE_TEXT_COLOR } from "../../constants/colors";
import styles from "./TextComponent.module.scss";
import { useTheme } from "../../context/ThemeProvider";

type TextComponentProps = {
  content: string;
  className?: string;
  colorText?: string;
  colorTextHover?: string;
  onClick?: () => void;
  animation?: boolean;
  hover?: boolean;
  fontSize?:
    | "xx-small"
    | "x-small"
    | "small"
    | "medium"
    | "large"
    | "x-large"
    | "xx-large";
};

export const TextComponent = (props: TextComponentProps) => {
  const { colors } = useTheme();
  const {
    content,
    colorText = colors.CTX_TITLE_TEXT_COLOR,
    colorTextHover = colors.CTX_TEXT_COLOR,
    onClick,
    animation = true,
    hover = true,
    fontSize = "medium",
    className = "",
  } = props;
  const [isHover, setIsHover] = useState(false);

  const componentClassName = animation
    ? `${styles.textComponent} ${className}`
    : className;

  return (
    <div
      className={componentClassName}
      style={{
        color: isHover && hover ? colorTextHover : colorText,
        fontSize: fontSize,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {content}
    </div>
  );
};

export default TextComponent;
