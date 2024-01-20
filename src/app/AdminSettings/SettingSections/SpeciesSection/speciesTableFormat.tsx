import { Link } from "react-router-dom";
import { SpecieInfo } from "../../../../types/species";
import styles from "./speciesTableFormat.module.scss";

export function formatSpeciesTableRows(data: SpecieInfo[]) {
  return data.map((item) => {
    return {
      name: formatName(item.id, item.name),
    };
  });
}

const formatName = (specieId: string, name: string) => {
  return (
    <Link
      className={styles.linkRow}
      to={`/detailsSections/speciesDetails/${specieId}`}
    >
      {name}
    </Link>
  );
};
