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
            backgroundColor: colors.primary_color,
            color: colors.text_02_color,
          },
        },
        arrow: {
          style: {
            color: colors.primary_color,
          },
        },
      }}
    >
      <div
        className={styles.homeBubbleContainer}
        style={{
          backgroundColor: colors.primary_color,
          boxShadow: `0 0 10px ${colors.shadow_color}`,
        }}
        onClick={handleClick}
      >
        <HomeRoundedIcon
          className={styles.bubble}
          style={{
            color: colors.primary_color,
          }}
        />
      </div>
    </Tooltip>
  );
};

export default HomeBubbleComponent;
