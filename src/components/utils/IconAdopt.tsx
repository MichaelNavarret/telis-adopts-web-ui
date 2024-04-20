import { AdoptInfo } from "../../types/adopt";
import styles from "./IconAdopt.module.scss";
import NOT_ICON from "./../../assets/utils/not_icon.png";
import { laniesColors } from "../../constants/colors/laniesColors";
import { spectraLumenColors } from "../../constants/colors/spectraLumenColors";
import { cloudystarsColors } from "../../constants/colors/cloudyStarsColors";
import { pluniesColors } from "../../constants/colors/pluniesColors";
import { getIconBoxShadow } from "../../tools/commons";
import { DEFAULT_PRIMARY } from "../../constants/colors/mainColors";
import { useTheme } from "../../context/ThemeProvider";

type IconAdoptProps = {
  adopt: AdoptInfo;
  handleIconClick: (adopt: AdoptInfo) => void;
  width: number;
  specie?: string;
  notAnimation?: boolean;
  onProfile?: boolean;
};

const IconAdopt = (props: IconAdoptProps) => {
  const {
    adopt,
    handleIconClick,
    width,
    specie,
    notAnimation = false,
    onProfile,
  } = props;

  const { colors } = useTheme();

  const getBorderColor = () => {
    if (specie === "lanies") return laniesColors.primary_color;
    if (specie === "spectralumen") return spectraLumenColors.primary_color;
    if (specie === "cloudystars") return cloudystarsColors.primary_color;
    if (specie === "plunies") return pluniesColors.primary_color;
    return DEFAULT_PRIMARY;
  };

  const borderColor = onProfile ? getBorderColor() : colors.primary_color;

  return (
    <img
      className={notAnimation ? "" : styles.adoptIcon}
      src={adopt.iconUrl ? adopt.iconUrl : NOT_ICON}
      alt={"logo"}
      width={width}
      style={{ filter: getIconBoxShadow(borderColor) }}
      onClick={() => handleIconClick(adopt)}
    />
  );
};

export default IconAdopt;
