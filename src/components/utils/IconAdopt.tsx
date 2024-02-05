import { AdoptInfo } from "../../types/adopt";
import styles from "./IconAdopt.module.scss";
import NOT_ICON from "./../../assets/utils/not_icon.png";

type IconAdoptProps = {
  adopt: AdoptInfo;
  handleIconClick: (adopt: AdoptInfo) => void;
  width: number;
  borderIconColor: string;
  notAnimation?: boolean;
};

const IconAdopt = (props: IconAdoptProps) => {
  const {
    adopt,
    handleIconClick,
    width,
    borderIconColor,
    notAnimation = false,
  } = props;
  return (
    <img
      className={notAnimation ? "" : styles.adoptIcon}
      src={adopt.iconUrl ? adopt.iconUrl : NOT_ICON}
      alt={"logo"}
      width={width}
      style={{
        filter: ` drop-shadow(3px 0 0 ${borderIconColor})
                  drop-shadow(3px 3px 0 ${borderIconColor})
                  drop-shadow(3px -3px 0 ${borderIconColor})
                  drop-shadow(0 3px 0 ${borderIconColor})

                  drop-shadow(-3px 0 0 ${borderIconColor})
                  drop-shadow(-3px 3px 0 ${borderIconColor})
                  drop-shadow(-3px -3px 0 ${borderIconColor})
                  drop-shadow(0 -3px 0 ${borderIconColor})`,
      }}
      onClick={() => handleIconClick(adopt)}
    />
  );
};

export default IconAdopt;
