import ToyhouseIcon from "../../../icons/ToyhouseIcon";
import { FaDeviantart, FaDiscord, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import styles from "./NetworkProfile.module.scss";
import { useTheme } from "../../../context/ThemeProvider";
import { OwnerSingletonResponse } from "../../../types/owner";
import { isDefined } from "../../../tools/commons";

type NetworkProfileProps = {
  className?: string;
  owner?: OwnerSingletonResponse;
};

export const NetworkProfile = (props: NetworkProfileProps) => {
  const { colors } = useTheme();
  const { className, owner } = props;

  const handleIconClick = (url?: string) => {
    if (!isDefined(url)) return;
    window.open(url, "_blank");
  };

  const style = {
    fill: colors.text_02_color,
    background: colors.primary_color,
    padding: "5px",
    boxShadow: `0px 0px 10px 0px ${colors.shadow_color}`,
  };

  const getCurrentStyle = (disabled: boolean) => {
    if (!disabled)
      return {
        ...style,
        background: "#D0D0D0",
        fill: "gray",
        boxShadow: "none",
      };
    return style;
  };

  const getCurrentStyleForToyhouse = (disabled: boolean) => {
    if (!disabled)
      return {
        ...style,
        background: "#D0D0D0",
        fill: "gray",
        boxShadow: "none",
        padding: "3px",
        width: "35px",
        height: "35px",
      };
    return { ...style, padding: "3px", width: "35px", height: "35px" };
  };

  return (
    <div className={className}>
      {owner?.ownerSingletonInfo.devianart && (
        <FaDeviantart
          className={styles.iconStyles}
          fontSize="30px"
          style={getCurrentStyle(
            isDefined(owner?.ownerSingletonInfo.devianart)
          )}
          onClick={() => handleIconClick(owner?.ownerSingletonInfo.devianart)}
        />
      )}
      {/* {owner?.ownerSingletonInfo.discord && (
        <FaDiscord
          className={styles.iconStyles}
          fontSize="30px"
          style={getCurrentStyle(isDefined(owner?.ownerSingletonInfo.discord))}
          onClick={() => handleIconClick(owner?.ownerSingletonInfo.discord)}
        />
      )} */}
      {owner?.ownerSingletonInfo.twitter && (
        <FaTwitter
          className={styles.iconStyles}
          fontSize="30px"
          style={getCurrentStyle(isDefined(owner?.ownerSingletonInfo.twitter))}
          onClick={() => handleIconClick(owner?.ownerSingletonInfo.twitter)}
        />
      )}
      {owner?.ownerSingletonInfo.instagram && (
        <RiInstagramFill
          className={styles.iconStyles}
          fontSize="30px"
          style={getCurrentStyle(
            isDefined(owner?.ownerSingletonInfo.instagram)
          )}
          onClick={() => handleIconClick(owner?.ownerSingletonInfo.instagram)}
        />
      )}
      {owner?.ownerSingletonInfo.toyhouse && (
        <ToyhouseIcon
          className={styles.iconStyles}
          iconColor={
            isDefined(owner?.ownerSingletonInfo.toyhouse)
              ? colors.text_02_color
              : "gray"
          }
          style={getCurrentStyleForToyhouse(
            isDefined(owner?.ownerSingletonInfo.toyhouse)
          )}
          handleClick={() =>
            handleIconClick(owner?.ownerSingletonInfo.toyhouse)
          }
        />
      )}
    </div>
  );
};
