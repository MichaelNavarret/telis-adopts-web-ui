import LocalizedStrings from "react-localization";
import { commonEn } from "./commons";
import { loginEn } from "./login";
import { ownerEn } from "./owner";
import { adoptEn } from "./adopt";
import { specieEn } from "./specie";
import { traitEn } from "./trait";
import { masterListEn } from "./masterList";

let stringObject = {
  en: {
    ...commonEn,
    ...loginEn,
    ...ownerEn,
    ...adoptEn,
    ...specieEn,
    ...traitEn,
    ...masterListEn,
  },
};

let strings = new LocalizedStrings(stringObject);

export default strings;
