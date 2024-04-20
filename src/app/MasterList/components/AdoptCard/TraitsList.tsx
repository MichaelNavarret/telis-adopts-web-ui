import { Tooltip } from "@mui/material";
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
        colorText={onProfile ? colorSpecie.text_02_color : colors.text_02_color}
        animation={false}
        hover={false}
        fontSize="large"
        backgroundColor={
          onProfile ? colorSpecie.primary_color : colors.primary_color
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
                  ? colorSpecie.shadow_color
                  : colors.shadow_color,
                letterSpacing: "0.2rem",
              }}
            >
              {trait.mainTrait}
            </p>

            {/* ----------------- */}
            {trait.additionalInfo && (
              <Tooltip
                title={trait.additionalInfo}
                key={trait.id}
                arrow
                placement="top-start"
              >
                <p
                  className={styles.additionalInfo}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.2rem",
                    color: onProfile
                      ? colorSpecie.shadow_color
                      : colors.shadow_color,
                  }}
                >
                  {`: ${trait.additionalInfo}`}
                </p>
              </Tooltip>
            )}
            {/* ----------------- */}
            <p
              style={{
                color: onProfile
                  ? colorSpecie.text_02_color
                  : colors.text_02_color,
                backgroundColor: onProfile
                  ? colorSpecie.primary_color
                  : colors.primary_color,
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
