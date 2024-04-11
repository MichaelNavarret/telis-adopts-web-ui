// !======================= INFOS ==============================

export type BadgeInfo = {
  id: string;
  name: string;
  code: string;
  description: string;
  badgeUrl: string;
  createdOn: string;
  active: boolean;
};

// !======================= RESPONSES ==============================
export type BadgeCollectionResponse = {
  badgeInfoList: BadgeInfo[];
};

export type BadgeSingletonResponse = {
  badgeInfo: BadgeInfo;
};

// !======================= REQUESTS =================================
export type BadgeUpdateRequest = {
  name?: string;
  code?: string;
  description?: string;
  active?: boolean;
};

// !======================= PARAMS =================================
export type BadgeCollectionParams = {
  sort?: string;
  q?: string;
  active?: boolean;
};
