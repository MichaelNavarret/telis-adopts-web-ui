import { RoleInfo } from "./role";

export type OwnerInfo = {
  id: string;
  nickName: string;
  email: string;
  status: boolean;
  role: RoleInfo;
};

export type OwnerSingletonResponse = {
  owner: OwnerInfo;
};

export type OwnerRequest = {
  username: string;
};

export type OwnerCollectionResponse = {
  ownerInfoList: OwnerInfo[];
};

export type OwnerDesignerCreateRequest = {
  id: string;
  notRegisteredDesigner: boolean;
};
