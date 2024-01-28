import styles from "./NavigationBubbles.module.scss";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
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
      <div className={styles.bubble} style={styleConfig}>
        <CgProfile
          className={styles.iconBubble}
          onClick={() => navigate("/")}
        />
      </div>
      <div className={styles.bubble} style={styleConfig}>
        <FaHome
          className={styles.iconBubble}
          onClick={() => navigate("/species")}
        />
      </div>
      <div className={styles.bubble} style={styleConfig}>
        <IoMdSettings
          className={styles.iconBubble}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default NavigationBubbles;
