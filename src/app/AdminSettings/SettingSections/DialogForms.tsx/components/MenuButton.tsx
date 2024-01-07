import { useState } from "react";
import ItemButton from "./ItemButton";
import styles from "./MenuButton.module.scss";
import { Tooltip } from "@mui/material";

type MenuButtonProps = {
  options: { label: string; value: number; tooltip?: string }[];
  handleClick: (value: number) => void;
  handleMultipleSelected?: (value: number) => void;
  selectMultiple?: boolean;
};

const MenuButton = (props: MenuButtonProps) => {
  const { options, handleClick, selectMultiple = false } = props;
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
    <div className={styles.menuButtonContainer}>
      {options.map((option, index) => {
        return (
          <Tooltip key={index} title={option.tooltip} arrow placement="top">
            <div>
              <ItemButton
                key={option + "_" + index}
                content={option}
                selected={
                  selectMultiple
                    ? isSelected(option.value)
                    : option.value == selected
                }
                handleClick={handleClick}
                handleSelected={
                  selectMultiple ? handleMultipleSelected : handleSelected
                }
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default MenuButton;
