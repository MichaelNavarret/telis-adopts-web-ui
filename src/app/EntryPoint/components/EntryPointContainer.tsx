import { DEFAULT_PRIMARY } from "../../../constants/colors/mainColors";
import styles from "./EntryPointContainer.module.scss";

type EntryPointContainerProps = {
  backGroundColor: string;
  children: React.ReactNode;
};

export const EntryPointContainer = (props: EntryPointContainerProps) => {
  const { backGroundColor = DEFAULT_PRIMARY, children } = props;
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
