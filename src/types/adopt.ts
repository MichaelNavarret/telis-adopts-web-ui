import { BadgeInfo } from "./badge";
import { OwnerDesignerCreateRequest, OwnerInfo } from "./owner";
import {
  SubTraitCreateRequest,
  SubTraitInfo,
  SubTraitUpdateRequest,
} from "./subTraits";

export type CreationType = "" | "PREMADE" | "CUSTOM" | "MYO" | "GUEST_ARTIST";

//! ========================================== Request ==========================================
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
  badgeId?: string;
};

export type AdoptUpdateRequest = {
  name?: string;
  subTraits?: SubTraitUpdateRequest[];
  specieId?: string;
  badgeId?: string;
  specieFormId?: string;
  createdOn?: string;
  ownerId?: string;
  designerIds?: string[];
  creationType?: string;
  toyhouseLink?: string;
  active?: boolean;
};

//! ========================================== Response ==========================================
export type AdoptInfo = {
  id: string;
  code: string;
  name: string;
  ownerName: string;
  specieName: string;
  designers: OwnerInfo[];
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
  creationType: string;
  toyhouseLink: string;
  active: boolean;
};

export type AdoptSingletonResponse = {
  adoptSingletonInfo: AdoptInfo;
};

export type AdoptCollectionResponse = {
  adoptInfoList: AdoptInfo[];
};

// !========================================== PARAMS ===================================================

export type AdoptAutocompleteParams = {
  specieId?: string;
  creationType?: CreationType;
  sort?: string;
  ownerId?: string;
  q?: string;
  active?: boolean;
};
