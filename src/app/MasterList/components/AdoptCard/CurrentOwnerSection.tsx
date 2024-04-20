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
import { useQuery } from "react-query";
import { getOwner } from "../../../../api/owners";

type CurrentOwnerSectionProps = {
  currentOwnerName?: string;
  currentOwnerId: string;
  colorSpecie: Colors;
  onProfile?: boolean;
};

const CurrentOwnerSection = (props: CurrentOwnerSectionProps) => {
  const { colors } = useTheme();
  const { currentOwnerName, onProfile, colorSpecie, currentOwnerId } = props;
  const textColor = onProfile
    ? colorSpecie.text_02_color
    : colors.text_02_color;
  const bubbleColor = onProfile
    ? colorSpecie.primary_color
    : colors.primary_color;
  const shadowColor2 = onProfile
    ? colorSpecie.shadow_color
    : colors.shadow_color;
  const buttonColor = onProfile
    ? colorSpecie.primary_color
    : colors.primary_color;

  const { data: ownerResponse } = useQuery({
    queryKey: ["owner", currentOwnerId],
    queryFn: () => {
      return getOwner(currentOwnerId);
    },
    enabled: !!currentOwnerId,
  });

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
        {ownerResponse?.ownerSingletonInfo.devianart && (
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
        )}
        {ownerResponse?.ownerSingletonInfo.discord && (
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
        )}
        {ownerResponse?.ownerSingletonInfo.twitter && (
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
        )}
        {ownerResponse?.ownerSingletonInfo.instagram && (
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
        )}
        {ownerResponse?.ownerSingletonInfo.instagram && (
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
        )}
      </div>
    </>
  );
};

export default CurrentOwnerSection;
