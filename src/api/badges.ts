import request from "../tools/request";
import { BadgeCollectionResponse } from "../types/badge";

export const getBadges = async () => {
  const data = request.get<BadgeCollectionResponse>("/badges").then((res) => {
    return res.data;
  });
  return data;
};
