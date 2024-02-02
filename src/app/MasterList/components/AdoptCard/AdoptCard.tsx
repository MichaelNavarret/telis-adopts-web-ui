import { CircularProgress, Dialog, Divider, Slide } from "@mui/material";
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
import ToyhouseIcon from "../../../../icons/ToyhouseIcon";
import { ImCross } from "react-icons/im";
import TraitList from "./TraitsList";
import { useQuery } from "react-query";
import { getSpecieForm } from "../../../../api/species";
import BadgesExpositor from "./BadgesExpositor";

type AdoptCardProps = {
  open: boolean;
  adopt: AdoptInfo;
  handleClose: () => void;
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
  const { open = false, adopt, handleClose } = props;

  const { data: specieForm, isLoading: isSpecieFormLoading } = useQuery({
    queryKey: ["specieForm", adopt.specieFormId],
    queryFn: () => {
      return getSpecieForm(adopt.specieFormId);
    },
    enabled: !!adopt && !!adopt.specieFormId,
  });

  return (
    <Dialog
      open={open}
      component={"div"}
      maxWidth={"lg"}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: colors.CTX_FORM_CONTAINER_COLOR,
          borderRadius: "100px",
          width: "750px",
          height: "500px",
          border: `15px solid ${colors.CTX_BORDER_ICON_COLOR}`,
          overflow: "hidden",
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
                  fontSize="11px"
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
                letterSpacing="0.2rem"
              />
              <div className={styles.badgesContainer}>
                <BadgesExpositor
                  badgesCode={adopt.badges.map((badge) => badge.code)}
                />
              </div>
            </div>
            <Divider
              style={{ marginLeft: "25%", marginRight: "2%", marginTop: "3px" }}
            />
          </div>
        </div>

        {/* ---------------------------------------------------------
     -------------------------------Body--------------------
     --------------------------------------------------------- */}
        <div className={styles.bodyContainer}>
          <TraitList traits={adopt.traits} rarity={adopt.rarity} />
          {specieForm && (
            <div className={styles.specieFormContainer}>
              {isSpecieFormLoading ? (
                <CircularProgress
                  style={{
                    color: colors.CTX_BUTTON_COLOR,
                  }}
                />
              ) : (
                <img
                  src={specieForm?.imageUrl}
                  alt="specieForm"
                  width={137.75}
                  height={170.25}
                />
              )}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------
     -------------------------------Footer--------------------
     --------------------------------------------------------- */}
        <div className={styles.footerContainer}>
          <ToyhouseIcon
            className={styles.iconStyles}
            iconColor={colors.CTX_TEXT_COLOR}
            style={{
              background: colors.CTX_BUBBLE_COLOR,
              padding: "5px",
              boxShadow: `0px 0px 10px 0px ${colors.CTX_BUTTON_SHADOW_COLOR_2}`,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <ImCross
            className={styles.iconStyles}
            style={{
              marginBottom: "5px",
              color: colors.CTX_BUBBLE_COLOR,
            }}
            onClick={handleClose}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default AdoptCard;
