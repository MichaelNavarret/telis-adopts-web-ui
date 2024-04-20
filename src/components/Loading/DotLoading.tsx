import { useTheme } from "../../context/ThemeProvider";
import styles from "./DotLoading.module.scss";

type DotLoadingProps = {
  dotNumber?: number;
  size?: string;
  color?: string;
};

const DotLoading = (props: DotLoadingProps) => {
  const { colors } = useTheme();
  const { dotNumber = 3, size = "20px", color = colors.text_02_color } = props;

  return (
    <div className={styles.dotLoading}>
      {Array(dotNumber)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={styles.dot}
            style={{
              backgroundColor: color,
              width: size,
              height: size,
            }}
          ></div>
        ))}
    </div>
  );
};

export default DotLoading;
