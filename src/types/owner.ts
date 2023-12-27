import { RoleInfo } from "./role";

export type OwnerInfo = {
  id: string;
  name: string;
  role: RoleInfo;
};

export type OwnerSingletonResponse = {
  owner: OwnerInfo;
};

export type OwnerRequest = {
  username: string;
};
