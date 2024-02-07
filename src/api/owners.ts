import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  OwnerCollectionResponse,
  OwnerCreateRequest,
  OwnerSingletonResponse,
  OwnerUpdateRequest,
} from "../types/owner";

export const getMyOwner = async () => {
  const data = await request
    .get<OwnerSingletonResponse>("/owners/me")
    .then((res) => res.data.ownerSingletonInfo);
  return data;
};

export const getOwnersAutocomplete = async () => {
  const data = await request
    .get<OwnerCollectionResponse>("/owners/autocomplete")
    .then((res) => res.data.ownerInfoList);
  return data;
};

export const getOwnersCollection = async (pageNumber: number = 0) => {
  const data = await request
    .get<OwnerCollectionResponse>("/owners", {
      headers: getPaginationHeaders(pageNumber),
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data.ownerInfoList,
      };
    });
  return data;
};

export const createOwner = async (payload: OwnerCreateRequest) => {
  const data = await request
    .post<OwnerSingletonResponse>("/owners", payload)
    .then((res) => res.data.ownerSingletonInfo);
  return data;
};

export const getOwner = async (ownerId: string) => {
  const data = await request
    .get<OwnerSingletonResponse>(`/owners/${ownerId}`)
    .then((res) => res.data);
  return data;
};

export const updateOwner = async (
  ownerId: string,
  payload: OwnerUpdateRequest
) => {
  const data = await request
    .put<OwnerSingletonResponse>(`/owners/${ownerId}`, payload)
    .then((res) => res.data.ownerSingletonInfo);
  return data;
};
