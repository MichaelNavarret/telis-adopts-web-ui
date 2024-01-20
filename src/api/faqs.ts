import request from "../tools/request";
import { FaqCollectionResponse, FaqGetParams } from "../types/faqs";

export const getFaqsBySpecie = async (params: FaqGetParams) => {
  const data = await request
    .get<FaqCollectionResponse>("/faqs", {
      params,
    })
    .then((response) => response.data.faqInfoList);
  return data;
};
