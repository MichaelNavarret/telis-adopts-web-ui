import { useState } from "react";
import { MenuBarOption } from "./MenuBar";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./MenuBar.module.scss";

type MenuItem = {
  option: MenuBarOption;
  handleClick: (value: number) => void;
  handleSelected?: (value: number) => void;
  selected?: boolean;
};

const MenuItem = (props: MenuItem) => {
  const [hover, setHover] = useState<boolean>(false);
  const { option, handleClick, selected, handleSelected } = props;
  const { colors } = useTheme();

  const handleOptionClick = (value: number) => {
    handleClick(value);
    if (handleSelected) handleSelected(value);
  };

  return (
    <li
      className={selected ? styles.liMenuBarSelected : styles.liMenuBar}
      style={{
        backgroundColor:
          hover || selected ? colors.CTX_BUTTON_COLOR : colors.CTX_BUBBLE_COLOR,
        color: colors.CTX_BUBBLE_ICON_COLOR,
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
