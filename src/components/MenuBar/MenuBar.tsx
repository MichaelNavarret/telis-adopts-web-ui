import styles from "./MenuBar.module.scss";
import { useTheme } from "../../context/ThemeProvider";
import MenuItem from "./MenuItem";
import { useState } from "react";

export type MenuBarOption = {
  label: string;
  value: number;
};

type MenuBar = {
  options: MenuBarOption[];
  handleClick: (value: number) => void;
};

const MenuBar = (props: MenuBar) => {
  const { options = [], handleClick } = props;
  const { colors } = useTheme();
  const [selected, setSelected] = useState<number>(0);

  const handleSelected = (value: number) => {
    setSelected(value);
  };

  return (
    <div
      className={styles.menuBarContainer}
      style={{
        backgroundColor: colors.CTX_MENUBAR_COLOR,
        color: colors.CTX_MENUBAR_TEXT_COLOR,
      }}
    >
      <ul className={styles.ulMenuBar}>
        {options.map((option, index) => {
          return (
            <MenuItem
              key={option.label + "_" + index}
              option={option}
              handleClick={handleClick}
              handleSelected={handleSelected}
              selected={option.value == selected}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MenuBar;
