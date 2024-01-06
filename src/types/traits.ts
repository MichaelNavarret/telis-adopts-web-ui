export type TraitInfo = {
  id: string;
  rarity: string;
  code: string;
  characteristic: string;
  specie: string;
  options: string[];
};

export type TraitSingletonResponse = {
  traitSingletonInfo: TraitInfo;
};

export type TraitCollectionResponse = {
  traitInfoList: TraitInfo[];
};

export type TraitCreateRequest = {
  specieId: string;
  characteristic: string;
  code: string;
};
