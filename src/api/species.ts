import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  SpecieAddSpecieFormParams,
  SpecieCollectionResponse,
  SpecieCreateRequest,
  SpecieFormSingletonResponse,
  SpecieSingletonResponse,
  SpecieUpdateAssetParams,
  SpecieUpdateRequest,
} from "../types/species";

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

export const getSpecie = async (specieId: string) => {
  const data = await request
    .get<SpecieSingletonResponse>(`/species/${specieId}`)
    .then((res) => {
      return res.data.specieSingletonInfo;
    });
  return data;
};

export const addSpecieFormToSpecie = async (
  specieId: string,
  params: SpecieAddSpecieFormParams,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  const data = await request
    .post<SpecieSingletonResponse>(
      `/species/${specieId}/specieForm`,
      formData,
      {
        params: params,
      }
    )
    .then((res) => {
      return res.data.specieSingletonInfo;
    });
  return data;
};

export const getSpecieForm = async (specieFormId: string) => {
  const data = request
    .get<SpecieFormSingletonResponse>(`species-form/${specieFormId}`)
    .then((res) => res.data.specieFormSingletonInfo);
  return data;
};

export const updateSpecie = async (
  specieId: string,
  payload: SpecieUpdateRequest
) => {
  const data = await request
    .put<SpecieSingletonResponse>(`/species/${specieId}`, payload)
    .then((res) => {
      return res.data.specieSingletonInfo;
    });
  return data;
};

export const updateSpecieAsset = async (
  specieId: string,
  params: SpecieUpdateAssetParams,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  const data = await request
    .patch<SpecieSingletonResponse>(
      `/species/${specieId}/update-asset`,
      formData,
      {
        params: params,
      }
    )
    .then((res) => {
      return res.data.specieSingletonInfo;
    });
  return data;
};
