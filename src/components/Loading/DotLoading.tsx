import { useTheme } from "../../context/ThemeProvider";
import styles from "./DotLoading.module.scss";

type DotLoadingProps = {
  dotNumber?: number;
  size?: string;
};

const DotLoading = (props: DotLoadingProps) => {
  const { dotNumber = 3, size = "20px" } = props;
  const { colors } = useTheme();
  return (
    <div className={styles.dotLoading}>
      {Array(dotNumber)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={styles.dot}
            style={{
              backgroundColor: colors.CTX_MENUBAR_TEXT_COLOR,
              width: size,
              height: size,
            }}
          ></div>
        ))}
    </div>
  );
};

export default DotLoading;
