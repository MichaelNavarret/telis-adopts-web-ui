import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  AdoptAutocompleteParams,
  AdoptCollectionResponse,
  AdoptCreateRequest,
  AdoptSingletonResponse,
} from "../types/adopt";

export const createAdopt = async (payload: AdoptCreateRequest) => {
  const data = await request
    .post<AdoptSingletonResponse>("/adopts", payload)
    .then((res) => res.data.adoptSingletonInfo);
  return data;
};

export const uploadAdoptIcon = async (file: File, adoptId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  const data = await request
    .put(`/adopts/${adoptId}/icon`, formData)
    .then((res) => res.data);
  return data;
};

export const getAdopts = async (
  params: AdoptAutocompleteParams,
  pageNumber: number = 0
) => {
  const data = await request
    .get<AdoptCollectionResponse>("/adopts", {
      params,
      headers: getPaginationHeaders(pageNumber),
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data.adoptInfoList,
      };
    });
  return data;
};
