import { Button } from "../../../components";
import styles from "./MasterListFilterButtons.module.scss";

type MasterListFilterButtonsProps = {
  handleClick: (filter: string) => void;
};

const MasterListFilterButtons = (props: MasterListFilterButtonsProps) => {
  const { handleClick } = props;
  return (
    <div className={styles.masterListFilterButtonsContainer}>
      <Button content="Premade" onClick={() => handleClick("PREMADE")} />
      <Button content="Custom" onClick={() => handleClick("CUSTOM")} />
      <Button content="MYO" onClick={() => handleClick("MYO")} />
      <Button
        content="Guest Artist"
        width="400px"
        onClick={() => handleClick("Guest Artist")}
      />
    </div>
  );
};

export default MasterListFilterButtons;
