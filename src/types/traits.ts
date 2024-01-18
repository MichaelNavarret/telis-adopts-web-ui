export type TraitInfo = {
  id: string;
  specie: string;
  trait: string;
  rarities: string[];
  displayPriority: number;
};

export type TraitSingletonResponse = {
  traitSingletonInfo: TraitInfo;
};

export type TraitCollectionResponse = {
  traitInfoList: TraitInfo[];
};

export type TraitCreateRequest = {
  specieId: string;
  trait: string;
  rarities: string[];
  displayPriority: number | null;
};

export type TraitAutocompleteParams = {
  specieId: string;
};
