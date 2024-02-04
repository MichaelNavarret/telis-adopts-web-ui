import { useState } from "react";
import { Button } from "../../components";
import styles from "./ProfileButtons.module.scss";

type ProfileButtonsProps = {
  handleButtonSelection: (button: string) => void;
};

const ProfileButtons = (props: ProfileButtonsProps) => {
  const { handleButtonSelection } = props;
  const [activeButton, setActiveButton] = useState("");
  const buttons = ["Characters", "Own Design", "Wish List", "Trade Center"];

  const handleSelection = (button: string) => {
    setActiveButton(button);
    handleButtonSelection(button);
  };

  return (
    <div className={styles.profileButtons_MainContainer}>
      {buttons.map((button) => (
        <Button
          key={button}
          content={button}
          withShadow={false}
          selected={activeButton !== "" && button === activeButton}
          notSelected={activeButton !== "" && button !== activeButton}
          onClick={() => handleSelection(button)}
        />
      ))}
    </div>
  );
};

export default ProfileButtons;