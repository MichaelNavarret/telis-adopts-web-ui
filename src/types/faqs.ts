export type FaqInfo = {
  id: string;
  question: string;
  answer: string;
  warning: string;
};

export type FaqSingletonResponse = {
  faqSingletonInfo: FaqInfo;
};

export type FaqCollectionResponse = {
  faqInfoList: FaqInfo[];
};

export type FaqGetParams = {
  specieId: string;
};
