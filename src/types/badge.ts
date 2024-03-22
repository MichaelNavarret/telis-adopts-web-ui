export type BadgeInfo = {
  id: string;
  name: string;
  code: string;
  description: string;
};

export type BadgeCollectionResponse = {
  badgeInfoList: BadgeInfo[];
};
