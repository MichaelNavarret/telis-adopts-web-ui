import { getPaginationHeaders } from "../tools/headers";
import request from "../tools/request";
import { BadgeCollectionParams, BadgeCollectionResponse } from "../types/badge";

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
