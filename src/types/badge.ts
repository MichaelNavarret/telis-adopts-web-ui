export type BadgeInfo = {
  id: string;
  name: string;
  code: string;
  description: string;
  badgeUrl: string;
};

export type BadgeCollectionResponse = {
  badgeInfoList: BadgeInfo[];
};
