export type SpecieInfo = {
  id: string;
  code: string;
  name: string;
  traitSheetUrl: string;
  logoUrl: string;
  masterListBannerUrl: string;
  specieFormInfoList: SpecieFormInfo[];
  history: string;
  guideSheetUrl: string;
};

export type SpecieSingletonResponse = {
  specieSingletonInfo: SpecieInfo;
};

export type SpecieCollectionResponse = {
  specieInfoList: SpecieInfo[];
};

export type SpecieCreateRequest = {
  name: string;
  mainSpecieId?: string;
};

export type SpecieCreateParams = {
  specieName: string;
};

export type SpecieAddSpecieFormParams = {
  code: string;
};

export type SpecieUpdateRequest = {
  name?: string;
  story?: string;
};

export type SpecieFormInfo = {
  id: string;
  code: string;
  imageUrl: string;
};

export type SpecieFormSingletonResponse = {
  specieFormSingletonInfo: SpecieFormInfo;
};

export type SpecieUpdateAssetParams = {
  assetType?: "LOGO" | "MASTER_LIST_BANNER" | "TRAIT_SHEET" | "GUIDE_SHEET";
};
