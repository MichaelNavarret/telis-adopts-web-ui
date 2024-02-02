import ToyhouseIcon from "../../../icons/ToyhouseIcon";
import { FaDeviantart, FaDiscord, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import styles from "./NetworkProfile.module.scss";
import { useTheme } from "../../../context/ThemeProvider";

type NetworkProfileProps = {
  className?: string;
};

export const NetworkProfile = (props: NetworkProfileProps) => {
  const { colors } = useTheme();
  const { className } = props;

  return (
    <div className={className}>
      <FaDeviantart
        className={styles.iconStyles}
        fontSize="30px"
        style={{
          fill: colors.CTX_TEXT_COLOR,
          background: colors.CTX_BUBBLE_COLOR,
          padding: "5px",
          boxShadow: `0px 0px 10px 0px ${colors.CTX_BUTTON_SHADOW_COLOR_2}`,
        }}
      />
      <FaDiscord
        className={styles.iconStyles}
        fontSize="30px"
        style={{
          fill: colors.CTX_TEXT_COLOR,
          background: colors.CTX_BUBBLE_COLOR,
          padding: "5px",
          boxShadow: `0px 0px 10px 0px ${colors.CTX_BUTTON_SHADOW_COLOR_2}`,
        }}
      />
      <FaTwitter
        className={styles.iconStyles}
        fontSize="30px"
        style={{
          fill: colors.CTX_TEXT_COLOR,
          background: colors.CTX_BUBBLE_COLOR,
          padding: "5px",
          boxShadow: `0px 0px 10px 0px ${colors.CTX_BUTTON_SHADOW_COLOR_2}`,
        }}
      />
      <RiInstagramFill
        className={styles.iconStyles}
        fontSize="30px"
        style={{
          fill: colors.CTX_TEXT_COLOR,
          background: colors.CTX_BUBBLE_COLOR,
          padding: "5px",
          boxShadow: `0px 0px 10px 0px ${colors.CTX_BUTTON_SHADOW_COLOR_2}`,
        }}
      />
      <ToyhouseIcon
        className={styles.iconStyles}
        iconColor={colors.CTX_TEXT_COLOR}
        style={{
          background: colors.CTX_BUBBLE_COLOR,
          padding: "3px",
          boxShadow: `0px 0px 10px 0px ${colors.CTX_BUTTON_SHADOW_COLOR_2}`,
          width: "35px",
          height: "35px",
        }}
      />
    </div>
  );
};
