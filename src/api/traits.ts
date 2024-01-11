import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  TraitCollectionResponse,
  TraitCreateRequest,
  TraitSingletonResponse,
} from "../types/traits";

export const getTraits = async (pageNumber: number = 0) => {
  const data = await request
    .get<TraitCollectionResponse>("/traits", {
      headers: getPaginationHeaders(pageNumber),
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data.traitInfoList,
      };
    });
  return data;
};

export const createTrait = async (payload: TraitCreateRequest) => {
  const data = await request
    .post<TraitSingletonResponse>("/traits", payload)
    .then((res) => {
      return res.data.traitSingletonInfo;
    });
  return data;
};
