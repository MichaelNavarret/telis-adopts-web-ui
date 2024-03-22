import badges from "../constants/badges.ts";

export const getBadgeImage = (code: string) => {
  switch (code) {
    case "halloween":
      return badges.halloween;
    case "christmas":
      return badges.christmas;
    case "chinese-new-year":
      return badges.chineseNewYear;
    case "valentines-day":
      return badges.valentinesDay;
    case "sanrio":
      return badges.sanrio;
    default:
      return "";
  }
};
