import { Chip } from "@mui/material";
import { TraitInfo } from "../../../../types/traits";
import styles from "./traitsTableFormat.module.scss";

export function formatTraitTableRows(data: TraitInfo[]) {
  return data.map((item) => {
    return {
      trait: item.trait,
      specie: item.specie,
      rarities: formatRarities(item.rarities),
    };
  });
}

const formatRarities = (rarities: string[]) => {
  return (
    <div key={"key"} className={styles.raritiesChipContainer}>
      {rarities.map((item) => {
        return <Chip label={item} />;
      })}
    </div>
  );
};
