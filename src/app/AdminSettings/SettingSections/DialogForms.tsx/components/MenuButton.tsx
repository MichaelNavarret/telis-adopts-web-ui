import { useState } from "react";
import ItemButton from "./ItemButton";
import styles from "./MenuButton.module.scss";
import { Tooltip } from "@mui/material";

type MenuButtonProps = {
  options: { label: string; value: number; tooltip: string }[];
  handleClick: (value: number) => void;
};

const MenuButton = (props: MenuButtonProps) => {
  const { options, handleClick } = props;
  const [selected, setSelected] = useState<number>(0);

  const handleSelected = (value: number) => {
    setSelected(value);
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
                selected={option.value == selected}
                handleClick={handleClick}
                handleSelected={handleSelected}
              />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default MenuButton;
