import { OwnerInfo } from "../types/owner";
import { SpecieInfo } from "../types/species";
import { TraitInfo } from "../types/traits";
import { isDefined } from "./commons";

export function formatOwnerInfoForDropdown(ownerResponse?: OwnerInfo[]) {
  if (!isDefined(ownerResponse)) return [];
  const formattedOptions = ownerResponse.map((owner) => {
    return {
      label: owner.name,
      value: owner.id,
    };
  });
  return formattedOptions;
}

export function formatSpecieInfoForDropdown(specieResponse?: SpecieInfo[]) {
  if (!isDefined(specieResponse)) return [];
  const formattedOptions = specieResponse.map((specie) => {
    return {
      label: specie.name,
      value: specie.id,
    };
  });
  return formattedOptions;
}

export function formatTraitInfoForDropdown(traitResponse?: TraitInfo[]) {
  if (!isDefined(traitResponse)) return [];
  const formattedOptions = traitResponse.map((trait) => {
    return {
      label: trait.trait,
      value: trait.id,
    };
  });
  return formattedOptions;
}
