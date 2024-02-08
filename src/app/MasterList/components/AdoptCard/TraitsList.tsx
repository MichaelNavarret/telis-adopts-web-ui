import TextComponent from "../../../../components/TextComponents/TextComponent";
import { useTheme } from "../../../../context/ThemeProvider";
import { Colors } from "../../../../types/commons";
import { SubTraitInfo } from "../../../../types/subTraits";
import styles from "./TraitList.module.scss";

type TraitListProps = {
  rarity: string;
  traits: SubTraitInfo[];
  onProfile?: boolean;
  colorSpecie: Colors;
};

const TraitList = (props: TraitListProps) => {
  const { traits, rarity, onProfile, colorSpecie } = props;
  const { colors } = useTheme();

  const orderTraitsByDisplayPriority = (traits: SubTraitInfo[]) => {
    return traits.sort(
      (a, b) => a.mainTraitDisplayPriority - b.mainTraitDisplayPriority
    );
  };

  return (
    <>
      <TextComponent
        className={styles.titleTrait}
        content={rarity}
        colorText={onProfile ? colorSpecie.text : colors.CTX_TEXT_COLOR}
        animation={false}
        hover={false}
        fontSize="large"
        backgroundColor={
          onProfile ? colorSpecie.button : colors.CTX_BUTTON_COLOR
        }
        letterSpacing="0.3rem"
      />

      <div className={styles.traitsContainer}>
        {orderTraitsByDisplayPriority(traits).map((trait) => (
          <div key={trait.id} className={styles.traitItem}>
            <p
              style={{
                fontSize: "11px",
                color: onProfile
                  ? colorSpecie.buttonShadow2
                  : colors.CTX_BUTTON_SHADOW_COLOR_2,
                letterSpacing: "0.2rem",
              }}
            >{`${trait.mainTrait}:`}</p>

            {/* ----------------- */}
            {trait.additionalInfo && (
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2rem",
                  color: onProfile
                    ? colorSpecie.buttonShadow2
                    : colors.CTX_BUTTON_SHADOW_COLOR_2,
                }}
              >
                {trait.additionalInfo}
              </p>
            )}
            {/* ----------------- */}
            <p
              style={{
                color: onProfile ? colorSpecie.text : colors.CTX_TEXT_COLOR,
                backgroundColor: onProfile
                  ? colorSpecie.button
                  : colors.CTX_BUTTON_COLOR,
                padding: "6px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "30px",
                fontSize: "9px",
              }}
            >
              {trait.rarity}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TraitList;
