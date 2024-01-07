import { useState } from "react";
import { useTheme } from "../../../../../context/ThemeProvider";
import styles from "./MenuButton.module.scss";

type itemButtonProps = {
  content: { label: string; value: number };
  selected?: boolean;
  handleClick: (value: number) => void;
  handleSelected: (value: number) => void;
};

const ItemButton = (props: itemButtonProps) => {
  const { content, selected = false, handleClick, handleSelected } = props;
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);

  const handleOptionClick = (value: number) => {
    handleClick(value);
    handleSelected(value);
  };

  return (
    <div
      className={styles.itemButton}
      style={{
        backgroundColor:
          hover || selected
            ? colors.CTX_MENUBAR_HOVER_COLOR
            : colors.CTX_MENUBAR_COLOR,
        color: colors.CTX_MENUBAR_TEXT_COLOR,
        fontSize: "0.8rem",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleOptionClick(content.value)}
    >
      {content.label}
    </div>
  );
};

export default ItemButton;
