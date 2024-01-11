import CATS_LOADING from "../../assets/utils/cats_loading.gif";
import DotLoading from "./DotLoading";
import styles from "./CatsLoading.module.scss";

type CatsLoadingProps = {
  withDots?: boolean;
  colorDots?: string;
  width?: string;
};

const CatsLoading = (props: CatsLoadingProps) => {
  const { withDots = false, colorDots, width } = props;

  return (
    <div className={styles.catsLoadingContainer}>
      <div>
        <img
          src={CATS_LOADING}
          style={{
            width: width ? width : "100%",
          }}
        />
      </div>
      <div className={styles.dotContainer}>
        {withDots && <DotLoading color={colorDots} size="10px" />}
      </div>
    </div>
  );
};

export default CatsLoading;
