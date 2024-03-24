import strings from "../../../../../l10n";
import { CreationType } from "../../../../../types/adopt";

type AdoptTableTabs = {
  label: string;
  value: CreationType;
};

export const adoptTableTabs: AdoptTableTabs[] = [
  { label: strings.ALL, value: "" },
  {
    label: strings.PREMADE,
    value: "PREMADE",
  },
  {
    label: strings.CUSTOM,
    value: "CUSTOM",
  },
  {
    label: strings.MYO,
    value: "MYO",
  },
  {
    label: strings.GUEST_ARTIST,
    value: "GUEST_ARTIST",
  },
];
