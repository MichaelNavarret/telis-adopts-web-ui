import { useState } from "react";
import ItemButton from "./ItemButton";
import styles from "./MenuButton.module.scss";
import { Tooltip } from "@mui/material";

type MenuButtonProps = {
  options: { label: string; value: number; tooltip?: string }[];
  handleClick: (value: number, index?: number) => void;
  handleMultipleSelected?: (value: number) => void;
  selectMultiple?: boolean;
  externalIndex?: number;
  disabled?: boolean;
};

const MenuButton = (props: MenuButtonProps) => {
  const {
    options,
    handleClick,
    selectMultiple = false,
    externalIndex = 0,
    disabled = false,
  } = props;
  const [selected, setSelected] = useState<number>(0);
  const [multipleSelected, setMultipleSelected] = useState<number[]>([]);

  const handleSelected = (value: number) => {
    setSelected(value);
  };

  const handleMultipleSelected = (value: number) => {
    if (multipleSelected.includes(value)) {
      setMultipleSelected((prev) => prev.filter((item) => item !== value));
    } else {
      setMultipleSelected((prev) => [...prev, value]);
    }
  };

  const isSelected = (value: number) => {
    return multipleSelected.includes(value);
  };

  return (
    <div className={styles.menuButtonContainer} key={externalIndex}>
      {options.map((option, index) => {
        return (
          <Tooltip
            key={index + externalIndex}
            title={option.tooltip}
            arrow
            placement="top"
          >
            <div>
              <ItemButton
                key={option + "_" + index + externalIndex}
                content={option}
                selected={
                  selectMultiple
                    ? isSelected(option.value)
                    : option.value == selected
                }
                handleClick={!disabled ? handleClick : () => {}}
                index={externalIndex}
                handleSelected={
                  !disabled
                    ? selectMultiple
                      ? handleMultipleSelected
                      : handleSelected
                    : () => {}
                }
                disabled={disabled}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default MenuButton;
