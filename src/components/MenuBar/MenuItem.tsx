import { useState } from "react";
import { MenuBarOption } from "./MenuBar";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./MenuBar.module.scss";

type MenuItem = {
  option: MenuBarOption;
  handleClick: (value: number) => void;
};

const MenuItem = (props: MenuItem) => {
  const [hover, setHover] = useState<boolean>(false);
  const { option, handleClick } = props;
  const { colors } = useTheme();

  return (
    <li
      className={styles.liMenuBar}
      style={{
        backgroundColor: hover
          ? colors.CTX_BUTTON_COLOR
          : colors.CTX_BUBBLE_COLOR,
        color: colors.CTX_BUBBLE_ICON_COLOR,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleClick(option.value)}
    >
      {option.label}
    </li>
  );
};

export default MenuItem;
