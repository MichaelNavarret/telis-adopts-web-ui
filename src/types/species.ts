type SpecieInfo = {
  id: string;
  code: string;
  name: string;
  traitsInformation: ArrayBufferLike;
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
