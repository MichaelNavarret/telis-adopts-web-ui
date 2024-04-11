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

// !======================= PARAMS =================================
export type BadgeCollectionParams = {
  sort?: string;
  q?: string;
  active?: boolean;
};
