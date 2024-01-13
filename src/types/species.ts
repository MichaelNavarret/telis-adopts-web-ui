type SpecieInfo = {
  id: string;
  code: string;
  name: string;
  traitSheetUrl: string;
  logoUrl: string;
};

type SpecieSingletonResponse = {
  specieSingletonInfo: SpecieInfo;
};

type SpecieCollectionResponse = {
  specieInfoList: SpecieInfo[];
};

type SpecieCreateRequest = {
  name: string;
};

type SpecieCreateParams = {
  specieName: string;
};

type SpecieUpdateRequest = {
  name: string;
};
