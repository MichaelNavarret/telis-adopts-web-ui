import {
  loadFirstToken,
  loadToken,
} from "../context/UserSession/userSessionReducer";
import NOT_ICON from "../assets/utils/not_icon.png";
import { laniesColors } from "../constants/colors/laniesColors";
import { spectraLumenColors } from "../constants/colors/spectraLumenColors";
import { cloudystarsColors } from "../constants/colors/cloudyStarsColors";
import { pluniesColors } from "../constants/colors/pluniesColors";
import { AutocompleteOption } from "../components/Form/AutocompleteComponent";
import strings from "../l10n";
import { mainColors } from "../constants/colors/mainColors";

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

export const getIconBoxShadow = (
  borderColor: string,
  pixelSize: number = 3
) => {
  return ` drop-shadow(${pixelSize}px 0 0 ${borderColor})
  drop-shadow(${pixelSize}px ${pixelSize}px 0 ${borderColor})
  drop-shadow(${pixelSize}px -${pixelSize}px 0 ${borderColor})
  drop-shadow(0 ${pixelSize}px 0 ${borderColor})

  drop-shadow(-${pixelSize}px 0 0 ${borderColor})
  drop-shadow(-${pixelSize}px ${pixelSize}px 0 ${borderColor})
  drop-shadow(-${pixelSize}px -${pixelSize}px 0 ${borderColor})
  drop-shadow(0 -${pixelSize}px 0 ${borderColor})`;
};

export const getBorderColor = (specie?: string) => {
  if (specie === "lanies") return laniesColors.primary_color;
  if (specie === "spectralumen") return spectraLumenColors.primary_color;
  if (specie === "cloudystars") return cloudystarsColors.primary_color;
  if (specie === "plunies") return pluniesColors.primary_color;
  return mainColors.primary_color;
};

export const formatDate = (date: string) => {
  const ISODate = date;
  const newDate = new Date(ISODate);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedMonth}/${formattedDay}/${year}`;
};

export const formatDateToFormField = (date?: string) => {
  if (!isDefined(date)) return "-";
  const ISODate = date;
  const newDate = new Date(ISODate);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const clearAutocompleteValues = (values?: AutocompleteOption[]) => {
  //?Clear null values
  const clearValues = values?.filter(
    (d) => isDefined(d.value) && d.value != ""
  );
  //*Remove duplicates
  const uniqueValues = clearValues?.filter(
    (value, index) =>
      clearValues.findIndex((d) => d.value === value.value) === index
  );
  return uniqueValues?.map((designer) => designer.value) || [];
};

export const formatCreationType = (creationType?: string) => {
  switch (creationType) {
    case "PREMADE":
      return strings.PREMADE;
    case "CUSTOM":
      return strings.CUSTOM;
    case "MYO":
      return strings.MYO;
    case "GUEST_ARTIST":
      return strings.GUEST_ARTIST;
    default:
      return "-";
  }
};

export const hexToRGBA = (hex: string, opacity: number): string => {
  const hexValue = hex.replace("#", "");
  const red = parseInt(hexValue.substring(0, 2), 16);
  const green = parseInt(hexValue.substring(2, 4), 16);
  const blue = parseInt(hexValue.substring(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};
