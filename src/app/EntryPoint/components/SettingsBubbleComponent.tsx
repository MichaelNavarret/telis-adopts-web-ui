import Bubble from "../../../components/surfaces/Bubble";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useTheme } from "../../../context/ThemeProvider";
import { useNavigate } from "react-router-dom";
import strings from "../../../l10n";

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
            color: colors.text_02_color,
          }}
        />
      }
      tooltipText={strings.SETTINGS}
      bottom="1%"
      left="1%"
      bubbleColor={colors.primary_color}
      handleClick={handleNavigate}
      position="fixed"
    />
  );
};

export default SettingsBubbleComponent;
