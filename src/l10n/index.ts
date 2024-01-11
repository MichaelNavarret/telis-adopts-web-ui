import LocalizedStrings from "react-localization";
import { commonEn } from "./commons";
import { loginEn } from "./login";
import { ownerEn } from "./owner";
import { adoptEn } from "./adopt";
import { specieEn } from "./specie";
import { traitEn } from "./trait";

let stringObject = {
  en: {
    ...commonEn,
    ...loginEn,
    ...ownerEn,
    ...adoptEn,
    ...specieEn,
    ...traitEn,
  },
};

let strings = new LocalizedStrings(stringObject);

export default strings;
