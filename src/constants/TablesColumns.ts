import { ColumnsTable } from "../components/Table/TableComponent";
import strings from "../l10n";

export const adoptsTableColumns: ColumnsTable[] = [
  { value: "code", label: strings.CODE },
  { value: "name", label: strings.NAME },
  { value: "ownerName", label: strings.OWNER },
  { value: "specieName", label: strings.SPECIE },
  { value: "rarity", label: strings.RARITY },
  { value: "designers", label: "Designers" },
];

export const speciesTableColumns: ColumnsTable[] = [
  { value: "name", label: strings.NAME },
];

export const traitsTableColumns: ColumnsTable[] = [
  { value: "trait", label: strings.TRAIT },
  { value: "specie", label: strings.SPECIE },
  { value: "rarities", label: strings.RARITIES },
];

export const ownersTableColumns: ColumnsTable[] = [
  { value: "nickName", label: strings.NICKNAME },
  { value: "email", label: strings.EMAIL },
  { value: "status", label: strings.STATUS },
];
