import CATS_LOADING from "../../assets/utils/cats_loading.gif";
import DotLoading from "./DotLoading";
import styles from "./CatsLoading.module.scss";

type CatsLoadingProps = {
  withDots?: boolean;
};

const CatsLoading = (props: CatsLoadingProps) => {
  const { withDots = false } = props;

  return (
    <div className={styles.catsLoadingContainer}>
      <div>
        <img src={CATS_LOADING} />
      </div>
      <div className={styles.dotContainer}>
        {withDots && <DotLoading size="10px" />}
      </div>
    </div>
  );
};

export default CatsLoading;
