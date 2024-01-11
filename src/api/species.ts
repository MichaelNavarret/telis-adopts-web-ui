import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";

export const getSpecies = async (pageNumber: number = 0) => {
  const data = await request
    .get<SpecieCollectionResponse>("/species", {
      headers: getPaginationHeaders(pageNumber),
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data.specieInfoList,
      };
    });
  return data;
};

export const getSpeciesAutocomplete = async () => {
  const data = await request
    .get<SpecieCollectionResponse>("/species/autocomplete")
    .then((res) => {
      return res.data.specieInfoList;
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
