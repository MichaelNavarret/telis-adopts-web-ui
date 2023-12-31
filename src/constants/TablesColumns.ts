import { ColumnsTable } from "../components/Table/TableComponent";
import strings from "../l10n";

export const adoptsTableColumns: ColumnsTable[] = [
  { value: "code", label: strings.CODE },
  { value: "name", label: strings.NAME },
  { value: "ownerName", label: strings.OWNER },
  { value: "specieName", label: strings.SPECIE },
  { value: "rarity", label: strings.RARITY },
];

export const speciesTableColumns: ColumnsTable[] = [
  { value: "name", label: strings.NAME },
];

export const traitsTableColumns: ColumnsTable[] = [
  { value: "trait", label: strings.TRAIT },
  { value: "specie", label: strings.SPECIE },
  { value: "rarities", label: strings.RARITIES },
];
