import { SubTraitCreateRequest } from "./subTraits";

export type CreationType = "PREMADE" | "CUSTOM" | "MYO" | "GUEST_ARTIST";

// -------- Request --------
export type AdoptCreateRequest = {
  name: string;
  ownerId: string;
  designersId?: string[];
  subTraits?: SubTraitCreateRequest[];
  specieId: string;
  creationType: CreationType;
};

// -------- Response --------
export type AdoptInfo = {
  id: string;
  code: string;
  name: string;
  ownerName: string;
  specieName: string;
  designers: string[];
  createdOn: string;
  boughtOn: string;
  registeredOn: string;
  rarity: string;
};

export type AdoptSingletonResponse = {
  adoptSingletonInfo: AdoptInfo;
};

export type AdoptCollectionResponse = {
  adoptInfoList: AdoptInfo[];
};
