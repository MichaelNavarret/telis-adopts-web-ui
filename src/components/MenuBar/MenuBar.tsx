import styles from "./MenuBar.module.scss";
import { useTheme } from "../../context/ThemeProvider";
import MenuItem from "./MenuItem";

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
  return (
    <div
      className={styles.menuBarContainer}
      style={{
        backgroundColor: colors.CTX_BUBBLE_COLOR,
        color: colors.CTX_BUBBLE_ICON_COLOR,
      }}
    >
      <ul className={styles.ulMenuBar}>
        {options.map((option, index) => {
          return (
            <MenuItem
              key={option.label + "_" + index}
              option={option}
              handleClick={handleClick}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default MenuBar;
