type SpecieInfo = {
  id: string;
  code: string;
  name: string;
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

type SpecieUpdateRequest = {
  name: string;
};
