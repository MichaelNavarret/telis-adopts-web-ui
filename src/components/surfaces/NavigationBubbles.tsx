import styles from "./NavigationBubbles.module.scss";
import { FaHome } from "react-icons/fa";
import { useTheme } from "../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const NavigationBubbles = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const styleConfig = {
    backgroundColor: colors.CTX_BUBBLE_COLOR,
    color: colors.CTX_BUBBLE_ICON_COLOR,
  };

  return (
    <div className={styles.navigationBubblesContainer}>
      <div
        className={styles.bubble}
        style={styleConfig}
        onClick={() => navigate("/species")}
      >
        <FaHome className={styles.iconBubble} />
      </div>
    </div>
  );
};

export default NavigationBubbles;
