import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import styles from "./HomeBubbleComponent.module.scss";
import { useTheme } from "../../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import strings from "../../../l10n";

const HomeBubbleComponent = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Tooltip
      title={strings.BACK_TO_SPECIES_PAGE}
      arrow
      placement="right"
      componentsProps={{
        tooltip: {
          style: {
            fontSize: "1rem",
            backgroundColor: colors.CTX_BUBBLE_COLOR,
            color: colors.CTX_BUBBLE_ICON_COLOR,
          },
        },
        arrow: {
          style: {
            color: colors.CTX_BUBBLE_COLOR,
          },
        },
      }}
    >
      <div
        className={styles.homeBubbleContainer}
        style={{
          backgroundColor: colors.CTX_BUBBLE_HOME_COLOR,
          boxShadow: `0 0 10px ${colors.CTX_BUTTON_SHADOW_COLOR}`,
        }}
        onClick={handleClick}
      >
        <HomeRoundedIcon
          className={styles.bubble}
          style={{
            color: colors.CTX_BUBBLE_ICON_COLOR,
          }}
        />
      </div>
    </Tooltip>
  );
};

export default HomeBubbleComponent;
