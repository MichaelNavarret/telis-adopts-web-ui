import request from "../tools/request";
import {
  FaqCollectionResponse,
  FaqCreationRequest,
  FaqGetParams,
  FaqSingletonResponse,
  FaqUpdateDeleteParams,
  FaqUpdateRequest,
} from "../types/faqs";

export const getFaqsBySpecie = async (params: FaqGetParams) => {
  const data = await request
    .get<FaqCollectionResponse>("/faqs", {
      params,
    })
    .then((response) => response.data.faqInfoList);
  return data;
};

export const createFaq = async (payload: FaqCreationRequest) => {
  const data = await request
    .post("/faqs", payload)
    .then((response) => response.data.faqInfo);
  return data;
};

export const updateFaq = async (
  faqId: string,
  payload: FaqUpdateRequest,
  params: FaqUpdateDeleteParams
) => {
  const data = await request
    .put<FaqSingletonResponse>(`/faqs/${faqId}`, payload, {
      params,
    })
    .then((response) => response.data.faqSingletonInfo);
  return data;
};

export const deleteFaq = async (
  faqId: string,
  params: FaqUpdateDeleteParams
) => {
  await request.delete(`/faqs/${faqId}`, {
    params,
  });
};
