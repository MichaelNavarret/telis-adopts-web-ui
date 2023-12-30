import lannies_character from "../assets/characters/lannies.png";
import { getCurrentSpecie } from "../tools/commons";

export const LANNIES_CHARACTER = lannies_character;

export const getCharacter = () => {
  const species = getCurrentSpecie();
  switch (species) {
    case "lannies":
      return LANNIES_CHARACTER;
    default:
      return LANNIES_CHARACTER;
  }
};
