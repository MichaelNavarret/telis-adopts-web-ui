import strings from "../../../l10n";

export function getRarityByValuesArray(values: number[]) {
  return values.map((item) => {
    switch (item) {
      case 0:
        return strings.COMMON.toUpperCase();
      case 1:
        return strings.UNCOMMON.toUpperCase();
      case 2:
        return strings.RARE.toUpperCase();
      case 3:
        return strings.EPIC.toUpperCase();
      default:
        return strings.COMMON.toUpperCase();
    }
  });
}
