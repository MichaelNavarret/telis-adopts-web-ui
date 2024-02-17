import { RoleInfo } from "./role";

export type OwnerInfo = {
  id: string;
  nickName: string;
  email: string;
  status: boolean;
  role: RoleInfo;
  iconUrl: string;
  favoriteAdopts: string[];
  discord: string;
  instagram: string;
  devianart: string;
  twitter: string;
  toyhouse: string;
  favoriteCharacters: string[];
};

export type OwnerSingletonResponse = {
  ownerSingletonInfo: OwnerInfo;
  badgesCode: string[];
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

export type OwnerCreateRequest = {
  nickName: string;
  email: string;
};

export type OwnerUpdateRequest = {
  nickName?: string;
  email?: string;
  discord?: string;
  instagram?: string;
  devianart?: string;
  twitter?: string;
  toyhouse?: string;
  favoriteAdoptsIds?: string[];
  iconId?: string;
};

export type OwnerAddCharacterFavoriteRequest = {
  adoptId: string;
};
