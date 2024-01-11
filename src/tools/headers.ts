import {
  BASE_HEADERS,
  BASE_PAGINATION_HEADERS,
  PAGINATION_NUM_HEADER,
} from "../constants/headers";

export function getBaseHeaders() {
  return { ...BASE_HEADERS };
}

export function getPaginationHeaders(pageNumber?: number) {
  const headers = { ...BASE_PAGINATION_HEADERS };
  if (pageNumber) {
    headers[PAGINATION_NUM_HEADER] = pageNumber.toString();
  }
  return headers;
}
