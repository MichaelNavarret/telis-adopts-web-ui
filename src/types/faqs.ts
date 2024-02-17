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

export type FaqCreationRequest = {
  question: string;
  answer: string;
  warning?: string | null;
  specieId: string;
};

export type FaqUpdateRequest = {
  question?: string;
  answer?: string;
  warning?: string;
};

export type FaqUpdateDeleteParams = {
  specieId: string;
};
