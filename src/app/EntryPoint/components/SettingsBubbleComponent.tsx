import Bubble from "../../../components/surfaces/Bubble";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useTheme } from "../../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const SettingsBubbleComponent = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin-settings");
  };

  return (
    <Bubble
      icon={
        <SettingsRoundedIcon
          style={{
            width: "60px",
            height: "60px",
            color: colors.CTX_BUBBLE_ICON_COLOR,
          }}
        />
      }
      tooltipText="Settings"
      bottom="1%"
      left="1%"
      bubbleColor={colors.CTX_BUBBLE_COLOR}
      handleClick={handleNavigate}
    />
  );
};

export default SettingsBubbleComponent;
