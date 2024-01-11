import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
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

export const getAdopts = async (pageNumber: number = 0) => {
  const data = await request
    .get<AdoptCollectionResponse>("/adopts", {
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
