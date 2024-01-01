import request from "../tools/request";

export const getSpecies = async () => {
  const data = await request
    .get<SpecieCollectionResponse>("/species")
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data.specieInfoList,
      };
    });
  return data;
};

export const createSpecie = async (payload: SpecieCreateRequest) => {
  const data = await request
    .post<SpecieSingletonResponse>("/species", payload)
    .then((res) => {
      return res.data.specieSingletonInfo;
    });
  return data;
};
