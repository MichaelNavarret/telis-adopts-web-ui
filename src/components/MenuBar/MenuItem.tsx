import { useState } from "react";
import { MenuBarOption } from "./MenuBar";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./MenuBar.module.scss";

type MenuItem = {
  option: MenuBarOption;
  handleClick: (value: number) => void;
  handleSelected?: (value: number) => void;
  selected?: boolean;
  className?: string;
};

const MenuItem = (props: MenuItem) => {
  const [hover, setHover] = useState<boolean>(false);
  const { option, handleClick, selected, handleSelected, className } = props;
  const { colors } = useTheme();
  const currentClassName = selected
    ? styles.liMenuBarSelected
    : styles.liMenuBar;

  const handleOptionClick = (value: number) => {
    handleClick(value);
    if (handleSelected) handleSelected(value);
  };

  return (
    <li
      className={`${currentClassName} ${className}`}
      style={{
        backgroundColor:
          hover || selected
            ? colors.CTX_MENUBAR_HOVER_COLOR
            : colors.CTX_MENUBAR_COLOR,
        color: colors.CTX_MENUBAR_TEXT_COLOR,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleOptionClick(option.value)}
    >
      {option.label}
    </li>
  );
};

export default MenuItem;
