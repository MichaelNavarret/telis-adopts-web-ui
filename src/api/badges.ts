import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import {
  BadgeCollectionParams,
  BadgeCollectionResponse,
  BadgeCreateRequest,
  BadgeSingletonResponse,
  BadgeUpdateRequest,
} from "../types/badge";

export const getBadges = async () => {
  const data = request
    .get<BadgeCollectionResponse>("/badges/all")
    .then((res) => {
      return res.data;
    });
  return data;
};

export const getBadgesCollection = async (
  params: BadgeCollectionParams,
  pageNumber: number = 0
) => {
  const data = request
    .get<BadgeCollectionResponse>("/badges", {
      params,
      headers: getPaginationHeaders(pageNumber),
    })
    .then((res) => {
      return {
        headers: res.headers,
        data: res.data.badgeInfoList,
      };
    });
  return data;
};

export const getBadgeSingleton = async (badgeId: string) => {
  const data = request
    .get<BadgeSingletonResponse>(`/badges/${badgeId}`)
    .then((res) => {
      return res.data.badgeInfo;
    });
  return data;
};

export const updateBadge = async (
  badgeId: string,
  payload: BadgeUpdateRequest
) => {
  const data = request
    .put<BadgeSingletonResponse>(`/badges/${badgeId}`, payload)
    .then((res) => {
      return res.data.badgeInfo;
    });
  return data;
};

export const createBadge = async (payload: BadgeCreateRequest) => {
  const data = request
    .post<BadgeSingletonResponse>(`/badges`, payload)
    .then((res) => res.data.badgeInfo);
  return data;
};

export const uploadBadgeImage = async (file: File, badgeId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  const data = await request
    .put<BadgeSingletonResponse>(`/badges/${badgeId}/badgeImage`, formData)
    .then((res) => res.data.badgeInfo);
  return data;
};
