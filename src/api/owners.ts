import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  OwnerCollectionResponse,
  OwnerSingletonResponse,
} from "../types/owner";

export const getMyOwner = async () => {
  const data = await request
    .get<OwnerSingletonResponse>("/owners/me")
    .then((res) => res.data.owner);

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
