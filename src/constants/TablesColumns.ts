import { ColumnsTable } from "../components/Table/TableComponent";

export const adoptsTableColumns: ColumnsTable[] = [
  { value: "code", label: "Code" },
  { value: "name", label: "Name" },
  { value: "ownerName", label: "Owner" },
  { value: "specieName", label: "Specie" },
  { value: "rarity", label: "Rarity" },
];

export const speciesTableColumns: ColumnsTable[] = [
  { value: "name", label: "Name" },
];

export const traitsTableColumns: ColumnsTable[] = [
  { value: "code", label: "Code" },
  { value: "characteristic", label: "Characteristic" },
  { value: "specie", label: "Specie" },
];
