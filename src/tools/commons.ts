import {
  loadFirstToken,
  loadToken,
} from "../context/UserSession/userSessionReducer";
import NOT_ICON from "../assets/utils/not_icon.png";
import { laniesColors } from "../constants/colors/laniesColors";
import { spectraLumenColors } from "../constants/colors/spectraLumenColors";
import { cloudystarsColors } from "../constants/colors/cloudyStarsColors";
import { pluniesColors } from "../constants/colors/pluniesColors";

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

export function hideNavigationButtons(
  location: string,
  excludeLocations: string[] = []
) {
  return !excludeLocations.includes(location);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getImageFromBytes(image: ArrayBufferLike) {
  return "data:image/jpeg;base64," + image;
}

export function safeGetIcon(iconUrl?: string) {
  if (isDefined(iconUrl)) {
    return iconUrl;
  }
  return NOT_ICON;
}

export const getIconBoxShadow = (borderColor: string) => {
  return ` drop-shadow(3px 0 0 ${borderColor})
  drop-shadow(3px 3px 0 ${borderColor})
  drop-shadow(3px -3px 0 ${borderColor})
  drop-shadow(0 3px 0 ${borderColor})

  drop-shadow(-3px 0 0 ${borderColor})
  drop-shadow(-3px 3px 0 ${borderColor})
  drop-shadow(-3px -3px 0 ${borderColor})
  drop-shadow(0 -3px 0 ${borderColor})`;
};

export const getBorderColor = (specie?: string) => {
  if (specie === "lanies") return laniesColors.borderIcon;
  if (specie === "spectralumen") return spectraLumenColors.borderIcon;
  if (specie === "cloudystars") return cloudystarsColors.borderIcon;
  if (specie === "plunies") return pluniesColors.borderIcon;
  return laniesColors.borderIcon;
};
