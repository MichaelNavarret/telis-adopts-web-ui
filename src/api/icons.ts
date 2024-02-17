import request from "../tools/request";
import { IconCollectionResponse } from "../types/icons";

export const getIconsByOwnerId = (ownerId: string) => {
  const data = request
    .get<IconCollectionResponse>(`/icons/${ownerId}`)
    .then((res) => res.data.iconInfoList);
  return data;
};
