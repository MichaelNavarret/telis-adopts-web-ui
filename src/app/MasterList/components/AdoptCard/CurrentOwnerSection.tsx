import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import ToyhouseIcon from "../../../../icons/ToyhouseIcon";
import strings from "../../../../l10n";
import Label from "./Label";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { FaDeviantart, FaDiscord, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import styles from "./CurrentOwnerSection.module.scss";
import { Colors } from "../../../../types/commons";

type CurrentOwnerSectionProps = {
  currentOwnerName?: string;
  colorSpecie: Colors;
  onProfile?: boolean;
};

const CurrentOwnerSection = (props: CurrentOwnerSectionProps) => {
  const { colors } = useTheme();
  const { currentOwnerName, onProfile, colorSpecie } = props;
  const textColor = onProfile ? colorSpecie.text : colors.CTX_TEXT_COLOR;
  const bubbleColor = onProfile ? colorSpecie.bubble : colors.CTX_BUBBLE_COLOR;
  const shadowColor2 = onProfile
    ? colorSpecie.buttonShadow2
    : colors.CTX_BUTTON_SHADOW_COLOR_2;
  const buttonColor = onProfile ? colorSpecie.button : colors.CTX_BUTTON_COLOR;

  return (
    <>
      <Label
        label={strings.CURRENT_OWNER}
        color={textColor}
        backgroundColor={buttonColor}
        fontSize="11px"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          justifyContent: "center",
        }}
      >
        <StarRoundedIcon
          style={{
            color: buttonColor,
            fontSize: "25px",
            marginRight: "5px",
          }}
        />
        <TextComponent
          content={currentOwnerName || "No owner"}
          hover={false}
          animation={false}
          colorText={shadowColor2}
          letterSpacing="0.2rem"
          fontSize="small"
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
            fill: textColor,
            background: bubbleColor,
            padding: "5px",
            boxShadow: `0px 0px 10px 0px ${shadowColor2}`,
          }}
        />
        <FaDiscord
          className={styles.iconStyles}
          fontSize="30px"
          style={{
            fill: textColor,
            background: bubbleColor,
            padding: "5px",
            boxShadow: `0px 0px 10px 0px ${shadowColor2}`,
          }}
        />
        <FaTwitter
          className={styles.iconStyles}
          fontSize="30px"
          style={{
            fill: textColor,
            background: bubbleColor,
            padding: "5px",
            boxShadow: `0px 0px 10px 0px ${shadowColor2}`,
          }}
        />
        <RiInstagramFill
          className={styles.iconStyles}
          fontSize="30px"
          style={{
            fill: textColor,
            background: bubbleColor,
            padding: "5px",
            boxShadow: `0px 0px 10px 0px ${shadowColor2}`,
          }}
        />
        <ToyhouseIcon
          className={styles.iconStyles}
          iconColor={textColor}
          style={{
            background: bubbleColor,
            padding: "3px",
            boxShadow: `0px 0px 10px 0px ${shadowColor2}`,
            width: "35px",
            height: "35px",
          }}
        />
      </div>
    </>
  );
};

export default CurrentOwnerSection;
