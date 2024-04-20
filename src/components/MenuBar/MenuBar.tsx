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
  className?: string;
  menuListClassName?: string;
  menuItemClassName?: string;
};

const MenuBar = (props: MenuBar) => {
  const {
    options = [],
    handleClick,
    className,
    menuItemClassName,
    menuListClassName,
  } = props;
  const { colors } = useTheme();
  const [selected, setSelected] = useState<number>(0);

  const handleSelected = (value: number) => {
    setSelected(value);
  };

  return (
    <div
      className={`${styles.menuBarContainer} ${className}`}
      style={{
        backgroundColor: colors.primary_color,
        color: colors.text_02_color,
      }}
    >
      <ul className={`${styles.ulMenuBar} ${menuListClassName} `}>
        {options.map((option, index) => {
          return (
            <MenuItem
              key={option.label + "_" + index}
              option={option}
              handleClick={handleClick}
              handleSelected={handleSelected}
              selected={option.value == selected}
              className={menuItemClassName}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MenuBar;
