// ------ Request --------
export type SubTraitCreateRequest = {
  subTraitCharacteristic: string;
  mainTraitId: string;
  adoptId: string;
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC";
};
