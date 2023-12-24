import styles from "./MainContainer.module.scss";
import SocialNetworksMenu from "./SocialNetworkMenu";

type MainContainerProps = {
  children: React.ReactNode;
};

export const MainContainer = (props: MainContainerProps) => {
  const { children } = props;
  return (
    <div className={styles.backgroundContainer}>
      <SocialNetworksMenu />
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
};

export default MainContainer;
