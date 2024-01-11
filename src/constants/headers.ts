import { RawAxiosRequestHeaders } from "axios";

export const PAGINATION_LIMIT_HEADER: string = "x-pagination-limit";
export const PAGINATION_NUM_HEADER: string = "x-pagination-num";
export const PAGINATION_HAS_NEXT_PAGE: string = "x-pagination-has-next-page";

export const PAGINATION_LIMIT_VALUE: string = "20";
export const PAGINATION_NUM_VALUE: string = "0";

export const PAGINATION_LIMIT_VALUE_NUM: number = parseInt(
  PAGINATION_LIMIT_VALUE
);
export const PAGINATION_NUM_VALUE_NUM: number = parseInt(PAGINATION_NUM_VALUE);

export const BASE_HEADERS: RawAxiosRequestHeaders = Object.freeze({
  "Content-type": "application/json",
  Accept: "application/json",
});

const __pageHeaders = { ...BASE_HEADERS };
__pageHeaders[PAGINATION_LIMIT_HEADER] = PAGINATION_LIMIT_VALUE;
__pageHeaders[PAGINATION_NUM_HEADER] = PAGINATION_NUM_VALUE;
export const BASE_PAGINATION_HEADERS: RawAxiosRequestHeaders =
  Object.freeze(__pageHeaders);
