// ------ Request --------
export type SubTraitCreateRequest = {
  additionalInfo?: string;
  mainTraitId?: string;
  rarity?: "COMMON" | "UNCOMMON" | "RARE" | "EPIC";
};
