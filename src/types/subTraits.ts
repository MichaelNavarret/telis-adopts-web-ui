// ------ Request --------
export type SubTraitCreateRequest = {
  additionalInfo?: string;
  mainTraitId?: string;
  rarity?: "COMMON" | "UNCOMMON" | "RARE" | "EPIC";
};

export type SubTraitInfo = {
  id: string;
  mainTrait: string;
  additionalInfo: string;
  rarity: string;
  mainTraitDisplayPriority: number;
};
