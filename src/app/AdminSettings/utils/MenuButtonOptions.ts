import strings from "../../../l10n";

export const MenuButtonOwnerOptions = [
  {
    label: strings.NOT,
    value: 0,
    tooltip: strings.OWNER_NOT_NECESSARY_OPTION,
  },
  {
    label: strings.REGISTERED,
    value: 1,
    tooltip: strings.REGISTERED_OWNER_OPTION,
  },
  {
    label: strings.NOT_REGISTERED,
    value: 2,
    tooltip: strings.NOT_REGISTERED_OWNER_OPTION,
  },
];

export const MenuButtonDesignersOptions = [
  {
    label: strings.REGISTERED,
    value: 0,
  },
  {
    label: strings.NOT_REGISTERED,
    value: 1,
  },
];

export const MenuButtonRarityOptions = [
  {
    label: strings.COMMON,
    value: 0,
  },
  {
    label: strings.UNCOMMON,
    value: 1,
  },
  {
    label: strings.RARE,
    value: 2,
  },
  {
    label: strings.EPIC,
    value: 3,
  },
];
