import request from "../tools/request";
import { OwnerSingletonResponse } from "../types/owner";

export const getMyOwner = async () => {
  const data = await request
    .get<OwnerSingletonResponse>("/owners/me")
    .then((res) => res.data.owner);

  return data;
};
