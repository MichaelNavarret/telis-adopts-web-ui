import { OwnerInfo } from "./owner";

export type IconInfo = {
  id: string;
  code: string;
  iconUrl: string;
  availableFor: OwnerInfo[];
};

export type IconSingletonResponse = {
  iconSingletonInfo: IconInfo;
};

export type IconCollectionResponse = {
  iconInfoList: IconInfo[];
};
