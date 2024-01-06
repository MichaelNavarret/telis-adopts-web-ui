import { MAIN_BUTTON_COLOR } from "../../../constants/colors/mainColors";
import styles from "./EntryPointContainer.module.scss";

type EntryPointContainerProps = {
  backGroundColor: string;
  children: React.ReactNode;
};

export const EntryPointContainer = (props: EntryPointContainerProps) => {
  const { backGroundColor = MAIN_BUTTON_COLOR, children } = props;
  return (
    <div
      className={styles.mainContainer}
      style={{
        backgroundColor: backGroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default EntryPointContainer;
