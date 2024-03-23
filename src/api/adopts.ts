import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  AdoptAutocompleteParams,
  AdoptCollectionResponse,
  AdoptCreateRequest,
  AdoptSingletonResponse,
  AdoptUpdateRequest,
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

export const getFavoriteAdopts = async (
  ownerId: string,
  pageNumber: number = 0
) => {
  const data = await request
    .get<AdoptCollectionResponse>(`/adopts/${ownerId}/favorites`, {
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

export const getDesignedAdopts = async (
  ownerId: string,
  pageNumber: number = 0
) => {
  const data = await request
    .get<AdoptCollectionResponse>(`/adopts/${ownerId}/designs`, {
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

export const updateAdopt = async (
  adoptId: string,
  payload: AdoptUpdateRequest
) => {
  const data = await request
    .put<AdoptSingletonResponse>(`/adopts/${adoptId}`, payload)
    .then((res) => res.data.adoptSingletonInfo);
  return data;
};

export const getFavoriteCharacters = async (
  ownerId: string,
  pageNumber: number = 0
) => {
  const data = await request
    .get<AdoptCollectionResponse>(`/adopts/${ownerId}/favorite-characters`, {
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

export const getAdopt = async (adoptId: string) => {
  const data = await request
    .get<AdoptSingletonResponse>(`/adopts/${adoptId}`)
    .then((res) => res.data.adoptSingletonInfo);
  return data;
};
