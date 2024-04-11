import { ColumnsTable } from "../components/Table/TableComponent";
import strings from "../l10n";

export const adoptsTableColumns: ColumnsTable[] = [
  { value: "code", label: strings.CODE },
  { value: "name", label: strings.NAME },
  { value: "ownerName", label: strings.OWNER },
  { value: "badge", label: strings.BADGE },
  { value: "specieName", label: strings.SPECIE },
  { value: "rarity", label: strings.RARITY },
  { value: "designers", label: strings.DESIGNERS },
  { value: "preview", label: strings.PREVIEW },
  { value: "active", label: strings.ACTIVE },
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

export const badgesTableColumns: ColumnsTable[] = [
  { value: "badgeUrl", label: strings.BADGE + " (click to edit)" },
  { value: "name", label: strings.NAME },
  { value: "code", label: strings.CODE },
  { value: "createdOn", label: strings.CREATED_ON },
  { value: "active", label: strings.ACTIVE },
];
