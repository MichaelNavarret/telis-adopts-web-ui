import { Dialog, Divider, Slide } from "@mui/material";
import { AdoptInfo } from "../../../../types/adopt";
import { useTheme } from "../../../../context/ThemeProvider";
import styles from "./AdoptCard.module.scss";
import IconAdopt from "../../../../components/utils/IconAdopt";
import { forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Label from "./Label";
import strings from "../../../../l10n";
import TextComponent from "../../../../components/TextComponents/TextComponent";
import CurrentOwnerSection from "./CurrentOwnerSection";
import DesignersSection from "./DesignersSection";
import { FaTree } from "react-icons/fa";

type AdoptCardProps = {
  open: boolean;
  adopt: AdoptInfo;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdoptCard = (props: AdoptCardProps) => {
  const { colors } = useTheme();
  const { open = false, adopt } = props;
  return (
    <Dialog
      open={open}
      component={"div"}
      maxWidth={"lg"}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: colors.CTX_FORM_CONTAINER_COLOR,
          borderRadius: "60px",
          width: "750px",
          height: "500px",
          border: `15px solid ${colors.CTX_BORDER_ICON_COLOR}`,
        },
      }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.iconAdoptContainer}>
            <IconAdopt
              key={adopt.id}
              adopt={adopt}
              handleIconClick={() => {}}
              width={190}
              borderIconColor={colors.CTX_BORDER_ICON_COLOR}
              notAnimation
            />
          </div>
          <div className={styles.subHeaderContainer}>
            <div className={styles.topSubHeaderContainer}>
              <div className={styles.currentOwnerContainer}>
                <CurrentOwnerSection currentOwnerName={adopt.ownerName} />
              </div>
              <div className={styles.listDesignersContainer}>
                <Label
                  label={strings.DESIGNERS}
                  color={colors.CTX_TEXT_COLOR}
                  backgroundColor={colors.CTX_BUTTON_COLOR}
                />
                {adopt.designers.map((designer) => (
                  <DesignersSection key={designer} designer={designer} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.bottomSubHeaderContainer}>
            <div className={styles.codeAdoptAndBadgeContainer}>
              <TextComponent
                content={`Code: ${adopt.code}`}
                className={styles.codeAdopt}
                colorText={colors.CTX_BUTTON_SHADOW_COLOR_2}
                hover={false}
                fontSize="small"
                animation={false}
              />
              <FaTree fontSize={50} color="green" />
            </div>
            <Divider
              style={{ marginLeft: "25%", marginRight: "2%", marginTop: "3px" }}
            />
          </div>
        </div>

        <div className={styles.bodyContainer}></div>
      </div>
    </Dialog>
  );
};

export default AdoptCard;
