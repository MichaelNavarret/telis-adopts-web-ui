import LocalizedStrings from "react-localization";
import { commonEn, commonEs } from "./commons";
import { loginEn, loginEs } from "./login";
import { ownerEn, ownerEs } from "./owner";
import { adoptEn, adoptEs } from "./adopt";
import { specieEn, specieEs } from "./specie";
import { traitEn, traitEs } from "./trait";

let stringObject = {
  en: {
    ...commonEn,
    ...loginEn,
    ...ownerEn,
    ...adoptEn,
    ...specieEn,
    ...traitEn,
  },

  es: {
    ...commonEs,
    ...loginEs,
    ...ownerEs,
    ...adoptEs,
    ...specieEs,
    ...traitEs,
  },
};

let strings = new LocalizedStrings(stringObject);

export default strings;
