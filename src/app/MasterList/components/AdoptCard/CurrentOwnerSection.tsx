import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import ToyhouseIcon from "../../../../icons/ToyhouseIcon";
import strings from "../../../../l10n";
import Label from "./Label";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { FaDeviantart, FaDiscord, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import styles from "./CurrentOwnerSection.module.scss";

type CurrentOwnerSectionProps = {
  currentOwnerName?: string;
};

const CurrentOwnerSection = (props: CurrentOwnerSectionProps) => {
  const { colors } = useTheme();
  const { currentOwnerName } = props;
  return (
    <>
      <Label
        label={strings.CURRENT_OWNER}
        color={colors.CTX_TEXT_COLOR}
        backgroundColor={colors.CTX_BUTTON_COLOR}
      />
      <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}>
        <StarRoundedIcon
          style={{
            color: colors.CTX_BUTTON_COLOR,
            fontSize: "30px",
            marginRight: "5px",
          }}
        />
        <TextComponent
          content={currentOwnerName || "No owner"}
          hover={false}
          animation={false}
          colorText={colors.CTX_BUTTON_SHADOW_COLOR_2}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          marginTop: "10px",
        }}
      >
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
    </>
  );
};

export default CurrentOwnerSection;
