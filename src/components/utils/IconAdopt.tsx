import { AdoptInfo } from "../../types/adopt";
import styles from "./IconAdopt.module.scss";
import NOT_ICON from "./../../assets/utils/not_icon.png";
import { laniesColors } from "../../constants/colors/laniesColors";
import { spectraLumenColors } from "../../constants/colors/spectraLumenColors";
import { cloudystarsColors } from "../../constants/colors/cloudyStarsColors";
import { pluniesColors } from "../../constants/colors/pluniesColors";
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
    if (specie === "lanies") return laniesColors.borderIcon;
    if (specie === "spectralumen") return spectraLumenColors.borderIcon;
    if (specie === "cloudystars") return cloudystarsColors.borderIcon;
    if (specie === "plunies") return pluniesColors.borderIcon;
    return colors.CTX_BORDER_ICON_COLOR;
  };

  const borderColor = onProfile
    ? getBorderColor()
    : colors.CTX_BORDER_ICON_COLOR;

  return (
    <img
      className={notAnimation ? "" : styles.adoptIcon}
      src={adopt.iconUrl ? adopt.iconUrl : NOT_ICON}
      alt={"logo"}
      width={width}
      style={{
        filter: ` drop-shadow(3px 0 0 ${borderColor})
                  drop-shadow(3px 3px 0 ${borderColor})
                  drop-shadow(3px -3px 0 ${borderColor})
                  drop-shadow(0 3px 0 ${borderColor})

                  drop-shadow(-3px 0 0 ${borderColor})
                  drop-shadow(-3px 3px 0 ${borderColor})
                  drop-shadow(-3px -3px 0 ${borderColor})
                  drop-shadow(0 -3px 0 ${borderColor})`,
      }}
      onClick={() => handleIconClick(adopt)}
    />
  );
};

export default IconAdopt;
