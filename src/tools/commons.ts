import { NOT_SHOW_HOME_BUBBLE_ON_LOCATION } from "../constants/commons";
import {
  loadFirstToken,
  loadToken,
} from "../context/UserSession/userSessionReducer";

export function isDefined<T>(arg: T | null | undefined): arg is T {
  return typeof arg != "undefined" && arg != null;
}

export function getCurrentToken() {
  const firstToken = loadFirstToken();
  const token = loadToken();
  const currentToken = firstToken ? firstToken : token;
  return currentToken;
}

export function getTokenContent(token: string | null) {
  const base64Url = token?.split(".")[1];
  const base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64 || ""));
}

export function getCurrentSpecie() {
  const currentSpecie = localStorage.getItem("specie");
  return currentSpecie;
}

export function hideBubbleLocations(
  location: string,
  excludeLocations: string[] = []
) {
  return !excludeLocations.includes(location);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
