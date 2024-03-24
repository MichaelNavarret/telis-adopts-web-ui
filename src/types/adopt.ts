import { BadgeInfo } from "./badge";
import { OwnerDesignerCreateRequest } from "./owner";
import {
  SubTraitCreateRequest,
  SubTraitInfo,
  SubTraitUpdateRequest,
} from "./subTraits";

export type CreationType = "PREMADE" | "CUSTOM" | "MYO" | "GUEST_ARTIST";

// -------- Request --------
export type AdoptCreateRequest = {
  name: string;
  ownerId: string;
  designersId?: string[];
  subTraits?: SubTraitCreateRequest[];
  specieId: string;
  creationType: CreationType;
  notRegisteredOwner?: boolean;
  designers: OwnerDesignerCreateRequest[];
  specieFormId?: string;
  badge?: string;
};

export type AdoptUpdateRequest = {
  name?: string;
  subTraits?: SubTraitUpdateRequest[];
  specieId?: string;
  badgeId?: string;
  specieFormId?: string;
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
  iconUrl: string;
  traits: SubTraitInfo[];
  specieFormId: string;
  badge: BadgeInfo;
  favoriteCharacterIndex: number;
  ownerId: string;
  specieCode: string;
  specieFormUrl: string;
  specieId: string;
};

export type AdoptSingletonResponse = {
  adoptSingletonInfo: AdoptInfo;
};

export type AdoptCollectionResponse = {
  adoptInfoList: AdoptInfo[];
};

export type AdoptAutocompleteParams = {
  specieId?: string;
  creationType?: CreationType;
  sort?: string;
  ownerId?: string;
};
