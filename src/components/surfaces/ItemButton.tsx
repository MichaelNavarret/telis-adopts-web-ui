import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import styles from "./MenuButton.module.scss";

type itemButtonProps = {
  content: { label: string; value: number };
  selected?: boolean;
  handleClick: (value: number, index?: number) => void;
  handleSelected: (value: number, index?: number) => void;
  index?: number;
  disabled?: boolean;
};

const ItemButton = (props: itemButtonProps) => {
  const {
    content,
    selected = false,
    handleClick,
    handleSelected,
    index,
    disabled = false,
  } = props;
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);

  const handleOptionClick = (value: number) => {
    handleClick(value, index);
    handleSelected(value, index);
  };

  return (
    <div
      className={disabled ? styles.itemButtonDisabled : styles.itemButton}
      style={{
        backgroundColor:
          hover || (selected && !disabled)
            ? colors.selected_color
            : colors.primary_color,
        color: colors.text_02_color,
        border:
          selected && !disabled ? `5px dashed ${colors.shadow_color}` : "",
        fontSize: "0.8rem",
        filter: disabled ? "grayscale(100%)" : "",
      }}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => !disabled && setHover(false)}
      onClick={() => handleOptionClick(content.value)}
    >
      {content.label}
    </div>
  );
};

export default ItemButton;
